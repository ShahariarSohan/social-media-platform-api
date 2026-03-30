// src/modules/like/like.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { likeService } from "./like.service";
import httpStatus from "http-status";

const toggleLike = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { postId } = req.params;
    const { liked, totalLikes } = await likeService.toggleLike(
      postId,
      req.user.id,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: liked ? "Post liked" : "Post unliked",
      data: { liked, totalLikes },
    });
  },
);

const likePost = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const like = await likeService.likePost(req.params.postId, req.user.id);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Post liked successfully",
      data: like,
    });
  },
);

const unlikePost = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    await likeService.unlikePost(req.params.postId, req.user.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Post unliked successfully",
      data: null,
    });
  },
);

const getMyAllLikes = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const likes = await likeService.getMyAllLikes(req.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All likes retrieved successfully",
    data: likes,
  });
});

const getMyLikesByPost = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const likes = await likeService.getMyLikesByPost(req.params.postId,req.user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Likes for post retrieved successfully",
    data: likes,
  });
});

export const likeController = {
  likePost,
  unlikePost,
  getMyAllLikes,
  getMyLikesByPost,
  toggleLike
};
