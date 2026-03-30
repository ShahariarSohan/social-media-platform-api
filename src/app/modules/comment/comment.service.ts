import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create comment
const createComment = async (payload: any, userId: string) => {
  return prisma.comment.create({
    data: {
      content: payload.content,
      postId: payload.postId,
      authorId: userId,
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

  return prisma.comment.delete({ where: { id: commentId } });
};

// Get all comments
const getAllComments = async () => {
  return prisma.comment.findMany({
    include: { author: true, post: true },
    orderBy: { createdAt: "desc" },
  });
};
const getCommentById=async(id:string)=>{
  return prisma.comment.findUnique({where:{id},include:{author:true,post:true}})
}
export const commentService = {
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
  getCommentById,
};
