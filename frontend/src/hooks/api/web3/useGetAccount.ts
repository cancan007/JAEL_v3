import { ethers } from "ethers";
import { UseQueryOptions, useQuery } from "react-query";

interface GetAccountAndBalance {
  account: string;
  balance: string;
}

const getAccountAndBalance = async (
  provider?: any
): Promise<GetAccountAndBalance | undefined> => {
  if (!provider) return;
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = ethers.getAddress(accounts[0]);
  const beforeBalance = await provider.getBalance(account);
  const balance = ethers.formatEther(beforeBalance);
  return { account, balance };
};

export const useGetAccount = (
  provider?: any,
  queryOptions?: UseQueryOptions<GetAccountAndBalance | undefined, Error>
) => {
  return useQuery<GetAccountAndBalance | undefined, Error>(
    ["getAccountAndBalance", provider],
    () => getAccountAndBalance(provider),
    queryOptions
  );
};
