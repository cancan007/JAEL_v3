import { ethers } from "ethers";
import { UseQueryOptions, useQuery } from "react-query";

const getJAELDelegatee = async (
  token?: ethers.Contract,
  account?: string
): Promise<string | undefined> => {
  if (!token || !account) return;
  const delegatee = await token.delegates(account);
  return delegatee;
};

export const useGetJAELDelegatee = (
  token?: ethers.Contract,
  account?: string,
  queryOptions?: UseQueryOptions<string | undefined, Error>
) => {
  return useQuery<string | undefined, Error>(
    ["getJAELDelegatee", token?.address, account],
    () => getJAELDelegatee(token, account),
    queryOptions
  );
};
