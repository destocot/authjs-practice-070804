import type { JWT } from "next-auth/jwt";
import { users } from "@/drizzle/schema";

declare module "next-auth" {
  interface User {
    role: (typeof users.$inferSelect)["role"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: (typeof users.$inferSelect)["id"];
    role: (typeof users.$inferSelect)["role"];
  }
}
