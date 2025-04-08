import { ethers } from "ethers";
import { UseQueryOptions, useQuery } from "react-query";
import { extractProposalCreated } from "../../../../utils/web3/extracts";

const getAllProposals = async (
  provider?: any,
  governor?: ethers.Contract
): Promise<Array<any> | undefined> => {
  if (!provider || !governor) return;
  const block = await provider.getBlockNumber();
  const orderStream: Array<any> = await governor.queryFilter(
    "ProposalCreated",
    0,
    block
  );
  const allProposals = orderStream.map((event) => {
    const args = extractProposalCreated(event.args);
    return { ...event, ...args };
  });
  return allProposals;
};

export const useGetAllProposals = (
  provider?: any,
  governor?: ethers.Contract,
  queryOptions?: UseQueryOptions<Array<any> | undefined, Error>
) => {
  return useQuery<Array<any> | undefined, Error>(
    ["getAllProposals", provider, governor], // governorはgovernor.addressでは取得できない
    () => getAllProposals(provider, governor),
    queryOptions
  );
};
