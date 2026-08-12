// components/profile/EditProfileForm.tsx

"use client";

import { FormEvent, useState } from "react";

import { UserProfile } from "@/types/user";

interface EditProfileFormProps {
  user: UserProfile;
  onSuccess: (user: UserProfile) => void;
  onError: (message: string) => void;
  onCancel: () => void;
}

export function EditProfileForm({
  user,
  onSuccess,
  onError,
  onCancel,
}: EditProfileFormProps) {
  const [firstName, setFirstName] = useState(
    user.firstName
  );
  const [lastName, setLastName] = useState(
    user.lastName
  );
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim()
    ) {
      onError("Please complete all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        onError(
          data.error ||
            "Unable to update your profile."
        );
        return;
      }

      onSuccess(data.user);
    } catch {
      onError(
        "Something went wrong while updating your profile."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-[#1E293B]">
          Edit Profile
        </h2>

        <p className="mt-1 text-sm text-[#64748B]">
          Update your personal account information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <label
              htmlFor="profile-first-name"
              className="mb-2 block text-sm font-medium text-[#1E293B]"
            >
              First name
            </label>

            <input
              id="profile-first-name"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(event) =>
                setFirstName(event.target.value)
              }
              autoComplete="given-name"
              required
              className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="profile-last-name"
              className="mb-2 block text-sm font-medium text-[#1E293B]"
            >
              Last name
            </label>

            <input
              id="profile-last-name"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(event) =>
                setLastName(event.target.value)
              }
              autoComplete="family-name"
              required
              className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="profile-email"
            className="mb-2 block text-sm font-medium text-[#1E293B]"
          >
            Email address
          </label>

          <input
            id="profile-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            autoComplete="email"
            required
            className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 border-t border-[#E2E8F0] pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-[#E2E8F0] px-5 py-2.5 text-sm font-medium text-[#1E293B] transition hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}