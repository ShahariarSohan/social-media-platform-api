import express from "express";
import { UserController } from "./user.controller";
import authGuard from "../../middlewares/authGuard";
import { validateRequest } from "../../middlewares/validateRequest";
import { createOrgAdminSchema, createOrgMemberSchema, updateOrgMemberSchema } from "./user.validation";
import { UserRole } from "../../interfaces/userRole";

const router = express.Router();
router.get(
  "/org-member",
  authGuard(UserRole.ORG_ADMIN),
  UserController.getMyOrgMembers,
);

router.post(
  "/org-admin",
  authGuard(UserRole.PLATFORM_ADMIN),
  validateRequest(createOrgAdminSchema),
  UserController.createOrgAdmin,
);
router.post(
  "/org-member",
  authGuard(UserRole.ORG_ADMIN),
  validateRequest(createOrgMemberSchema),
  UserController.createOrgMember,
);

router.patch(
  "/org-member/:memberId",
  authGuard(UserRole.ORG_ADMIN),
  validateRequest(updateOrgMemberSchema),
  UserController.updateMyOrgMember,
);


router.delete(
  "/org-member/:memberId",
  authGuard(UserRole.ORG_ADMIN),
  UserController.deleteMyOrgMember,
);
export const UserRoutes = router;
