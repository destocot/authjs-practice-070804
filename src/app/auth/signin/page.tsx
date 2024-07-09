import { Button } from "@/components/ui/button";
import { SigninForm } from "./_components/signin-form";
import Link from "next/link";
import { OAuthButtons } from "@/components/oauth-buttons";

export default function Page() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>

        {/* Signin Form */}
        <div className="my-2 h-1 bg-muted" />
        <SigninForm />

        {/* Oauth Links */}
        <div className="my-2 h-1 bg-muted" />
        <OAuthButtons page="signin" />

        {/* Go to Signup Link  */}
        <div className="my-2 h-1 bg-muted" />
        <p>
          Don&apos;t have an account? Click{" "}
          <Button variant="link" size="sm" className="px-0" asChild>
            <Link href="/auth/signup">here</Link>
          </Button>{" "}
          to sign up.
        </p>
      </div>
    </main>
  );
}
