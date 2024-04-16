import express from "express";

import {
  signupUser,
  loginUser,
  logoutUser,
  getUserById,
  getBookmarks,
  getHistory,
  updateUserHistory,
} from "../controllers/user.js";

const router = express.Router();

router.get("/profile/:id", getUserById);
router.get("/bookmarks", getBookmarks);
router.get("/history", getHistory);

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.put("/history", updateUserHistory);

export default router;
