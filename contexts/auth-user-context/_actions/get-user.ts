"use server";

import { authOptions } from "@/lib/auth/auth-options";
import { User } from "@/prisma/generated/client";
import { getServerSession } from "next-auth";

export async function getUser(): Promise<User | null> {
  try {
    const session = await getServerSession(authOptions);

    return session?.user || null;
  } catch (err) {
    console.error(
      "getUser",
      err,
    );

    throw err;
  };
}
