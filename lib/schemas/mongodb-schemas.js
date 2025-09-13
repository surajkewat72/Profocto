/**
 * Production MongoDB Schema Definitions
 * 
 * This file documents the structure of the User and Resume collections
 * used by NextAuth MongoDB adapter and the resume builder application.
 */

/**
 * Users Collection (managed by NextAuth MongoDB Adapter)
 * Collection: users
 * 
 * NextAuth automatically creates and manages the following structure:
 */
const UserSchema = {
  _id: "ObjectId", // MongoDB ObjectId
  name: "string", // User's display name from OAuth provider
  email: "string", // User's email address (unique)
  emailVerified: "Date | null", // Email verification timestamp
  image: "string", // Profile picture URL from OAuth provider
  // Additional fields added by OAuth providers may include:
  // - Various provider-specific metadata
}

/**
 * Accounts Collection (managed by NextAuth MongoDB Adapter)
 * Collection: accounts
 * 
 * Links users to their OAuth accounts (Google, GitHub, etc.)
 */
const AccountSchema = {
  _id: "ObjectId",
  userId: "ObjectId", // Reference to users._id
  type: "string", // "oauth"
  provider: "string", // "google", "github", etc.
  providerAccountId: "string", // Provider's unique ID for this account
  refresh_token: "string | undefined",
  access_token: "string | undefined",
  expires_at: "number | undefined",
  token_type: "string | undefined",
  scope: "string | undefined",
  id_token: "string | undefined",
  session_state: "string | undefined",
}

/**
 * Sessions Collection (managed by NextAuth MongoDB Adapter)
 * Collection: sessions
 * 
 * Active user sessions for database strategy
 */
const SessionSchema = {
  _id: "ObjectId",
  sessionToken: "string", // Unique session identifier
  userId: "ObjectId", // Reference to users._id
  expires: "Date", // Session expiration timestamp
}

/**
 * Resumes Collection (custom application schema)
 * Collection: resumes
 * 
 * One resume per user containing all resume data
 */
const ResumeSchema = {
  _id: "ObjectId", // MongoDB ObjectId
  userId: "ObjectId", // Reference to users._id (one-to-one relationship)
  resumeUrl: "string", // Unique URL identifier for accessing this resume
  data: {
    personalInformation: {
      firstName: "string",
      lastName: "string", 
      email: "string",
      phone: "string",
      address: "string",
      city: "string",
      state: "string",
      zipCode: "string",
      country: "string",
      website: "string",
      profileImage: "string" // URL to profile image
    },
    summary: "string", // Professional summary/objective
    workExperience: [
      {
        id: "string", // Unique identifier for this experience
        company: "string",
        position: "string", 
        startDate: "string", // MM/YYYY format
        endDate: "string", // MM/YYYY format or "Present"
        description: "string",
        location: "string"
      }
    ],
    education: [
      {
        id: "string",
        institution: "string",
        degree: "string",
        fieldOfStudy: "string",
        startDate: "string", // MM/YYYY format
        endDate: "string", // MM/YYYY format
        gpa: "string",
        description: "string",
        location: "string"
      }
    ],
    skills: [
      {
        id: "string",
        name: "string",
        category: "string", // e.g., "Technical", "Soft Skills", etc.
        level: "string" // e.g., "Beginner", "Intermediate", "Advanced"
      }
    ],
    certifications: [
      {
        id: "string",
        name: "string",
        issuer: "string",
        dateObtained: "string", // MM/YYYY format
        expirationDate: "string", // MM/YYYY format or null
        credentialId: "string",
        url: "string"
      }
    ],
    projects: [
      {
        id: "string",
        name: "string",
        description: "string",
        technologies: ["string"], // Array of technologies used
        startDate: "string", // MM/YYYY format
        endDate: "string", // MM/YYYY format or "Present"
        url: "string", // Project URL
        githubUrl: "string" // GitHub repository URL
      }
    ],
    languages: [
      {
        id: "string",
        language: "string",
        proficiency: "string" // e.g., "Native", "Fluent", "Conversational", "Basic"
      }
    ],
    socialMedia: {
      linkedin: "string",
      github: "string", 
      twitter: "string",
      portfolio: "string",
      behance: "string",
      dribbble: "string"
    }
  },
  createdAt: "Date", // Resume creation timestamp
  updatedAt: "Date" // Last modification timestamp
}

/**
 * Database Indexes for Performance
 * 
 * Recommended indexes:
 * 
 * Users collection:
 * - { email: 1 } (unique)
 * 
 * Accounts collection:
 * - { userId: 1 }
 * - { provider: 1, providerAccountId: 1 } (unique)
 * 
 * Sessions collection:
 * - { sessionToken: 1 } (unique)
 * - { userId: 1 }
 * - { expires: 1 } (TTL index for automatic session cleanup)
 * 
 * Resumes collection:
 * - { userId: 1 } (unique, one resume per user)
 * - { resumeUrl: 1 } (unique, for public access)
 */

export { UserSchema, AccountSchema, SessionSchema, ResumeSchema }