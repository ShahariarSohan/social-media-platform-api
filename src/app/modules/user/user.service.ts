import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma";
import { UserRole } from "../../interfaces/userRole";

import httpStatus from "http-status-codes";
import { envVariables } from "../../config/env";

import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { User } from "../../../generated/prisma/client";

const createOrgAdmin = async (payload: User, creator: JwtPayload) => {
  if (creator.role !== UserRole.PLATFORM_ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only Platform Admin can create Org Admins",
    );
  }
  if (payload.organizationId) {
    const organization = await prisma.organization.findUnique({
      where: { id: payload.organizationId },
    });

    if (!organization) {
      throw new AppError(httpStatus.NOT_FOUND, "Organization does not exist");
    }
  }

  const existingAdmin = await prisma.user.findFirst({
    where: {
      role: UserRole.ORG_ADMIN,
      organizationId: payload.organizationId,
    },
  });

  if (existingAdmin) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This organization already has an Admin",
    );
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(envVariables.BCRYPT_SALT_ROUND) || 10,
  );

  return prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: UserRole.ORG_ADMIN,
      organizationId: payload.organizationId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

const createOrgMember = async (payload: User, creator: JwtPayload) => {
  if (creator.role !== UserRole.ORG_ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only Org Admin can create Org Members",
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, "Member already exist");
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(envVariables.BCRYPT_SALT_ROUND) || 10,
  );

  return prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: UserRole.ORG_MEMBER,
      organizationId: creator.organizationId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

const getMyOrgMembers = async (organizationId: string) => {
  return prisma.user.findMany({
    where: { organizationId, role: UserRole.ORG_MEMBER },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

const updateMyOrgMember = async (
  memberId: string,
  payload: Partial<User>,
  creator: User,
) => {
  if (creator.role !== UserRole.ORG_ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only Org Admin can update members",
    );
  }

  const member = await prisma.user.findUnique({ where: { id: memberId } });

  if (!member || member.organizationId !== creator.organizationId) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Member not found in your organization",
    );
  }

  return prisma.user.update({
    where: { id: memberId },
    data: { name: payload.name },
  });
};

const deleteMyOrgMember = async (memberId: string, creator: User) => {
  if (creator.role !== UserRole.ORG_ADMIN) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only Org Admin can delete members",
    );
  }

  const member = await prisma.user.findUnique({ where: { id: memberId } });

  if (!member || member.organizationId !== creator.organizationId) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Member not found in your organization",
    );
  }

  await prisma.user.delete({
    where: { id: memberId },
  });

  return null;
};

export const UserService = {
  createOrgAdmin,
  createOrgMember,
  getMyOrgMembers,
  updateMyOrgMember,
  deleteMyOrgMember,
};
