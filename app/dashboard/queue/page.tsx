// app/dashboard/queue/page.tsx

import { JoinQueueForm } from "@/components/queue/QueueForm";
import { QueueList } from "@/components/queue/QueueList";
import type { QueueTicket } from "@/types/queue";

const tickets: QueueTicket[] = [
  {
    id: "Q001",
    ticketNumber: 1,
    customerName: "John Smith",
    branchName: "Main Branch",
    serviceType: "Account Opening",
    status: "WAITING",
    createdAt: "2026-08-10T09:00:00",
  },
  {
    id: "Q002",
    ticketNumber: 2,
    customerName: "Mary Jones",
    branchName: "Main Branch",
    serviceType: "Loan Application",
    status: "IN_SERVICE",
    createdAt: "2026-08-10T09:05:00",
    calledAt: "2026-08-10T09:20:00",
  },
  {
    id: "Q003",
    ticketNumber: 3,
    customerName: "David Brown",
    branchName: "Main Branch",
    serviceType: "Support",
    status: "COMPLETED",
    createdAt: "2026-08-10T08:45:00",
    calledAt: "2026-08-10T09:00:00",
  },
  {
    id: "Q004",
    ticketNumber: 4,
    customerName: "Sarah Wilson",
    branchName: "Main Branch",
    serviceType: "Account Enquiry",
    status: "WAITING",
    createdAt: "2026-08-10T09:15:00",
  },
];

export default function QueuePage() {
  const waitingTickets = tickets.filter((ticket) => ticket.status === "WAITING");

  const inServiceTickets = tickets.filter((ticket) => ticket.status === "IN_SERVICE");

  const completedTickets = tickets.filter((ticket) => ticket.status === "COMPLETED");

  return (
    <section className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#1E293B]">Queue Management</h1>

        <p className="mt-2 text-[#64748B]">
          Monitor customer tickets and manage the current queue.
        </p>
      </div>
      {/* Join Queue */}
      <JoinQueueForm />

      {/* Queue Statistics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-[#64748B]">
            Waiting
          </p>

          <p className="mt-2 text-3xl font-bold text-[#1E293B]">
            {waitingTickets.length}
          </p>

          <p className="mt-1 text-sm text-[#64748B]">
            Customers waiting
          </p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-[#64748B]">
            In Service
          </p>

          <p className="mt-2 text-3xl font-bold text-[#1E293B]">
            {inServiceTickets.length}
          </p>

          <p className="mt-1 text-sm text-[#64748B]">
            Currently being served
          </p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-[#64748B]">
            Completed
          </p>

          <p className="mt-2 text-3xl font-bold text-[#1E293B]">
            {completedTickets.length}
          </p>

          <p className="mt-1 text-sm text-[#64748B]">
            Completed tickets
          </p>
        </div>
      </div>
      
      {/* Queue Statistics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-[#64748B]">Waiting</p>

          <p className="mt-2 text-3xl font-bold text-[#1E293B]">{waitingTickets.length}</p>

          <p className="mt-1 text-sm text-[#64748B]">Customers waiting</p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-[#64748B]">In Service</p>

          <p className="mt-2 text-3xl font-bold text-[#1E293B]">{inServiceTickets.length}</p>

          <p className="mt-1 text-sm text-[#64748B]">Currently being served</p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-[#64748B]">Completed</p>

          <p className="mt-2 text-3xl font-bold text-[#1E293B]">{completedTickets.length}</p>

          <p className="mt-1 text-sm text-[#64748B]">Completed tickets</p>
        </div>
      </div>

      {/* Queue */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#1E293B]">Current Queue</h2>

          <p className="mt-1 text-sm text-[#64748B]">
            View the current customer tickets and their status.
          </p>
        </div>

        <QueueList tickets={tickets} />
      </div>
    </section>
  );
}
