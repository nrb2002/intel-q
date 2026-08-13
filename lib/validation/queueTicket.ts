import { z } from "zod";

export const ticketStatusEnum = z.enum([
  "waiting",
  "called",
  "completed",
  "cancelled",
]);

export const createTicketSchema = z.object({
  ticketNumber: z.string().min(1),
  customerId: z.string().cuid(),
  branchId: z.string().cuid(),
  serviceType: z.string().min(2),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;

// PATCH /api/queues/:id — every field optional, but at least one must be present.
export const updateTicketSchema = z
  .object({
    serviceType: z.string().min(2).optional(),
    status: ticketStatusEnum.optional(),
    calledAt: z.coerce.date().optional(),
    completedAt: z.coerce.date().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided to update the ticket.",
  });

export type UpdateTicketInput = z.infer<typeof updateTicketSchema>;

// GET /api/queues?branchId=...&status=...&page=1&limit=20
export const listTicketsQuerySchema = z.object({
  branchId: z.string().cuid().optional(),
  customerId: z.string().cuid().optional(),
  status: ticketStatusEnum.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type ListTicketsQuery = z.infer<typeof listTicketsQuerySchema>;