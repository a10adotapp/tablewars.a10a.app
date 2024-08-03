import { User as PrismaUser } from "@/prisma/generated/client";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: PrismaUser;
  }

  interface User {
    vendor: "line";
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    vendor: "line";
    id: string;
  }
}
