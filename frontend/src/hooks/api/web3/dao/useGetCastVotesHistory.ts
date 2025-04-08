import { ethers } from "ethers";
import { UseQueryOptions, useQuery } from "react-query";
import { extractVoteCast } from "../../../../utils/web3/extracts";

const getCastVotesHistory = async (
  provider?: any,
  governor?: ethers.Contract,
  proposalId?: string
): Promise<Array<any> | undefined> => {
  if (!provider || !governor || proposalId == undefined || proposalId == null)
    return;
  const block = await provider.getBlockNumber();
  //governor.filters.VoteCast(null, userAddress);
  const orderStream: Array<any> = await governor.queryFilter(
    "VoteCast",
    0,
    block
  );
  let allVotes = [];
  // ToDo: proposalIdがindexedではないため、このようにフィルターをかける必要あり、そのため重いためどうにかする必要あり
  if (proposalId == "") {
    allVotes = await Promise.all(
      orderStream.map(async (event) => {
        const args = extractVoteCast(event.args);
        const votedAt = (await provider.getBlock(event.blockNumber)).timestamp;
        const weight = Number(ethers.formatEther(args.weight));
        return { ...event, ...args, weight, votedAt };
      })
    );
  } else {
    allVotes = await Promise.all(
      orderStream
        .filter((e) => Number(e.args.proposalId) == Number(proposalId))
        .map(async (event) => {
          const args = extractVoteCast(event.args);
          const votedAt = (await provider.getBlock(event.blockNumber))
            .timestamp;
          const weight = Number(ethers.formatEther(args.weight));
          return { ...event, ...args, weight, votedAt };
        })
    );
  }
  return allVotes.sort((a, b) => b.blockNumber - a.blockNumber);
};

export const useGetCastVotesHistory = (
  provider?: any,
  governor?: ethers.Contract,
  proposalId?: string,
  queryOptions?: UseQueryOptions<Array<any> | undefined, Error>
) => {
  return useQuery<Array<any> | undefined, Error>(
    ["getCastVotesHistory", provider, governor, proposalId], // governorはgovernor.addressでは取得できない
    () => getCastVotesHistory(provider, governor, proposalId),
    queryOptions
  );
};
