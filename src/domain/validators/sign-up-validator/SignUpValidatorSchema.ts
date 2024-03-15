import { z } from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(3),
  name: z.string().min(3),
  password: z.string(),
  email: z.string().email(),
});

export type ZUser = z.infer<typeof SignUpSchema>;
