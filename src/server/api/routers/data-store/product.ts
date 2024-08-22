import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getProducts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.product.findMany({});
  }),

  getProductById: publicProcedure
    .input(z.object({ id: z.union([z.string(), z.undefined()]) }))
    .query(async ({ ctx, input }) => {
      const id = typeof input.id === "string" ? parseInt(input.id) : input.id;
      console.log("input id", id);
      return await ctx.db.product.findUnique({
        where: {
          id,
        },
      });
    }),

  createProduct: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        stock: z.number(),
        price: z.number(),
        seller: z.string(),
        customerId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const product = await ctx.db.product.create({
          data: {
            name: input.name,
            stock: input.stock,
            price: input.price,
            seller: input.seller,
            customerId: input.customerId,
          },
        });

        return product;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An error occurred during creation.",
          });
        }
      }
    }),

  editProduct: publicProcedure
    .input(
      z.object({
        id: z.union([z.number(), z.null()]),
        name: z.string().min(1),
        email: z.string(),
        address: z.string(),
        status: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!input.id) {
          return;
        }

        const customer = await ctx.db.customer.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            email: input.email,
            address: input.address,
            isActive: input.status,
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

  deleteProduct: publicProcedure
    .input(z.object({ id: z.union([z.string(), z.undefined()]) }))
    .mutation(async ({ ctx, input }) => {
      const id = typeof input.id === "string" ? parseInt(input.id) : input.id;
      console.log("input id", id);
      return await ctx.db.customer.delete({
        where: {
          id,
        },
      });
    }),
});
