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
