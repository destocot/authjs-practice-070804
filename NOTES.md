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

18.1 Create new database authdb

18.2 Copy connection string

18.3 Create .env file

```.env
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<dbname>?sslmode=require"
```

18.4 Add to .gitignore

19. Generate

```json
"db:generate": "drizzle-kit generate"
```

```bash
pnpm drizzle-kit generate
```

20. Migrate

21.1 Neon serverless driver

```bash
pnpm add @neondatabase/serverless
```

```json
"db:migrate": "drizzle-kit migrate"
```

```bash
pnpm drizzle-kit migrate
```

21. Check Neon.tech Dashboard

21.1 Check drizzle-kit studio

```json
"db:studio": "drizzle-kit studio"
```

```bash
pnpm drizzle-kit studio
```

22. Create drizzle instance src/drizzle/index.ts

```ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL ?? "";

const sql = neon(DATABASE_URL);

const db = drizzle(sql, { schema });

export default db;
```

23. Signup User

23.1 Confirm in neon console

23.2 Confirm in drizzle-kit studio

24. Potential Errors

24.1 Conflicted User

25. Success Case

26. Redirect Links

-- END OF PART 2 --

27. Setup src/auth.ts

27.1 Auth Secret

```bash
openssl rand -base64 32
```

```.env
AUTH_SECRET="FILL_ME"
```

27.2 AUTH Url

```.env
AUTH_URL="FILL_ME"
```

27.3 Parse Credentials

27.4 resources/user-queries.ts

27.5 server-only

```bash
pnpm add server-only
```

27.6 findUserByEmail

```ts
import "server-only";
import db from "@/drizzle";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const findUserByEmail = async (email: string) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  return user;
};
```

28. Test signin and just log user from `findUserByEmail`

29. Finish signin

30. Handle simple next errors in catch block

<!-- at time of making need CallbackRouteError -->

```ts
err instanceof AuthError;
```

31. Return `{success: true}` and navigate to /dashboard from router

31.1 Create `/dashboard`

32. Get session information on `/dashboard`

32.1 `auth` in config function

32.2 display as table

33. Create Reusable Signout Button

33.1 Signout Action

34. Fix Navbar (Client Components)

34.1 NavbarLinks component

34.2 Show Why Client Component

```bash
pnpm build
```

```
Route (app)                              Size     First Load JS
┌ ○ /                                    138 B          87.2 kB
├ ○ /_not-found                          870 B          87.9 kB
├ ○ /auth/signin                         2.23 kB         115 kB
├ ○ /auth/signup                         2.63 kB         115 kB
└ ƒ /dashboard                           970 B           103 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

34.3 Add Session in Navbar Links

```bash
pnpm build
```

```
Route (app)                              Size     First Load JS
┌ ƒ /                                    138 B          87.2 kB
├ ƒ /_not-found                          870 B          87.9 kB
├ ƒ /auth/signin                         2.23 kB         115 kB
├ ƒ /auth/signup                         2.63 kB         115 kB
└ ƒ /dashboard                           973 B           102 kB
+ First Load JS shared by all            87 kB
  ├ chunks/221-ff7197e993faaac0.js       31.5 kB
  ├ chunks/67cfe1a8-2f40a60ff5c8d7b6.js  53.6 kB
  └ other shared chunks (total)          1.89 kB


ƒ  (Dynamic)  server-rendered on demand
```

35 Piece by Piece Show How to Do Client Component

36 `useSession` hook

36 SessionProvider

37 Route Handlers

38 Show Build

```bash
pnpm build
```

```
Route (app)                              Size     First Load JS
┌ ○ /                                    138 B          87.2 kB
├ ○ /_not-found                          870 B            88 kB
├ ƒ /api/auth/[...nextauth]              0 B                0 B
├ ○ /auth/signin                         2.23 kB         115 kB
├ ○ /auth/signup                         2.65 kB         115 kB
└ ƒ /dashboard                           973 B           102 kB
+ First Load JS shared by all            87.1 kB
  ├ chunks/221-dbfd152da9955075.js       31.5 kB
  ├ chunks/67cfe1a8-28cca3503bcbb8a1.js  53.6 kB
  └ other shared chunks (total)          1.95 kB


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

39. Show Full sign in - sign out flow

-- END OF PART 3 --

40. Google OAuth

[Google Cloud Console](https://console.cloud.google.com/)

40.1 NEW PROJECT

- Project name -> authjs-tutorial
- Select Project Dropdown

  40.2 APIs & Services

- OAuth consent screen
- External -> CREATE
- App name -> AuthJS Tutorial
- User support email -> <...@gmail.com>
- Developer contact information -> <...@gmail.com>

  40.3 ADD OR REMOVE SCOPES

- .../auth/userinfo.email
- .../auth/userinfo.profile

  40.4 Credentials

- CREATE CREDENTIALS
- OAuth client ID
- Application type -> Web application
- Name -> authjs-tutorial-web-client
- Authorized JavaScript origins -> `http://localhost:3000`
- Authorized redirect URIs -> `http://localhost:3000/api/auth/callback/google`

41. Client Id and Client Secret

```.env
GOOGLE_CLIENT_ID="FILL_ME"
GOOGLE_CLIENT_SECRET="FILL_ME"
```

42. Simple Icons

```bash
pnpm add @icons-pack/react-simple-icons
```

43. Create Google Signin Button

43.1 Github Signin Also

44. Test Google SignIn

45. Setup Github Oauth

45.1. Settings

45.2. Developer settings

45.3 Oauth apps

45.5 New OAuth App

- App name -> AuthJS Tutorial
- Homepage URL -> http://localhost:3000
- Authorizaton callback URL -> http://localhost:3000/api/auth/callback/github
- Register Application

  45.6 Client Id and Client Secret

```.env
GITHUB_CLIENT_ID="FILL_ME"
GITHUB_CLIENT_SECRET="FILL_ME"
```

46. Test GitHub

47. Drizzle Adapter

```bash
pnpm add @auth/drizzle-adapter
```

48. `auth.ts`

```bash
# Works with just DATABASE_URL (but following the guide)
# might not be needed at all
AUTH_DRIZZLE_URL="SAME_AS_DATABASE_URL
```

```ts
adapter: DrizzleAdapter(db);
```

48.1 Show in Neon console

49. Extend Session Information

50. Callbacks `jwt` and `session`

51. Typescript Types

52. Just do id

53. Now do role

54. Update Drizzle Adapter

https://github.com/nextauthjs/next-auth/blob/main/packages/adapter-drizzle/src/lib/pg.ts

55. install `@auth/core`

56. Update Adapter types in `auth-core.d.ts`

57. Event to update emailVerified for OAuth users

-- END OF PART 4 --

58.Now we update session client side

59. Create a form to update the `name`

59.1 shadcn dialog

```bash
pnpm dlx shadcn-ui@latest add dialog
```

60. Create update user schema

61. Create update user server action

62. Update session

63. Show user in neon.tech

63.1 but we need to update the actual session

```tsx
const { data: session, update } = useSession();

if (session?.user) {
  await update({
    ...session,
    user: {
      ...session.user,
      name: updatedUser.name,
    },
  });
}
```

63.2 jwt callback

```ts
jwt({ token, user, trigger, session }) {
  if (trigger === "update") {
    return { ...token, ...session.user };
  }

  if (user?.id) {
    token.id = user.id;
    token.role = user.role;
  }
  return token;
},
```

64. Let's talk callbacks

`signIn` callback

we can verify out user's via our providers

65. Let's talk `allowDangerousEmailAccountLinking`

66.1 show my logic with credentails vs the oauths

66.2 deal with showing errors in case of not allowing it

** this is a decent approach **

66.3 Now discuss allowing it

67. now allow it

67.1 preventing oauth from going into credentials (easy via `!user.password`)

68. Custom errors

69. figure out how to prevent credentials to go into oauth
