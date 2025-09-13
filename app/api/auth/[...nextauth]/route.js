import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)
const clientPromise = Promise.resolve(client.connect())

// Generate unique resume URL for each user
const generateResumeUrl = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const timestamp = Date.now().toString(36)
  const random = Array.from({ length: 8 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
  return `${timestamp}-${random}-${Math.random().toString(36).substr(2, 6)}`
}

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'database',
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
    async session({ session, user }) {
      try {
        // Add user ID to session
        if (user) {
          session.user.id = user.id
          
          // Get or create resume for this user
          const db = (await clientPromise).db()
          let resume = await db.collection('resumes').findOne({ userId: user.id })
          
          if (!resume) {
            // Create new resume for user
            const resumeUrl = generateResumeUrl()
            const newResume = {
              userId: user.id,
              resumeUrl: resumeUrl,
              data: {
                personalInformation: {},
                summary: '',
                workExperience: [],
                education: [],
                skills: [],
                certifications: [],
                projects: [],
                languages: [],
                socialMedia: {}
              },
              createdAt: new Date(),
              updatedAt: new Date()
            }
            
            const result = await db.collection('resumes').insertOne(newResume)
            resume = { ...newResume, _id: result.insertedId }
          }
          
          session.user.resumeUrl = resume.resumeUrl
        }
        
        return session
      } catch (error) {
        console.error('Session callback error:', error)
        return session
      }
    },
    async signIn({ user, account, profile }) {
      // Allow all sign ins - MongoDB adapter handles user creation
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