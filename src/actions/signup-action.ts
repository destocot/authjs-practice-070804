"use server";

import { SignupSchema } from "@/validators/signup-validator";
import * as v from "valibot";
import argon2 from "argon2";
import db from "@/drizzle";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

type SignupUserRes =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 409 | 500 };

export async function signupUser(values: unknown): Promise<SignupUserRes> {
  const parsedValues = v.safeParse(SignupSchema, values);

  if (!parsedValues.success) {
    const flattenedIssues = v.flatten(parsedValues.issues);
    return { success: false, error: flattenedIssues, statusCode: 400 };
  }

  const { name, email, password } = parsedValues.output;

  try {
    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser?.id) {
      return { success: false, error: "Email already exists", statusCode: 409 };
    }
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }

  try {
    const hashedPassword = await argon2.hash(password);
    const adminEmails = (process.env.ADMIN_EMAIL_ADDRESSES || "").split(",");
    const isAdmin = adminEmails.includes(email);

    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        role: isAdmin ? "admin" : "user",
      })
      .returning({ id: users.id });

    console.log({ insertedId: newUser.id });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
