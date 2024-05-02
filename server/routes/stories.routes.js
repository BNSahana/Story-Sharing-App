import express from "express";
import requireAuth from "../middleware/requireAuth.middleware.js";
import {
  getAllPosts,
  getPostDetails,
  createPost,
  editPost,
  getPostsByCategory,
  deletePost,
} from "../controllers/stories.controller.js";

const router = express.Router();

router.get("/posts", getAllPosts);

router.get("/postDetails/:id", getPostDetails);

router.post("/add", requireAuth, createPost);

router.put("/edit/:id", requireAuth, editPost);

router.get("/:category", getPostsByCategory);

router.delete("/deleteposts/:id", requireAuth, deletePost);

export default router;
