import Credentials from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers/index";

export function CredentialsProvider(): Provider {
  return Credentials({
    name: "credentials",
    credentials: {},
    authorize: async (credentials) => {
      return {
        id: "0",
        name: "Guest",
      };
    },
  });
}
