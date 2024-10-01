import express from "express";
import { register } from "../controllers/userController.js";

export const router = express.Router();

router.post("/appActivities/user", register);
