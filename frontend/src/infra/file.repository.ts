import { GetCIDResponse, PinataSDK, UploadResponse } from "pinata";

const pinataSDK = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  // pinataGateway: "" // デフォルトのものを使用
});
export const fileRepository = {
  async upload(file: File): Promise<UploadResponse> {
    const data = await pinataSDK.upload.public.file(file);
    return data;
  },
  async uploadPrivate(file: File): Promise<UploadResponse> {
    const data = await pinataSDK.upload.private.file(file);
    return data;
  },
  async getFileDataByCID(cid: string): Promise<GetCIDResponse> {
    const data = await pinataSDK.gateways.public.get(cid);
    return data;
  },
  async getFileURLByCID(cid: string): Promise<string> {
    const url = await pinataSDK.gateways.public.convert(cid);
    return url;
  },
};
