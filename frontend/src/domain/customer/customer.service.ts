// domain/user/UserService.ts
import { Customer } from "./customer.entity";

// NOTE: あくまで集約(複数エンティティ)のビジネスロジックを司っているもののため、コンストラクターは無しにした
export class CustomerService {
  /**
   * ユーザー登録のビジネスロジックを実装するドメインサービス
   * @param name ユーザーの名前
   * @param email ユーザーのメールアドレス
   * @returns 登録したユーザーのインスタンスまたはエラー
   */
  public static registerCustomer(user: User): User | Error {
    // ビジネスルールの例: メールアドレスの形式チェック
    if (!user.email.includes("@")) {
      return new Error("無効なメールアドレスです");
    }
    // ユーザーIDの生成（実際はより安全な方法で生成するべき）
    // 他のビジネスロジック（例：既存ユーザーのチェック、イベント発行など）もここで実行可能
    return user;
  }

  // このサービス内でしか使えない関数
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}

// ユーティリティ関数: ユーザーIDの簡易生成例
// function generateId(): string {
//   return Math.random().toString(36).substring(2, 15);
// }
