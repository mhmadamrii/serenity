import bcrypt from "bcrypt";

import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const existUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser) {
      return NextResponse.json(
        { error: "Email already used" },
        { status: 409 },
      );
    }

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Account created", user },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
