import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./db/connectDB.js";

import user from "./routes/user.js";
import post from "./routes/post.js";
import url from "./routes/url.js";

dotenv.config();

import { v2 as cloudinary } from "cloudinary";

connectDB();
const app = express();
const port = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Routes
app.use("/api/users", user);
app.use("/api/posts", post);
app.use("/api/urls", url);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
