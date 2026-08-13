import { object, string } from "zod";

export const updateProfileSchema = object({
  firstName: string().min(1, "First name is required").max(64),
  lastName: string().min(1, "Last name is required").max(64),
});