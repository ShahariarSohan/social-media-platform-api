// src/modules/admin/adminUser.service.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllUsers = async () =>
  prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      avatar: true,
      bio: true,
      createdAt: true,
      updatedAt: true,
      posts: true,
      likes: true,
      comments: true,
    },
  });
const getUserById = async (id: string) =>
  prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      avatar: true,
      bio: true,
      createdAt: true,
      updatedAt: true,
      posts: {
        include: {
          author: true,
          comments: {
            include: {
              author: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
          likes: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      likes: true,
      comments: true,
    },
  });
const deleteUser = async (id: string) => prisma.user.delete({ where: { id } });
const updateUserRole = async (id: string, role: "USER" | "ADMIN") =>
  prisma.user.update({ where: { id }, data: { role } });

export const adminUserService = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole,
};
