import { notFound, redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth-guard";
import { getBranchById } from "@/lib/data/branch";
import { BranchForm } from "@/components/branch/BranchForm";

export default async function EditBranchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const admin = await requireAdmin();
  if (!admin) redirect("/");

  const { id } = await params;
  const branch = await getBranchById(id);
  if (!branch) notFound();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Edit branch</h1>
      <BranchForm
        branch={{
          id: branch.id,
          name: branch.name,
          address: branch.address,
          city: branch.city,
        }}
      />
    </main>
  );
}
