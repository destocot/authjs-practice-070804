import "server-only";

import db from "@/drizzle";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const findUserByEmail = async (
  email: (typeof users.$inferSelect)["email"],
) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  return user;
};
