import { UseMutationOptions, useMutation } from "react-query";
import { initAkord } from "./initAkord";
import { arweaveBaseUrl } from "../../../../utils/url/web3.url";

export interface ArweaveJsonProps {
  json: string;
  name: string;
}

export const uploadNoteToArweave = async ({
  json,
  name,
}: ArweaveJsonProps): Promise<string | undefined> => {
  const vaultId = process.env.NEXT_PUBLIC_ARWEAVE_VAULT_ID;
  if (!vaultId) throw new Error();
  const akord = await initAkord();
  const { object } = await akord.note.create(
    vaultId,
    json,
    name //名前はアルファベットじゃないとエラー
  );
  const tokenURI = arweaveBaseUrl + "/" + object.getUri();
  return tokenURI;
};

export const useAPIUploadNoteToArweave = (
  mutationOptions?: UseMutationOptions<
    string | undefined,
    Error,
    ArweaveJsonProps
  >
) => {
  return useMutation<string | undefined, Error, ArweaveJsonProps>(
    (obj) => uploadNoteToArweave(obj),
    mutationOptions
  );
};
