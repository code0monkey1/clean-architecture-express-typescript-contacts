import { Validation } from "../interfaces/validators/Validation";

export class SignUpValidator implements Validation {
  validate(): Promise<Error | null> {
    throw new Error("Method not implemented.");
  }
}
