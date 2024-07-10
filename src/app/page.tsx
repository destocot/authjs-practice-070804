import { cn } from "@/lib/utils";
import React from "react";

export default function Page() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>

        <div className="my-2 h-1 bg-muted" />
        <h2 className="text-2xl font-bold tracking-tight">Features</h2>

        <ul className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <Li done>User in Client Components</Li>
          <Li done>User in Server Components</Li>
          <Li done>Credentials Provider</Li>
          <Li done>Protect Pages</Li>
          <Li done>Signout</Li>
          <Li done>Google OAuth Provider</Li>
          <Li done>Github OAuth Provider</Li>
          <Li done>Auth.js Drizzle Adapter</Li>
          <Li done>Extend Session Information</Li>
          <Li done>Auth.js Extend Types</Li>
          <Li done>Auth.js Session Events</Li>
          <Li done>Update Session (Client)</Li>
          <Li done>Auth.js Session Callbacks</Li>
          <Li>allowDangerousEmailAccountLinking</Li>
          <Li>Custom errors</Li>
          <Li>Middleware</Li>
          <Li>User Roles</Li>
          <Li>Admin Dashboard</Li>
          <Li>Email Verification</Li>
          <Li>Password Reset</Li>
        </ul>

        <div className="my-2 h-1 bg-muted" />
        <h2 className="text-2xl font-bold tracking-tight">Created with</h2>

        <ul className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <Li done>Next.js</Li>
          <Li done>TypeScript</Li>
          <Li done>Auth.js</Li>
          <Li done>Tailwind</Li>
          <Li done>shadcn/ui</Li>
          <Li done>Valibot</Li>
          <Li done>Drizzle ORM</Li>
          <Li done>Neon Serverless Postgres</Li>
        </ul>
      </div>
    </main>
  );
}

const Li = ({
  children,
  done,
}: {
  children: React.ReactNode;
  done?: boolean;
}) => {
  return (
    <li
      className={cn("list-inside list-disc rounded px-0.5", {
        "bg-yellow-100": done,
      })}
    >
      {children}
    </li>
  );
};
