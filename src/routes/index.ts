import { Application } from "express";
import userRoutes from "../modules/user/UserRoutes";

const setupRoutes = (app: Application) => {
  app.use("/api/users", userRoutes);

  // Other routes can go here
};

export default setupRoutes;
