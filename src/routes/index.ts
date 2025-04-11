import { Application } from "express";
import userRoutes from "../modules/user/UserRoutes";
import taskRoutes from "../modules/task/TaskRoutes";

const setupRoutes = (app: Application) => {
  app.use("/api/users", userRoutes); // User routes
  app.use("/api/tasks", taskRoutes); // Task routes
};

export default setupRoutes;
