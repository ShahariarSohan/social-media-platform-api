// src/modules/admin/adminPost.service.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllPosts = async () =>
  prisma.post.findMany({
    include: { author: true, comments: true, likes: true },
    orderBy: { createdAt: "desc" },
  });

const getPostById = async (id: string) =>
  prisma.post.findUnique({
    where: { id },
    include: { author: true, comments: true, likes: true },
  });

const deletePost = async (id: string) => prisma.post.delete({ where: { id } });

const updatePost = async (
  id: string,
  data: { title: string; content: string },
) => prisma.post.update({ where: { id }, data });

export const adminPostService = {
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
};
