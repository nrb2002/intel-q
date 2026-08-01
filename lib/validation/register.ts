import { object, string, enum as zEnum } from "zod";
const ALLOWED_ROLES = ["staff", "customer", "admin"] as const;


export const registerSchema = object({
    firstName: string().min(1, "FirstName is required").max(64),
    lastName: string().min(1, "LastName is required").max(64),
    email: string().min(1, "Email is required").email("Invalid email"),
    password: string()
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    role: zEnum(ALLOWED_ROLES),
});