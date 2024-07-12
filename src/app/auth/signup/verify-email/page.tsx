import { Button } from "@/components/ui/button";
import { findVerificationTokenByToken } from "@/resources/verification-token-queries/find-verification-token-by-token";
import Link from "next/link";

type PageProps = { searchParams: { token: string } };

export default async function Page({ searchParams }: PageProps) {
  const verificationToken = await findVerificationTokenByToken(
    searchParams.token,
  );

  console.log(verificationToken.expires);

  const isExpired = new Date(verificationToken.expires) < new Date();
  console.log(isExpired);

  if (isExpired) {
    return (
      <main className="mt-4">
        <div className="container">
          <h1 className="text-3xl font-bold tracking-tight">Verify Email</h1>

          <div className="my-2 h-1 bg-muted" />
          <div className="rounded bg-red-100 p-4">
            <p>Token is expired.</p>

            <span>
              Click{" "}
              <Button variant="link" size="sm" className="px-0" asChild>
                <Link href="/auth/signup">here</Link>
              </Button>{" "}
              to sign up again.
            </span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight">Verify Email</h1>

        <div className="my-2 h-1 bg-muted" />
        <div className="rounded bg-green-100 p-4">
          <p>Email verified.</p>

          <span>
            Click{" "}
            <Button variant="link" size="sm" className="px-0" asChild>
              <Link href="/auth/login">here</Link>
            </Button>{" "}
            to login.
          </span>
        </div>
      </div>
    </main>
  );
}
