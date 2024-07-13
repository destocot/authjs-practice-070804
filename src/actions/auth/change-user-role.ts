"use server";

import db from "@/drizzle";
import { users } from "@/drizzle/schema";
import { findUserByEmail } from "@/resources/user-queries/find-user-by-email";
import { eq } from "drizzle-orm";

export async function changeUserRole(
  email: (typeof users.$inferSelect)["email"],
  newRole: (typeof users.$inferSelect)["role"],
) {
  const existingUser = await findUserByEmail(email);

  if (existingUser?.id) {
    await db
      .update(users)
      .set({ role: newRole })
      .where(eq(users.id, existingUser.id));
  }
}
