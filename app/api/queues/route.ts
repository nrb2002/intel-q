import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/src/generated/prisma";
import { prisma } from "@/lib/prisma";
import {
    createTicketSchema,
    listTicketsQuerySchema,
} from "@/lib/validation/queueTicket";

// GET /api/queues
// Optional query params: branchId, customerId, status, page (default 1), limit (default 20)
export async function GET(request: NextRequest) {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);

    const parsed = listTicketsQuerySchema.safeParse(searchParams);
    if (!parsed.success) {
        return NextResponse.json(
            { error: "Invalid query parameters", details: parsed.error.flatten() },
            { status: 400 }
        );
    }

    const { branchId, customerId, status, page, limit } = parsed.data;

    const where: Prisma.QueueTicketWhereInput = {
        ...(branchId && { branchId }),
        ...(customerId && { customerId }),
        ...(status && { status }),
    };

    try {
        const [tickets, total] = await Promise.all([
            prisma.queueTicket.findMany({
                where,
                orderBy: { createdAt: "asc" },
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    customer: {
                        select: { id: true, firstName: true, lastName: true, email: true },
                    },
                    branch: { select: { id: true, name: true, city: true } },
                },
            }),
            prisma.queueTicket.count({ where }),
        ]);

        return NextResponse.json({
            data: tickets,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch queue tickets", message: (error as Error).message },
            { status: 500 }
        );
    }
}

// POST /api/queues
// Body: { ticketNumber, customerId, branchId, serviceType }
export async function POST(request: NextRequest) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = createTicketSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: "Validation failed", details: parsed.error.flatten() },
            { status: 400 }
        );
    }

    try {
        const ticket = await prisma.queueTicket.create({
            data: parsed.data,
            include: {
                customer: {
                    select: { id: true, firstName: true, lastName: true, email: true },
                },
                branch: { select: { id: true, name: true, city: true } },
            },
        });

        return NextResponse.json({ data: ticket }, { status: 201 });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Unique constraint (duplicate ticketNumber)
            if (error.code === "P2002") {
                return NextResponse.json(
                    { error: "A ticket with this ticket number already exists" },
                    { status: 409 }
                );
            }
            // Foreign key constraint (customerId or branchId does not exist)
            if (error.code === "P2003") {
                return NextResponse.json(
                    { error: "customerId or branchId does not reference an existing record" },
                    { status: 400 }
                );
            }
        }

        return NextResponse.json(
            { error: "Failed to create queue ticket", message: (error as Error).message },
            { status: 500 }
        );
    }
}