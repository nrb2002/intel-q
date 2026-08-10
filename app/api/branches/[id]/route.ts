// app/api/branches/[id]/route.ts

import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/branches/[id]

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const branch = await prisma.branch.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            queueTickets: true,
          },
        },
      },
    });

    if (!branch) {
      return NextResponse.json(
        { error: "Branch not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: branch.id,
      name: branch.name,
      address: branch.address,
      city: branch.city,
      queueTicketCount: branch._count.queueTickets,
      createdAt: branch.createdAt.toISOString(),
      updatedAt: branch.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error(
      "GET /api/branches/[id] error:",
      error
    );

    return NextResponse.json(
      { error: "Failed to fetch branch." },
      { status: 500 }
    );
  }
}

// PATCH /api/branches/[id]
// STAFF and ADMIN only.

export async function PATCH(
  request: Request,
  context: RouteContext
) {
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

    if (!isStaff) {
      return NextResponse.json(
        {
          error:
            "Only staff members can update branches.",
        },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    const existingBranch = await prisma.branch.findUnique({
      where: {
        id,
      },
    });

    if (!existingBranch) {
      return NextResponse.json(
        { error: "Branch not found." },
        { status: 404 }
      );
    }

    const body = await request.json();

    const data: {
      name?: string;
      address?: string;
      city?: string;
    } = {};

    if (typeof body.name === "string") {
      const name = body.name.trim();

      if (!name) {
        return NextResponse.json(
          { error: "Branch name cannot be empty." },
          { status: 400 }
        );
      }

      data.name = name;
    }

    if (typeof body.address === "string") {
      const address = body.address.trim();

      if (!address) {
        return NextResponse.json(
          { error: "Branch address cannot be empty." },
          { status: 400 }
        );
      }

      data.address = address;
    }

    if (typeof body.city === "string") {
      const city = body.city.trim();

      if (!city) {
        return NextResponse.json(
          { error: "Branch city cannot be empty." },
          { status: 400 }
        );
      }

      data.city = city;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        {
          error:
            "At least one branch field must be provided.",
        },
        { status: 400 }
      );
    }

    const branch = await prisma.branch.update({
      where: {
        id,
      },
      data,
      include: {
        _count: {
          select: {
            queueTickets: true,
          },
        },
      },
    });

    return NextResponse.json({
      id: branch.id,
      name: branch.name,
      address: branch.address,
      city: branch.city,
      queueTicketCount: branch._count.queueTickets,
      createdAt: branch.createdAt.toISOString(),
      updatedAt: branch.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error(
      "PATCH /api/branches/[id] error:",
      error
    );

    return NextResponse.json(
      { error: "Failed to update branch." },
      { status: 500 }
    );
  }
}

// DELETE /api/branches/[id]
// STAFF and ADMIN only.

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
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

    if (!isStaff) {
      return NextResponse.json(
        {
          error:
            "Only staff members can delete branches.",
        },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    const branch = await prisma.branch.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            queueTickets: true,
          },
        },
      },
    });

    if (!branch) {
      return NextResponse.json(
        { error: "Branch not found." },
        { status: 404 }
      );
    }

    if (branch._count.queueTickets > 0) {
      return NextResponse.json(
        {
          error:
            "This branch cannot be deleted because it has queue tickets.",
        },
        { status: 409 }
      );
    }

    await prisma.branch.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Branch deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE /api/branches/[id] error:",
      error
    );

    return NextResponse.json(
      { error: "Failed to delete branch." },
      { status: 500 }
    );
  }
}