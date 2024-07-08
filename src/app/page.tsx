export default function Page() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
        <div className="h-1 bg-muted my-4" />

        <h2 className="text-2xl font-bold tracking-tight">Created With</h2>

        <ul className="list-disc list-inside">
          <li>Next.js</li>
          <li>TypeScript</li>
          <li>Tailwind</li>
          <li>shadcn/ui</li>
          <li>Valibot</li>
        </ul>
      </div>
    </main>
  );
}
