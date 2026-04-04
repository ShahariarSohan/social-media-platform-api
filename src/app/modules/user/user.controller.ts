import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { adminUserService } from "../admin/admin.users.service";
import { followService } from "./follow.service";

const getAllUsers = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await adminUserService.getAllUsers(user?.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users retrieved",
      data: result,
    });
  },
);

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await adminUserService.getUserById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved",
    data: result,
  });
});

const followUser = catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const followerId = req.user.id;
    const followingId = req.params.id;
    const result = await followService.followUser(followerId, followingId);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User followed successfully",
        data: result,
    });
});

const unfollowUser = catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const followerId = req.user.id;
    const followingId = req.params.id;
    const result = await followService.unfollowUser(followerId, followingId);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User unfollowed successfully",
        data: result,
    });
});

export const userController = {
  getAllUsers,
  getUserById,
  followUser,
  unfollowUser,
};
