import mongoose, { Schema, model, models, Document } from "mongoose";

export type UserRole = "customer" | "staff" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // never returned by default queries
    },
    role: {
      type: String,
      enum: {
        values: ["customer", "staff", "admin"],
        message: "{VALUE} is not a valid role",
      },
      default: "customer",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, // supports soft-delete/deactivate requirement
    },
  },
  { timestamps: true }
);

// Prevents Next.js hot-reload from redefining the model and throwing
// "Cannot overwrite model once compiled" errors
export default models.User || model<IUser>("User", UserSchema);