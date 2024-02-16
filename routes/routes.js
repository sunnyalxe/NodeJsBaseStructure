import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
const allRouter = express.Router();
allRouter.use("/auth",authRoutes);
allRouter.use("/user",userRoutes);
export default allRouter;