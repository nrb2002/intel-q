"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { signInSchema } from "@/lib/validation/signIn";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFieldErrors({});

    const parsed = signInSchema.safeParse({
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    });

    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors as Record<string, string[]>);
      return;
    }

    try {
      setLoading(true);

      const result = await signIn("credentials", {
        email: parsed.data.email,
        password: parsed.data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to sign in. Please try again.");
      setLoading(false);
    }
  }

  const inputClassName =
    "w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#94A3B8] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20";

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#1E293B]">
            Login
          </h1>
          <p className="mt-2 text-sm text-[#64748B]">
            Sign in with your credentials to manage queues.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#1E293B]">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="you@example.com"
              aria-describedby="email-error"
              aria-invalid={!!fieldErrors.email}
              className={inputClassName}
            />
            <div id="email-error" aria-live="polite" className="mt-1 text-sm text-red-600">
              {fieldErrors.email?.map((err) => (
                <p key={err}>{err}</p>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#1E293B]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              placeholder="Enter your password"
              aria-describedby="password-error"
              aria-invalid={!!fieldErrors.password}
              className={inputClassName}
            />
            <div id="password-error" aria-live="polite" className="mt-1 text-sm text-red-600">
              {fieldErrors.password?.map((err) => (
                <p key={err}>{err}</p>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#2563EB] px-4 py-3 font-semibold text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#64748B]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-[#2563EB] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}