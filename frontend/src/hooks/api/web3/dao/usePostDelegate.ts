import { ethers } from "ethers";
import { UseMutationOptions, useMutation } from "react-query";
import { gasLimitForHeavy, gasPrice } from "../../../../utils/web3/constants";

interface DelegateProps {
  connection: any;
  token: any;
  account: string;
}

const delegate = async ({
  connection,
  token,
  account,
}: DelegateProps): Promise<boolean> => {
  try {
    const signer = await connection.getSigner();
    const tx = await token.connect(signer).delegate(
      account
      /*{
        gasLimit: gasLimitForHeavy,
        gasPrice,
      }*/
    );
    await tx.wait();
    return true;
  } catch (e) {
    throw e;
  }
};

export const usePostDelegate = (
  mutationOptions?: UseMutationOptions<boolean, Error, DelegateProps>
) => {
  return useMutation<boolean, Error, DelegateProps>(
    (body) => delegate(body),
    mutationOptions
  );
};
