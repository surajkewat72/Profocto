import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      resumeUrl?: string
      provider?: string
    }
  }

  interface User {
    id: string
    resumeUrl?: string
    provider?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    resumeUrl?: string
    provider?: string
  }
}