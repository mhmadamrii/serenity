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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const customer = await ctx.db.customer.create({
          data: {
            name: input.name,
            email: input.email,
            address: input.address,
          },
        });
        console.log("customer", customer);

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

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
