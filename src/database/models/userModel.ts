import { Schema, model, Types } from "mongoose";

interface IUserModel {
  username: string;
  lastname: string;
  age: number;
  email: string;
  activities?: Types.ObjectId[]; // Array de referencias a actividades
}

const userSchema = new Schema<IUserModel>({
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
    validate: {
      validator: function (v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Valida formato de email
      },
      message: (props: any) => `${props.value} is not a valid email!`,
    },
  },
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],
});

export const UserModel = model<IUserModel>("User", userSchema);
