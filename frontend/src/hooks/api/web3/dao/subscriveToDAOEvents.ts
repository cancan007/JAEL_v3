import { ethers } from "ethers";
import { extractVoteCast } from "../../../../utils/web3/extracts";

interface SubscribeToDAOEventsProps {
  governor?: any;
  proposalId?: string;
  setNewCastVoteSuccess: (order: any) => void;
}

export const subscribeToDAOEvents = ({
  governor,
  proposalId,
  setNewCastVoteSuccess,
}: SubscribeToDAOEventsProps) => {
  if (!governor || !proposalId) return;
  governor.on(
    "VoteCast",
    (
      voter: string,
      pId: BigInt,
      support: BigInt,
      weight: BigInt,
      reason: string,
      res: any
    ) => {
      console.log(res);
      if (Number(res.args.proposalId) != Number(proposalId)) return;
      const args = extractVoteCast(res.args);
      const w = Number(ethers.formatEther(args.weight));
      setNewCastVoteSuccess({ ...res, ...args, weight: w });
    }
  );
};
