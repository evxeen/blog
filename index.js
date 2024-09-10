import express from "express";
import multer from "multer";
import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validation.js";

import { checkAuth, handleValidationsErrors } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://jene4ka117:uTXqGZMffBS4jPsc@cluster0.qbvic.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => console.log("DB ok!"))
  .catch((err) => console.log("DB err", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/register",
  registerValidation,
  handleValidationsErrors,
  UserController.register,
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationsErrors,
  UserController.login,
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationsErrors,
  PostController.create,
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationsErrors,
  PostController.update,
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server ok!");
});

// check account?
