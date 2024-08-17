import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const customerRouter = createTRPCRouter({
  createCustomer: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string(),
        address: z.string(),
        status: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const customer = await ctx.db.customer.create({
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

  editCustomer: publicProcedure
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

  getCustomers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.customer.findMany({});
  }),

  getCustomerById: publicProcedure
    .input(z.object({ id: z.union([z.string(), z.undefined()]) }))
    .query(async ({ ctx, input }) => {
      const id = typeof input.id === "string" ? parseInt(input.id) : input.id;
      console.log("input id", id);
      return await ctx.db.customer.findUnique({
        where: {
          id,
        },
      });
    }),
  // .input(
  //   z.object({
  //     name: z.string().min(1),
  //     email: z.string(),
  //     address: z.string(),
  //   }),
  // )
  // .mutation(async ({ ctx, input }) => {
  //   try {
  //     const customer = await ctx.db.customer.findMany({});
  //     console.log("list customers", customer);

  //     return customer;
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       throw new TRPCError({
  //         code: "CONFLICT",
  //         message: "Email address is already registered.",
  //       });
  //     }
  //     throw new TRPCError({
  //       code: "INTERNAL_SERVER_ERROR",
  //       message: "An error occurred during registration.",
  //     });
  //   }
  // }),

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
