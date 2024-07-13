"use server";
import db from "@/drizzle";
import { verificationTokens } from "@/drizzle/schema";
import { VERIFICATION_TOKEN_EXPIRATION_MINUTES } from "@/lib/constants";

export async function createVerificationTokenAction(
  identifier: (typeof verificationTokens.$inferSelect)["identifier"],
) {
  const expires = new Date(
    Date.now() + VERIFICATION_TOKEN_EXPIRATION_MINUTES * 60 * 1000,
  );

  const token = Math.random().toString(36).substring(2);

  const [newVerificationToken] = await db
    .insert(verificationTokens)
    .values({ expires, identifier, token })
    .returning({ token: verificationTokens.token });

  return newVerificationToken;
}
