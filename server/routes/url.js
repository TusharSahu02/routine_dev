import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { imagePreView } from "../controllers/url.js";

const router = express.Router();

router.post("/image-preview", protectRoute, imagePreView);

export default router;
