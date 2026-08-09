import { QueueTicketCard } from "./QueueTicketCard";

type QueueStatus =
  | "WAITING"
  | "IN_SERVICE"
  | "COMPLETED"
  | "CANCELLED";


export interface QueueTicket {
  id: string;
  ticketNumber: number;
  customerName?: string;
  branchName: string;
  serviceType: string;
  status: QueueStatus;
  createdAt: string;
  calledAt?: string;
}


interface QueueListProps {
  tickets: QueueTicket[];
  emptyMessage?: string;
}


export function QueueList({
  tickets,
  emptyMessage = "No queue tickets available.",
}: QueueListProps) {

  if (tickets.length === 0) {
    return (
      <div
        className="
          rounded-lg
          border
          border-dashed
          border-[#CBD5E1]
          p-8
          text-center
          text-[#64748B]
        "
      >
        {emptyMessage}
      </div>
    );
  }


  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >

      {tickets.map((ticket) => (

        <QueueTicketCard
          key={ticket.id}
          ticketNumber={ticket.ticketNumber}
          customerName={ticket.customerName}
          branchName={ticket.branchName}
          serviceType={ticket.serviceType}
          status={ticket.status}
          createdAt={ticket.createdAt}
          calledAt={ticket.calledAt}
        />

      ))}

    </div>
  );
}