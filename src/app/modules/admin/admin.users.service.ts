// src/modules/admin/adminUser.service.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllUsers = async () =>
  prisma.user.findMany({ orderBy: { createdAt: "desc" } });
const getUserById = async (id: string) =>
  prisma.user.findUnique({ where: { id } });
const deleteUser = async (id: string) => prisma.user.delete({ where: { id } });
const updateUserRole = async (id: string, role: "USER" | "ADMIN") =>
  prisma.user.update({ where: { id }, data: { role } });

export const adminUserService = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole,
};
