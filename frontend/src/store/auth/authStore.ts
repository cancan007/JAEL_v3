// store/userStore.ts
import { customerRepository } from "../../infra/customer.repository";
import { authService } from "../../domain/auth/auth.service";
import { authRepository } from "../../infra/auth.repository";
import { create } from "zustand";
import { signUpUsecase, SignUpUsecaseCmd } from "../../usecase/signup";
import { checkAuthUsecase } from "../../usecase/check_auth";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import { signInUsecase, SignInUsecaseCmd } from "src/usecase/signin";
import { Customer } from "src/domain/customer/customer.entity";
import { fetchProfileUsecase } from "src/usecase/fetch_profile";

type AuthStore = {
  isAuthed: boolean;
  loginUser?: Customer;
  signUp: (cmd: AuthStoreCmds.SignUpCmd) => Promise<void>;
  signIn: (cmd: AuthStoreCmds.SignInCmd) => Promise<void>;
  // ログイン状態かを確認する
  checkAuth: () => Promise<boolean>;
  fetchProfile: (id: string) => Promise<void>;
};

export namespace AuthStoreCmds {
  export type SignUpCmd = {
    password: string;
    values: {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      gender: string;
      birthDate: Date;
      introduction?: string;
    };
  };
  export type SignInCmd = {
    email: string;
    password: string;
  };
}

// 役割：グルーバル値を保存する
export const authStore = create<AuthStore>((set) => ({
  isAuthed: false,
  signUp: async (cmd: AuthStoreCmds.SignUpCmd) => {
    const service = authService.newService(authRepository, customerRepository);
    const usecase = signUpUsecase.newUsecase(service);
    await usecase.execute(cmd);
  },
  signIn: async (cmd: AuthStoreCmds.SignInCmd): Promise<void> => {
    const usecaseCmd = signInUsecase.newUsecaseCmd(cmd.email, cmd.password);
    const usecase = signInUsecase.newUsecase(
      authRepository,
      customerRepository
    );
    const { isAuthed, customer } = await usecase.execute(usecaseCmd);
    set({ isAuthed, loginUser: customer });
  },
  checkAuth: async () => {
    const usecase = checkAuthUsecase.newUsecase(authRepository);
    const isAuthed = await usecase.execute();
    set({ isAuthed: isAuthed });
    return isAuthed;
  },
  fetchProfile: async (id: string): Promise<void> => {
    const usecase = fetchProfileUsecase.newUsecase(customerRepository);
    const profile = await usecase.execute(id);
    set({ loginUser: profile });
  },
}));
