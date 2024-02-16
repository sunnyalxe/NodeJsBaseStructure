import express from "express";
import { authenticate } from "../middleware/jwtAuth.js";
import userController from '../modules/user/userController.js';
const userRoutes = express.Router();

userRoutes.post("/user", authenticate, (req, res, next) => {
  userController.read(req, res, next);
});

userRoutes.post("/userCreate", authenticate, (req, res, next) => {
  userController.create(req, res, next);
});

export default userRoutes;