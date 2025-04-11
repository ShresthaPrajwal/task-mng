import { Router } from "express";
import TaskController from "./TaskController";
import authMiddleware from "../../shared/middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, TaskController.addTask); // Add a new task
router.get("/", authMiddleware, TaskController.getTasks); // Get all tasks for the authenticated user
router.delete("/:id", authMiddleware, TaskController.deleteTask); // Delete a task by ID

export default router;
