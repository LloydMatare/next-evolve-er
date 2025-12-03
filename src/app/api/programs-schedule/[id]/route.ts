import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { id } = await params

    const program = await payload.findByID({
      collection: 'programs',
      id,
    })

    return NextResponse.json({
      success: true,
      data: program,
    })
  } catch (error: any) {
    console.error('Error fetching program:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Program not found' },
      { status: 404 },
    )
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { id } = await params

    // Check if request has body
    if (!request.body) {
      return NextResponse.json({ success: false, error: 'No data provided' }, { status: 400 })
    }

    let data
    try {
      const text = await request.text()

      if (!text || text.trim() === '') {
        return NextResponse.json({ success: false, error: 'Empty request body' }, { status: 400 })
      }

      data = JSON.parse(text)
    } catch (parseError: any) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json(
        { success: false, error: `Invalid JSON: ${parseError.message}` },
        { status: 400 },
      )
    }

    const program = await payload.update({
      collection: 'programs',
      id,
      data,
    })

    return NextResponse.json({
      success: true,
      message: 'Program updated successfully',
      data: program,
    })
  } catch (error: any) {
    console.error('Error updating program:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update program' },
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
      collection: 'programs',
      id,
    })

    return NextResponse.json({
      success: true,
      message: 'Program deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting program:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete program' },
      { status: 500 },
    )
  }
}
