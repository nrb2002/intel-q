"use server";

import { prisma } from "@/lib/prisma";
import { PasswordHasher } from "@/util";
import { registerSchema } from "../validation/register";

export type RegisterState = { error?: string; success?: string } | undefined;

export async function registerUser(
    _prevState: RegisterState,
    formData: FormData
): Promise<RegisterState> {
    try {
        const parsed = registerSchema.safeParse({
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            password: formData.get("password"),
        });

        if (!parsed.success) {
            return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
        }

        const { firstName, lastName, password } = parsed.data;
        const email = parsed.data.email.toLowerCase();

        // Check if account already exists (use the same normalized email we store)
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return { error: "An account with this email already exists." };
        }

        // Hash password using 12 salt rounds
        const hashedPassword = await PasswordHasher.hash(password);

        // Create user record. Role is hardcoded server-side — never trust the
        // client for privilege level. Elevated roles go through an admin action.
        await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: "customer",
            },
        });

        return { success: "Account created successfully!" };
    } catch (error) {
        console.error("registerUser failed:", error);
        return { error: "An unexpected database runtime error occurred." };
    }
}
