// app/dashboard/profile/page.tsx

"use client";

import { useEffect, useState } from "react";

import { AccountInformation } from "@/components/profile/AccountInfo";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";
import { ProfileActions } from "@/components/profile/ProfileActions";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { UserProfile } from "@/types/user";

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/users/me"
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.error ||
              "Unable to load your profile."
          );
          return;
        }

        setUser(data.user);
      } catch {
        setError(
          "Something went wrong while loading your profile."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleEdit() {
    setEditing(true);
    setChangingPassword(false);
    setError("");
    setSuccess("");
  }

  function handleChangePassword() {
    setChangingPassword(true);
    setEditing(false);
    setError("");
    setSuccess("");
  }

  function handlePasswordChanged() {
    setChangingPassword(false);
    setError("");
    setSuccess(
      "Your password has been changed successfully."
    );
  }

  function handleError(message: string) {
    setError(message);
    setSuccess("");
  }

  function handleProfileUpdated(
    updatedUser: UserProfile
  ) {
    setUser(updatedUser);
    setEditing(false);
    setError("");
    setSuccess(
      "Your profile has been updated successfully."
    );
  }

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-[#64748B]">
            Loading your profile...
          </p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700"
        >
          {error ||
            "Unable to load your profile."}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1E293B]">
          Profile
        </h1>

        <p className="mt-2 text-[#64748B]">
          View and manage your Intel-Q account
          information.
        </p>
      </div>

      {/* Feedback */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {success}
        </div>
      )}

      {/* Profile Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ProfileCard user={user} />

        <AccountInformation user={user} />
      </div>

      {/* Account Actions */}
      <ProfileActions
        editing={editing}
        changingPassword={changingPassword}
        onEdit={handleEdit}
        onChangePassword={handleChangePassword}
      />

      {/* Change Password */}
      {changingPassword && (
        <ChangePasswordForm
          onSuccess={handlePasswordChanged}
          onError={handleError}
          onCancel={() =>
            setChangingPassword(false)
          }
        />
      )}
    </section>
  );
}