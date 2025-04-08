import { ethers } from "ethers";
import { UseQueryOptions, useQuery } from "react-query";
import { ProposalState } from "../../../../types/types";

// 各提案の状態を見れる
const getProposalState = async (
  governor?: ethers.Contract,
  proposalId?: string
): Promise<ProposalState | undefined> => {
  if (!governor || !proposalId) return;
  let res = await governor.state(proposalId);
  return res;
};

export const useGetProposalState = (
  governor?: ethers.Contract,
  proposalId?: string,
  queryOptions?: UseQueryOptions<ProposalState | undefined, Error>
) => {
  return useQuery<ProposalState | undefined, Error>(
    ["getProposalState", governor?.address, proposalId],
    () => getProposalState(governor, proposalId),
    queryOptions
  );
};
