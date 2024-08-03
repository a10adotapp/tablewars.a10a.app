import Credentials from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers/index";
import { z } from "zod";
import { getOrCreateUserLineAuthInfo } from "./_actions/get-or-create-user-line-auth-info";

const credentialsSchema = z.object({
  vendor: z.enum(["line"]),
});

const lineCredentialsSchema = z.object({
  userId: z.string().min(1),
  displayName: z.string().min(1),
});

export function CredentialsProvider(): Provider {
  return Credentials({
    name: "credentials",
    credentials: {},
    authorize: async (credentials) => {
      const parsedCredentials = credentialsSchema.parse(credentials);

      if (parsedCredentials.vendor === "line") {
        const parsedLineCredentials = lineCredentialsSchema.parse(credentials);

        const userLineAuthInfo = await getOrCreateUserLineAuthInfo(parsedLineCredentials.userId, {
          name: parsedLineCredentials.displayName,
        });

        return {
          vendor: "line",
          id: userLineAuthInfo.user.uuid
        };
      }

      throw new Error("no vendor credentials");
    },
  });
}
