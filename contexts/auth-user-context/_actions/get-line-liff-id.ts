"use server";

import { z } from "zod";

const envSchema = z.object({
  LINE_LIFF_ID: z.string().min(1),
});

export async function getLineLiffId(): Promise<string> {
  try {
    const parsedEnv = envSchema.parse(process.env);

    return parsedEnv.LINE_LIFF_ID;
  } catch (err) {
    console.error(
      "getLineLiffId",
      err,
    );

    throw err;
  }
}
