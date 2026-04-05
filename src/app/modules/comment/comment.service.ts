import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create comment
const createComment = async (payload: any, userId: string) => {
  return prisma.comment.create({
    data: {
      content: payload.content,
      postId: payload.postId,
      authorId: userId,
      parentId: payload.parentId || null,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
};

// Update comment
const updateComment = async (
  commentId: string,
  userId: string,
  payload: any,
) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new Error("Comment not found");
  if (comment.authorId !== userId) throw new Error("Unauthorized");

  return prisma.comment.update({ where: { id: commentId }, data: payload });
};

// Delete comment
const deleteComment = async (commentId: string, userId: string) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new Error("Comment not found");
  if (comment.authorId !== userId) throw new Error("Unauthorized");

  // In MongoDB, we use a transaction to delete replies first then the parent
  return prisma.$transaction([
    prisma.comment.deleteMany({ where: { parentId: commentId } }),
    prisma.comment.delete({ where: { id: commentId } }),
  ]);
};

// Get all comments
const getMyAllComments = async (userId: string) => {
  return prisma.comment.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      post: true,
    },
    orderBy: { createdAt: "desc" },
  });
};
const getMyCommentById = async (id: string, userId: string) => {
  return prisma.comment.findUnique({
    where: { id, authorId: userId },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      replies: {
        include: {
          author: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
        },
      },
      post: true,
    },
  });
};
export const commentService = {
  createComment,
  updateComment,
  deleteComment,
  getMyAllComments,
  getMyCommentById,
};
