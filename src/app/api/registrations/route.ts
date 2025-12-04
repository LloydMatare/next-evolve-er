import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

// Helper function to add CORS headers
function withCors(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', 'https://next-evolve-er.vercel.app')
  // OR for multiple origins:
  // response.headers.set('Access-Control-Allow-Origin', 'https://next-evolve-er.vercel.app,http://localhost:3000')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

export function OPTIONS() {
  return withCors(NextResponse.json({}, { status: 200 }))
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await request.json()

    const registration = await payload.create({
      collection: 'registrations',
      data: {
        ...data,
        status: data.status || 'pending',
      },
    })

    const response = NextResponse.json(
      {
        success: true,
        message: 'Registration created successfully',
        doc: registration,
      },
      { status: 201 },
    )

    return withCors(response)
  } catch (error: any) {
    console.error('Error creating registration:', error)
    const response = NextResponse.json(
      { success: false, error: error.message || 'Failed to create registration' },
      { status: 500 },
    )
    return withCors(response)
  }
}

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const url = new URL(request.url)

    // Remove the single registration logic from here
    // Get all registrations (with pagination)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')

    const registrations = await payload.find({
      collection: 'registrations',
      limit,
      page,
      sort: '-createdAt',
    })

    return NextResponse.json({
      success: true,
      ...registrations,
    })
  } catch (error: any) {
    console.error('Error fetching registrations:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch registrations' },
      { status: 500 },
    )
  }
}
