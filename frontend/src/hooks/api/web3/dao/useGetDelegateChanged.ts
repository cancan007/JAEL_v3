import { ethers } from "ethers";
import { UseQueryOptions, useQuery } from "react-query";
import { extractDelegateChanged } from "../../../../utils/web3/extracts";

const getDelegateChanged = async (
  provider?: any,
  token?: ethers.Contract
): Promise<Array<any> | undefined> => {
  if (!token) return;
  const orderStream: Array<any> = await token.queryFilter(
    "DelegateChanged",
    0,
    "latest"
  );
  const allDelegateeHis = (
    await Promise.all(
      orderStream.map(async (event) => {
        const delegatedAt = (await provider.getBlock(event.blockNumber))
          .timestamp;
        const args = extractDelegateChanged(event.args);
        return { ...event, ...args, delegatedAt };
      })
    )
  ).sort((a, b) => b.blockNumber - a.blockNumber);
  return allDelegateeHis;
};

export const useGetDelegateChanged = (
  provider?: any,
  token?: ethers.Contract,
  queryOptions?: UseQueryOptions<Array<any> | undefined, Error>
) => {
  return useQuery<Array<any> | undefined, Error>(
    ["getDelegateChanged", provider, token], // governorはgovernor.addressでは取得できない
    () => getDelegateChanged(provider, token),
    queryOptions
  );
};
