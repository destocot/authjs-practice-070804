"use server";

import * as v from "valibot";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import db from "@/drizzle";
import { ForgotPasswordSchema } from "@/validators/forgot-password-validator";
import { createVerificationTokenAction } from "./create-verification-token";
import { sendForgotPasswordEmail } from "../mail/send-forgot-password-email";

type ForgotPasswordRes =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 401 | 500 };

export async function forgotPassword(
  values: unknown,
): Promise<ForgotPasswordRes> {
  const parsedValues = v.safeParse(ForgotPasswordSchema, values);

  if (!parsedValues.success) {
    const flattenedIssues = v.flatten(parsedValues.issues);
    return { success: false, error: flattenedIssues, statusCode: 400 };
  }

  const { email } = parsedValues.output;

  try {
    const [existingUser] = await db
      .select({
        id: users.id,
        email: users.email,
        emailVerified: users.emailVerified,
        password: users.password,
      })
      .from(users)
      .where(eq(users.email, email));

    // this is a false positive, to deter malicious users from knowing if an email exists in the database
    if (!existingUser?.id) return { success: true };

    if (!existingUser.password) {
      return {
        success: false,
        error: "This user was created with oauth, please sign in with oauth",
        statusCode: 401,
      };
    }

    if (!existingUser.emailVerified) {
      return {
        success: false,
        error:
          "Email not verified, sign up again to receive a verification email",
        statusCode: 401,
      };
    }

    // Create a verification token
    const verificationToken = await createVerificationTokenAction(
      existingUser.email,
    );

    // Send the forgot password email
    await sendForgotPasswordEmail({
      email: existingUser.email,
      token: verificationToken.token,
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
