import express from "express";
import protectRoute from "../middlewares/protectRoute.js";

import {
  createPost,
  getFeedPosts,
  getMostVoted,
  getPopularPost,
  likeUnlike,
  replyToPost,
  bookmarkPost,
  getBookmarks,
  getSearchPosts,
} from "../controllers/post.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.get("/popular", protectRoute, getPopularPost);
router.get("/most-voted", protectRoute, getMostVoted);
router.get("/bookmarks", protectRoute, getBookmarks);
router.get("/search/?q=:query", protectRoute, getSearchPosts);

router.post("/create", protectRoute, createPost);

router.put("/like-unlike/:id", protectRoute, likeUnlike);
router.put("/reply/:id", protectRoute, replyToPost);
router.put("/bookmark/:id", protectRoute, bookmarkPost);

export default router;
