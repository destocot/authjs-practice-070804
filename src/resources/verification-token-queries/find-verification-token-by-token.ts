import "server-only";

import db from "@/drizzle";
import { verificationTokens } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const findVerificationTokenByToken = async (
  token: (typeof verificationTokens.$inferSelect)["token"],
) => {
  const [verificationToken] = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.token, token));

  return verificationToken;
};
