"use server";

import db from "@/drizzle";
import { users, verificationTokens } from "@/drizzle/schema";
import { findUserByEmail } from "@/resources/user-queries/find-user-by-email";
import { findVerificationTokenByToken } from "@/resources/verification-token-queries/find-verification-token-by-token";
import { eq } from "drizzle-orm";

export async function verifyCredentialsEmailAction(
  token: (typeof verificationTokens.$inferSelect)["token"],
) {
  const verificationToken = await findVerificationTokenByToken(token);

  if (!verificationToken?.expires) return { success: false };

  if (new Date(verificationToken.expires) < new Date()) {
    return { success: false };
  }

  const existingUser = await findUserByEmail(verificationToken.identifier);

  if (existingUser?.id && !existingUser.emailVerified) {
    await db
      .update(users)
      .set({ emailVerified: new Date() })
      .where(eq(users.id, existingUser.id));

    return { success: true };
  } else {
    return { success: false };
  }
}
