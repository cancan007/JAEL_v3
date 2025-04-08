import { ethers } from "ethers";
import { UseQueryOptions, useQuery } from "react-query";

const getProvider = async (): Promise<any> => {
  const connection = new ethers.BrowserProvider(window.ethereum);
  //dispatch({ type: "PROVIDER_LOADED", provider });
  return connection;
};

export const useGetProvider = (
  //dispatch: any,
  queryOptions?: UseQueryOptions<any, Error>
) => {
  return useQuery<any, Error>(
    ["getProvider"],
    () => getProvider(),
    queryOptions
  );
};
