import { User, Mail, Shield, Calendar } from "lucide-react";

const user = {
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@example.com",
  role: "Customer",
  joined: "July 2026",
};

export default function ProfilePage() {
  return (
    <section className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#1E293B]">
          Profile
        </h1>

        <p className="mt-2 text-[#64748B]">
          View and manage your Intel-Q account information.
        </p>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#EFF6FF]">
              <User
                size={40}
                className="text-[#2563EB]"
              />
            </div>

            <h2 className="mt-4 text-xl font-semibold text-[#1E293B]">
              {user.firstName} {user.lastName}
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              {user.email}
            </p>

            <span
              className="
                mt-4
                inline-flex
                rounded-full
                bg-[#EFF6FF]
                px-3
                py-1
                text-xs
                font-medium
                text-[#2563EB]
              "
            >
              {user.role}
            </span>
          </div>
        </div>

        {/* Account Information */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#1E293B]">
              Account Information
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Your account details.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* First Name */}
              <div>
                <div className="flex items-center gap-2">
                  <User
                    size={18}
                    className="text-[#64748B]"
                  />

                  <p className="text-sm font-medium text-[#64748B]">
                    First Name
                  </p>
                </div>

                <p className="mt-2 text-[#1E293B]">
                  {user.firstName}
                </p>
              </div>

              {/* Last Name */}
              <div>
                <div className="flex items-center gap-2">
                  <User
                    size={18}
                    className="text-[#64748B]"
                  />

                  <p className="text-sm font-medium text-[#64748B]">
                    Last Name
                  </p>
                </div>

                <p className="mt-2 text-[#1E293B]">
                  {user.lastName}
                </p>
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center gap-2">
                  <Mail
                    size={18}
                    className="text-[#64748B]"
                  />

                  <p className="text-sm font-medium text-[#64748B]">
                    Email Address
                  </p>
                </div>

                <p className="mt-2 break-all text-[#1E293B]">
                  {user.email}
                </p>
              </div>

              {/* Role */}
              <div>
                <div className="flex items-center gap-2">
                  <Shield
                    size={18}
                    className="text-[#64748B]"
                  />

                  <p className="text-sm font-medium text-[#64748B]">
                    Account Role
                  </p>
                </div>

                <p className="mt-2 text-[#1E293B]">
                  {user.role}
                </p>
              </div>

              {/* Joined */}
              <div>
                <div className="flex items-center gap-2">
                  <Calendar
                    size={18}
                    className="text-[#64748B]"
                  />

                  <p className="text-sm font-medium text-[#64748B]">
                    Member Since
                  </p>
                </div>

                <p className="mt-2 text-[#1E293B]">
                  {user.joined}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#1E293B]">
          Account Settings
        </h2>

        <p className="mt-1 text-sm text-[#64748B]">
          Manage your account preferences and security.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="
              rounded-lg
              border
              border-[#E2E8F0]
              px-5
              py-2.5
              text-sm
              font-medium
              text-[#1E293B]
              transition
              hover:bg-[#F8FAFC]
            "
          >
            Edit Profile
          </button>

          <button
            type="button"
            className="
              rounded-lg
              bg-[#2563EB]
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#1D4ED8]
            "
          >
            Change Password
          </button>
        </div>
      </div>
    </section>
  );
}