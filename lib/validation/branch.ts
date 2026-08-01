import { z } from "zod";

export const createBranchSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  address: z.string().trim().min(5, "Address must be at least 5 characters"),
  city: z.string().trim().min(2, "City must be at least 2 characters"),
});

export const updateBranchSchema = createBranchSchema.extend({
  id: z.string().min(1, "Branch id is required"),
});

export const branchIdSchema = z.object({
  id: z.string().min(1, "Branch id is required"),
});

export type CreateBranchInput = z.infer<typeof createBranchSchema>;
export type UpdateBranchInput = z.infer<typeof updateBranchSchema>;
