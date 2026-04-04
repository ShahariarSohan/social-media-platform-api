import { prisma } from "../../config/prisma";

const createConversation = async (userId: string, participantId: string) => {
  // Check if conversation already exists between these two users
  const existingConversation = await prisma.conversation.findFirst({
    where: {
      userIds: {
        hasEvery: [userId, participantId],
      },
    },
    include: {
      users: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  if (existingConversation) {
    return existingConversation;
  }

  // Create new conversation
  const newConversation = await prisma.conversation.create({
    data: {
      userIds: [userId, participantId],
    },
    include: {
      users: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  return newConversation;
};

const getConversations = async (userId: string) => {
  return await prisma.conversation.findMany({
    where: {
      userIds: {
        has: userId,
      },
    },
    include: {
      users: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};

const sendMessage = async (conversationId: string, senderId: string, content: string) => {
  const message = await prisma.message.create({
    data: {
      content,
      senderId,
      conversationId,
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  // Update conversation's updatedAt timestamp
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  });

  return message;
};

const getMessages = async (conversationId: string) => {
  return await prisma.message.findMany({
    where: {
      conversationId,
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const chatService = {
  createConversation,
  getConversations,
  sendMessage,
  getMessages,
};
