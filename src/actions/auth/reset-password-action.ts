"use server";
import { users, verificationTokens } from "@/drizzle/schema";
import { findUserByEmail } from "@/resources/user-queries/find-user-by-email";
import { ResetPasswordSchema } from "@/validators/reset-password-validator";
import * as v from "valibot";
import agon2 from "argon2";
import db from "@/drizzle";
import { eq } from "drizzle-orm";
import { findVerificationTokenByToken } from "@/resources/verification-token-queries/find-verification-token-by-token";

type ResetPasswordRes =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 401 | 500 };

export async function resetPasswordAction(
  email: (typeof users.$inferSelect)["email"],
  token: (typeof verificationTokens.$inferSelect)["token"],
  values: unknown,
): Promise<ResetPasswordRes> {
  const parsedValues = v.safeParse(ResetPasswordSchema, values);

  if (!parsedValues.success) {
    const flattenedIssues = v.flatten(parsedValues.issues);
    return { success: false, error: flattenedIssues, statusCode: 400 };
  }

  const { password } = parsedValues.output;

  const existingToken = await findVerificationTokenByToken(token);

  if (!existingToken?.expires) {
    return { success: false, error: "Token is invalid", statusCode: 401 };
  }

  const existingUser = await findUserByEmail(email);

  if (
    !existingUser.password ||
    existingUser.email !== existingToken.identifier
  ) {
    return {
      success: false,
      error: "Something went wrong",
      statusCode: 401,
    };
  }

  try {
    const hashedPassword = await agon2.hash(password);

    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, email));

    console.log({ email, password });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
