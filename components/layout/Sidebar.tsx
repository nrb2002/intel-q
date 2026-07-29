import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="flex flex-col p-4 space-y-2">
        <Link href="/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>

        <Link href="/queue" className="hover:text-blue-600">
          Queue
        </Link>

        <Link href="/branches" className="hover:text-blue-600">
          Branches
        </Link>

        <Link href="/profile" className="hover:text-blue-600">
          Profile
        </Link>
      </nav>
    </aside>
  );
}