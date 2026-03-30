// src/modules/admin/adminStats.service.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getDashboardStats = async () => {
  const [totalUsers, totalPosts, totalComments, totalLikes] = await Promise.all(
    [
      prisma.user.count(),
      prisma.post.count(),
      prisma.comment.count(),
      prisma.like.count(),
    ],
  );

  return { totalUsers, totalPosts, totalComments, totalLikes };
};

export const adminStatsService = { getDashboardStats };
