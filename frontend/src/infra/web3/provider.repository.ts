import { ethers } from "ethers";
import { AccountInfo, ProviderRepository } from "src/domain/provider.entity";

export class providerRepository {
  provider: ethers.BrowserProvider; //NOTE: providerはほぼ固定値（Signerは可変だけど）のため、repozitory生成時に必須とした
  constructor(provider: ethers.BrowserProvider) {
    this.provider = provider;
  }

  public static NewProviderRepository(
    provider: ethers.BrowserProvider
  ): ProviderRepository {
    return new providerRepository(provider);
  }

  async getNetwork(): Promise<bigint> {
    const { chainId } = await this.provider.getNetwork();
    return chainId;
  }
  async getAccount(): Promise<AccountInfo> {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.getAddress(accounts[0]);
    const beforeBalance = await this.provider.getBalance(account);
    const balance = ethers.formatEther(beforeBalance);
    return { account, balance };
  }
}
