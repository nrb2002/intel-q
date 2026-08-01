import { BranchCard, type BranchCardData } from "./BranchCard";

export function BranchList({ branches }: { branches: BranchCardData[] }) {
  if (branches.length === 0) {
    return (
      <p className="text-sm text-gray-600">
        No branches yet. Create your first one above.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {branches.map((branch) => (
        <BranchCard key={branch.id} branch={branch} />
      ))}
    </ul>
  );
}
