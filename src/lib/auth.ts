import bcrypt from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { NextAuthOptions } from "next-auth";
import { db } from "~/server/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const user = (await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        })) as any;

        const passwordMatch = await bcrypt.compare(
          // @ts-expect-error
          credentials?.password,
          user?.password,
        );

        if (passwordMatch) {
          return {
            id: user?.id,
            email: user?.email,
          };
        }

        return null;
      },
    }),
  ],
};
