import express from "express";
import { edit, watch } from "../controllers/videoController";

const videoRotuer = express.Router();



videoRotuer.get("/watch", watch)
videoRotuer.get("/edit", edit)

export default videoRotuer;