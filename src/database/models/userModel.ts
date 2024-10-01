import { Schema, model } from "mongoose";

interface IUser {
  username: string;
  lastname: string;
  age: number;
  email: string;
  activities?: []; // Array de referències a activitats
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
  activities: [],
});

export const UserModel = model("User", userSchema);
