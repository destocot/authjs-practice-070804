"use server";

import { users } from "@/drizzle/schema";
import { OAuthAccountAlreadyLinkedError } from "@/lib/custom-errors";
import { findUserByEmail } from "@/resources/user-queries";

export async function checkUserCredentials(
  email: (typeof users.$inferSelect)["email"],
) {
  const user = await findUserByEmail(email);

  if (!user) return;

  if (user.password) {
    // User was made with Credentials Provider
    throw new OAuthAccountAlreadyLinkedError();
  } else {
    // User was made with Google or Github
    return;
  }
}
