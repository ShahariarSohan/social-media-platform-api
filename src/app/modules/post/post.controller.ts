// src/modules/post/post.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { postService } from "./post.service";
import httpStatus from "http-status";

const createPost = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const post = await postService.createPost(req.body, req.user.id);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Post created successfully",
      data: post,
    });
  },
);

const updatePost = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const post = await postService.updatePost(
      req.params.id,
      req.user.id,
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  },
);

const deletePost = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    await postService.deletePost(req.params.id, req.user.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Post deleted successfully",
      data: null,
    });
  },
);

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const posts = await postService.getAllPosts();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All posts retrieved successfully",
    data: posts,
  });
});

const getPostById = catchAsync(async (req: Request, res: Response) => {
  const post = await postService.getPostById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post retrieved successfully",
    data: post,
  });
});

export const postController = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
};
