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
  authGuard(UserRole.USER),
  validateRequest(createPostSchema),
  postController.createPost,
);

router.patch(
  "/:id",
  authGuard(UserRole.USER),
  validateRequest(updatePostSchema),
  postController.updatePost,
);

router.delete(
  "/:id",
  authGuard(UserRole.USER),
  postController.deletePost,
);
router.get("/",authGuard(UserRole.USER), postController.getMyAllPosts);
router.get("/:id",authGuard(UserRole.USER), postController.getMyPostById);

export const postRoutes = router;
