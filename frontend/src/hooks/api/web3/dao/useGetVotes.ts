import { ethers } from "ethers";
import { UseQueryOptions, useQuery } from "react-query";

// 各提案で投票できる数を示すのに使う
// proposalStartTime(block number)より後に受け取った分のトークンの分は、該当の投票では反映されない
const getVotes = async (
  governor?: ethers.Contract,
  account?: string,
  startSnapshot?: number
): Promise<number | undefined> => {
  if (!governor || !account || !startSnapshot) return;
  let res = await governor.getVotes(account, startSnapshot - 1);
  return res;
};

export const useGetVotes = (
  governor?: ethers.Contract,
  account?: string,
  startSnapshot?: number,
  queryOptions?: UseQueryOptions<number | undefined, Error>
) => {
  return useQuery<number | undefined, Error>(
    ["getVotes", governor?.address, account, startSnapshot],
    () => getVotes(governor, account, startSnapshot),
    queryOptions
  );
};
