import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PasswordHasher } from "@/util";
import { registerSchema } from "@/lib/validation/register";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = registerSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0]?.message ?? "Invalid input." },
                { status: 400 }
            );
        }

        const { firstName, lastName, email, password } = parsed.data;
        const normalizedEmail = email.toLowerCase();

        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "An account with this email already exists." },
                { status: 409 }
            );
        }

        const createdUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email: normalizedEmail,
                password: hashedPassword,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
            },
        });

        return NextResponse.json({
            success: "Account created successfully!",
            user: {
                id: createdUser.id,
                firstName: createdUser.firstName,
                lastName: createdUser.lastName,
                email: createdUser.email,
                role: createdUser.role,
            },
        });
    } catch (error) {
        console.error("Registration route error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred while creating your account." },
            { status: 500 }
        );
    }
}
