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

export async function DELETE(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const url = new URL(request.url)

    // Handle bulk delete for admin - parse individual ID parameters
    const ids: string[] = []
    for (const [key, value] of url.searchParams.entries()) {
      if (key.startsWith('where[and][0][id][in][') && key.endsWith(']')) {
        ids.push(value)
      }
    }

    if (ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No IDs provided for deletion' },
        { status: 400 }
      )
    }

    // Delete related payments first to avoid foreign key constraint issues
    const paymentDeletePromises = ids.map(async (id) => {
      try {
        // Find payments for this registration
        const payments = await payload.find({
          collection: 'payments',
          where: {
            registration: {
              equals: parseInt(id)
            }
          },
          limit: 100
        })

        // Delete each payment
        const deletePromises = payments.docs.map(payment =>
          payload.delete({
            collection: 'payments',
            id: payment.id
          })
        )

        await Promise.all(deletePromises)
      } catch (error) {
        console.error(`Error deleting payments for registration ${id}:`, error)
        // Continue with other deletions even if this fails
      }
    })

    await Promise.all(paymentDeletePromises)

    // Now delete the registrations
    const deletePromises = ids.map(id => payload.delete({
      collection: 'registrations',
      id: parseInt(id)
    }))

    await Promise.all(deletePromises)

    const response = NextResponse.json({
      success: true,
      message: `Successfully deleted ${ids.length} registration(s)`
    })

    return withCors(response)
  } catch (error: any) {
    console.error('Error deleting registrations:', error)
    const response = NextResponse.json(
      { success: false, error: error.message || 'Failed to delete registrations' },
      { status: 500 }
    )
    return withCors(response)
  }
}
