import { ethers } from "ethers";

export interface ProviderRepository {
  getNetwork(): Promise<number>;
  getAccount(): Promise<AccountInfo>;
}

export type AccountInfo = {
  account: string;
  balance: number;
};

export class Provider {
  connection?: ethers.BrowserProvider;
  chainId?: number;
  account?: string;
  balance?: number;
  public static createConnection(): ethers.BrowserProvider {
    return new ethers.BrowserProvider(window.ethereum);
  }

  public static toDomainModel(
    connection: ethers.BrowserProvider,
    chainId?: number,
    account?: string,
    balance?: number
  ): Provider {
    return {
      connection,
      chainId,
      account,
      balance,
    };
  }
}
