import { GetCIDResponse, UploadResponse } from "pinata";

export interface FileRepository {
  upload(file: File): Promise<UploadResponse>;
  uploadPrivate(file: File): Promise<UploadResponse>;
  getFileDataByCID(cid: string): Promise<GetCIDResponse>;
  getFileURLByCID(cid: string): Promise<string>;
}

export class CustomFile extends File {
  public static toJSONFile(jsonString: string): File {
    // 1. Blob を作成（MIMEタイプは application/json）
    const blob = new Blob([jsonString], { type: "application/json" });
    // 2. File を作成（ファイル名やタイムスタンプを指定可能）
    const timestamp = Date.now(); // 例: 1713345678901
    const file = new File(
      [blob],
      `${timestamp}.json`, // 任意のファイル名
      { type: "application/json", lastModified: Date.now() }
    );
    return file;
  }
}
