import { Router } from "express";
import { commentController } from "./comment.controller";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "../../interfaces/userRole";
import { validateRequest } from "../../middlewares/validateRequest";
import { createCommentSchema, updateCommentSchema } from "./comment.validataion";



const router = Router();

router.post(
  "/",
  authGuard(UserRole.USER),
  validateRequest(createCommentSchema),
  commentController.createComment,
);
router.patch(
  "/:id",
  authGuard(UserRole.USER),
  validateRequest(updateCommentSchema),
  commentController.updateComment,
);
router.delete(
  "/:id",
  authGuard(UserRole.USER),
  commentController.deleteComment,
);
router.get(
  "/:id",
  authGuard(UserRole.USER),
  commentController.getMyCommentById,
);
router.get(
  "/",
  authGuard(UserRole.USER),
  commentController.getMyAllComments,
);
export const commentRoutes = router;
