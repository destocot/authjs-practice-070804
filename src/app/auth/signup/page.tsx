import { Button } from "@/components/ui/button";
import { SignupForm } from "./_components/signup-form";
import Link from "next/link";

export default function Page() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight">Sign Up</h1>
        <div className="my-2 h-1 bg-muted" />

        {/* Signup Form */}
        <SignupForm />

        {/* Oauth Links */}

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
