import { Auth } from "firebase/auth";
import { AuthRepository, AuthService } from "../domain/auth/auth.entity";
import { authService, SignUpCmd } from "../domain/auth/auth.service";
import { Customer } from "../domain/customer/customer.entity";

export type SignUpUsecaseCmd = {
  password: string;
  values: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    gender: string; //Gender
    birthDate: Date;
    introduction?: string;
  };
};

export interface SignUpUsecase {
  execute(cmd: SignUpUsecaseCmd): Promise<void>;
}

export class signUpUsecase {
  constructor(private readonly authService: AuthService) {}

  async execute(cmd: SignUpUsecaseCmd): Promise<void> {
    const newCustmer = Customer.toDomainModel(
      "",
      cmd.values.firstName,
      cmd.values.lastName,
      cmd.values.username,
      cmd.values.email,
      cmd.values.gender,
      cmd.values.birthDate,
      "",
      cmd.values.introduction
    );
    const serviceCmd = authService.newServiceCmd(newCustmer, cmd.password);
    await this.authService.signUp(serviceCmd);
  }

  public static newUsecase(authService: AuthService): SignUpUsecase {
    return new signUpUsecase(authService);
  }
}
