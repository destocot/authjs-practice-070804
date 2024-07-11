"use server";

import { auth } from "@/auth";
import db from "@/drizzle";
import { users } from "@/drizzle/schema";
import { findUserByEmail } from "@/resources/user-queries/find-user-by-email";
import { and, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// admin-panel action
export async function toggleEmailVerifiedAction(
  email: (typeof users.$inferSelect)["email"],
  isCurrentlyVerified: boolean,
) {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const existingUser = await findUserByEmail(email);

  if (!existingUser.id) return;

  if (isCurrentlyVerified) {
    await db
      .update(users)
      .set({ emailVerified: null })
      .where(eq(users.id, existingUser.id));
  } else {
    await db
      .update(users)
      .set({ emailVerified: new Date() })
      .where(eq(users.id, existingUser.id));
  }

  revalidatePath("/dashboard/admin-panel");
}
