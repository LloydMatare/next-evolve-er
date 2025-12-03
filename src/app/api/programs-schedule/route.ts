import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const url = new URL(request.url)

    // Query parameters
    const day = url.searchParams.get('day')
    const track = url.searchParams.get('track')
    const type = url.searchParams.get('type')
    const featured = url.searchParams.get('featured')
    const search = url.searchParams.get('search')

    // Build query
    const query: any = {}

    if (day && day !== 'all') {
      query.day = { equals: day }
    }

    if (track && track !== 'all') {
      query.track = { equals: track }
    }

    if (type && type !== 'all') {
      query.type = { equals: type }
    }

    if (featured === 'true') {
      query.featured = { equals: true }
    }

    if (search) {
      query.or = [
        { title: { contains: search } },
        { description: { contains: search } },
        { speakerName: { contains: search } },
      ]
    }

    // Get programs with sorting by time and order
    const programs = await payload.find({
      collection: 'programs',
      where: query,
      sort: 'order,startTime',
      limit: 100,
    })

    return NextResponse.json({
      success: true,
      data: programs.docs,
    })
  } catch (error: any) {
    console.error('Error fetching programs:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch programs' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Check if request has body
    if (!request.body) {
      return NextResponse.json({ success: false, error: 'No data provided' }, { status: 400 })
    }

    // Try to parse the JSON
    let data
    try {
      const text = await request.text()

      // Check if text is empty
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

    // Validate required fields
    if (!data.title || !data.day || !data.startTime || !data.endTime || !data.type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, day, startTime, endTime, type' },
        { status: 400 },
      )
    }

    // Create program with validated data
    const program = await payload.create({
      collection: 'programs',
      data: {
        title: data.title,
        description: data.description || '',
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        duration: data.duration || calculateDuration(data.startTime, data.endTime),
        type: data.type,
        track: data.track || null,
        speakerName: data.speakerName || null,
        speakerTitle: data.speakerTitle || null,
        venue: data.venue || 'main-auditorium',
        capacity: data.capacity || 'All attendees',
        featured: data.featured || false,
        color: data.color || 'bg-gray-50 border-gray-200',
        order: data.order || 0,
        registrationLink: data.registrationLink || null,
        notes: data.notes || null,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Program created successfully',
        data: program,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error('Error creating program:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create program' },
      { status: 500 },
    )
  }
}

// Helper function to calculate duration
function calculateDuration(startTime: string, endTime: string): string {
  try {
    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)

    const startTotal = startHour * 60 + startMinute
    const endTotal = endHour * 60 + endMinute

    const durationMinutes = endTotal - startTotal

    if (durationMinutes >= 60) {
      const hours = Math.floor(durationMinutes / 60)
      const minutes = durationMinutes % 60
      if (minutes > 0) {
        return `${hours}h ${minutes}m`
      }
      return `${hours}h`
    } else {
      return `${durationMinutes}m`
    }
  } catch {
    return '1h' // Default fallback
  }
}
