import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import argon2 from "argon2";
import * as v from "valibot";
import { SigninSchema } from "@/validators/signin-validator";
import { findUserByEmail } from "@/resources/user-queries";

const nextAuth = NextAuth({
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/auth/signin" },
  callbacks: {},
  events: {},
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = v.safeParse(SigninSchema, credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.output;

          const user = await findUserByEmail(email);
          if (!user?.password) return null;

          const passwordsMatch = await argon2.verify(user.password, password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});

export const { signIn, signOut, auth, handlers } = nextAuth;
