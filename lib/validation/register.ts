import { object, string } from "zod";

// Public registration never accepts a role — everyone signs up as a customer.
// Staff/admin accounts are created through a separate, admin-only action.
export const registerSchema = object({
    firstName: string().min(1, "First name is required").max(64),
    lastName: string().min(1, "Last name is required").max(64),
    email: string().min(1, "Email is required").email("Invalid email"),
    password: string()
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password must be at most 32 characters"),
});
