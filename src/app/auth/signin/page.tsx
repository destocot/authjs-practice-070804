import { SigninForm } from "./_components/signin-form";

export default function Page() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
        <div className="h-1 bg-muted my-4" />

        {/* Signin Form */}
        <SigninForm />

        {/* Oauth Links */}

        {/* Go to Signup Link  */}
      </div>
    </main>
  );
}
