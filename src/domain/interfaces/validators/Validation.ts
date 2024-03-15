export interface Validation {
  validate(): Promise<Error | null>;
}
