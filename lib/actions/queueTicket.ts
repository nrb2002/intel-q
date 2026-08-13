"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createTicketSchema } from "@/lib/validation/queueTicket";

export type TicketState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
  success?: string;
} | undefined;

export async function createQueueTicket(
  _prevState: TicketState,
  formData: FormData
): Promise<TicketState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be signed in to do this." };
  }

  const parsed = createTicketSchema.safeParse({
    ticketNumber: formData.get("ticketNumber"),
    customerId: session.user.id,
    branchId: formData.get("branchId"),
    serviceType: formData.get("serviceType"),
  });

  if (!parsed.success) {
    return {
      error: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await prisma.queueTicket.create({ data: parsed.data });
    revalidatePath("/dashboard/queue");
    return { success: "Your queue ticket has been created successfully." };
  } catch (error) {
    console.error("Ticket creation failed:", error);
    return { error: "Unable to create your ticket. Please try again." };
  }
}