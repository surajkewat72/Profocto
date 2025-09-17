import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import { Adapter } from 'next-auth/adapters';

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  
  // Configure session handling
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  
  // Configure adapters
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  
  // Callbacks for customizing the NextAuth behavior
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          id: user.id,
        }
      }
      return token
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    
    async signIn({ user, account }) {
      try {
        if (!user?.email) return false
        
        const client = await clientPromise
        const db = client.db()
        
        // Check if user exists
        const existingUser = await db.collection('users').findOne({
          email: user.email
        })
        
        if (!existingUser) {
          // Create new user
          await db.collection('users').insertOne({
            email: user.email,
            name: user.name,
            provider: account?.provider,
            createdAt: new Date(),
            resumeData: null
          })
        }
        
        return true
      } catch (error) {
        console.error('SignIn Error:', error)
        return false
      }
    },
    
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  
  pages: {
    signIn: '/',
    error: '/',
  },
  
  // Enable debug messages in the console if you are having problems
  logger: {
    error: (code, metadata) => {
      console.error(code, metadata)
    },
    warn: (code) => {
      console.warn(code)
    },
    debug: (code, metadata) => {
      console.debug(code, metadata)
    },
  },
}