import express from "express";
import {
  edit,
  finishGithubLogin,
  getEdit,
  postEdit,
  remove,
  see,
  startGithubLogin,
} from "../controllers/userController";
import { publicOnlyMiddleware } from "../middlewares";
const userRouter = express.Router();

userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;
