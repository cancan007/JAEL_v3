import { ethers } from "ethers";
import { UseQueryOptions, useQuery } from "react-query";

const getJAELBalance = async (
  token?: ethers.Contract,
  account?: string
): Promise<number | undefined> => {
  if (!token || !account) return;
  const decimals = await token.decimals();
  let balance = await token.balanceOf(account);
  balance = ethers.formatUnits(balance, decimals);
  balance = Math.round(Number(balance) * 10000) / 10000;
  return balance;
};

export const useGetJAELBalance = (
  token?: ethers.Contract,
  account?: string,
  queryOptions?: UseQueryOptions<number | undefined, Error>
) => {
  return useQuery<number | undefined, Error>(
    ["getTokenBalancesForOrders", token?.address, account],
    () => getJAELBalance(token, account),
    queryOptions
  );
};
