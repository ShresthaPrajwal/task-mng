import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token; // Safely access req.cookies.token

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      id: number;
      email: string;
    };
    req.user = decoded; // Attach the user to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
