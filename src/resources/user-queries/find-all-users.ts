import "server-only";

import { auth } from "@/auth";
import db from "@/drizzle";
import { users } from "@/drizzle/schema";
import { getTableColumns } from "drizzle-orm";

export const findAllUsers = async () => {
  const session = await auth();

  if (session?.user?.role !== "admin") throw new Error("Unauthorized");

  const { password, ...rest } = getTableColumns(users);

  const allUsers = await db.select({ ...rest }).from(users);

  return allUsers;
};
