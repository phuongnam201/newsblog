import express from "express";

const router = express.Router();

import {
  createPostCategory,
  deletePostCategory,
  getAllPostCategories,
  getCategoryById,
  updatePostCategory,
} from "../controllers/postCategoriesControllers";
import { adminGuard, authGuard } from "../middleware/authMiddleware";

router
  .route("/")
  .post(authGuard, adminGuard, createPostCategory)
  .get(getAllPostCategories);

router
  .route("/:postCategoryId")
  .put(authGuard, updatePostCategory)
  .delete(authGuard, adminGuard, deletePostCategory);

router.get("/getCategoryById/:id", getCategoryById);
export default router;
