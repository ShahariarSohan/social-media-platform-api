import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { loginZodSchema, registerZodSchema } from "./auth.validation";
import authGuard from "../../middlewares/authGuard";
import { UserRole } from "../../interfaces/userRole";
import { upload } from "../../config/multerCloudinary";

const router = Router();

router.post("/login",validateRequest(loginZodSchema), authController.loginUser);
router.post("/logout", authController.logoutUser);
router.get("/me",authGuard(UserRole.ADMIN,UserRole.USER),authController.getMe);


router.post(
  "/register",
  validateRequest(registerZodSchema),
  authController.registerUser,
);
router.patch(
  "/updateMe",
  authGuard(UserRole.USER),
  upload.single("avatar"),
  authController.updateMe,
);
export const authRoutes = router;