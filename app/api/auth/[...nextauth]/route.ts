import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import type { JWT } from 'next-auth/jwt';
import type { Session, User } from 'next-auth';
import { AdapterUser } from '@auth/core/adapters';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account"
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "signIn" && user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (!user?.email) return false;
      
      try {
        const client = await clientPromise;
        const db = client.db();
        
        let dbUser = await db.collection('users').findOne({ 
          email: user.email 
        });

        if (!dbUser) {
          const result = await db.collection('users').insertOne({
            _id: new ObjectId(),
            email: user.email,
            name: user.name,
            provider: account?.provider,
            createdAt: new Date(),
            resumeData: null
          });
          
          user.id = result.insertedId.toString();
        } else {
          user.id = dbUser._id.toString();
        }
        
        return true;
      } catch (error) {
        console.error('Error during sign in:', error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/builder')) {
        return `${baseUrl}${url}`;
      }
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: '/',
    error: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };