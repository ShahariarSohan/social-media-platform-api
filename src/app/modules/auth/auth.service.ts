/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";


import { jwtHelpers } from "../../utils/jwtHelpers";

import { Secret } from "jsonwebtoken";

import AppError from "../../errorHelpers/AppError";
import { envVariables } from "../../config/env";

// auth.service.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const registerUser = async (payload: any) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      email: payload.email,
      username: payload.username,
      password: hashedPassword,
      bio: payload.bio,
      avatar: payload.avatar, // URL or path
    },
  });

  return user;
};


const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid user or email");
  }
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password!");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      id:userData.id,
      email: userData.email,
      role: userData.role,
    },
    envVariables.ACCESS_TOKEN_SECRET as Secret,
    envVariables.ACCESS_TOKEN_EXPIRES_IN as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    envVariables.REFRESH_TOKEN_SECRET as Secret,
    envVariables.REFRESH_TOKEN_EXPIRES_IN as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getMe = async (decodedUser: any) => {
  const accessToken = decodedUser.accessToken;
  const decodedData = jwtHelpers.verifyToken(
    accessToken,
    envVariables.ACCESS_TOKEN_SECRET as Secret,
  );

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
    select: {
      id: true,
      username: true,
      email: true,
      bio: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
      following: true,
    },
  });

  return userData;
};



const updateMe = async (userId: string, payload: any) => {
  // Optional: hash password if included
 

  return prisma.user.update({
    where: { id: userId },
    data: payload,
  });
};

export const authService = {
  loginUser,
  registerUser,
  getMe,
  updateMe, 
};

