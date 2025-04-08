import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { authStore, AuthStoreCmds } from "./authStore";

export interface UseAuthStore {
  useMutateSignUp(
    mutationOptions?: UseMutationOptions<void, Error, AuthStoreCmds.SignUpCmd>
  ): UseMutationResult<void, Error, AuthStoreCmds.SignUpCmd, unknown>;
  useMutateSignIn(
    mutationOptions?: UseMutationOptions<void, Error, AuthStoreCmds.SignInCmd>
  ): UseMutationResult<void, Error, AuthStoreCmds.SignInCmd, unknown>;
  useQueryCheckAuth(
    queryOptions?: UseQueryOptions<any | undefined, Error>
  ): UseQueryResult<any, Error>;
}

// TODO: store内に一緒に入れるのは違う気がするため、後ほど考える
// 役割：元々hooksで行っていたuseQueryなどの非同期データフェッチやキャッシュ管理
export const useAuthStore = {
  useMutateSignUp(
    mutationOptions?: UseMutationOptions<void, Error, AuthStoreCmds.SignUpCmd>
  ) {
    return useMutation<void, Error, AuthStoreCmds.SignUpCmd>(
      (cmd) => authStore.getState().signUp(cmd),
      mutationOptions
    );
  },
  useMutateSignIn(
    mutationOptions?: UseMutationOptions<void, Error, AuthStoreCmds.SignInCmd>
  ) {
    return useMutation<void, Error, AuthStoreCmds.SignInCmd>(
      (cmd) => authStore.getState().signIn(cmd),
      mutationOptions
    );
  },
  useQueryCheckAuth(queryOptions?: UseQueryOptions<any | undefined, Error>) {
    return useQuery<any | undefined, Error>(
      ["checkAuth"],
      () => authStore.getState().checkAuth(),
      queryOptions
    );
  },
};
