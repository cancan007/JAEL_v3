import { ethers } from "ethers";
import {
  GovernorContract,
  GovernorContract__factory,
} from "src/utils/web3/DAO/typechain/GovernorContract";
import GovernorContractJson from "../../../utils/web3/DAO/artifacts/contracts/GovernorContract_PRO.sol/GovernorContract_PRO.json";
import mapJson from "../../../utils/web3/DAO/map.json";

export class GovernorContractDomainModel {
  contract: GovernorContract;
  reward?: number;
  transaction?: {
    isSuccessful: boolean;
  };
  allProposals: {
    loaded: boolean;
    data?: Array<any>;
  };
  queuedProposals: {
    loaded: boolean;
    data?: Array<any>;
  };
  executedProposals: {
    loaded: boolean;
    data?: Array<any>;
  };
  constructor(contract: GovernorContract) {
    this.contract = contract;
    this.allProposals = { loaded: false };
    this.queuedProposals = { loaded: false };
    this.executedProposals = { loaded: false };
  }

  public static createContract(
    signer: ethers.Signer,
    chainId: number
  ): GovernorContract {
    const chainKey = chainId.toString() as keyof typeof mapJson;
    const contractAddress = mapJson[chainKey]["GC"].slice(-1)[0];
    const contract = GovernorContract__factory.connect(contractAddress, signer);
    return contract;
  }
}
