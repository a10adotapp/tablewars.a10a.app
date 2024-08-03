"use server";

import { uuid } from "@/lib/user/uuid";
import { prisma } from "@/prisma/client";
import { User, UserLineAuthInfo } from "@/prisma/generated/client";

export async function getOrCreateUserLineAuthInfo(
  vendorUserId: string,
  data: {
    name: string;
  },
): Promise<UserLineAuthInfo & {
  user: User;
}> {
  try {
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
      return userLineAuthInfo;
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
      }
    });

    return await prisma.userLineAuthInfo.findFirstOrThrow({
      include: {
        user: true,
      },
      where: {
        deletedAt: null,
        vendorUserId,
      },
    });
  } catch (err) {
    console.error(
      "getUserLineAuthInfo",
      err,
      vendorUserId,
      data,
    );

    throw err;
  }
}
