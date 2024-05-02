import express from "express";
import requireAuth from "../middleware/requireAuth.middleware.js";
import {
  addBookmark,
  removeBookmark,
  addLike,
  getFilteredPosts,
  getUserBookmarks,
  checkBookmarkStatus,
} from "../controllers/userActivity.controller.js";
const router = express.Router();

router.post("/addBookmark", requireAuth, addBookmark); // Add bookmark

router.post("/removeBookmark", requireAuth, removeBookmark); // Remove bookmark

router.post("/like", requireAuth, addLike); // Add like

router.post("/posts", requireAuth, getFilteredPosts); // Get filtered posts

router.get("/bookmarks", requireAuth, getUserBookmarks); // Get user's bookmarks

router.get("/isBookmarked/:slideId", requireAuth, checkBookmarkStatus); // Check bookmark status( Check if slide is bookmarked by the user )

export default router;
