import { ethers } from "ethers";
import { Proposal, ProposalVotesInfo } from "src/domain/dao/proposal.entity";
import { CastSupport, ProposalState } from "src/types/types";
import { GovernorContract } from "src/utils/web3/DAO/typechain/GovernorContract";
import {
  extractProposalCreated,
  extractVoteCast,
} from "src/utils/web3/extracts";

export class ProposalRepository {
  provider: ethers.BrowserProvider; //NOTE: providerはほぼ固定値（Signerは可変だけど）のため、repozitory生成時に必須とした
  governanceContract: GovernorContract;
  constructor(
    provider: ethers.BrowserProvider,
    governorContract: GovernorContract
  ) {
    this.provider = provider;
    this.governanceContract = governorContract;
  }

  async castVote(id: string, support: CastSupport): Promise<void> {
    const signer = await this.provider.getSigner();
    const tx = await this.governanceContract.connect(signer).castVote(
      id,
      support
      // optimism上ならgasLimitを設定しなくても成功
      /*{
      gasLimit: 30000000,
      //gasPrice,
      //value: 0,
    }*/
    );
    await tx.wait();
  }
  async propose(
    target: string,
    value: number,
    calldata: string,
    description: string
  ): Promise<void> {
    const signer = await this.provider.getSigner();
    const tx = await this.governanceContract.connect(signer).propose(
      [target],
      [value],
      [calldata],
      description
      /*{
        gasLimit: gasLimitForHeavy,
        gasPrice,
      }*/
    ); // 実際のガス代(sepolia): 0.0001539, gas代を設定しないで行なった場合高速化しなくても成功(sepolia): 0.00026104 eth
    await tx.wait();
  }
  async getState(id: string): Promise<ProposalState> {
    let res = await this.governanceContract.state(id);
    return Number(res) as ProposalState;
  }
  async getAllProposals(): Promise<Array<Proposal>> {
    const block = await this.provider.getBlockNumber();
    const filter = this.governanceContract.filters.ProposalCreated;
    const orderStream: Array<any> = await this.governanceContract.queryFilter(
      filter,
      0,
      block
    );
    const allProposals = orderStream.map((event) => {
      const args = extractProposalCreated(event.args);
      return { ...event, ...args }; //TODO: 中身整理
    });
    return allProposals;
  }
  async getVotesSummary(id: string): Promise<ProposalVotesInfo> {
    let res = await this.governanceContract.proposalVotes(id);
    let againstVotes = Number(ethers.formatEther(res.againstVotes));
    let forVotes = Number(ethers.formatEther(res.forVotes));
    let abstainVotes = Number(ethers.formatEther(res.abstainVotes));
    const total = againstVotes + forVotes + abstainVotes;
    return {
      // ...res,
      total: total != 0 ? total : 1,
      againstVotes,
      forVotes,
      abstainVotes,
    };
  }
  async getAvailableVotes(
    account: string,
    startSnapshot: number
  ): Promise<number> {
    let res = await this.governanceContract.getVotes(
      account,
      startSnapshot - 1
    );
    return Number(ethers.formatEther(res));
  }

  async checkHasVoted(id: string, account: string): Promise<boolean> {
    const hasVoted = await this.governanceContract.hasVoted(id, account);
    return hasVoted;
  }

  async getVotesHistory(id: string): Promise<Array<any>> {
    const block = await this.provider.getBlockNumber();
    //governor.filters.VoteCast(null, userAddress);
    const filter = this.governanceContract.filters.VoteCast;
    const orderStream = await this.governanceContract.queryFilter(
      filter,
      0,
      block
    );
    let allVotes = [];
    // ToDo: idがindexedではないため、このようにフィルターをかける必要あり、そのため重いためどうにかする必要あり
    if (id == "") {
      allVotes = await Promise.all(
        orderStream.map(async (event) => {
          const args = extractVoteCast(event.args);
          const votedAt = (await this.provider.getBlock(event?.blockNumber))
            ?.timestamp;
          const weight = Number(ethers.formatEther(args.weight));
          return { ...event, ...args, weight, votedAt };
        })
      );
    } else {
      allVotes = await Promise.all(
        orderStream
          .filter((e) => Number(e.args.proposalId) == Number(id))
          .map(async (event) => {
            const args = extractVoteCast(event.args);
            const votedAt = (await this.provider.getBlock(event?.blockNumber))
              ?.timestamp;
            const weight = Number(ethers.formatEther(args.weight));
            return { ...event, ...args, weight, votedAt };
          })
      );
    }
    return allVotes.sort((a, b) => b.blockNumber - a.blockNumber);
  }
}
