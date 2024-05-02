import express from "express";
import requireAuth from "../middleware/requireAuth.middleware.js";
import {
  register,
  login,
  logout,
  validateToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/validate", requireAuth, validateToken);

export default router;
