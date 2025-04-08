import { ethers } from "ethers";
import { UseMutationOptions, useMutation } from "react-query";
import { gasLimitForHeavy, gasPrice } from "../../../../utils/web3/constants";

interface ProposeProps {
  connection: any;
  governor: any;
  target: any;
  value: number;
  calldata: string;
  description: string;
}

const propose = async ({
  connection,
  governor,
  target,
  value,
  calldata,
  description,
}: ProposeProps): Promise<boolean> => {
  try {
    const signer = await connection.getSigner();
    const tx = await governor.connect(signer).propose(
      [target],
      [value],
      [calldata],
      description
      /*{
        gasLimit: gasLimitForHeavy,
        gasPrice,
      }*/
    ); // 実際のガス代(sepolia): 0.0001539, gas代を設定しないで行なった場合高速化しなくても成功(sepolia): 0.00026104 eth
    await tx.wait();
    return true;
  } catch (e) {
    throw e;
  }
};

export const usePostPropose = (
  mutationOptions?: UseMutationOptions<boolean, Error, ProposeProps>
) => {
  return useMutation<boolean, Error, ProposeProps>(
    (body) => propose(body),
    mutationOptions
  );
};
