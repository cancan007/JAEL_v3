import { ethers } from "ethers";
import {
  GovernorContract,
  GovernorContract__factory,
} from "src/utils/web3/DAO/typechain/GovernorContract";
import mapJson from "src/utils/web3/DAO/map.json";
import {
  GovernanceToken,
  GovernanceToken__factory,
} from "src/utils/web3/DAO/typechain/GovernanceToken";

export const createGovernorClient = (
  signer: ethers.Signer,
  chainID: number
): GovernorContract => {
  const chainKey = chainID.toString() as keyof typeof mapJson;
  const contractAddress = mapJson[chainKey]["GC"].slice(-1)[0];
  const contract = GovernorContract__factory.connect(contractAddress, signer);
  return contract;
};

export const createGovernanceTokenClient = (
  signer: ethers.Signer,
  chainID: number
): GovernanceToken => {
  const chainKey = chainID.toString() as keyof typeof mapJson;
  const contractAddress = mapJson[chainKey]["JT"].slice(-1)[0];
  const contract = GovernanceToken__factory.connect(contractAddress, signer);
  return contract;
};
