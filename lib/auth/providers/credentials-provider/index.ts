import Credentials from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers/index";
import { z } from "zod";
import { getUser } from "./_actions/get-user";

const credentialsSchema = z.object({
  vendor: z.enum(["line"]),
});

const lineCredentialsSchema = z.object({
  userId: z.coerce.number().min(1),
});

export function CredentialsProvider(): Provider {
  return Credentials({
    name: "credentials",
    credentials: {},
    authorize: async (credentials) => {
      try {
        const parsedCredentials = credentialsSchema.parse(credentials);

        if (parsedCredentials.vendor === "line") {
          const parsedLineCredentials = lineCredentialsSchema.parse(credentials);

          const user = await getUser(parsedLineCredentials.userId);

          return {
            vendor: "line",
            id: user.uuid,
          };
        }

        throw new Error(`unexpected vendor (vendor: ${parsedCredentials.vendor})`);
      } catch (err) {
        throw err;
      }
    },
  });
}
