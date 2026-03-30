// src/modules/admin/adminComment.service.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllComments = async () =>
  prisma.comment.findMany({
    include: { author: true, post: true },
    orderBy: { createdAt: "desc" },
  });

const getCommentById = async (id: string) =>
  prisma.comment.findUnique({
    where: { id },
    include: { author: true, post: true },
  });

const deleteComment = async (id: string) =>
  prisma.comment.delete({ where: { id } });

const updateComment = async (id: string, content: string) =>
  prisma.comment.update({ where: { id }, data: { content } });

export const adminCommentService = {
  getAllComments,
  getCommentById,
  deleteComment,
  updateComment,
};
