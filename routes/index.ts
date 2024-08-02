import * as express from "express";
import homeRoutes from "@routes/home";
import userRoutes from "@routes/user";

export const register = (app: express.Application) => {
  app.use("/", homeRoutes);
  app.use("/user", userRoutes);
};
