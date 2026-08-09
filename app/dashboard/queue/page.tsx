import { QueueList } from "@/components/queue/QueueList";

const tickets = [
  {
    id: "Q001",
    customer: "John Smith",
    service: "Account Opening",
    status: "WAITING",
  },
  {
    id: "Q002",
    customer: "Mary Jones",
    service: "Loan Application",
    status: "IN_SERVICE",
  },
  {
    id: "Q003",
    customer: "David Brown",
    service: "Support",
    status: "COMPLETED",
  },
  {
    id: "Q004",
    customer: "Sarah Wilson",
    service: "Account Enquiry",
    status: "WAITING",
  },
];

export default function QueuePage() {
  const waitingTickets = tickets.filter(
    (ticket) => ticket.status === "WAITING"
  );

  const inServiceTickets = tickets.filter(
    (ticket) => ticket.status === "IN_SERVICE"
  );

  const completedTickets = tickets.filter(
    (ticket) => ticket.status === "COMPLETED"
  );

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#1E293B]">
          Queue Management
        </h2>
        <hr />
      </div>

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

      {/* Queue */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#1E293B]">
            Current Queue
          </h2>

          <p className="mt-1 text-sm text-[#64748B]">
            View the current customer tickets and their status.
          </p>
        </div>

        <QueueList tickets={tickets} />
      </div>
    </section>
  );
}