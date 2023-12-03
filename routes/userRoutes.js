import express from "express";

const router = express.Router();

import {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
  getAllUsers,
  deleteUser,
} from "../controllers/userControllers";

import { adminGuard, authGuard } from "../middleware/authMiddleware";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);
router.put("/updateProfile", authGuard, updateProfile);
router.put("/updateProfilePicture", authGuard, updateProfilePicture);
router.get("/getAllUser", authGuard, adminGuard, getAllUsers);
router.route("/:id").delete(authGuard, adminGuard, deleteUser);

export default router;
