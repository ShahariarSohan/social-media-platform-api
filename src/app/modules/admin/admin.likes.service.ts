// src/modules/admin/adminLike.service.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllLikes = async () =>
  prisma.like.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          avatar: true,
          bio: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      post: true,
    },
    orderBy: { createdAt: "desc" },
  });

const getLikeById = async (id: string) =>
  prisma.like.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          avatar: true,
          bio: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      post: true,
    },
  });

const deleteLike = async (id: string) => prisma.like.delete({ where: { id } });

export const adminLikeService = { getAllLikes, getLikeById, deleteLike };
