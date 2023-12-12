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
  getAnUser,
  updateProfilePictureForAnUser,
  updateAnUser,
} from "../controllers/userControllers";

import { adminGuard, authGuard } from "../middleware/authMiddleware";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/", authGuard, userProfile);
router.get("/getAnUser/:id", authGuard, adminGuard, getAnUser);
router.put("/updateProfile", authGuard, updateProfile);
router.put("/updateProfileAnUser/:id", authGuard, adminGuard, updateAnUser);
router.put("/updateProfilePicture", authGuard, updateProfilePicture);
router.put(
  "/updatePictureUser/:id",
  authGuard,
  adminGuard,
  updateProfilePictureForAnUser
);
router.get("/getAllUser", authGuard, adminGuard, getAllUsers);
router.route("/:id").delete(authGuard, adminGuard, deleteUser);

export default router;
