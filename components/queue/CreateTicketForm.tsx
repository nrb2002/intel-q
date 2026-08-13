"use client";

import { FormEvent, useState } from "react";

interface Branch {
  id: string;
  name: string;
}

interface CreateTicketFormProps {
  branches: Branch[];
  onSuccess: () => void;
  onError: (message: string) => void;
  onCancel: () => void;
}

export function CreateTicketForm({
  branches,
  onSuccess,
  onError,
  onCancel,
}: CreateTicketFormProps) {
  const [branchId, setBranchId] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onError("");
    setFieldErrors({});

    const errors: Record<string, string> = {};
    if (!branchId) errors.branchId = "Please select a branch.";
    if (!serviceType.trim()) {
      errors.serviceType = "Please describe the service you need.";
    } else if (serviceType.trim().length < 2) {
      errors.serviceType = "Please provide a bit more detail.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/queues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branchId,
          serviceType: serviceType.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        onError(data.error || "Unable to create your ticket. Please try again.");
        return;
      }

      setBranchId("");
      setServiceType("");
      onSuccess();
    } catch {
      onError("Something went wrong while creating your ticket.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div className="max-w-xl">
        <div>
          <h2 className="text-lg font-semibold text-[#1E293B]">Join a Queue</h2>
          <p className="mt-1 text-sm text-[#64748B]">
            Select a branch and describe what you need help with.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
          <div>
            <label htmlFor="branchId" className="mb-2 block text-sm font-medium text-[#1E293B]">
              Branch
            </label>
            <select
              id="branchId"
              name="branchId"
              value={branchId}
              onChange={(event) => setBranchId(event.target.value)}
              aria-describedby="branchId-error"
              aria-invalid={!!fieldErrors.branchId}
              className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
            >
              <option value="">Select a branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
            <div id="branchId-error" aria-live="polite" className="mt-1 text-sm text-red-600">
              {fieldErrors.branchId && <p>{fieldErrors.branchId}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="serviceType" className="mb-2 block text-sm font-medium text-[#1E293B]">
              Service needed
            </label>
            <input
              id="serviceType"
              name="serviceType"
              type="text"
              value={serviceType}
              onChange={(event) => setServiceType(event.target.value)}
              placeholder="e.g. Deposit, withdrawal, account inquiry"
              aria-describedby="serviceType-error"
              aria-invalid={!!fieldErrors.serviceType}
              className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] placeholder:text-[#94A3B8] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
            />
            <div id="serviceType-error" aria-live="polite" className="mt-1 text-sm text-red-600">
              {fieldErrors.serviceType && <p>{fieldErrors.serviceType}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Joining Queue..." : "Join Queue"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-lg border border-[#E2E8F0] px-5 py-2.5 text-sm font-medium text-[#1E293B] transition hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}