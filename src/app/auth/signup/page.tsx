import { Button } from "@/components/ui/button";
import { SignupForm } from "./_components/signup-form";
import Link from "next/link";
import { OAuthButtons } from "@/components/oauth-buttons";

export default function Page() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight">Sign Up</h1>

        {/* Signup Form */}
        <div className="my-2 h-1 bg-muted" />
        <SignupForm />

        {/* Oauth Links */}
        <div className="my-2 h-1 bg-muted" />
        <OAuthButtons page="signup" />

        {/* Go to Signin Link  */}
        <div className="my-2 h-1 bg-muted" />
        <p>
          Already have an account? Click{" "}
          <Button variant="link" size="sm" className="px-0" asChild>
            <Link href="/auth/signin">here</Link>
          </Button>{" "}
          to sign in.
        </p>
      </div>
    </main>
  );
}
