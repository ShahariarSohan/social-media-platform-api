

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const createOrgAdmin = async (req: Request & { user?: any }, res: Response) => {
  const result = await UserService.createOrgAdmin(req.body, req.user);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Org Admin created successfully",
    data: result,
  });
};

const createOrgMember = async (
  req: Request & { user?: any },
  res: Response,
) => {
  const result = await UserService.createOrgMember(req.body, req.user);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Org Member created successfully",
    data: result,
  });
};
const getMyOrgMembers = async (
  req: Request & { user?: any },
  res: Response,
) => {
    
  const result = await UserService.getMyOrgMembers(req.user.organizationId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Organization members retrieved successfully",
    data: result,
  });
};
const updateMyOrgMember = async (
  req: Request & { user?: any },
  res: Response,
) => {
    console.log(req.params.memberId, req.body, req.user.organizationId);
  const result = await UserService.updateMyOrgMember(
    req.params.memberId,
    req.body,
    req.user,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member updated successfully",
    data: result,
  });
};

const deleteMyOrgMember = async (
  req: Request & { user?: any },
  res: Response,
) => {
  const result = await UserService.deleteMyOrgMember(
    req.params.memberId,
    req.user,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member deleted successfully",
    data: result,
  });
};
export const UserController = {
  createOrgAdmin,
  createOrgMember,
  getMyOrgMembers,
  updateMyOrgMember,
  deleteMyOrgMember,
};
