import { ethers } from "ethers";
import { UseQueryOptions, useQuery } from "react-query";

// 各提案で投票されている内訳を見れる
const getProposalVotes = async (
  governor?: ethers.Contract,
  proposalId?: string
): Promise<any> => {
  if (!governor || !proposalId) return;
  let res = await governor.proposalVotes(proposalId);
  let againstVotes = Number(ethers.formatEther(res.againstVotes));

  let forVotes = Number(ethers.formatEther(res.forVotes));
  let abstainVotes = Number(ethers.formatEther(res.abstainVotes));
  const total = againstVotes + forVotes + abstainVotes;
  return {
    ...res,
    total: total != 0 ? total : 1,
    againstVotes,
    forVotes,
    abstainVotes,
  };
};

export const useGetProposalVotes = (
  governor?: ethers.Contract,
  proposalId?: string,
  queryOptions?: UseQueryOptions<any | undefined, Error>
) => {
  return useQuery<any | undefined, Error>(
    ["getProposalVotes", governor?.address, proposalId],
    () => getProposalVotes(governor, proposalId),
    queryOptions
  );
};
