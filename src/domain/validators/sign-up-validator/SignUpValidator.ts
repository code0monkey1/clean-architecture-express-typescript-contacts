import { Validation } from "../../interfaces/validators/Validation";
import { SignUpSchema } from "./SignUpValidatorSchema";

export class SignUpValidator implements Validation {
  validate(signUpData: unknown): Error | null {
    try {
      SignUpSchema.parse(signUpData);
      return null;
    } catch (e) {
      return new Error("SignUpSchemaError");
    }
  }
}
