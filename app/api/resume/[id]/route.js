import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)
const clientPromise = Promise.resolve(client.connect())

export async function GET(request, { params }) {
  try {
    const { id } = params
    
    if (!id) {
      return NextResponse.json({ error: 'Resume ID is required' }, { status: 400 })
    }

    const db = (await clientPromise).db()
    
    // Find resume by resumeUrl (public access)
    const resume = await db.collection('resumes').findOne({ 
      resumeUrl: id 
    })
    
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }
    
    // Get user info for the resume (for display purposes)
    const user = await db.collection('users').findOne({
      _id: resume.userId
    })
    
    return NextResponse.json({ 
      success: true, 
      data: resume.data,
      resumeUrl: resume.resumeUrl,
      owner: {
        name: user?.name,
        email: user?.email,
        image: user?.image
      },
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt
    })
    
  } catch (error) {
    console.error('Error fetching public resume:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}