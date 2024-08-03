import { NextAuthOptions } from "next-auth";
import { getUser } from "./_actions/get-user";
import { CredentialsProvider } from "./providers/credentials-provider";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider(),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (trigger === "signIn") {
        return {
          vendor: user.vendor,
          id: user.id,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = await getUser(token.id);
      }

      return session;
    },
  },
};
