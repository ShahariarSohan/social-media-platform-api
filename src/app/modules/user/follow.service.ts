import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const followUser = async (followerId: string, followingId: string) => {
  if (followerId === followingId) {
    throw new Error("You cannot follow yourself");
  }

  return prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
  });
};

const unfollowUser = async (followerId: string, followingId: string) => {
  return prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
};

const isFollowing = async (followerId: string, followingId: string) => {
    const follow = await prisma.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId,
                followingId,
            }
        }
    });

    return !!follow;
}

const getFollowingIds = async (userId: string) => {
  const following = await prisma.follow.findMany({
    where: {
      followerId: userId,
    },
    select: {
      followingId: true,
    },
  });

  return following.map((f) => f.followingId);
};

export const followService = {
  followUser,
  unfollowUser,
  isFollowing,
  getFollowingIds,
};
