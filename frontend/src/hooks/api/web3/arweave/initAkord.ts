import { Akord, Auth } from "@akord/akord-js";

export const initAkord = async (): Promise<Akord> => {
  const email = process.env.NEXT_PUBLIC_ARWEAVE_EMAIL;
  const pass = process.env.NEXT_PUBLIC_ARWEAVE_PASSWORD;
  if (!email || !pass) throw new Error();
  const { wallet, jwt } = await Auth.signIn(email, pass);
  const akord = await Akord.init(wallet, { authToken: jwt });
  return akord;
};
