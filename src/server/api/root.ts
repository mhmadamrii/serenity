import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth";
import { contactRouter } from "./routers/data-store/contact";
import { productRouter } from "./routers/data-store/product";
import { settingRouter } from "./routers/setting/setting";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  contact: contactRouter,
  product: productRouter,
  setting: settingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
