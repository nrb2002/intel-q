// components/profile/ProfileActions.tsx

interface ProfileActionsProps {
  editing: boolean;
  changingPassword: boolean;
  onEdit: () => void;
  onChangePassword: () => void;
}

export function ProfileActions({
  editing,
  changingPassword,
  onEdit,
  onChangePassword,
}: ProfileActionsProps) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-[#1E293B]">
          Account Settings
        </h2>

        <p className="mt-1 text-sm text-[#64748B]">
          Manage your account preferences and security.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onEdit}
          disabled={editing}
          className="rounded-lg border border-[#E2E8F0] px-5 py-2.5 text-sm font-medium text-[#1E293B] transition hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {editing ? "Editing Profile..." : "Edit Profile"}
        </button>

        <button
          type="button"
          onClick={onChangePassword}
          disabled={changingPassword}
          className="rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {changingPassword
            ? "Changing Password..."
            : "Change Password"}
        </button>
      </div>
    </div>
  );
}