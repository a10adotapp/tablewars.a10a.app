"use server";

import { prisma } from "@/prisma/client";
import { User } from "@/prisma/generated/client";

export async function getUser(
  uuid: string,
): Promise<User> {
  try {
    return await prisma.user.findFirstOrThrow({
      where: {
        deletedAt: null,
        uuid,
      },
    });
  } catch (err) {
    console.error(
      "getUser",
      err,
      {
        uuid,
      },
    );

    throw err;
  }
}
