import { ethers } from "ethers";
import {
  DelegateChanged,
  TokenSummary,
} from "src/domain/dao/governance_token.entity";
import { GovernanceToken } from "src/utils/web3/DAO/typechain/GovernanceToken";
import { extractDelegateChanged } from "src/utils/web3/extracts";

export class governanceTokenRepository {
  constructor(
    private readonly provider: ethers.BrowserProvider,
    private readonly tokenContract: GovernanceToken
  ) {}

  async checkDelegatee(account: string): Promise<string> {
    const delegatee = await this.tokenContract.delegates(account);
    return delegatee;
  }

  async getTokenSummary(): Promise<TokenSummary> {
    const symbol = await this.tokenContract.symbol();
    const decimal = await this.tokenContract.decimals();
    return { symbol, decimal };
  }

  async getBalance(account: string): Promise<number> {
    const decimals = await this.tokenContract.decimals();
    let balance = await this.tokenContract.balanceOf(account);
    let formatedBalance = ethers.formatUnits(balance, decimals);
    return Math.round(Number(formatedBalance) * 10000) / 10000;
  }

  async getAllDelegatedHistory(): Promise<Array<DelegateChanged>> {
    const filter = this.tokenContract.filters.DelegateChanged;
    const orderStream = await this.tokenContract.queryFilter(
      filter,
      0,
      "latest"
    );
    const allDelegateeHis = (
      await Promise.all(
        orderStream.map(async (event) => {
          const delegatedAt = (await this.provider.getBlock(event.blockNumber))
            ?.timestamp;
          const args = extractDelegateChanged(event.args);
          return {
            blockNumber: event.blockNumber,
            delegatedAt,
            ...args,
          } as DelegateChanged;
        })
      )
    ).sort((a, b) => b.blockNumber - a.blockNumber);
    return allDelegateeHis;
  }
  async delegate(account: string): Promise<void> {
    const signer = await this.provider.getSigner();
    const tx = await this.tokenContract.connect(signer).delegate(
      account
      /*{
        gasLimit: gasLimitForHeavy,
        gasPrice,
      }*/
    );
    await tx.wait();
  }
}
