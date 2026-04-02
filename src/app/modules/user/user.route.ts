
import { Router } from "express";
import { userController } from "./user.controller";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "../../interfaces/userRole";

const router = Router();

router.get("/", authGuard(UserRole.USER, UserRole.ADMIN), userController.getAllUsers);
router.get("/:id", authGuard(UserRole.USER, UserRole.ADMIN), userController.getUserById);

export const userRoutes = router;
