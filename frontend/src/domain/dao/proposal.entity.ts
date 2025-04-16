import { ethers } from "ethers";
import {
  GovernorContract,
  GovernorContract__factory,
} from "src/utils/web3/DAO/typechain/GovernorContract";
import GovernorContractJson from "../../utils/web3/DAO/artifacts/contracts/GovernorContract_PRO.sol/GovernorContract_PRO.json";
import mapJson from "../../utils/web3/DAO/map.json";
import { CastSupport, ProposalState } from "src/types/types";
import { DateTime } from "luxon";

//TODO: Suggestion, Voteでドメインを分けるべき（集約としてSuggestion？そこはまた考える）
export interface ProposalRepository {
  // TODO: CastSupportをドメイン層でまたEnum定義して、infra層で数字に変えるメソッドを呼ぶ形で(現状だと、infra側に依存してしまっている(infra側で必要な引数の形を意識してしまっている))
  castVote(id: string, proposalIdproposalIdsupport: CastSupport): Promise<void>;
  propose(
    target: string,
    value: number,
    calldata: string,
    description: string
  ): Promise<void>;
  //TODO: ProposalStateは別でドメイン層に定義すべき（infraで数字に戻す。現状infraのcontractの引数の形に依存してしまっているためNO）
  getState(id: string): Promise<ProposalState>;
  getAllProposals(): Promise<Array<Proposal>>;
  getVotesSummary(id: string): Promise<ProposalVotesInfo>;
  getAvailableVotes(id: string): Promise<number>; //NOTE: 提案が作成された後に受け取ったガナバンストークン分は投票できないようにする
  checkHasVoted(id: string, account: string): Promise<boolean>;
  getVotesHistory(id: string): Promise<Array<any>>; // 型定義
}

export type ProposalVotesInfo = {
  total: number;
  againstVotes: number;
  forVotes: number;
  abstainVotes: number;
  availableVotes?: number; // ユーザーの投票可能票数
};

export class Proposal {
  id: string;
  proposer: string;
  voteStart: DateTime;
  voteEnd: DateTime;
  description: string;
  // values: number;
  // signatures: string;
  // targets?: string;
  constructor(
    id: string,
    proposer: string,
    voteStart: DateTime,
    voteEnd: DateTime,
    description: string
    // values: number,
    // signature: string,
    // targets?: string
  ) {
    this.id = id;
    this.proposer = proposer;
    this.voteStart = voteStart;
    this.voteEnd = voteEnd;
    this.description = description;
    // this.values = values;
    // this.signatures = signature;
    // this.targets = targets;
  }
}
