import express from "express";
const router = express.Router();
import {
  createPost2,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/postControllers";
import { authGuard, adminGuard } from "../middleware/authMiddleware";

router.route("/").post(authGuard, adminGuard, createPost2).get(getAllPosts);

router
  .route("/:slug")
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost)
  .get(getPost);

export default router;
