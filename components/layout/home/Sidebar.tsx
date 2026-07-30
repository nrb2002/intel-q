"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Clock3,
  Home,
  Settings,
  UserRound,
  Users,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Queue",
    href: "/dashboard/queue",
    icon: Clock3,
  },
  {
    label: "Branches",
    href: "/dashboard/branches",
    icon: Building2,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
];

const managementItems = [
  {
    label: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#E2E8F0] bg-white transition-transform duration-200 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-[#E2E8F0] px-6">
          <Link
            href="/dashboard"
            className="text-xl font-bold text-[#2563EB]"
            onClick={onClose}
          >
            Intel-Q
          </Link>

          <button
            type="button"
            aria-label="Close sidebar"
            className="rounded-md p-2 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B] lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6 overflow-y-auto p-4">
          {/* Main Navigation */}
          <div>
            <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wide text-[#64748B]">
              Main
            </p>

            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-[#EFF6FF] text-[#2563EB]"
                        : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#1E293B]"
                    )}
                  >
                    <Icon
                      className="h-5 w-5 shrink-0"
                      aria-hidden="true"
                    />

                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Management Navigation */}
          <div>
            <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wide text-[#64748B]">
              Management
            </p>

            <div className="space-y-1">
              {managementItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-[#EFF6FF] text-[#2563EB]"
                        : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#1E293B]"
                    )}
                  >
                    <Icon
                      className="h-5 w-5 shrink-0"
                      aria-hidden="true"
                    />

                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-[#E2E8F0] p-4">
          <p className="text-xs text-[#64748B]">
            Intel-Q Queue Management
          </p>

          <p className="mt-1 text-xs text-[#94A3B8]">
            Intelligent queue management for modern service organizations.
          </p>
        </div>
      </aside>
    </>
  );
}