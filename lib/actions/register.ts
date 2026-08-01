"use server";

import { prisma } from "@/lib/prisma";
import { PasswordHasher } from "@/util";
import { registerSchema } from "../validation/register";


export async function registerUser(formData: FormData) {
    try {
        const parsed = registerSchema.safeParse({
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            password: formData.get("password"),
            role: formData.get("role"),
        });

        if (!parsed.success) {
            return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
        }

        const { firstName,lastName, password, role } = parsed.data;
        const email = parsed.data.email.toLowerCase();

        // Check if account already exists (use the same normalized email we store)
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return { error: "An account with this email already exists." };
        }

        // Hash password using 12 salt rounds
        const hashedPassword = await PasswordHasher.hash(password);

        // Create user record
        await prisma.user.create({
            data: {
                firstName,
                lastName,
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
