import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "./UserService";
import { UserRepository } from "./UserRepository";
import config from "../../config";

// Initialize UserRepository and UserService
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
class UserController {
  /**
   * @swagger
   * /api/users/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 example: "john_doe"
   *               email:
   *                 type: string
   *                 example: "john.doe@example.com"
   *               password:
   *                 type: string
   *                 example: "password123"
   *     responses:
   *       201:
   *         description: User registered successfully
   *       400:
   *         description: Email already in use
   *       500:
   *         description: Internal server error
   */
  public static async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
      const existingUser = await userService.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userService.createUser({
        username,
        email,
        password: hashedPassword,
      });

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     summary: Log in a user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: "john.doe@example.com"
   *               password:
   *                 type: string
   *                 example: "password123"
   *     responses:
   *       200:
   *         description: Login successful
   *       401:
   *         description: Invalid credentials
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await userService.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        config.jwtSecret as string,
        {
          expiresIn: "1h",
          algorithm: "HS256",
        }
      );

      res.cookie("token", token, { httpOnly: true });

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
}

export default UserController;
