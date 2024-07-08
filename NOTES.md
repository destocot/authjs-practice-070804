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
        <div className="my-4 h-1 bg-muted" />

        {/* Signup Form */}

        {/* Oauth Links */}

        {/* Go to Signin Link  */}
      </div>
    </main>
  );
}
```

7. Shadcn Form

```bash
pnpm dlx shadcn-ui@latest add form
```

7.1 Shadcn Input

```bash
pnpm dlx shadcn-ui@latest add input
```

7.2 Uninstall Zod, Install Valibot

```bash
pnpm uninstall zod
pnpm add valibot
```

8. Create src/validators

8.1 signup-validator.ts

```tsx
import * as v from "valibot";

export const SignupSchema = v.pipe(
  v.object({
    name: v.optional(
      v.union([
        v.pipe(
          v.literal(""),
          v.transform(() => undefined),
        ),
        v.pipe(
          v.string("Your name must be a string."),
          v.nonEmpty("Please enter your name."),
          v.minLength(6, "Your name must have 6 characters or more."),
        ),
      ]),
    ),
    email: v.pipe(
      v.string("Your email must be a string."),
      v.nonEmpty("Please enter your email."),
      v.email("The email address is badly formatted."),
    ),
    password: v.pipe(
      v.string("Your password must be a string."),
      v.nonEmpty("Please enter your password."),
      v.minLength(6, "Your password must have 6 characters or more."),
    ),
    confirmPassword: v.pipe(
      v.string("Your password must be a string."),
      v.nonEmpty("Please confirm your password."),
    ),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "The two passwords do not match.",
    ),
    ["confirmPassword"],
  ),
);

export type SignupInput = v.InferInput<typeof SignupSchema>;
```

9. Signup Form

10. Signup Action (Skeleton)

10.1 Catch valibot errors server side

11. Hash Password

```bash
pnpm add argon2
```

12. Signin Form

-- END OF PART 1 --

13. prettier-plugin-tailwindcss

```bash
pnpm add -D prettier prettier-plugin-tailwindcss
```

13.1 prettierc

```.prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

14. Setup Drizzle ORM

```bash
pnpm add drizzle-orm
pnpm add -D drizzle-kit
```

15. Drizzle Config

```ts
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL ?? "";

const drizzleConfig = {
  schema: "src/drizzle/schema.ts",
  out: "migrations",
  dialect: "postgresql",
  dbCredentials: { url: DATABASE_URL },
} satisfies Config;

export default defineConfig(drizzleConfig);
```

16. Grab Schema from Auth.js

[Drizzle Adapter](https://authjs.dev/getting-started/adapters/drizzle)

16.1 Add to src/drizzle/schema.ts

16.2 We will have a typescript issue with our `schema.ts`

So we need to **install authjs\*** now.

```bash
pnpm add next-auth@beta
```

17. Add password and role fields to users table

The drizzle schema assumes its fields based on oauth providers.
We need to adjust to support our credentials providers and our needs.

```ts
export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: roleEnum("role").notNull().default("user"),
});
```

18. Setup Postgrse through Neon.tech

[neon.tech](https://neon.tech)
