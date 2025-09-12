import { NextRequest, NextResponse } from 'next/server';

// This route proxies requests to the backend API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Forward the request to the backend
    const response = await fetch(`${backendUrl}/api/resumes/suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward any auth headers if needed
        ...Object.fromEntries(
          [...request.headers.entries()].filter(([key]) => 
            key.toLowerCase().includes('authorization') || key.toLowerCase().includes('cookie')
          )
        ),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Suggestions API error:', error);
    return NextResponse.json(
      { error: 'Failed to get suggestions' },
      { status: 500 }
    );
  }
}