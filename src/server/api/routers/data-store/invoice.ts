import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Input } from "postcss";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const invoiceRouter = createTRPCRouter({
  getInvoices: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.invoice.findMany({
        where: {
          userId: input.userId,
        },
        include: {
          invoiceLineItems: {
            select: {
              total: true,
            },
          },
        },
      });
    }),

  getProductById: publicProcedure
    .input(z.object({ id: z.union([z.string(), z.undefined()]) }))
    .query(async ({ ctx, input }) => {
      const id = typeof input.id === "string" ? parseInt(input.id) : input.id;
      return await ctx.db.product.findUnique({
        where: {
          id,
        },
      });
    }),

  createInvoice: publicProcedure
    .input(
      z.object({
        invoiceNumber: z.string(),
        customerId: z.string(),
        description: z.string(),
        userId: z.string(),
        total: z.number(),
        tax: z.number(),
        status: z.enum(["PAID", "UNPAID"]).optional().default("UNPAID"),
        invoiceLineItems: z.any(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const invoice = await ctx.db.invoice.create({
          data: {
            invoiceNumber: input.invoiceNumber,
            customerId: input.customerId,
            description: input.description,
            userId: input.userId,
            tax: input.tax,
            total: input.total,
            status: input.status,
            invoiceLineItems: {
              create: input.invoiceLineItems,
            },
          },
        });

        return invoice;
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
        id: z.number(),
        name: z.string().min(1),
        stock: z.number(),
        price: z.number(),
        contactId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!input.id) {
          return;
        }

        const product = await ctx.db.product.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            stock: input.stock,
            price: input.price,
            contactId: input.contactId,
          },
        });

        return product;
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
      return await ctx.db.product.delete({
        where: {
          id,
        },
      });
    }),
});
