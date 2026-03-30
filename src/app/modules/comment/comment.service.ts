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
const getMyAllComments = async (userId: string) => {
  return prisma.comment.findMany({
    where:{
      authorId:userId
    },  
    include: { author: true, post: true },
    orderBy: { createdAt: "desc" },
  });
};
const getMyCommentById=async(id:string,userId:string)=>{
  return prisma.comment.findUnique({where:{id,authorId:userId},include:{author:true,post:true}})
}
export const commentService = {
  createComment,
  updateComment,
  deleteComment,
  getMyAllComments,
  getMyCommentById,
};
