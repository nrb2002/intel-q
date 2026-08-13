// components/profile/ChangePasswordForm.tsx

"use client";

import { FormEvent, useState } from "react";

interface ChangePasswordFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
  onCancel: () => void;
}

export function ChangePasswordForm({
  onSuccess,
  onError,
  onCancel,
}: ChangePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onError("");
    setFieldErrors({});

    const errors: Record<string, string> = {};

    if (!currentPassword) errors.currentPassword = "Current password is required.";
    if (!newPassword) {
      errors.newPassword = "New password is required.";
    } else if (newPassword.length < 8) {
      errors.newPassword = "New password must be at least 8 characters.";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your new password.";
    } else if (newPassword && newPassword !== confirmPassword) {
      errors.confirmPassword = "New passwords do not match.";
    }
    if (
      currentPassword &&
      newPassword &&
      currentPassword === newPassword
    ) {
      errors.newPassword = "New password must be different from your current password.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/users/me/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        onError(data.error || "Unable to change your password.");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onSuccess();
    } catch {
      onError("Something went wrong while changing your password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div className="max-w-xl">
        <div>
          <h2 className="text-lg font-semibold text-[#1E293B]">Change Password</h2>
          <p className="mt-1 text-sm text-[#64748B]">
            Update your password to keep your account secure.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
          <div>
            <label htmlFor="currentPassword" className="mb-2 block text-sm font-medium text-[#1E293B]">
              Current Password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              autoComplete="current-password"
              aria-describedby="currentPassword-error"
              aria-invalid={!!fieldErrors.currentPassword}
              className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
            />
            <div id="currentPassword-error" aria-live="polite" className="mt-1 text-sm text-red-600">
              {fieldErrors.currentPassword && <p>{fieldErrors.currentPassword}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="newPassword" className="mb-2 block text-sm font-medium text-[#1E293B]">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              autoComplete="new-password"
              aria-describedby="newPassword-error"
              aria-invalid={!!fieldErrors.newPassword}
              className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
            />
            <p className="mt-1 text-xs text-[#64748B]">Use at least 8 characters.</p>
            <div id="newPassword-error" aria-live="polite" className="mt-1 text-sm text-red-600">
              {fieldErrors.newPassword && <p>{fieldErrors.newPassword}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[#1E293B]">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              aria-describedby="confirmPassword-error"
              aria-invalid={!!fieldErrors.confirmPassword}
              className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
            />
            <div id="confirmPassword-error" aria-live="polite" className="mt-1 text-sm text-red-600">
              {fieldErrors.confirmPassword && <p>{fieldErrors.confirmPassword}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Changing Password..." : "Change Password"}
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