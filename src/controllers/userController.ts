import { Request, Response } from "express";
import { UserModel } from "../database/models/userModel.js";
import { Types } from "mongoose";

//---- Create User in mongoDB ––––––––––––––––––––––––––
async function createUser(
  username: string,
  lastname: string,
  age: number,
  email: string,
  activities?: string[]
) {
  // Convertir les chaînes de caractères en ObjectId
  const activityIds = activities?.map(
    (activity) => new Types.ObjectId(activity)
  );

  const newUser = await UserModel.create({
    username,
    lastname,
    age,
    email,
    activities: activityIds,
  });
  return newUser;
}

//---- Endpoint for register (POST) ----------------------
export const register = async (req: Request, res: Response) => {
  try {
    const { username, lastname, age, email, activities } = req.body; // desestructuracion del req.body
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      const newUser = await createUser(
        username,
        lastname,
        age,
        email,
        activities
      );

      const message = `User ${newUser.username} has been created successfully`;
      console.log(message);

      res.status(201).send({
        ok: true, // operacion solicitada por el cliente realizada con exito
        message: `User ${newUser.username} has been created successfully`,
      });
      return;
    } else {
      res.status(400).send({ message: "This user already exists" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

//---- Endpoint to GET all users ----------------------
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({})
      .populate({
        path: "activities",
        model: "Activity",
        select: { name: 1, _id: 0 }, // Solo selecciona el campo 'name' de Activity
      })
      .lean(); // Devuelve objetos planos en lugar de documentos Mongoose
    res.status(200).send(users); // Devolver los usuarios encontrados
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", error });
  }
};
