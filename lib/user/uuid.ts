import { prisma } from "@/prisma/client";
import { randomUUID } from "crypto";

export async function uuid(): Promise<string> {
  try {
    while (true) {
      const uuid = randomUUID();

      const user = await prisma.user.findFirst({
        where: {
          uuid,
        },
      });

      if (!user) {
        return uuid;
      }
    }
  } catch (err) {
    console.error("uuid", err);
    throw err;
  }
}
