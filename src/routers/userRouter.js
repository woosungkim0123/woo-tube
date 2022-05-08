import express from "express";
import { edit, remove, see } from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/:id", see);

export default userRouter;
