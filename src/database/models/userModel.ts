import { Schema, model, Types } from "mongoose";

interface IUser {
  username: string;
  lastname: string;
  dni: string;
  age: number;
  email: string;
  activities: Types.ObjectId[]; // Array de referències a activitats
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    trim: true, // Elimina los espacios en blanco al principio y al final
    minlength: 1, // El mensaje debe tener al menos 1 carácter
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  dni: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 1,
  },
  age: {
    type: Number,
    required: true,
    min: 1, // Edad minima de 1
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 1,
  },
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Activity", // Referencia a la actividad
    },
  ],
});

export const UserModel = model("User", userSchema);
