import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth-guard";
import { listBranches } from "@/lib/data/branch";
import { BranchForm } from "@/components/branch/BranchForm";
import { BranchList } from "@/components/branch/BranchList";

export default async function AdminBranchesPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/");

  const branches = await listBranches();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 p-6">
      <header>
        <h1 className="text-2xl font-semibold">Branches</h1>
        <p className="text-sm text-gray-600">
          Manage your organization&apos;s service locations.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Add a branch</h2>
        <BranchForm />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Existing branches</h2>
        <BranchList branches={branches} />
      </section>
    </main>
  );
}
