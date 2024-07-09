export default function Page() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
        <div className="my-2 h-1 bg-muted" />

        <h2 className="text-2xl font-bold tracking-tight">Created With</h2>

        <ul className="list-inside list-disc">
          <li>Next.js</li>
          <li>TypeScript</li>
          <li>Auth.js</li>
          <li>Tailwind</li>
          <li>shadcn/ui</li>
          <li>Valibot</li>
          <li>Drizzle ORM</li>
          <li>Neon Serverless Postgres</li>
        </ul>
      </div>
    </main>
  );
}
