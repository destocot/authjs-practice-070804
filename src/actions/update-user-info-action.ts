"use server";

import * as v from "valibot";
import { UpdateUserInfoSchema } from "@/validators/update-user-info-validator";
import { users } from "@/drizzle/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import db from "@/drizzle";

type UpdateUserInfoRes =
  | {
      success: true;
      data: {
        id: (typeof users.$inferSelect)["id"];
        name: (typeof users.$inferSelect)["name"];
      };
    }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 401 | 403 | 500 };

export async function updateUserInfo(
  values: unknown,
): Promise<UpdateUserInfoRes> {
  const parsedValues = v.safeParse(UpdateUserInfoSchema, values);

  if (!parsedValues.success) {
    const flattenedIssues = v.flatten(parsedValues.issues);
    return { success: false, error: flattenedIssues, statusCode: 400 };
  }

  const { name, id } = parsedValues.output;
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized", statusCode: 401 };
  }

  if (session.user.id !== id) {
    return { success: false, error: "Unauthorized", statusCode: 403 };
  }

  if (session.user.name === name) {
    return { success: true, data: { id, name } };
  }

  try {
    const [updatedUser] = await db
      .update(users)
      .set({ name })
      .where(eq(users.id, id))
      .returning({ id: users.id, name: users.name });

    console.log(updatedUser);

    return { success: true, data: updatedUser };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
