import { PrismaClient } from "./generated/client";

const prismaClientSingleton = () => {
  const prismaClient = new PrismaClient();

  return prismaClient;
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
