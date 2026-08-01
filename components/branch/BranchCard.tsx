"use client";

import Link from "next/link";
import { useActionState } from "react";

import {
  deleteBranchAction,
  type BranchFormState,
} from "@/lib/actions/branch";

export type BranchCardData = {
  id: string;
  name: string;
  address: string;
  city: string;
};

export function BranchCard({ branch }: { branch: BranchCardData }) {
  const [state, formAction, isPending] = useActionState<
    BranchFormState,
    FormData
  >(deleteBranchAction, undefined);

  return (
    <li className="flex flex-col gap-2 rounded border p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{branch.name}</h3>
          <p className="text-sm text-gray-600">
            {branch.address}, {branch.city}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/admin/branches/${branch.id}/edit`}
            className="text-sm underline"
          >
            Edit
          </Link>
          <form action={formAction}>
            <input type="hidden" name="id" value={branch.id} />
            <button
              type="submit"
              disabled={isPending}
              className="text-sm text-red-600 underline disabled:opacity-50"
            >
              {isPending ? "Deleting…" : "Delete"}
            </button>
          </form>
        </div>
      </div>

      {state?.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
    </li>
  );
}
