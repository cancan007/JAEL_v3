import { UseQueryOptions, useQuery } from "react-query";

const getNetwork = async (
  //dispatch: any,
  provider?: any
): Promise<number | undefined> => {
  if (!provider) return;
  const { chainId } = await provider.getNetwork();
  //dispatch({ type: "NETWORK_LOADED", chainId });
  return chainId;
};

export const useAPIGetNetwork = (
  //dispatch: any,
  provider?: any,
  queryOptions?: UseQueryOptions<number | undefined, Error>
) => {
  return useQuery<number | undefined, Error>(
    ["getNetwork", provider],
    () => getNetwork(provider),
    queryOptions
  );
};
