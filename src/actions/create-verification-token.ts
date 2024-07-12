"use server";
import db from "@/drizzle";
import { verificationTokens } from "@/drizzle/schema";
import { addMinutesFromNow } from "@/lib/utils";

export async function createVerificationTokenAction(
  identifier: (typeof verificationTokens.$inferSelect)["identifier"],
) {
  const expires = addMinutesFromNow(2);

  const token = Math.random().toString(36).substring(2);

  const [newVerificationToken] = await db
    .insert(verificationTokens)
    .values({ expires, identifier, token })
    .returning({ token: verificationTokens.token });

  return newVerificationToken;
}
