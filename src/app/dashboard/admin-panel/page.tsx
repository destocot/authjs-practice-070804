import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { findAllUsers } from "@/resources/user-queries/find-all-users";
import { ArrowLeftSquareIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { ToggleEmailVerifiedInput } from "./_components/toggle-email-verified-input";
import { ChangeUserRoleInput } from "./_components/change-user-role-input";

export default async function Page() {
  const session = await auth();

  if (session?.user?.role !== "admin") redirect("/dashboard");

  const allUsers = await findAllUsers();

  return (
    <main className="mt-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <Button size="lg" asChild>
            <Link href="/dashboard">
              <ArrowLeftSquareIcon className="mr-2" /> Dashboard
            </Link>
          </Button>
        </div>

        <div className="my-2 h-1 bg-muted" />
        <h2 className="text-2xl font-bold tracking-tight">All Users</h2>

        <div className="my-2 h-1 bg-muted" />
        <table className="mt-4 w-full table-auto divide-y">
          <thead>
            <tr className="divide-x">
              <th className="bg-primary-foreground px-6 py-3 text-start">id</th>
              <th className="bg-primary-foreground px-6 py-3 text-start">
                name
              </th>
              <th className="bg-primary-foreground px-6 py-3 text-start">
                email
              </th>
              <th className="bg-primary-foreground px-6 py-3 text-start">
                email verified
              </th>
              <th className="bg-primary-foreground px-6 py-3 text-start">
                role
              </th>
            </tr>
          </thead>

          <tbody>
            {allUsers.map((user) => (
              <tr
                key={user.id}
                className={cn("divide-x", {
                  "bg-primary/10": user.role === "admin",
                })}
              >
                <td className="px-6 py-3">{user.id}</td>
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">
                  <ToggleEmailVerifiedInput
                    email={user.email}
                    emailVerified={user.emailVerified}
                    isAdmin={user?.role === "admin"}
                  />
                </td>
                <td className="px-6 py-3 uppercase">
                  <ChangeUserRoleInput
                    email={user.email}
                    currentRole={user.role}
                    isAdmin={user?.role === "admin"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
