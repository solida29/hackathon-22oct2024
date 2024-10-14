import express from "express";
import {
  register,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} from "../controllers/userController.js";
import {
  registerActivity,
  getAllActivities,
  getActivityById,
  deleteActivityById,
  updateActivityById,
} from "../controllers/activityController.js";

export const router = express.Router();

router.post("/appActivities/user", register);
router.get("/appActivities/user", getAllUsers);
router.get("/appActivities/user/:id", getUserById);
router.delete("/appActivities/user/:id", deleteUserById);
router.put("/appActivities/user/:id", updateUserById);

router.post("/appActivities/activity", registerActivity);
router.get("/appActivities/activity", getAllActivities);
router.get("/appActivities/activity/:id", getActivityById);
router.delete("/appActivities/activity/:id", deleteActivityById);
router.put("/appActivities/activity/:id", updateActivityById);
