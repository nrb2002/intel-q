"use client";

import Link from "next/link";
import { useActionState } from "react";

import {
  createBranchAction,
  updateBranchAction,
  type BranchFormState,
} from "@/lib/actions/branch";

type BranchFormValues = {
  id: string;
  name: string;
  address: string;
  city: string;
};

export function BranchForm({ branch }: { branch?: BranchFormValues }) {
  const isEdit = Boolean(branch);
  const action = isEdit ? updateBranchAction : createBranchAction;

  const [state, formAction, isPending] = useActionState<
    BranchFormState,
    FormData
  >(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md">
      {isEdit && <input type="hidden" name="id" defaultValue={branch!.id} />}

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Branch name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={branch?.name}
          className="rounded border px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-sm font-medium">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          required
          defaultValue={branch?.address}
          className="rounded border px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-sm font-medium">
          City
        </label>
        <input
          id="city"
          name="city"
          type="text"
          required
          defaultValue={branch?.city}
          className="rounded border px-3 py-2"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="text-sm text-green-600" role="status">
          {state.success}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {isPending
            ? "Saving…"
            : isEdit
              ? "Save changes"
              : "Create branch"}
        </button>
        {isEdit && (
          <Link href="/admin/branches" className="text-sm underline">
            Cancel
          </Link>
        )}
      </div>
    </form>
  );
}
