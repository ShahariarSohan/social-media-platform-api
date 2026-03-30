import { Router } from "express";
import { commentController } from "./comment.controller";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "../../interfaces/userRole";
import { validateRequest } from "../../middlewares/validateRequest";
import { createCommentSchema } from "./comment.validataion";



const router = Router();

router.post(
  "/",
  authGuard(UserRole.USER, UserRole.ADMIN),
  validateRequest(createCommentSchema),
  commentController.createComment,
);
router.put(
  "/:id",
  authGuard(UserRole.USER, UserRole.ADMIN),
  commentController.updateComment,
);
router.delete(
  "/:id",
  authGuard(UserRole.USER, UserRole.ADMIN),
  commentController.deleteComment,
);
router.get(
  "/:id",
  authGuard(UserRole.USER, UserRole.ADMIN),
  commentController.getCommentById,
);
export const commentRoutes = router;
