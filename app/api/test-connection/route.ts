import { connectDB } from "@/lib/db";
import { Branch } from "@/models";

export async function GET() {
  await connectDB();

  const testBranch = await Branch.create({
    name: "Test Branch " + Date.now(),
    address: "123 Test Street",
    numberOfCounters: 3,
  });

  const allBranches = await Branch.find();

  return Response.json({
    message: "Created and fetched successfully",
    created: testBranch,
    totalBranches: allBranches.length,
  });
}