import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/src/generated/prisma";
import { prisma } from "@/lib/prisma";
import { updateTicketSchema } from "@/lib/validation/queueTicket";

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET /api/queues/:id
export async function GET(_request: NextRequest, { params }: RouteParams) {
    const { id } = await params;

    try {
        const ticket = await prisma.queueTicket.findUnique({
            where: { id },
            include: {
                customer: {
                    select: { id: true, firstName: true, lastName: true, email: true },
                },
                branch: { select: { id: true, name: true, city: true } },
            },
        });

        if (!ticket) {
            return NextResponse.json({ error: "Queue ticket not found" }, { status: 404 });
        }

        return NextResponse.json({ data: ticket });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch queue ticket", message: (error as Error).message },
            { status: 500 }
        );
    }
}

// PATCH /api/queues/:id
// Body: any subset of { serviceType, status, calledAt, completedAt }
export async function PATCH(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = updateTicketSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: "Validation failed", details: parsed.error.flatten() },
            { status: 400 }
        );
    }

    try {
        const ticket = await prisma.queueTicket.update({
            where: { id },
            data: parsed.data,
            include: {
                customer: {
                    select: { id: true, firstName: true, lastName: true, email: true },
                },
                branch: { select: { id: true, name: true, city: true } },
            },
        });

        return NextResponse.json({ data: ticket });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            return NextResponse.json({ error: "Queue ticket not found" }, { status: 404 });
        }

        return NextResponse.json(
            { error: "Failed to update queue ticket", message: (error as Error).message },
            { status: 500 }
        );
    }
}

// DELETE /api/queues/:id
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
    const { id } = await params;

    try {
        await prisma.queueTicket.delete({ where: { id } });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            return NextResponse.json({ error: "Queue ticket not found" }, { status: 404 });
        }

        return NextResponse.json(
            { error: "Failed to delete queue ticket", message: (error as Error).message },
            { status: 500 }
        );
    }
}