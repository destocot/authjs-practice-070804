import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

/** alternatively do the authorize in the middleware
 * const { auth } = NextAuth(authConfig);

export default auth((req: NextAuthRequest) => {
  const { auth, nextUrl } = req;
  const isLoggedIn = !!auth?.user;
  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isOnAuth = nextUrl.pathname.startsWith("/auth");

  if (isOnDashboard) {
    if (isLoggedIn) return;
    return Response.redirect(new URL("/auth/signin", nextUrl));
  }

  if (isOnAuth) {
    if (!isLoggedIn) return;
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  return;
});
 * 
 */
