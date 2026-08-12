"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type LoginState = { error?: string } | undefined;

export async function loginUser(
    // _prevState: LoginState,
    email: string,
    password: string,
    callbackUrl: string
) {
    try {
        await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl,
        });

    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === "CredentialsSignin") {
                return { error: "Invalid email or password." };
            }
            return { error: "Something went wrong. Please try again." };
        }
        throw error;
    }
}
