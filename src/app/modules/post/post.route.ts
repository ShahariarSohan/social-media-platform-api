// src/modules/post/post.route.ts
import { Router } from "express";
import { postController } from "./post.controller";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "../../interfaces/userRole";
import { validateRequest } from "../../middlewares/validateRequest";
import { createPostSchema, updatePostSchema } from "./post.validataion";


const router = Router();

router.post(
  "/",
  authGuard(UserRole.USER, UserRole.ADMIN),
  validateRequest(createPostSchema),
  postController.createPost,
);

router.patch(
  "/:id",
  authGuard(UserRole.USER, UserRole.ADMIN),
  validateRequest(updatePostSchema),
  postController.updatePost,
);

router.delete(
  "/:id",
  authGuard(UserRole.USER, UserRole.ADMIN),
  postController.deletePost,
);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);

export const postRoutes = router;
