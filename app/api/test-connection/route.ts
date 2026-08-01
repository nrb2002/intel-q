// app/api/test-connection/route.ts
import { prisma } from "@/lib/prisma";

export async function GET() {
  const testBranch = await prisma.branch.create({
    data: {
      name: `Test Branch ${Date.now()}`,
      address: "123 Test Street",
      city: "Testville",
    },
  });

  const allBranches = await prisma.branch.findMany();

  return Response.json({
    message: "Created and fetched successfully",
    created: testBranch,
    totalBranches: allBranches.length,
  });
}
