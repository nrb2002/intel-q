// proxy.ts

import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const proxy = auth((request) => {
  if (!request.auth) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};