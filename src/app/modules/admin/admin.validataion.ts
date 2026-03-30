// src/modules/admin/admin.validation.ts
import { z } from "zod";

export const updateUserRoleSchema = z.object({
  role: z.enum(["USER", "ADMIN"]),
});

export const updatePostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export const updateCommentSchema = z.object({
  content: z.string().min(1, "Content is required"),
});
