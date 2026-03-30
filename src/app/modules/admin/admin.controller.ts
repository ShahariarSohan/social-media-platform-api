// src/modules/admin/admin.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { adminStatsService } from "./admin.stats.service";
import { adminUserService } from "./admin.users.service";
import { adminPostService } from "./admin.post.service";
import { adminCommentService } from "./admin.comments.service";
import { adminLikeService } from "./admin.likes.service";


// Dashboard
const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
  const stats = await adminStatsService.getDashboardStats();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard stats retrieved",
    data: stats,
  });
});

// Users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await adminUserService.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved",
    data: users,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const user = await adminUserService.getUserById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved",
    data: user,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await adminUserService.deleteUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted",
    data: null,
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const user = await adminUserService.updateUserRole(
    req.params.id,
    req.body.role,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated",
    data: user,
  });
});

// Posts
const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const posts = await adminPostService.getAllPosts();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posts retrieved",
    data: posts,
  });
});

const getPostById = catchAsync(async (req: Request, res: Response) => {
  const post = await adminPostService.getPostById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post retrieved",
    data: post,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  await adminPostService.deletePost(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post deleted",
    data: null,
  });
});

const updatePost = catchAsync(async (req: Request, res: Response) => {
  const post = await adminPostService.updatePost(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post updated",
    data: post,
  });
});

// Comments
const getAllComments = catchAsync(async (req: Request, res: Response) => {
  const comments = await adminCommentService.getAllComments();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comments retrieved",
    data: comments,
  });
});

const getCommentById = catchAsync(async (req: Request, res: Response) => {
  const comment = await adminCommentService.getCommentById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment retrieved",
    data: comment,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  await adminCommentService.deleteComment(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment deleted",
    data: null,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const comment = await adminCommentService.updateComment(
    req.params.id,
    req.body.content,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment updated",
    data: comment,
  });
});

// Likes
const getAllLikes = catchAsync(async (req: Request, res: Response) => {
  const likes = await adminLikeService.getAllLikes();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Likes retrieved",
    data: likes,
  });
});

const getLikeById = catchAsync(async (req: Request, res: Response) => {
  const like = await adminLikeService.getLikeById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Like retrieved",
    data: like,
  });
});

const deleteLike = catchAsync(async (req: Request, res: Response) => {
  await adminLikeService.deleteLike(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Like deleted",
    data: null,
  });
});

export const adminController = {
  getDashboardStats,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
  getAllComments,
  getCommentById,
  deleteComment,
  updateComment,
  getAllLikes,
  getLikeById,
  deleteLike,
};
