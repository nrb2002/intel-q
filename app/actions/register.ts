"use server";

import { db } from "@/lib/db"; // AWAITING PR
import { PasswordHasher } from "@/util";

// this will be moved to lib/zod folder
import { object, string, enum as zEnum } from "zod";

// Only non-privileged roles may be self-assigned at registration.
const ALLOWED_ROLES = ["staff", "customer", "admin"] as const;

const registerSchema = object({
    name: string().min(1, "Name is required").max(64),
    email: string().min(1, "Email is required").email("Invalid email"),
    password: string()
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    role: zEnum(ALLOWED_ROLES),
});

export async function registerUser(formData: FormData) {
    try {
        const parsed = registerSchema.safeParse({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            role: formData.get("role"),
        });

        if (!parsed.success) {
            return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
        }

        const { name, password, role } = parsed.data;
        const email = parsed.data.email.toLowerCase();

        // Check if account already exists (use the same normalized email we store)
        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            return { error: "An account with this email already exists." };
        }

        // Hash password using 12 salt rounds
        const hashedPassword = await PasswordHasher.hash(password);

        // Create user record
        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });

        return { success: "Account created successfully!" };

    } catch (error) {
        return { error: "An unexpected database runtime error occurred." };
    }
}
