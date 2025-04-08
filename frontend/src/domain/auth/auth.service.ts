// domain/user/UserService.ts
import { Auth } from "firebase/auth";
import { Customer, CustomerRepository } from "../customer/customer.entity";
import { AuthRepository } from "./auth.entity";

export type SignUpCmd = {
  customer: Customer;
  password: string;
};

// NOTE: あくまで集約(複数エンティティ)のビジネスロジックを司っているもの(ユースケースではない)
export class authService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly customerRepository?: CustomerRepository
  ) {}
  /**
   * ユーザー登録のビジネスロジックを実装するドメインサービス
   * @param name ユーザーの名前
   * @param email ユーザーのメールアドレス
   * @returns 登録したユーザーのインスタンスまたはエラー
   */
  public async signUp(cmd: SignUpCmd): Promise<void> {
    // ビジネスルールの例: メールアドレスの形式チェック
    const credential = await this.authRepository.signUp(
      cmd.customer.email,
      cmd.password
    );
    const uid = credential.user.uid;
    await this.customerRepository?.register(uid, cmd.customer);
  }

  public static newServiceCmd(customer: Customer, password: string): SignUpCmd {
    const cmd: SignUpCmd = {
      customer,
      password,
    };
    return cmd;
  }

  public static newService(
    authRepository: AuthRepository,
    customerRepository?: CustomerRepository
  ): authService {
    return new authService(authRepository, customerRepository);
  }
}

// ユーティリティ関数: ユーザーIDの簡易生成例
// function generateId(): string {
//   return Math.random().toString(36).substring(2, 15);
// }
