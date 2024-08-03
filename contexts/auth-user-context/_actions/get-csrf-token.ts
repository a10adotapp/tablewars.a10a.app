"use client";

import { z } from "zod";

const responseDataSchema = z.object({
  csrfToken: z.string().min(1),
})

export async function getCsrfToken() {
  try {
    const response = await fetch("/api/auth/csrf");

    const responseData = await response.json();

    const parsedResponseData = responseDataSchema.parse(responseData);

    return parsedResponseData.csrfToken;
  } catch (err) {
    console.error(
      "csrf",
      err,
    );

    throw err;
  }
}
