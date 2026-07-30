// app/page.tsx

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Clock3,
    title: "Smarter Queue Management",
    description:
      "Create and manage digital queue tickets so customers can wait with less uncertainty and confusion.",
  },
  {
    icon: Users,
    title: "Better Customer Experience",
    description:
      "Give customers visibility into their queue position and help staff deliver faster, more organized service.",
  },
  {
    icon: ShieldCheck,
    title: "Secure and Reliable",
    description:
      "Built with secure authentication, role-based access, and reliable data management for service organizations.",
  },
  {
    icon: Building2,
    title: "Built for Organizations",
    description:
      "Support branches and service locations across banks, hospitals, pharmacies, consulates, and more.",
  },
];

const benefits = [
  "Reduce uncertainty during customer waiting times",
  "Improve visibility into active queues",
  "Help staff manage customer flow efficiently",
  "Create a more organized service experience",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      {/* Navigation */}
      <header className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
            aria-label="Intel-Q home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#2563EB] text-lg font-bold text-white">
              Q
            </div>

            <span className="text-xl font-bold tracking-tight text-[#1E293B]">
              Intel-Q
            </span>
          </Link>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            <Link
              href="#features"
              className="text-sm font-medium text-[#64748B] transition hover:text-[#2563EB]"
            >
              Features
            </Link>

            <Link
              href="#how-it-works"
              className="text-sm font-medium text-[#64748B] transition hover:text-[#2563EB]"
            >
              How It Works
            </Link>

            <Link
              href="#about"
              className="text-sm font-medium text-[#64748B] transition hover:text-[#2563EB]"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-md px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#F8FAFC] hover:text-[#2563EB] sm:inline-flex"
            >
              Log In
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center rounded-md bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-sm font-medium text-[#475569] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
              Smarter service. Better waiting experiences.
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-[#1E293B] sm:text-5xl lg:text-6xl">
              Intelligent queue management for{" "}
              <span className="text-[#2563EB]">modern organizations.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#64748B] sm:text-lg">
              Intel-Q helps organizations manage customer queues with clarity,
              speed, and consistency. Give customers a better waiting
              experience while giving staff the tools they need to manage
              service efficiently.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
              >
                Get Started
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#475569] shadow-sm transition hover:bg-[#F8FAFC] hover:text-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
              >
                Sign In
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#64748B]">
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-[#16A34A]"
                  aria-hidden="true"
                />
                Simple to use
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-[#16A34A]"
                  aria-hidden="true"
                />
                Secure access
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-[#16A34A]"
                  aria-hidden="true"
                />
                Mobile responsive
              </div>
            </div>
          </div>

          {/* Queue Preview */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-[#2563EB]/5 blur-2xl" />

            <div className="relative rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-lg sm:p-6">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-5">
                <div>
                  <p className="text-sm font-medium text-[#64748B]">
                    Current Queue
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-[#1E293B]">
                    Main Branch
                  </h2>
                </div>

                <span className="rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-semibold text-[#92400E]">
                  12 Waiting
                </span>
              </div>

              <div className="space-y-3 py-5">
                <QueuePreviewItem
                  ticket="A-024"
                  service="General Enquiry"
                  status="Waiting"
                  statusClass="bg-[#FEF3C7] text-[#92400E]"
                />

                <QueuePreviewItem
                  ticket="A-025"
                  service="Account Services"
                  status="In Service"
                  statusClass="bg-[#DBEAFE] text-[#1D4ED8]"
                />

                <QueuePreviewItem
                  ticket="A-026"
                  service="Customer Support"
                  status="Waiting"
                  statusClass="bg-[#FEF3C7] text-[#92400E]"
                />

                <QueuePreviewItem
                  ticket="A-027"
                  service="Payments"
                  status="Completed"
                  statusClass="bg-[#DCFCE7] text-[#166534]"
                />
              </div>

              <div className="rounded-lg bg-[#F8FAFC] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#64748B]">
                      Your Position
                    </p>
                    <p className="mt-1 text-2xl font-bold text-[#1E293B]">
                      #3
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-medium uppercase tracking-wide text-[#64748B]">
                      Estimated Wait
                    </p>
                    <p className="mt-1 text-lg font-semibold text-[#2563EB]">
                      15 min
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-y border-[#E2E8F0] bg-white py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2563EB]">
              Built for better service
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1E293B] sm:text-4xl">
              Everything you need to manage queues with confidence.
            </h2>

            <p className="mt-4 text-base leading-7 text-[#64748B]">
              Intel-Q brings customers, staff, and organizations together in
              one simple queue management experience.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-[#1E293B]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#64748B]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="bg-[#F8FAFC] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#2563EB]">
                How it works
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1E293B] sm:text-4xl">
                A simpler way to manage the waiting experience.
              </h2>

              <p className="mt-5 text-base leading-7 text-[#64748B]">
                From joining a queue to completing service, Intel-Q helps
                organizations keep every step organized and visible.
              </p>

              <div className="mt-8 space-y-6">
                <Step
                  number="01"
                  title="Join the queue"
                  description="Customers create a queue ticket and receive a position in the service line."
                />

                <Step
                  number="02"
                  title="Track your position"
                  description="Customers can monitor their place in the queue while staff manage active tickets."
                />

                <Step
                  number="03"
                  title="Serve customers efficiently"
                  description="Staff call customers, update ticket statuses, and complete service with confidence."
                />
              </div>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-xl font-semibold text-[#1E293B]">
                Why organizations choose Intel-Q
              </h3>

              <ul className="mt-6 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#16A34A]"
                      aria-hidden="true"
                    />

                    <span className="text-sm leading-6 text-[#475569]">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-lg bg-[#EFF6FF] p-5">
                <p className="text-sm font-semibold text-[#1D4ED8]">
                  Designed for real-world service environments
                </p>

                <p className="mt-2 text-sm leading-6 text-[#475569]">
                  Whether you operate a bank, hospital, pharmacy, consulate,
                  or other service organization, Intel-Q helps your team
                  deliver a more organized customer experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / CTA */}
      <section id="about" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#2563EB] text-xl font-bold text-white shadow-sm">
            Q
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#1E293B] sm:text-4xl">
            Ready to make waiting simpler?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#64748B]">
            Start using Intel-Q to bring clarity, efficiency, and consistency
            to your organization&apos;s queue management.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
            >
              Create an Account
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md border border-[#E2E8F0] px-6 py-3 text-sm font-semibold text-[#475569] transition hover:bg-[#F8FAFC] hover:text-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="font-bold text-[#1E293B]">Intel-Q</p>
            <p className="mt-1 text-sm text-[#64748B]">
              Intelligent Queue Management for Modern Service Organizations.
            </p>
          </div>

          <p className="text-sm text-[#64748B]">
            © {new Date().getFullYear()} Intel-Q. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

interface QueuePreviewItemProps {
  ticket: string;
  service: string;
  status: string;
  statusClass: string;
}

function QueuePreviewItem({
  ticket,
  service,
  status,
  statusClass,
}: QueuePreviewItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#E2E8F0] p-4">
      <div>
        <p className="font-semibold text-[#1E293B]">{ticket}</p>
        <p className="mt-1 text-xs text-[#64748B]">{service}</p>
      </div>

      <span
        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass}`}
      >
        {status}
      </span>
    </div>
  );
}

interface StepProps {
  number: string;
  title: string;
  description: string;
}

function Step({ number, title, description }: StepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#2563EB] text-xs font-bold text-white">
        {number}
      </div>

      <div>
        <h3 className="font-semibold text-[#1E293B]">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-[#64748B]">
          {description}
        </p>
      </div>
    </div>
  );
}