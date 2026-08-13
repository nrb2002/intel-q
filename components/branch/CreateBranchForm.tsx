"use client";

import { FormEvent, useState } from "react";

interface CreateBranchFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
  onCancel: () => void;
}

export function CreateBranchForm({
  onSuccess,
  onError,
  onCancel,
}: CreateBranchFormProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onError("");
    setFieldErrors({});

    const errors: Record<string, string> = {};
    if (!name.trim()) {
      errors.name = "Branch name is required.";
    } else if (name.trim().length < 2) {
      errors.name = "Branch name must be at least 2 characters.";
    }
    if (!address.trim()) {
      errors.address = "Address is required.";
    } else if (address.trim().length < 5) {
      errors.address = "Please enter a valid address.";
    }
    if (!city.trim()) {
      errors.city = "City is required.";
    } else if (city.trim().length < 2) {
      errors.city = "Please enter a valid city.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/branches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          address: address.trim(),
          city: city.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          onError("You do not have permission to perform this action.");
        } else {
          onError(data.error || "Unable to create branch. Please try again.");
        }
        return;
      }

      setName("");
      setAddress("");
      setCity("");
      onSuccess();
    } catch {
      onError("Something went wrong while creating the branch.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div className="max-w-xl">
        <div>
          <h2 className="text-lg font-semibold text-[#1E293B]">Add Branch</h2>
          <p className="mt-1 text-sm text-[#64748B]">
            Add a new Intel-Q branch location.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
          <div>
            <label htmlFor="branch-name" className="mb-2 block text-sm font-medium text-[#1E293B]">
              Branch name
            </label>
            <input
              id="branch-name"
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-describedby="branch-name-error"
              aria-invalid={!!fieldErrors.name}
              className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
            />
            <div id="branch-name-error" aria-live="polite" className="mt-1 text-sm text-red-600">
              {fieldErrors.name && <p>{fieldErrors.name}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="branch-address" className="mb-2 block text-sm font-medium text-[#1E293B]">
              Address
            </label>
            <input
              id="branch-address"
              name="address"
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              aria-describedby="branch-address-error"
              aria-invalid={!!fieldErrors.address}
              className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
            />
            <div id="branch-address-error" aria-live="polite" className="mt-1 text-sm text-red-600">
              {fieldErrors.address && <p>{fieldErrors.address}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="branch-city" className="mb-2 block text-sm font-medium text-[#1E293B]">
              City
            </label>
            <input
              id="branch-city"
              name="city"
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              aria-describedby="branch-city-error"
              aria-invalid={!!fieldErrors.city}
              className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
            />
            <div id="branch-city-error" aria-live="polite" className="mt-1 text-sm text-red-600">
              {fieldErrors.city && <p>{fieldErrors.city}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Branch..." : "Add Branch"}
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