import { ethers } from "ethers";
import { UseQueryOptions, useQuery } from "react-query";
import JAELToken from "../../../../utils/web3/DAO/artifacts/contracts/GovernanceToken_PRO.sol/GovernanceToken_PRO.json";
import mapJson from "../../../../utils/web3/DAO/map.json";

interface GetJAELTokenRes {
  contract: ethers.Contract;
  address: string;
  symbol: string;
  decimal: number;
}

const getJAELToken = async (
  connection?: any,
  chainId?: number
): Promise<GetJAELTokenRes | undefined> => {
  if (!connection || !chainId) return;
  const chainKey = chainId.toString() as keyof typeof mapJson;
  const address = mapJson[chainKey]["JT"].slice(-1)[0];
  const jt = new ethers.Contract(address, JAELToken.abi, connection);
  const symbol = await jt.symbol();
  const decimal = await jt.decimals();
  return { contract: jt, address, symbol, decimal };
};

export const useGetJAELToken = (
  connection?: any,
  chainId?: number,
  queryOptions?: UseQueryOptions<GetJAELTokenRes | undefined, Error>
) => {
  return useQuery<GetJAELTokenRes | undefined, Error>(
    ["getJAELToken", connection, Number(chainId)],
    () => getJAELToken(connection, chainId),
    queryOptions
  );
};
