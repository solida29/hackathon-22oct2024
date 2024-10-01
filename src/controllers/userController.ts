import { Request, Response } from "express";
import { UserModel } from "../database/models/userModel.js";

interface IUser {
  username: string;
  lastname: string;
  age: number;
  email: string;
  activities?: [];
}

interface IActivity {
  name: string;
  description: string;
  capacity: number;
}

// create User in mongoDB
async function createUser(
  username: string,
  lastname: string,
  age: number,
  email: string,
  activities?: []
) {
  const newUser: IUser = await UserModel.create({
    username,
    lastname,
    age,
    email,
    activities,
  });
  return newUser;
}

//---- Endpoint for register ----------------------
export const register = async (req: Request, res: Response) => {
  try {
    const { username, lastname, age, email, activities } = req.body; // desestructuracion del req.body
    const trimmedUsername = username.trim(); // quitamos espacios ppio y final
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser && trimmedUsername !== "") {
      const newUser = await createUser(
        trimmedUsername,
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
