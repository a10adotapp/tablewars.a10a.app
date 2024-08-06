"use server";

import { authOptions } from "@/lib/auth/auth-options";
import { uuid } from "@/lib/user/uuid";
import { prisma } from "@/prisma/client";
import { User } from "@/prisma/generated/client";
import { getServerSession } from "next-auth";

export async function getOrCreateUser(
  vendorUserId: string,
  data: {
    name: string;
  },
): Promise<User> {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user) {
      return session.user;
    }

    const userLineAuthInfo = await prisma.userLineAuthInfo.findFirst({
      include: {
        user: true,
      },
      where: {
        deletedAt: null,
        vendorUserId,
      },
    });

    if (userLineAuthInfo) {
      return userLineAuthInfo.user;
    }

    const user = await prisma.user.create({
      data: {
        uuid: await uuid(),
        name: data.name,
      },
    });

    await prisma.userLineAuthInfo.create({
      data: {
        userId: user.id,
        vendorUserId,
      },
    });

    return user;
  } catch (err) {
    console.error(
      "getOrCreateUser",
      err,
      {
        vendorUserId,
        data,
      },
    );

    throw err;
  };
}
