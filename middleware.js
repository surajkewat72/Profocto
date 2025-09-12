import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // If user is accessing /builder without a unique URL and is authenticated,
    // redirect them to their unique resume URL
    if (req.nextUrl.pathname === "/builder" && req.nextauth.token?.resumeUrl) {
      return NextResponse.redirect(
        new URL(`/builder/${req.nextauth.token.resumeUrl}`, req.url)
      )
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect all /builder routes
        if (req.nextUrl.pathname.startsWith("/builder")) {
          if (!token) {
            // Redirect to homepage with login prompt instead of sign-in page
            return false
          }
          return true
        }
        return true
      },
    },
    pages: {
      signIn: '/', // Redirect unauthorized users to homepage
    }
  }
)

export const config = {
  matcher: ["/builder/:path*"]
}