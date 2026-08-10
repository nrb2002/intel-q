// app/api/queues/route.ts

import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { QueueStatus } from "@/generated/prisma";

// GET /api/queues
// Returns queue tickets for the authenticated user.
//
// Staff/Admin users can see all tickets.
// Customers can only see their own tickets.

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const isStaff =
      session.user.role === "STAFF" ||
      session.user.role === "ADMIN";

    const tickets = await prisma.queueTicket.findMany({
      where: isStaff
        ? undefined
        : {
            customerId: session.user.id,
          },
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        branch: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedTickets = tickets.map((ticket) => ({
      id: ticket.id,
      ticketNumber: ticket.ticketNumber,
      customerName: `${ticket.customer.firstName} ${ticket.customer.lastName}`,
      branchName: ticket.branch.name,
      serviceType: ticket.serviceType,
      status: ticket.status,
      createdAt: ticket.createdAt.toISOString(),
      calledAt: ticket.calledAt?.toISOString(),
      completedAt: ticket.completedAt?.toISOString(),
    }));

    return NextResponse.json(formattedTickets);
  } catch (error) {
    console.error("GET /api/queues error:", error);

    return NextResponse.json(
      { error: "Failed to fetch queue tickets." },
      { status: 500 }
    );
  }
}

// POST /api/queues
// Creates a queue ticket for the authenticated customer.

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const branchId =
      typeof body.branchId === "string"
        ? body.branchId.trim()
        : "";

    const serviceType =
      typeof body.serviceType === "string"
        ? body.serviceType.trim()
        : "";

    if (!branchId || !serviceType) {
      return NextResponse.json(
        {
          error: "Branch and service type are required.",
        },
        { status: 400 }
      );
    }

    const branch = await prisma.branch.findUnique({
      where: {
        id: branchId,
      },
    });

    if (!branch) {
      return NextResponse.json(
        {
          error: "Branch not found.",
        },
        { status: 404 }
      );
    }

    // Find the highest ticket number currently used
    // by this branch and create the next number.
    const latestTicket = await prisma.queueTicket.findFirst({
      where: {
        branchId,
      },
      orderBy: {
        ticketNumber: "desc",
      },
      select: {
        ticketNumber: true,
      },
    });

    const ticketNumber =
      (latestTicket?.ticketNumber ?? 0) + 1;

    const ticket = await prisma.queueTicket.create({
      data: {
        ticketNumber,
        customerId: session.user.id,
        branchId,
        serviceType,
        status: QueueStatus.WAITING,
      },
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        branch: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        id: ticket.id,
        ticketNumber: ticket.ticketNumber,
        customerName: `${ticket.customer.firstName} ${ticket.customer.lastName}`,
        branchName: ticket.branch.name,
        serviceType: ticket.serviceType,
        status: ticket.status,
        createdAt: ticket.createdAt.toISOString(),
        calledAt: ticket.calledAt?.toISOString(),
        completedAt: ticket.completedAt?.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/queues error:", error);

    return NextResponse.json(
      { error: "Failed to create queue ticket." },
      { status: 500 }
    );
  }
}