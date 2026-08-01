"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth-guard";
import {
  createBranchSchema,
  updateBranchSchema,
  branchIdSchema,
} from "@/lib/validation/branch";
import * as branchData from "@/lib/data/branch";
import { Prisma } from "@/src/generated/prisma";

const ADMIN_BRANCHES_PATH = "/admin/branches";
const UNAUTHORIZED = "You must be an administrator to manage branches.";

export type BranchFormState = { error?: string; success?: string } | undefined;

function isUniqueNameViolation(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

export async function createBranchAction(
  _prevState: BranchFormState,
  formData: FormData
): Promise<BranchFormState> {
  const admin = await requireAdmin();
  if (!admin) return { error: UNAUTHORIZED };

  const parsed = createBranchSchema.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    city: formData.get("city"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await branchData.createBranch(parsed.data);
  } catch (error) {
    if (isUniqueNameViolation(error)) {
      return { error: "A branch with this name already exists." };
    }
    return { error: "Failed to create branch. Please try again." };
  }

  revalidatePath(ADMIN_BRANCHES_PATH);
  return { success: "Branch created successfully." };
}

export async function updateBranchAction(
  _prevState: BranchFormState,
  formData: FormData
): Promise<BranchFormState> {
  const admin = await requireAdmin();
  if (!admin) return { error: UNAUTHORIZED };

  const parsed = updateBranchSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    address: formData.get("address"),
    city: formData.get("city"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { id, ...data } = parsed.data;

  try {
    await branchData.updateBranch(id, data);
  } catch (error) {
    if (isUniqueNameViolation(error)) {
      return { error: "A branch with this name already exists." };
    }
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return { error: "That branch no longer exists." };
    }
    return { error: "Failed to update branch. Please try again." };
  }

  revalidatePath(ADMIN_BRANCHES_PATH);
  // redirect() throws NEXT_REDIRECT — must stay outside the try/catch above.
  redirect(ADMIN_BRANCHES_PATH);
}

export async function deleteBranchAction(
  _prevState: BranchFormState,
  formData: FormData
): Promise<BranchFormState> {
  const admin = await requireAdmin();
  if (!admin) return { error: UNAUTHORIZED };

  const parsed = branchIdSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) {
    return { error: "Invalid branch." };
  }

  const { id } = parsed.data;

  // A branch with tickets can't be removed without orphaning queue history.
  const ticketCount = await branchData.countBranchTickets(id);
  if (ticketCount > 0) {
    return {
      error: `Cannot delete a branch with ${ticketCount} associated ticket(s).`,
    };
  }

  try {
    await branchData.deleteBranch(id);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return { error: "That branch no longer exists." };
    }
    return { error: "Failed to delete branch. Please try again." };
  }

  revalidatePath(ADMIN_BRANCHES_PATH);
  return { success: "Branch deleted." };
}
