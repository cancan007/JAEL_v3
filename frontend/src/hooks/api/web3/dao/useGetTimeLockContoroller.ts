import { ethers } from "ethers";
import { UseQueryOptions, useQuery } from "react-query";
import TimeLock from "../../../../utils/web3/DAO/artifacts/contracts/TimeLock_PRO.sol/TimeLock_PRO.json";
import mapJson from "../../../../utils/web3/DAO/map.json";

const getTimeLockController = (
  connection?: any,
  chainId?: number
): ethers.Contract | undefined => {
  if (!connection || !chainId) return;
  const chainKey = chainId.toString() as keyof typeof mapJson;
  const tlc = new ethers.Contract(
    mapJson[chainKey]["TLC"].slice(-1)[0],
    TimeLock.abi,
    connection
  );
  return tlc;
};

export const useGetTimeLockController = (
  connection?: any,
  chainId?: number,
  queryOptions?: UseQueryOptions<ethers.Contract | undefined, Error>
) => {
  return useQuery<ethers.Contract | undefined, Error>(
    ["getTimeLockController", connection, Number(chainId)],
    () => getTimeLockController(connection, chainId),
    queryOptions
  );
};
