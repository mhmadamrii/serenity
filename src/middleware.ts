import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: any) {
    if (req.nextauth.token?.id) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", req?.url));
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith("/protected") && token === null) {
          return false;
        }
        return true;
      },
    },
  },
);

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/data-store/:path*", "/sales/:path*"],
};
