"use server";

import { auth } from "@/auth";
import db from "@/drizzle";
import { users } from "@/drizzle/schema";
import { findUserByEmail } from "@/resources/user-queries/find-user-by-email";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// admin-panel action
export async function changeUserRoleAction(
  email: (typeof users.$inferSelect)["email"],
  newRole: (typeof users.$inferSelect)["role"],
) {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const existingUser = await findUserByEmail(email);

  if (!existingUser.id) return;
  if (existingUser.role === "admin") return;
  if (existingUser.role === newRole) return;

  await db.update(users).set({ role: newRole }).where(eq(users.email, email));

  revalidatePath("/dashboard/admin-panel");
}
