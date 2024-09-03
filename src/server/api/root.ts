import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { contactRouter } from "./routers/data-store/contact";
import { productRouter } from "./routers/data-store/product";
import { settingRouter } from "./routers/setting/setting";
import { invoiceRouter } from "./routers/data-store/invoice";
import { credentialRouter } from "./routers/setting/credential";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  credential: credentialRouter,
  contact: contactRouter,
  product: productRouter,
  setting: settingRouter,
  invoice: invoiceRouter,
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
