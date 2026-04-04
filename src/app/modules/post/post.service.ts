import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create post
const createPost = async (payload: any, userId: string) => {
  return prisma.post.create({
    data: {
      title: payload.title,
      content: payload.content,
      authorId: userId,
      imageUrl: payload.imageUrl,
    },
  });
};

// Update post
const updatePost = async (postId: string, userId: string, payload: any) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error("Post not found");
  if (post.authorId !== userId) throw new Error("Unauthorized");

  return prisma.post.update({ where: { id: postId }, data: payload });
};

// Delete post
const deletePost = async (postId: string, userId: string) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error("Post not found");
  if (post.authorId !== userId) throw new Error("Unauthorized");

  return prisma.$transaction([
    prisma.like.deleteMany({ where: { postId } }),
    prisma.comment.deleteMany({ where: { postId } }),
    prisma.post.delete({ where: { id: postId } }),
  ]);
};

// Get all posts
const getMyAllPosts = async (userId: string) => {
  return prisma.post.findMany({
    where: { authorId: userId },
    include: {
      author: {
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
      comments: true,
      likes: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// Get post by id
const getMyPostById = async (postId: string, userId: string) => {
  return prisma.post.findUnique({
    where: { id: postId, authorId: userId },
    include: {
      author: {
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
      comments: true,
      likes: true,
    },
  });
};

// Get followed feed
const getFollowedFeed = async (userId: string) => {
  // 1. Get the list of IDs of people the user follows
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  const followingIds = following.map((f) => f.followingId);

  // 2. Fetch posts from followed users PLUS the current user
  return prisma.post.findMany({
    where: {
      authorId: { in: [...followingIds, userId] },
    },
    include: {
      author: {
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
      comments: true,
      likes: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const postService = {
  createPost,
  updatePost,
  deletePost,
  getMyAllPosts,
  getMyPostById,
  getFollowedFeed,
};
