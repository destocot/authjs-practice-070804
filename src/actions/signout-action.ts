"use server";
import { signOut } from "@/auth";

export async function signoutUser() {
  try {
    await signOut({ redirect: false });
  } catch (err) {
    console.error(err);
  }
}
