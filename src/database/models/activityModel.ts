import { Schema, model, Types } from "mongoose";

interface IActivity {
  name: string;
  description: string;
  capacity: number;
  date: Date;
  participants: Types.ObjectId[]; // Array de referèncias a usuarios
}

const activitySchema = new Schema<IActivity>({
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
  date: {
    type: Date,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Referencia a los usuarios
    },
  ],
});

export const UserModel = model("Activity", activitySchema);
