import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const credentialRouter = createTRPCRouter({
  createContact: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string(),
        address: z.string(),
        userId: z.string(),
        status: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const customer = await ctx.db.contact.create({
          data: {
            name: input.name,
            email: input.email,
            address: input.address,
            isActive: input.status,
            userId: input.userId,
          },
        });

        return customer;
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

  getContacts: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.contact.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),

  getUserById: publicProcedure
    .input(z.object({ id: z.union([z.string(), z.undefined()]) }))
    .query(async ({ ctx, input }) => {
      const id = typeof input.id === "string" ? parseInt(input.id) : input.id;
      console.log("input id", id);
      return await ctx.db.contact.findUnique({
        where: {
          id,
        },
      });
    }),

  deleteUser: publicProcedure
    .input(z.object({ id: z.union([z.string(), z.undefined()]) }))
    .mutation(async ({ ctx, input }) => {
      const id = typeof input.id === "string" ? parseInt(input.id) : input.id;
      console.log("input id", id);
      return await ctx.db.contact.delete({
        where: {
          id,
        },
      });
    }),
});
