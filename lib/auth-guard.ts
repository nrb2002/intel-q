import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/**
 * Returns the currently authenticated user (fresh from the database), or null.
 * The session only carries the user id, so role/permissions are read from the
 * source of truth rather than trusted from the token.
 */
export async function getCurrentUser() {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) return null;

  return prisma.user.findUnique({ where: { id } });
}

/**
 * Returns the current user only if they are an administrator, otherwise null.
 * Callers decide how to react (server actions return an error, pages redirect).
 */
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return null;
  return user;
}
