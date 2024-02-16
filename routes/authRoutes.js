import express from "express";
import { authenticate } from "../middleware/jwtAuth.js";
import authController from "../modules/auth/authController.js";
const authRoutes = express.Router();


authRoutes.post("/login", (req, res, next) => {
  authController.login(req, res, next);
});

authRoutes.post("/get-access-token", (req, res, next) => {
  authController.getAccessToken(req, res, next);
});

authRoutes.post("/refresh-refresh-token", (req, res, next) => {
  authController.refreshRefreshToken(req, res, next);
});

authRoutes.post("/signup", (req, res, next) => {
  authRoutes.signup(req, res, next);
});

authRoutes.post("/forgot_password", (req, res, next) => {
  res.send("Pending")
});

authRoutes.post("/reset_password", authenticate, (req, res, next) => {
  res.send("Pending")
});

export default authRoutes;