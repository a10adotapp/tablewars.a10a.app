"use server";

import { prisma } from "@/prisma/client";
import { User } from "@/prisma/generated/client";

export async function getUser(
  id: number,
): Promise<User> {
  try {
    return await prisma.user.findFirstOrThrow({
      where: {
        deletedAt: null,
        id,
      },
    });
  } catch (err) {
    console.error(
      "getUser",
      err,
      {
        id,
      },
    );

    throw err;
  }
}
