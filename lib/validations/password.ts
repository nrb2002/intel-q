import { object, string } from "zod";

export const changePasswordSchema = object({
  currentPassword: string().min(
    1,
    "Current password is required."
  ),

  newPassword: string()
    .min(
      8,
      "New password must be at least 8 characters."
    )
    .max(
      32,
      "New password must be at most 32 characters."
    ),

  confirmPassword: string().min(
    1,
    "Please confirm your new password."
  ),
})
  .refine(
    (data) =>
      data.newPassword === data.confirmPassword,
    {
      message: "New passwords do not match.",
      path: ["confirmPassword"],
    }
  )
  .refine(
    (data) =>
      data.currentPassword !== data.newPassword,
    {
      message:
        "New password must be different from your current password.",
      path: ["newPassword"],
    }
  );

export type ChangePasswordInput = ReturnType<
  typeof changePasswordSchema.parse
>;