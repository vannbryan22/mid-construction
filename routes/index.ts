import * as express from "express";
import homeRoutes from "@routes/home";
import userRoutes from "@routes/user";
import taskRoutes from "@routes/task";
import { authenticateToken } from "@/middlewares/authMiddleware";
import { getTasks } from "@/controllers/taskController";

export const register = (app: express.Application) => {
  app.use("/", homeRoutes);
  app.use("/user", userRoutes);
  app.use("/task", taskRoutes);
  app.get("/tasks", authenticateToken, getTasks);
};
