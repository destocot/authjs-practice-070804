1. Create Next.js App with CLI

```bash
pnpm create next-app@latest
```

2. Cleanup files

- remove public/\*\*
- clear globals.css
- clear page.tsx

3. Shadcn Init

```bash
pnpm dlx shadcn-ui@latest init
```

4. Navbar

4.1. Shadcn Button

```bash
pnpm dlx shadcn-ui@latest add button
```

5. Create /auth/{signin|signup}/page.tsx

6. Create Signup Page

```tsx
export default function Page() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight">Sign Up</h1>
        <div className="h-4 border-b" />

        {/* Signup Form */}

        {/* Go to Signin Link  */}
      </div>
    </main>
  );
}
```

7. Shadcn Form

```tsx
pnpm dlx shadcn-ui@latest add form
```

7.1. Uninstall Zod, Install Valibot

```tsx
pnpm uninstall zod
pnpm add valibot
```
