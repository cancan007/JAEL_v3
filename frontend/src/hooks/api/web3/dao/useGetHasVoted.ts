import { ethers } from "ethers";
import { UseQueryOptions, useQuery } from "react-query";

// 各提案で投票されている内訳を見れる
const getHasVoted = async (
  governor?: ethers.Contract,
  proposalId?: string,
  account?: string
): Promise<boolean | undefined> => {
  if (!governor || !proposalId || !account) return;
  let res = await governor.hasVoted(proposalId, account);
  return res;
};

export const useGetHasVoted = (
  governor?: ethers.Contract,
  proposalId?: string,
  account?: string,
  queryOptions?: UseQueryOptions<boolean | undefined, Error>
) => {
  return useQuery<boolean | undefined, Error>(
    ["getHasVoted", governor, proposalId, account],
    () => getHasVoted(governor, proposalId, account),
    queryOptions
  );
};
