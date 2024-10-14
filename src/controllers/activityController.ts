import { Request, Response } from "express";
import { ActivityModel } from "../database/models/activityModel.js";
import { Types } from "mongoose";

//----- Create Activity in mongoDB ---------------
async function createActivity(
  name: string,
  description: string,
  capacity: number,
  users?: string[]
) {
  // Convertir les chaînes de caractères en ObjectId
  const userIds = users?.map((user) => new Types.ObjectId(user));

  const newActivity = await ActivityModel.create({
    name,
    description,
    capacity,
    users: userIds,
  });
  return newActivity;
}

//---- Endpoint for registerActivity (POST) ----------------------
export const registerActivity = async (req: Request, res: Response) => {
  try {
    const { name, description, capacity, users } = req.body;

    const existingActivity = await ActivityModel.findOne({ name });

    if (!existingActivity) {
      const newActivity = await createActivity(
        name,
        description,
        capacity,
        users
      );
      console.log(`Activity ${newActivity.name} has been created successfully`);

      res.status(201).send({
        ok: true,
        message: `Activity ${newActivity.name} has been created successfully`,
        activity: newActivity,
      });
      return;
    } else {
      res.status(400).send({ message: "This activity already exists" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while processing your request" });
  }
};

//---- Endpoint to GET all activities ----------------------
export const getAllActivities = async (req: Request, res: Response) => {
  try {
    const activities = await ActivityModel.find({})
      .populate({
        path: "users",
        model: "User",
        select: { username: 1, lastname: 1, _id: 0 },
      })
      .lean(); // Devuelve objetos en lugar de documentos Mongoose
    res.status(200).send(activities); // Devolver las actividades encontradas
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", error });
  }
};

//---- Endpoint to GET activity by ID ----------------------
export const getActivityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Obtener el ID de los parámetros de la URL

    // Verificar si el ID es un ObjectId válido
    if (!Types.ObjectId.isValid(id as string)) {
      res.status(400).send({ message: "Invalid ID format" });
    }

    // Buscar usuario por ID, convierte id a ObjectId
    const activity = await ActivityModel.findById(new Types.ObjectId(id))
      .populate({
        path: "users",
        model: "User",
        select: { username: 1, lastname: 1, _id: 0 },
      })
      .lean();

    if (!activity) {
      res.status(404).send({ message: "Activity not found" });
    }

    // Devolver el usuario encontrado
    res.status(200).send(activity);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", error });
  }
};

//---- Endpoint DELETE activity by ID ----------------------
export const deleteActivityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verificar si el ID es un ObjectId válido
    if (!Types.ObjectId.isValid(id as string)) {
      res.status(400).send({ message: "Invalid ID format" });
    }

    const deletedActivity = await ActivityModel.findByIdAndDelete(id);

    // Si el usuario no se encuentra
    if (!deletedActivity) {
      res.status(404).send({ message: "Activity not found" });
    }

    res.status(200).send({ message: `Activity deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", error });
  }
};

//---- Endpoint update activity by ID (PUT) ----------------------
export const updateActivityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, capacity, users } = req.body; // Obtener los campos a actualizar

    if (!Types.ObjectId.isValid(id as string)) {
      res.status(400).send({ message: "Invalid ID format" });
    }

    // Convertir las actividades en ObjectId si existen
    const userIds = users?.map((user: string) => new Types.ObjectId(user));

    // Actualizar el usuario por su ID
    const updatedActivity = await ActivityModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        capacity,
        users: userIds,
      },
      { new: true, runValidators: true }
      // new: true devuelve el documento actualizado
      // runValidators: true para las validaciones del esquema de Mongoose
    ).populate({
      path: "users",
      model: "User",
      select: { username: 1, lastname: 1, _id: 1 },
    });

    // Si el usuario no se encuentra
    if (!updatedActivity) {
      res.status(404).send({ message: "Activity not found" });
    }

    // Si la actualización fue exitosa
    res.status(200).send(updatedActivity);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", error });
  }
};
