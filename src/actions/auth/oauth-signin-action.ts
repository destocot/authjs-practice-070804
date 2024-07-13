"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function oauthSigninUser(provider: "google" | "github") {
  try {
    await signIn(provider, { redirectTo: "/dashboard" });
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    console.error(err);
  }
}
