import { z } from "zod";

export const createOrgAdminSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
  organizationId: z.string(),
});

export const createOrgMemberSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
});

export const updateOrgMemberSchema = z.object({
  
    name: z.string().min(3)
 
});

