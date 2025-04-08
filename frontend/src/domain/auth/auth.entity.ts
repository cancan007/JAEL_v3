// infrastructure/userRepository.ts
// domain/user/User.ts

import { IdTokenResult, UserCredential } from "firebase/auth";
import { SignUpCmd } from "./auth.service";

export interface AuthRepository {
  signUp(email: string, password: string): Promise<UserCredential>;
  signIn(email: string, password: string): Promise<UserCredential>;
  getLoginUserIdTokenResult(): Promise<IdTokenResult | undefined>;
}

export interface AuthService {
  signUp(cmd: SignUpCmd): Promise<void>;
}
