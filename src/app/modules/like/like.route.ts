// src/modules/like/like.route.ts
import { Router } from "express";
import { likeController } from "./like.controller";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "../../interfaces/userRole";

const router = Router();
router.post(
  "/:postId",
  authGuard(UserRole.USER, UserRole.ADMIN),
  likeController.toggleLike,
);
router.post(
  "/:postId",
  authGuard(UserRole.USER, UserRole.ADMIN),
  likeController.likePost,
);
router.delete(
  "/:postId",
  authGuard(UserRole.USER, UserRole.ADMIN),
  likeController.unlikePost,
);
router.get("/", likeController.getAllLikes);
router.get("/:postId", likeController.getLikesByPost);

export const likeRoutes = router;
