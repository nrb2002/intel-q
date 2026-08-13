import { z } from "zod";

export const createTicketSchema = z.object({
  ticketNumber: z.coerce.number().int().positive(),
  customerId: z.string().cuid(),
  branchId: z.string().cuid(),
  serviceType: z.string().min(2),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;