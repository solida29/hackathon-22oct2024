import { Schema, model } from "mongoose";

interface IActivity {
  name: string;
  description: string;
  capacity: number;
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
});

export const activityModel = model("Activity", activitySchema);
