import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI)

// GET /api/stats - Get database statistics
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await client.connect()
    const db = client.db()
    
    // Get collection statistics
    const [usersCount, sessionsCount, accountsCount] = await Promise.all([
      db.collection('users').countDocuments(),
      db.collection('sessions').countDocuments(),
      db.collection('accounts').countDocuments()
    ])

    // Get recent user registrations (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const recentUsers = await db.collection('users').countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    })

    const stats = {
      database: {
        users: usersCount,
        sessions: sessionsCount,
        accounts: accountsCount
      },
      recent: {
        newUsers: recentUsers,
        period: '7 days'
      },
      privacy: {
        resumeDataStored: 0,
        documentsStored: 0,
        message: 'This application prioritizes user privacy - no resume or document data is stored'
      },
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await client.close()
  }
}