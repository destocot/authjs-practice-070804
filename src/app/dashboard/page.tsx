import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { User } from "next-auth";
import { SignoutButton } from "@/components/signout-button";
import { UserInfoForm } from "./_components/user-info-form";
import { redirect } from "next/navigation";
import { LockIcon } from "lucide-react";

export default async function Page() {
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";

  // if (!session) redirect("/auth/signin");

  return (
    <main className="mt-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          {isAdmin && (
            <Button size="lg" asChild>
              <Link href="/dashboard/admin-panel">
                <LockIcon className="mr-2" /> Admin Panel
              </Link>
            </Button>
          )}
        </div>

        <div className="my-2 h-1 bg-muted" />
        {!!session?.user ? <SignedIn user={session.user} /> : <SignedOut />}
      </div>
    </main>
  );
}

const SignedIn = ({ user }: { user: User }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">User Information</h2>
        <UserInfoForm user={user} />
      </div>

      <table className="mt-4 table-auto divide-y">
        <thead>
          <tr className="divide-x">
            <th className="bg-primary-foreground px-6 py-3 text-start">id</th>
            <th className="bg-primary-foreground px-6 py-3 text-start">name</th>
            <th className="bg-primary-foreground px-6 py-3 text-start">
              email
            </th>
            <th className="bg-primary-foreground px-6 py-3 text-start">role</th>
          </tr>
        </thead>

        <tbody>
          <tr className="divide-x">
            <td className="px-6 py-3">{user.id}</td>
            <td className="px-6 py-3">{user.name}</td>
            <td className="px-6 py-3">{user.email}</td>
            <td className="px-6 py-3 uppercase">{user.role}</td>
          </tr>
        </tbody>
      </table>

      <div className="my-2 h-1 bg-muted" />
      <SignoutButton />
    </>
  );
};

const SignedOut = () => {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">User Not Signed In</h2>

      <div className="my-2 h-1 bg-muted" />
      <Button asChild>
        <Link href="/auth/signin">Sign In</Link>
      </Button>
    </>
  );
};
