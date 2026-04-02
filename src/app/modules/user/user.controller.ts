
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { adminUserService } from "../admin/admin.users.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await adminUserService.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved",
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await adminUserService.getUserById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved",
    data: result,
  });
});

export const userController = {
  getAllUsers,
  getUserById,
};
