// app/register/page.tsx

"use client";

import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Create Account | Intel-Q",
  description:
    "Create your Intel-Q account and start managing your queue experience.",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-12">
      <RegisterForm />
    </main>
  );
}