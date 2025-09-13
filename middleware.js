import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Simple middleware - just allow authenticated users to access protected routes
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect dashboard routes (you can change this to whatever you want to protect)
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
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
  matcher: ["/dashboard/:path*"]
}