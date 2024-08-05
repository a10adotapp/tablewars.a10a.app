"use server";

import { z } from "zod";

const responseDataSchema = z.object({
  friendFlag: z.boolean(),
});

export async function getLineOfficialAccountFriendshipStatus(
  accessToken: string,
): Promise<
  z.output<typeof responseDataSchema>
> {
  try {
    const response = await fetch("https://api.line.me/friendship/v1/status", {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    return responseDataSchema.parse(responseData);
  } catch (err) {
    console.error(
      "getLineOfficialAccountFriendshipStatus",
      err,
      accessToken,
    );

    throw err;
  }
}
