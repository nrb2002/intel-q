"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/lib/validation/register";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

    const parsed = registerSchema.safeParse({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    });

    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors as Record<string, string[]>);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFieldErrors({ confirmPassword: ["Passwords do not match."] });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed. Please try again.");
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClassName =
    "w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#94A3B8] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20";

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8FAFC] px-4 py-4">
      <div className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#1E293B]">Register</h1>
          <p className="mt-2 text-sm text-[#64748B]">
            Join Intel-Q and start managing your queue experience.
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-[#1E293B]">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                autoComplete="given-name"
                aria-describedby="firstName-error"
                className={inputClassName}
              />
              <div id="firstName-error" aria-live="polite" className="mt-1 text-sm text-red-600">
                {fieldErrors.firstName?.map((err) => (
                  <p key={err}>{err}</p>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-[#1E293B]">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                autoComplete="family-name"
                aria-describedby="lastName-error"
                className={inputClassName}
              />
              <div id="lastName-error" aria-live="polite" className="mt-1 text-sm text-red-600">
                {fieldErrors.lastName?.map((err) => (
                  <p key={err}>{err}</p>
                ))}
              </div>
            </div>
          </div>

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
              aria-describedby="email-error"
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
              autoComplete="new-password"
              aria-describedby="password-error"
              className={inputClassName}
            />
            <p className="mt-1 text-xs text-[#64748B]">Use at least 8 characters.</p>
            <div id="password-error" aria-live="polite" className="mt-1 text-sm text-red-600">
              {fieldErrors.password?.map((err) => (
                <p key={err}>{err}</p>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[#1E293B]">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              aria-describedby="confirmPassword-error"
              className={inputClassName}
            />
            <div id="confirmPassword-error" aria-live="polite" className="mt-1 text-sm text-red-600">
              {fieldErrors.confirmPassword?.map((err) => (
                <p key={err}>{err}</p>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#2563EB] px-4 py-3 font-semibold text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#64748B]">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#2563EB] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}