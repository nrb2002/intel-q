// proxy.ts

import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type AuthRequest = NextRequest & {
  auth: {
    user?: {
      id?: string;
      role?: string;
    };
  } | null;
};

export const proxy = auth(
  (request: AuthRequest) => {
    if (!request.auth) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    return NextResponse.next();
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};