import { Schema, model, Types } from "mongoose";

interface IActivityModel {
  name: string;
  description: string;
  capacity: number;
  users?: Types.ObjectId[]; // Array de referencias a users
}

const activitySchema = new Schema<IActivityModel>({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 1, // El mensaje debe tener al menos 1 carácter
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const ActivityModel = model<IActivityModel>("Activity", activitySchema);
