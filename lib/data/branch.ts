import { prisma } from "@/lib/prisma";
import type { CreateBranchInput } from "@/lib/validation/branch";

/**
 * Pure database operations for branches / service locations.
 * No auth or validation here — callers (server actions) own that.
 */

export function listBranches() {
  return prisma.branch.findMany({ orderBy: { createdAt: "desc" } });
}

export function getBranchById(id: string) {
  return prisma.branch.findUnique({ where: { id } });
}

export function createBranch(data: CreateBranchInput) {
  return prisma.branch.create({ data });
}

export function updateBranch(id: string, data: CreateBranchInput) {
  return prisma.branch.update({ where: { id }, data });
}

export function deleteBranch(id: string) {
  return prisma.branch.delete({ where: { id } });
}

/** Number of queue tickets referencing a branch (blocks safe deletion). */
export function countBranchTickets(branchId: string) {
  return prisma.queueTicket.count({ where: { branchId } });
}
