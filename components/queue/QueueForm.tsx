"use client";

import { FormEvent, useEffect, useState } from "react";

type Branch = {
  id: string;
  name: string;
  address: string;
  city: string;
};

type QueueTicket = {
  id: string;
  ticketNumber: number;
  customerName: string;
  branchName: string;
  serviceType: string;
  status: string;
  createdAt: string;
};

const serviceTypes = [
  "Account Opening",
  "Loan Application",
  "Support",
  "Account Enquiry",
];

export function JoinQueueForm() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchId, setBranchId] = useState("");
  const [serviceType, setServiceType] = useState("");

  const [loadingBranches, setLoadingBranches] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    branchId?: string;
    serviceType?: string;
  }>({});

  const [success, setSuccess] = useState("");
  const [ticket, setTicket] = useState<QueueTicket | null>(null);

  useEffect(() => {
    async function loadBranches() {
      try {
        setLoadingBranches(true);

        const response = await fetch("/api/branches");

        if (!response.ok) {
          throw new Error("Failed to load branches");
        }

        const data = await response.json();
        setBranches(data);
      } catch (error) {
        console.error("Failed to load branches:", error);
        setError("Unable to load branches. Please try again.");
      } finally {
        setLoadingBranches(false);
      }
    }

    loadBranches();
  }, []);

  function validateForm() {
    const errors: {
      branchId?: string;
      serviceType?: string;
    } = {};

    if (!branchId) {
      errors.branchId = "Please select a branch.";
    }

    if (!serviceType) {
      errors.serviceType = "Please select a service.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setTicket(null);

    if (!validateForm()) {
      setError("Please correct the highlighted fields.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch("/api/queues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          branchId,
          serviceType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to create your ticket. Please try again.");
        return;
      }

      setTicket(data);
      setSuccess("Your queue ticket has been created successfully.");

      setBranchId("");
      setServiceType("");
      setFieldErrors({});
    } catch (error) {
      console.error("Queue ticket request failed:", error);
      setError("Unable to create your ticket. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#1E293B]">
          Join the Queue
        </h2>

        <p className="mt-1 text-sm text-[#64748B]">
          Select a branch and service to receive your queue ticket.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="mb-5 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
        >
          {success}
        </div>
      )}

      {ticket && (
        <div className="mb-6 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-5">
          <p className="text-sm font-medium text-[#64748B]">
            Your Ticket Number
          </p>

          <p className="mt-1 text-4xl font-bold text-[#1E293B]">
            {ticket.ticketNumber}
          </p>

          <p className="mt-2 text-sm text-[#64748B]">
            {ticket.branchName} · {ticket.serviceType}
          </p>

          <p className="mt-1 text-sm font-medium text-[#64748B]">
            Status: {ticket.status}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label
            htmlFor="branchId"
            className="mb-2 block text-sm font-medium text-[#1E293B]"
          >
            Branch
          </label>

          <select
            id="branchId"
            name="branchId"
            value={branchId}
            onChange={(event) => {
              setBranchId(event.target.value);

              if (fieldErrors.branchId) {
                setFieldErrors((previous) => ({
                  ...previous,
                  branchId: undefined,
                }));
              }
            }}
            disabled={loadingBranches || submitting}
            className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-[#1E293B] focus:border-[#1E293B] focus:outline-none disabled:cursor-not-allowed disabled:bg-[#F1F5F9]"
          >
            <option value="">
              {loadingBranches ? "Loading branches..." : "Select a branch"}
            </option>

            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name} - {branch.city}
              </option>
            ))}
          </select>

          {fieldErrors.branchId && (
            <p className="mt-2 text-sm text-red-600">
              {fieldErrors.branchId}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="serviceType"
            className="mb-2 block text-sm font-medium text-[#1E293B]"
          >
            Service
          </label>

          <select
            id="serviceType"
            name="serviceType"
            value={serviceType}
            onChange={(event) => {
              setServiceType(event.target.value);

              if (fieldErrors.serviceType) {
                setFieldErrors((previous) => ({
                  ...previous,
                  serviceType: undefined,
                }));
              }
            }}
            disabled={submitting}
            className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-[#1E293B] focus:border-[#1E293B] focus:outline-none disabled:cursor-not-allowed disabled:bg-[#F1F5F9]"
          >
            <option value="">Select a service</option>

            {serviceTypes.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>

          {fieldErrors.serviceType && (
            <p className="mt-2 text-sm text-red-600">
              {fieldErrors.serviceType}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting || loadingBranches}
          className="w-full rounded-lg bg-[#1E293B] px-5 py-3 font-medium text-white transition hover:bg-[#334155] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Joining Queue..." : "Join Queue"}
        </button>
      </form>
    </div>
  );
}