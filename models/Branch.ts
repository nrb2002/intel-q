import { Schema, model, models, Document } from "mongoose";

export interface IBranch extends Document {
  name: string;
  address: string;
  location?: string;
  numberOfCounters: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BranchSchema = new Schema<IBranch>(
  {
    name: {
      type: String,
      required: [true, "Branch name is required"],
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Branch address is required"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    numberOfCounters: {
      type: Number,
      required: [true, "Number of counters is required"],
      min: [1, "A branch must have at least 1 counter"],
      max: [50, "Number of counters seems unreasonably high"],
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default models.Branch || model<IBranch>("Branch", BranchSchema);