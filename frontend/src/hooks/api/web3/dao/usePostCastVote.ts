import { ethers } from "ethers";
import { UseMutationOptions, useMutation } from "react-query";
import {
  gasLimit1,
  gasLimitForHeavy,
  gasPrice,
} from "../../../../utils/web3/constants";
import { CastSupport } from "../../../../types/types";

interface CastVoteProps {
  connection: any;
  governor: any;
  proposalId: string;
  support: CastSupport;
}

const castVote = async ({
  connection,
  governor,
  proposalId,
  support,
}: CastVoteProps): Promise<boolean> => {
  try {
    const signer = await connection.getSigner();
    const tx = await governor.connect(signer).castVote(
      proposalId,
      support
      // optimism上ならgasLimitを設定しなくても成功
      /*{
      gasLimit: 30000000,
      //gasPrice,
      //value: 0,
    }*/
    );
    await tx.wait();
    return true;
  } catch (e) {
    throw e;
  }
};

export const usePostCastVote = (
  mutationOptions?: UseMutationOptions<boolean, Error, CastVoteProps>
) => {
  return useMutation<boolean, Error, CastVoteProps>(
    (body) => castVote(body),
    mutationOptions
  );
};
