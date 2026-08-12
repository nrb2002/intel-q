"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function getAuthErrorMessage(result: { url?: string | null; error?: string | null } | undefined) {
    if (!result) return undefined;

    if (result.error) {
        if (result.error === "CredentialsSignin") {
            return "Invalid email or password.";
        }
        if (result.error === "Configuration") {
            return "Unable to sign in due to a configuration issue. Please contact support if this persists.";
        }
        return result.error.replace(/([A-Z])/g, " $1").trim();
    }

    const url = result.url;
    if (!url) return undefined;

    if (url.startsWith("/api/auth/error")) {
        const search = url.split("?", 2)[1] ?? "";
        const params = new URLSearchParams(search);
        const authError = params.get("error");

        if (authError === "CredentialsSignin") {
            return "Invalid email or password.";
        }

        if (authError === "Configuration") {
            return "Unable to sign in due to a configuration issue. Please contact support if this persists.";
        }

        return authError ? authError.replace(/([A-Z])/g, " $1").trim() : undefined;
    }

    return undefined;
}

export function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | undefined>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(undefined);
        setIsSubmitting(true);

        const result: any = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl
        } as any);


        setIsSubmitting(false);

        const authError = getAuthErrorMessage(result);
        if (authError) {
            setError(authError);
            return;
        }

        // If NextAuth indicates success, navigate. Some adapters omit `url`,
        // so fall back to the app root when `ok` is true.
        if (result?.ok) {
            const destination = result.url ?? "/";
            router.push(callbackUrl);
            router.refresh();
            // router.push(destination);
            return;
        }

        // If a URL is present and not an auth-error redirect, navigate to it.
        if (result?.url && !result.url.startsWith("/api/auth/error")) {
            router.push(result.url);
            return;
        }

        setError("Invalid email or password.");
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <label className="grid gap-2 text-sm font-medium text-[#334155]">
                Email address
                <input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
                    placeholder="you@example.com"
                />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#334155]">
                Password
                <input
                    required
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
                    placeholder="Enter your password"
                />
            </label>

            <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:bg-[#93C5FD]"
            >
                {isSubmitting ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-center text-sm text-[#64748B]">
                New to Intel-Q?{' '}
                <Link href="/register" className="font-semibold text-[#2563EB] hover:text-[#1D4ED8]">
                    Create an account
                </Link>
            </p>
        </form>
    );
}
