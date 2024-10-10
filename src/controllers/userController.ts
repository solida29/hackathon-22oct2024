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
      .lean(); // Devuelve objetos en lugar de documentos Mongoose
    res.status(200).send(users); // Devuelve los usuarios encontrados
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", error });
  }
};

///---- Endpoint to GET user by ID ----------------------
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Obtener el ID de los parámetros de la URL

    // Verificar si el ID es un ObjectId válido
    if (!Types.ObjectId.isValid(id as string)) {
      res.status(400).send({ message: "Invalid ID format" });
    }

    // Buscar usuario por ID, convierte id a ObjectId
    const user = await UserModel.findById(new Types.ObjectId(id))
      .populate({
        path: "activities",
        model: "Activity",
        select: { name: 1, _id: 0 }, // Solo selecciona el campo 'name' de Activity
      })
      .lean();

    if (!user) {
      res.status(404).send({ message: "User not found" });
    }

    // Devolver el usuario encontrado
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", error });
  }
};

//---- Endpoint DELETE user by ID ----------------------
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Obtener el ID de los parámetros de la URL

    // Verificar si el ID es un ObjectId válido
    if (!Types.ObjectId.isValid(id as string)) {
      res.status(400).send({ message: "Invalid ID format" });
    }

    const deletedUser = await UserModel.findByIdAndDelete(id);

    // Si el usuario no se encuentra
    if (!deletedUser) {
      res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: `User deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", error });
  }
};

//---- Endpoint update user by ID (PUT) ----------------------
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, lastname, age, email, activities } = req.body; // Obtener los campos a actualizar

    if (!Types.ObjectId.isValid(id as string)) {
      res.status(400).send({ message: "Invalid ID format" });
    }

    // Convertir las actividades en ObjectId si existen
    const activityIds = activities?.map(
      (activity: string) => new Types.ObjectId(activity)
    );

    // Actualizar el usuario por su ID
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        username,
        lastname,
        age,
        email,
        activities: activityIds, // Asignar las actividades actualizadas
      },
      { new: true, runValidators: true } // `new: true` devuelve el documento actualizado
    ).populate({
      path: "activities",
      model: "Activity",
      select: { name: 1, _id: 0 },
    });

    // Si el usuario no se encuentra
    if (!updatedUser) {
      res.status(404).send({ message: "User not found" });
    }

    // Si la actualización fue exitosa
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", error });
  }
};
