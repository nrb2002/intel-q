"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function RegisterForm() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [createdUserEmail, setCreatedUserEmail] = useState<string | undefined>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(undefined);
        setSuccess(undefined);
        setCreatedUserEmail(undefined);
        setIsSubmitting(true);

        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, password }),
        });

        const data = await response.json();
        setIsSubmitting(false);

        if (!response.ok) {
            setError(data.error ?? "Registration failed. Please try again.");
            return;
        }

        if (data.success) {
            setSuccess(
                data.user?.email
                    ? `Account created successfully for ${data.user.email}!`
                    : data.success
            );
            setCreatedUserEmail(data.user?.email);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setTimeout(() => router.push("/login"), 1200);
            return;
        }

        setError(data.error ?? "Registration failed. Please try again.");
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {success && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {success} Redirecting to login...
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-[#334155]">
                    First name
                    <input
                        required
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
                        placeholder="First name"
                    />
                </label>

                <label className="grid gap-2 text-sm font-medium text-[#334155]">
                    Last name
                    <input
                        required
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
                        placeholder="Last name"
                    />
                </label>
            </div>

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
                    placeholder="Choose a password"
                />
            </label>

            <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:bg-[#93C5FD]"
            >
                {isSubmitting ? "Creating account..." : "Create account"}
            </button>

            <p className="text-center text-sm text-[#64748B]">
                Already registered?{' '}
                <Link href="/login" className="font-semibold text-[#2563EB] hover:text-[#1D4ED8]">
                    Sign in
                </Link>
            </p>
        </form>
    );
}
