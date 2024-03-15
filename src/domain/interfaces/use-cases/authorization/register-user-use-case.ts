import { SignUpUser } from "../../../validators/sign-up-validator/SignUpValidatorSchema";

export interface RegisterUserUseCase {
  execute(userInfo: SignUpUser): Promise<string> | Error;
}
