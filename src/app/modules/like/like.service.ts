import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const toggleLike = async (postId: string, userId: string) => {
  // Check if user already liked
  const existing = await prisma.like.findUnique({
    where: { postId_userId: { postId, userId } },
  });

  let liked: boolean;

  if (existing) {
    // Already liked → remove (unlike)
    await prisma.like.delete({ where: { postId_userId: { postId, userId } } });
    liked = false;
  } else {
    // Not liked yet → create
    await prisma.like.create({ data: { postId, userId } });
    liked = true;
  }

  // Count total likes for this post
  const totalLikes = await prisma.like.count({ where: { postId } });

  return { liked, totalLikes };
};
// Like a post
const likePost = async (postId: string, userId: string) => {
  return prisma.like.create({
    data: { postId, userId },
  });
};

// Unlike a post
const unlikePost = async (postId: string, userId: string) => {
  return prisma.like.delete({
    where: { postId_userId: { postId, userId } },
  });
};

// Get all likes
const getAllLikes = async () => {
  return prisma.like.findMany({
    include: { user: true, post: true },
    orderBy: { createdAt: "desc" },
  });
};

// Get likes of a post
const getLikesByPost = async (postId: string) => {
  return prisma.like.findMany({
    where: { postId },
    include: { user: true },
  });
};

export const likeService = {
  likePost,
  unlikePost,
  getAllLikes,
  getLikesByPost,
  toggleLike
};
