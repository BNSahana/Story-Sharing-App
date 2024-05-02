import express from "express";
import { getSlideDetails } from "../controllers/slide.controller.js";

const router = express.Router();

router.get("/slideDetails/:id", getSlideDetails);

export default router;
