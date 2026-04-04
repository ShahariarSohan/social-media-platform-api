/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { postRoutes } from "../modules/post/post.route";
import { commentRoutes } from "../modules/comment/comment.route";
import { likeRoutes } from "../modules/like/like.route";
import { adminRoutes } from "../modules/admin/admin.route";
import { userRoutes } from "../modules/user/user.route";
import { chatRoutes } from "../modules/chat/chat.route";

export const router = Router();
interface IModuleRoutes {
  path: string;
  route: any;
}
const moduleRoutes: IModuleRoutes[] = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/posts",
    route: postRoutes,
  },
  {
    path: "/comments",
    route: commentRoutes,
  },
  {
    path: "/likes",
    route: likeRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/chat",
    route: chatRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
