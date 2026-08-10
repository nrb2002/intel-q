// app/api/users/myAccount/route.ts

import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// GET /api/users/me
// Returns the currently authenticated user's profile.

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            queueTickets: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      queueTicketCount: user._count.queueTickets,
    });
  } catch (error) {
    console.error("GET /api/users/me error:", error);

    return NextResponse.json(
      { error: "Failed to fetch user profile." },
      { status: 500 }
    );
  }
}

// PATCH /api/users/me
// Allows the authenticated user to update their profile.

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const data: {
      firstName?: string;
      lastName?: string;
      email?: string;
    } = {};

    if (typeof body.firstName === "string") {
      const firstName = body.firstName.trim();

      if (!firstName) {
        return NextResponse.json(
          { error: "First name cannot be empty." },
          { status: 400 }
        );
      }

      data.firstName = firstName;
    }

    if (typeof body.lastName === "string") {
      const lastName = body.lastName.trim();

      if (!lastName) {
        return NextResponse.json(
          { error: "Last name cannot be empty." },
          { status: 400 }
        );
      }

      data.lastName = lastName;
    }

    if (typeof body.email === "string") {
      const email = body.email.trim().toLowerCase();

      if (!email) {
        return NextResponse.json(
          { error: "Email cannot be empty." },
          { status: 400 }
        );
      }

      data.email = email;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        {
          error:
            "At least one profile field must be provided.",
        },
        { status: 400 }
      );
    }

    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: data.email,
          NOT: {
            id: session.user.id,
          },
        },
        select: {
          id: true,
        },
      });

      if (existingUser) {
        return NextResponse.json(
          {
            error:
              "An account with this email already exists.",
          },
          { status: 409 }
        );
      }
    }

    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            queueTickets: true,
          },
        },
      },
    });

    return NextResponse.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      queueTicketCount: user._count.queueTickets,
    });
  } catch (error) {
    console.error("PATCH /api/users/me error:", error);

    return NextResponse.json(
      { error: "Failed to update user profile." },
      { status: 500 }
    );
  }
}