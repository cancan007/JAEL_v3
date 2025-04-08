import {
  createUserWithEmailAndPassword,
  IdTokenResult,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { auth } from "./firebase";

export const authRepository = {
  async signUp(email: string, password: string): Promise<UserCredential> {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credential;
  },

  async signIn(email: string, password: string): Promise<UserCredential> {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential;
  },

  async getLoginUserIdTokenResult(): Promise<IdTokenResult | undefined> {
    const loginUser = auth.currentUser;
    const result = await loginUser?.getIdTokenResult();
    return result;
  },
};
