// src/modules/like/like.route.ts
import { Router } from "express";
import { likeController } from "./like.controller";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "../../interfaces/userRole";

const router = Router();
router.post(
  "/toggle/:postId",
  authGuard(UserRole.USER),
  likeController.toggleLike,
);
router.post(
  "/like/:postId",
  authGuard(UserRole.USER),
  likeController.likePost,
);
router.delete(
  "/unlike/:postId",
  authGuard(UserRole.USER),
  likeController.unlikePost,
);
router.get("/",authGuard(UserRole.USER), likeController.getMyAllLikes);
router.get("/:postId",authGuard(UserRole.USER), likeController.getMyLikesByPost);

export const likeRoutes = router;
