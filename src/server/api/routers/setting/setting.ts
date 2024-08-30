import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const settingRouter = createTRPCRouter({
  editAccountAndCreateProfile: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string().min(1),
        email: z.string(),
        address: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // create if not exist, and update if exists
      try {
        const profile = await ctx.db.profile.upsert({
          where: {
            userId: input.userId,
          },
          update: {
            name: input.name,
            address: input.address,
          },
          create: {
            name: input.name,
            address: input.address,
            userId: input.userId,
          },
        });

        return profile;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (
            error.code === "P2002" &&
            // @ts-ignore
            error.meta?.target?.includes("email")
          ) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Email address is already registered.",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred during registration.",
        });
      }
    }),

  getAcccountDataById: publicProcedure
    .input(z.object({ id: z.union([z.string(), z.undefined()]) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.profile.findUnique({
        where: {
          userId: input?.id,
        },
      });
    }),
});
