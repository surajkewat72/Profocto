import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
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
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt', 
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
  ],
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