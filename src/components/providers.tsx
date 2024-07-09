"use client";

import { SessionProvider } from "next-auth/react";

export const Providers = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SessionProvider>{children}</SessionProvider>;
};
