import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      console.log("req next url", req.nextUrl);
      if (req.nextUrl.pathname.startsWith("/protected") && token === null) {
        return false;
      }
      return true;
    },
  },
});

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/about/:path*", "/login", "/dashboard"],
};
