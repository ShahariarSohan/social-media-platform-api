// src/modules/admin/admin.route.ts
import { Router } from "express";
import { adminController } from "./admin.controller";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "../../interfaces/userRole";
import { validateRequest } from "../../middlewares/validateRequest";
import { updateUserRoleSchema } from "./admin.validataion";


const router = Router();
router.get("/posts", adminController.getAllPosts);

// All routes protected for ADMIN only
router.use(authGuard(UserRole.ADMIN));

// Dashboard
router.get("/dashboard", adminController.getDashboardStats);

// Users
router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getUserById);
router.delete("/users/:id", adminController.deleteUser);
router.patch(
  "/users/role/:id",
  validateRequest(updateUserRoleSchema),
  adminController.updateUserRole,
);

// Posts
router.get("/posts/:id", adminController.getPostById);
router.delete("/posts/:id", adminController.deletePost);


// Comments
router.get("/comments", adminController.getAllComments);
router.get("/comments/:id", adminController.getCommentById);
router.delete("/comments/:id", adminController.deleteComment);


// Likes
router.get("/likes", adminController.getAllLikes);
router.get("/likes/:id", adminController.getLikeById);


export const adminRoutes = router;
