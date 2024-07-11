import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { findAllUsers } from "@/resources/user-queries/find-all-users";
import { ArrowLeftSquareIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { VerifyEmailForm } from "./_components/verify-email-form";

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
        <table className="mt-4 table-auto divide-y">
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
              <tr key={user.id} className="divide-x">
                <td className="px-6 py-3">{user.id}</td>
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">
                  <VerifyEmailForm
                    email={user.email}
                    emailVerified={user.emailVerified}
                  />
                </td>
                <td className="px-6 py-3 uppercase">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
