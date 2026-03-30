// src/modules/comment/comment.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { commentService } from "./comment.service";
import httpStatus from "http-status";

const createComment = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const comment = await commentService.createComment(req.body, req.user.id);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Comment created successfully",
      data: comment,
    });
  },
);

const updateComment = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const comment = await commentService.updateComment(
      req.params.id,
      req.user.id,
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Comment updated successfully",
      data: comment,
    });
  },
);

const deleteComment = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    await commentService.deleteComment(req.params.id, req.user.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Comment deleted successfully",
      data: null,
    });
  },
);

const getMyAllComments = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const comments = await commentService.getMyAllComments(req.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All comments retrieved successfully",
    data: comments,
  });
});
const getMyCommentById=catchAsync(async(req:Request & { user?: any },res:Response)=>{
  const comment=await commentService.getMyCommentById(req.params.id,req.user.id)
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Comment retrieved successfully",
    data:comment,
  })
})
export const commentController = {
  createComment,
  updateComment,
  deleteComment,
  getMyAllComments,
  getMyCommentById,
};
