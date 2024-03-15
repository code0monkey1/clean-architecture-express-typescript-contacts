export interface Validation {
  validate(data: unknown): Error | null;
}
