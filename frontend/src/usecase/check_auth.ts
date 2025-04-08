import { AuthRepository } from "../domain/auth/auth.entity";

export interface CheckAuthUsecase {
  execute(): Promise<boolean>;
}

export class checkAuthUsecase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<boolean> {
    const tokenResult = await this.authRepository.getLoginUserIdTokenResult();
    // TODO: ドメイン層でビジネスロジックに変える(tokenResultをrepository内でドメインエンティティの一部にしないとかも)
    if (!tokenResult) return false;
    const expirationTime = new Date(tokenResult.expirationTime);
    const now = new Date();
    if (expirationTime > now) return true;
    return false;
  }

  public static newUsecase(authRepository: AuthRepository): CheckAuthUsecase {
    return new checkAuthUsecase(authRepository);
  }
}
