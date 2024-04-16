import express from "express";
import protectRoute from "../middlewares/protectRoute.js";

import {
  createPost,
  getFeedPosts,
  getMostVoted,
  getPopularPost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.get("/popular", protectRoute, getPopularPost);
router.get("/most-voted", protectRoute, getMostVoted);

router.post("/create", protectRoute, createPost);

export default router;
