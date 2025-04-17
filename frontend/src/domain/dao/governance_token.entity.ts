import { ethers } from "ethers";
import {
  GovernorContract,
  GovernorContract__factory,
} from "src/utils/web3/DAO/typechain/GovernorContract";
import GovernorContractJson from "../../utils/web3/DAO/artifacts/contracts/GovernorContract_PRO.sol/GovernorContract_PRO.json";
import mapJson from "../../utils/web3/DAO/map.json";
import { GovernanceToken } from "src/utils/web3/DAO/typechain/GovernanceToken";
import { backIn } from "framer-motion";

export interface GovernanceTokenRepository {
  checkDelegatee(account: string): Promise<string>; //NOTE: 自分のガバナンストークンの投票権利を持っている人物のアドレスを取得i
  getAllDelegatedHistory(): Promise<Array<any>>; //TODO: 型定義
  getTokenSummary(): Promise<TokenSummary>;
  getBalance(account: string): Promise<number>;
  delegate(account: string): Promise<void>;
}

export type TokenSummary = {
  symbol: string;
  decimal: bigint;
};

export type DelegateChanged = {
  delegatedAt: number;
  delegator: string;
  fromDelegate: string;
  toDelegate: string;
  blockNumber: number;
};

export class GovernanceTokenDomainModel {
  address: string;
  balance: number;
  decimal: number;
  //rate?: number;
  //depositedBalance?: number;
  symbol: string;
  constructor(
    address: string,
    balance: number,
    decimal: number,
    symbol: string
  ) {
    this.address = address;
    this.balance = balance;
    this.decimal = decimal;
    this.symbol = symbol;
  }

  public static toDomainModel(
    address: string,
    balance: number,
    decimal: number,
    symbol: string
  ): GovernanceTokenDomainModel {
    return new GovernanceTokenDomainModel(address, balance, decimal, symbol);
  }
}
