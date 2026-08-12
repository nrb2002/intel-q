import Header from "@/components/layout/Header";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
            <Header />
            <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl items-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full rounded-[32px] border border-[#E2E8F0] bg-white px-6 py-10 shadow-sm sm:px-12 sm:py-12">
                    <div className="max-w-xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2563EB]">
                            Create your account
                        </p>
                        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl">
                            Register for Intel-Q
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-[#475569]">
                            Set up your user account to manage queues, tickets, and staff assignments.
                        </p>
                    </div>

                    <div className="mt-10">
                        <RegisterForm />
                    </div>
                </div>
            </main>
        </div>
    );
}
