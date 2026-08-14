import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(
      255,
      "Email address must be 255 characters or less."
    )
    .transform((value) => value.toLowerCase()),

  password: z
    .string()
    .min(1, "Password is required."),
});

export type SignInInput = z.infer<typeof signInSchema>;