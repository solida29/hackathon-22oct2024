import express from "express";
import { register, getAllUsers } from "../controllers/userController.js";
import {
  registerActivity,
  getAllActivities,
} from "../controllers/activityController.js";

export const router = express.Router();

router.post("/appActivities/user", register);
router.get("/appActivities/user", getAllUsers);

router.post("/appActivities/activity", registerActivity);
router.get("/appActivities/activity", getAllActivities);
