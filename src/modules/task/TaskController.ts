/// <reference path="../../types/express.d.ts" />

import { Request, Response } from "express";
import Task from "./TaskEntity";

class TaskController {
  /**
   * @swagger
   * /api/tasks:
   *   post:
   *     summary: Add a new task
   *     tags: [Tasks]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 description: Title of the task
   *               description:
   *                 type: string
   *                 description: Description of the task
   *     responses:
   *       201:
   *         description: Task created successfully
   *       500:
   *         description: Internal server error
   */
  public static async addTask(req: Request, res: Response) {
    const { title, description } = req.body;
    const userId = req.user?.id; // Extract user ID from the authenticated user

    try {
      const newTask = await Task.create({ title, description, userId });
      res
        .status(201)
        .json({ message: "Task created successfully", task: newTask });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  /**
   * @swagger
   * /api/tasks:
   *   get:
   *     summary: Get all tasks for the authenticated user
   *     tags: [Tasks]
   *     responses:
   *       200:
   *         description: List of tasks
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   title:
   *                     type: string
   *                   description:
   *                     type: string
   *                   userId:
   *                     type: integer
   *       500:
   *         description: Internal server error
   */
  public static async getTasks(req: Request, res: Response) {
    const userId = req.user?.id;

    try {
      const tasks = await Task.findAll({ where: { userId } });
      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  /**
   * @swagger
   * /api/tasks/{id}:
   *   delete:
   *     summary: Delete a task by ID
   *     tags: [Tasks]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID of the task to delete
   *     responses:
   *       200:
   *         description: Task deleted successfully
   *       404:
   *         description: Task not found
   *       500:
   *         description: Internal server error
   */
  public static async deleteTask(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;

    try {
      const task = await Task.findOne({ where: { id, userId } });
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      await task.destroy();
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
}

export default TaskController;
