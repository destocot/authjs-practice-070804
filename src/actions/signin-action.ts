"use server";

import { SignupSchema } from "@/validators/signup-validator";
import * as v from "valibot";
import argon2 from "argon2";

type SignupUserRes =
  | { success: true }
  | { success: false; error: v.FlatErrors<undefined>; statusCode: 400 }
  | { success: false; error: string; statusCode: 500 };

export async function signinUser(values: unknown): Promise<SignupUserRes> {
  // LOGIC TO BE MOVED TO AUTHJS CONFIGURATION

  return { success: true };

  // const parsedValues = v.safeParse(SignupSchema, values);

  // if (!parsedValues.success) {
  //   const flattenedIssues = v.flatten(parsedValues.issues);
  //   return { success: false, error: flattenedIssues, statusCode: 400 };
  // }

  // const { name, email, password } = parsedValues.output;

  // const hashedPassword = await argon2.hash(password);

  // try {
  //   // TODO: Save user to database
  //   return { success: true };
  // } catch (err) {
  //   console.error(err);
  //   return { success: false, error: "Internal Server Error", statusCode: 500 };
  // }
}
