import { SignupForm } from "./_components/signup-form";

export default function Page() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight">Sign Up</h1>
        <div className="h-1 bg-muted my-4" />

        {/* Signup Form */}
        <SignupForm />

        {/* Oauth Links */}

        {/* Go to Signin Link  */}
      </div>
    </main>
  );
}
