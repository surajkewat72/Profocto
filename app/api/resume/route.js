import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)
const clientPromise = Promise.resolve(client.connect())

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = (await clientPromise).db()
    
    // Get resume for current user
    const resume = await db.collection('resumes').findOne({ 
      userId: session.user.id 
    })
    
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }
    
    return NextResponse.json({ 
      success: true, 
      data: resume.data,
      resumeUrl: resume.resumeUrl 
    })
    
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { data } = body
    
    if (!data) {
      return NextResponse.json({ error: 'Resume data is required' }, { status: 400 })
    }

    const db = (await clientPromise).db()
    
    // Update resume data for current user
    const result = await db.collection('resumes').updateOne(
      { userId: session.user.id },
      { 
        $set: { 
          data: data,
          updatedAt: new Date()
        }
      }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Resume updated successfully' 
    })
    
  } catch (error) {
    console.error('Error updating resume:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}