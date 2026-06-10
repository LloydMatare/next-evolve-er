import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { id } = await params

    const registration = await payload.findByID({
      collection: 'registrations',
      id,
    })

    return NextResponse.json({
      success: true,
      doc: registration,
    })
  } catch (error: any) {
    console.error('Error fetching registration:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Registration not found' },
      { status: 404 },
    )
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { id } = await params
    const data = await request.json()

    const registration = await payload.update({
      collection: 'registrations',
      id,
      data,
    })

    return NextResponse.json({
      success: true,
      message: 'Registration updated successfully',
      doc: registration,
    })
  } catch (error: any) {
    console.error('Error updating registration:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update registration' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { id } = await params

    await payload.delete({
      collection: 'registrations',
      id,
    })

    return NextResponse.json({
      success: true,
      message: 'Registration deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting registration:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete registration' },
      { status: 500 },
    )
  }
}
