import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import argon2 from "argon2";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import * as v from "valibot";
import { SigninSchema } from "@/validators/signin-validator";
import { findUserByEmail } from "@/resources/user-queries";
import db from "@/drizzle";
import * as schema from "@/drizzle/schema";

const nextAuth = NextAuth({
  adapter: DrizzleAdapter(db, {
    accountsTable: schema.accounts,
    usersTable: schema.users,
    authenticatorsTable: schema.authenticators,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/auth/signin" },
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      if (user?.role) token.role = user.role;

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
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
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});

export const { signIn, auth, handlers } = nextAuth;
