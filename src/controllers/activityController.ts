import { Request, Response } from "express";
import { ActivityModel } from "../database/models/activityModel.js";

//----- Create Activity in mongoDB ---------------
async function createActivity(
  name: string,
  description: string,
  capacity: number
) {
  const newActivity = await ActivityModel.create({
    name,
    description,
    capacity,
  });
  return newActivity;
}

//---- Endpoint for registerActivity (POST) ----------------------
export const registerActivity = async (req: Request, res: Response) => {
  try {
    const { name, description, capacity } = req.body;

    const existingActivity = await ActivityModel.findOne({ name });

    if (!existingActivity) {
      const newActivity = await createActivity(name, description, capacity);
      console.log(`Activity ${newActivity.name} has been created successfully`);

      res.status(201).send({
        ok: true,
        message: `Activity ${newActivity.name} has been created successfully`,
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
    const activities = await ActivityModel.find({}).lean();
    res.status(200).send(activities); // Devolver las actividades encontradas
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", error });
  }
};

//---- Endpoint to GET activity by ID ----------------------

//---- Endpoint update activity by ID (PUT) ----------------------

//---- Endpoint DELETE activity by ID ----------------------
