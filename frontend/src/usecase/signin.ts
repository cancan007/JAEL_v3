import { AuthRepository } from "src/domain/auth/auth.entity";
import {
  Customer,
  CustomerRepository,
} from "src/domain/customer/customer.entity";

export type SignInUsecaseCmd = {
  email: string;
  password: string;
};

export type SignInUsecaseResponse = {
  customer?: Customer;
  isAuthed: boolean;
};

export interface SignInUsecase {
  execute(cmd: SignInUsecaseCmd): Promise<SignInUsecaseResponse>;
}

export class signInUsecase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly customerRepository: CustomerRepository
  ) {}

  async execute(cmd: SignInUsecaseCmd): Promise<SignInUsecaseResponse> {
    const credential = await this.authRepository.signIn(
      cmd.email,
      cmd.password
    );
    const tokenResult = await credential.user.getIdTokenResult();
    const customer = await this.customerRepository.getByID(credential.user.uid);
    // TODO: ドメイン層でビジネスロジックに変える(tokenResultをrepository内でドメインエンティティの一部にしないとかも)
    if (!tokenResult)
      return {
        isAuthed: false,
      };
    const expirationTime = new Date(tokenResult.expirationTime);
    const now = new Date();
    if (expirationTime > now)
      return {
        customer,
        isAuthed: true,
      };
    return {
      isAuthed: false,
    };
  }

  public static newUsecaseCmd(
    email: string,
    password: string
  ): SignInUsecaseCmd {
    return {
      email,
      password,
    };
  }

  public static newUsecase(
    authRepository: AuthRepository,
    customerRepository: CustomerRepository
  ): SignInUsecase {
    return new signInUsecase(authRepository, customerRepository);
  }
}
