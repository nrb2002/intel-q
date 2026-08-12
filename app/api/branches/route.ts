// app/api/branches/route.ts

import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// GET /api/branches
// Returns all branches for authenticated users.

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const branches = await prisma.branch.findMany({
      orderBy: [
        {
          name: "asc",
        },
        {
          city: "asc",
        },
      ],
      include: {
        _count: {
          select: {
            queueTickets: true,
          },
        },
      },
    });

    return NextResponse.json(
      branches.map((branch) => ({
        id: branch.id,
        name: branch.name,
        address: branch.address,
        city: branch.city,
        queueTicketCount: branch._count.queueTickets,
        createdAt: branch.createdAt.toISOString(),
        updatedAt: branch.updatedAt.toISOString(),
      })),
    );
  } catch (error) {
    console.error("GET /api/branches error:", error);

    return NextResponse.json({ error: "Failed to fetch branches." }, { status: 500 });
  }
}

// POST /api/branches
// Creates a new branch.
// STAFF and ADMIN only.

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isStaff = session.user.role === "STAFF" || session.user.role === "ADMIN";

    if (!isStaff) {
      return NextResponse.json(
        {
          error: "Only staff members can create branches.",
        },
        { status: 403 },
      );
    }

    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";

    const address = typeof body.address === "string" ? body.address.trim() : "";

    const city = typeof body.city === "string" ? body.city.trim() : "";

    if (!name || !address || !city) {
      return NextResponse.json(
        {
          error: "Branch name, address, and city are required.",
        },
        { status: 400 },
      );
    }

    const branch = await prisma.branch.create({
      data: {
        name,
        address,
        city,
      },
    });

    return NextResponse.json(
      {
        id: branch.id,
        name: branch.name,
        address: branch.address,
        city: branch.city,
        queueTicketCount: 0,
        createdAt: branch.createdAt.toISOString(),
        updatedAt: branch.updatedAt.toISOString(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/branches error:", error);

    return NextResponse.json({ error: "Failed to create branch." }, { status: 500 });
  }
}
