import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export type TicketStatus = "waiting" | "called" | "completed" | "cancelled";

export interface IQueueTicket extends Document {
  ticketNumber: string;
  customerId: Types.ObjectId;
  branch: Types.ObjectId;
  serviceType: string;
  status: TicketStatus;
  calledAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const QueueTicketSchema = new Schema<IQueueTicket>(
  {
    ticketNumber: {
      type: String,
      required: [true, "Ticket number is required"],
      unique: true,
      trim: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A ticket must belong to a customer"],
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, "A ticket must be linked to a branch"],
    },
    serviceType: {
      type: String,
      required: [true, "Service type is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["waiting", "called", "completed", "cancelled"],
        message: "{VALUE} is not a valid ticket status",
      },
      default: "waiting",
      required: true,
    },
    calledAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Speeds up the most common query: "give me the live queue for branch X"
QueueTicketSchema.index({ branch: 1, status: 1, createdAt: 1 });

export default models.QueueTicket ||
  model<IQueueTicket>("QueueTicket", QueueTicketSchema);