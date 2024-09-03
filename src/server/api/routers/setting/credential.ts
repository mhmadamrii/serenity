import bcrypt from "bcrypt";

import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
export const credentialRouter = createTRPCRouter({
  changePassword: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        currentPassword: z.string(),
        newPassword: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await bcrypt.hash(input.newPassword, 10);

      try {
        const currentUser = await ctx.db.user.findFirst({
          where: { id: input.userId },
        });

        // Check if user exists
        if (!currentUser) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        const isPasswordValid = await bcrypt.compare(
          input.currentPassword,
          currentUser.password,
        );

        // Validate current password
        if (!isPasswordValid) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Current password is incorrect",
          });
        }

        // Update the password
        const userWithNewPassword = await ctx.db.user.update({
          where: {
            id: input.userId,
          },
          data: {
            password: hashedPassword,
          },
        });

        return userWithNewPassword;
      } catch (error) {
        // Handle database errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An error occurred during password change",
          });
        }

        // Re-throw unexpected errors
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
