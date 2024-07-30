import { NextAuthOptions } from "next-auth";
import { CredentialsProvider } from "./providers/credentials-provider";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider(),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
};
