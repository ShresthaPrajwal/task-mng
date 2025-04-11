import { Router } from "express";
import UserController from "./UserController";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

export default router;
