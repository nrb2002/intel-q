"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Queue",
    href: "/dashboard/queue",
  },
  {
    name: "Branches",
    href: "/dashboard/branches",
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
  },
];


export default function Sidebar() {
  const pathname = usePathname();


  return (
    <aside
      className="
        w-64
        min-h-screen
        border-r
        border-[#E2E8F0]
        bg-white
        p-6
      "
    >

      {/* Logo */}
      <div>
        <h2
          className="
            text-xl
            font-bold
            text-[#2563EB]
          "
        >
          Intel-Q
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-[#64748B]
          "
        >
          Queue Management
        </p>
      </div>


      {/* Navigation */}
      <nav
        className="
          mt-8
          flex
          flex-col
          gap-2
        "
      >

        {navigation.map((item) => {

          const isActive =
            pathname === item.href;


          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                rounded-lg
                px-4
                py-3
                text-sm
                font-medium
                transition

                ${
                  isActive
                    ? "bg-[#2563EB] text-white"
                    : "text-[#1E293B] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
                }
              `}
            >
              {item.name}
            </Link>
          );

        })}

      </nav>

    </aside>
  );
}