import { ethers } from "ethers";
import { UseQueryOptions, useQuery } from "react-query";
import GovernorContract from "../../../../utils/web3/DAO/artifacts/contracts/GovernorContract_PRO.sol/GovernorContract_PRO.json";
import mapJson from "../../../../utils/web3/DAO/map.json";

const getGovernorContract = (
  connection?: any,
  chainId?: number
): ethers.Contract | undefined => {
  if (!connection || !chainId) return;
  const chainKey = chainId.toString() as keyof typeof mapJson;
  const gc = new ethers.Contract(
    mapJson[chainKey]["GC"].slice(-1)[0],
    GovernorContract.abi,
    connection
  );
  return gc;
};

export const useGetGovernorContract = (
  connection?: any,
  chainId?: number,
  queryOptions?: UseQueryOptions<ethers.Contract | undefined, Error>
) => {
  return useQuery<ethers.Contract | undefined, Error>(
    ["getGovernorContract", connection, Number(chainId)],
    () => getGovernorContract(connection, chainId),
    queryOptions
  );
};
