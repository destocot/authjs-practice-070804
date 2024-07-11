import "server-only";
import db from "@/drizzle";
import { users } from "@/drizzle/schema";
import { eq, getTableColumns } from "drizzle-orm";
import { auth } from "@/auth";

export const findUserByEmail = async (
  email: (typeof users.$inferSelect)["email"],
) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  return user;
};

// const getUserFromAuthId = async () => {
//   const session = await auth();

//   if (!session?.user?.id) throw new Error("User not found");

//   const id = session.user.id;

//   const { password, ...rest } = getTableColumns(users);

//   const [user] = await db
//     .select({ ...rest })
//     .from(users)
//     .where(eq(users.id, id));

//   return user;
// };
