import bcrypt from "bcrypt";

import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ email: z.string().min(1), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const existUser = await ctx.db.user.findUnique({
          where: {
            email: input.email,
          },
        });
        console.log("exist user", existUser);

        const hashedPassword = await bcrypt.hash(input.password, 10);
        // const user = await ctx.db.user.create({
        //   data: {
        //     email: input.email,
        //     password: hashedPassword,
        //   },
        // });

        // return user;
      } catch (error) {
        console.log("error prisma", error);
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

  login: publicProcedure
    .input(z.object({ email: z.string().min(1), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No user found with the provided email address.",
        });
      }

      const passwordMatch = await bcrypt.compare(input.password, user.password);
      if (!passwordMatch) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid password.",
        });
      }

      return user;
    }),

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
