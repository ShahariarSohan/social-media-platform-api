import { Request, Response } from "express";
import { chatService } from "./chat.service";
import { getIO } from "../../utils/socket";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";

type AuthRequest = Request & { user?: any };

const createConversation = catchAsync(async (req: AuthRequest, res: Response) => {
  const { participantId } = req.body;
  const userId = req.user.id;
  const result = await chatService.createConversation(userId, participantId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Conversation established successfully",
    data: result,
  });
});

const getConversations = catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;
  const result = await chatService.getConversations(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Conversations fetched successfully",
    data: result,
  });
});

const sendMessage = catchAsync(async (req: AuthRequest, res: Response) => {
  const { conversationId, content } = req.body;
  const senderId = req.user.id;
  const result = await chatService.sendMessage(conversationId, senderId, content);
  
  // Real-time broadcast
  const io = getIO();
  io.to(conversationId).emit("new_message", result);
  
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message sent successfully",
    data: result,
  });
});

const getMessages = catchAsync(async (req: AuthRequest, res: Response) => {
  const { conversationId } = req.params;
  const result = await chatService.getMessages(conversationId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Messages fetched successfully",
    data: result,
  });
});

export const chatController = {
  createConversation,
  getConversations,
  sendMessage,
  getMessages,
};
