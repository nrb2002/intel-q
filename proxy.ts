//As of Next.js 16, middleware.ts has been renamed to proxy.ts
export { auth as proxy } from "@/auth"

// Run the auth proxy on everything except Next internals, the auth API
// routes, and static assets. Real role-based authorization still belongs
// in server components / server actions via `auth()` — the proxy is only
// an optimistic gate.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}