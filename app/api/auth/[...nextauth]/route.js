import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)
const clientPromise = client.connect()

// Generate unique resume URL for each user
const generateResumeUrl = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const timestamp = Date.now().toString(36)
  const random = Array.from({ length: 8 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
  return `${timestamp}-${random}-${Math.random().toString(36).substr(2, 6)}`
}

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt', // Use JWT strategy to avoid account linking issues
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' }
      },
      async authorize(credentials) {
        // For demo purposes - in production, you'd validate against your database
        if (credentials?.email && credentials?.password) {
          // Mock user creation/validation
          const user = {
            id: generateResumeUrl(),
            email: credentials.email,
            name: credentials.name || credentials.email.split('@')[0],
          }
          return user
        }
        return null
      },
    }),
  ],
  session: {
    strategy: 'database', // Use database sessions with MongoDB adapter
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Generate unique resume URL on first sign in
      if (user && !token.resumeUrl) {
        token.resumeUrl = generateResumeUrl()
      }
      
      if (account?.provider) {
        token.provider = account.provider
      }
      
      return token
    },
    async session({ session, token }) {
      session.user.id = token.sub
      session.user.resumeUrl = token.resumeUrl
      session.user.provider = token.provider
      return session
    },
    async signIn({ user, account, profile }) {
      // Allow all sign ins - let NextAuth handle the account linking
      return true
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log(`User signed in: ${user.email} via ${account.provider}`)
    },
    async createUser({ user }) {
      console.log(`New user created: ${user.email}`)
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }