// src/modules/admin/adminLike.service.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllLikes = async () =>
  prisma.like.findMany({
    include: { user: true, post: true },
    orderBy: { createdAt: "desc" },
  });

const getLikeById = async (id: string) =>
  prisma.like.findUnique({
    where: { id },
    include: { user: true, post: true },
  });

const deleteLike = async (id: string) => prisma.like.delete({ where: { id } });

export const adminLikeService = { getAllLikes, getLikeById, deleteLike };
