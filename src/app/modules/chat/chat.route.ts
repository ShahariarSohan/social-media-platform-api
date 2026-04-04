import express from "express";
import authGuard from "../../middlewares/authGuard";
import { chatController } from "./chat.controller";

const router = express.Router();

router.post("/conversations", authGuard(), chatController.createConversation);
router.get("/conversations", authGuard(), chatController.getConversations);
router.post("/messages", authGuard(), chatController.sendMessage);
router.get("/messages/:conversationId", authGuard(), chatController.getMessages);

export const chatRoutes = router;
