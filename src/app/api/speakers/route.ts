import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const sort = searchParams.get('sort') || '-order'
    const featured = searchParams.get('featured')

    const where: any = {}
    if (featured === 'true') {
      where.featured = { equals: true }
    }

    const result = await payload.find({
      collection: 'speakers',
      where,
      limit,
      sort: [sort],
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching speakers:', error)
    return NextResponse.json({ error: 'Failed to fetch speakers' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    let data
    // Try to parse as form data first (since admin likely sends form data)
    try {
      const formData = await request.formData()
      data = Object.fromEntries(formData.entries())
    } catch (formError: any) {
      // If form data fails, try as JSON
      try {
        const text = await request.text()
        if (!text || text.trim() === '') {
          return NextResponse.json({ error: 'Empty request body' }, { status: 400 })
        }
        data = JSON.parse(text)
      } catch (jsonError: any) {
        console.error('Failed to parse request body as form data or JSON:', formError.message, jsonError.message)
        return NextResponse.json({ error: 'Invalid request body format' }, { status: 400 })
      }
    }

    console.log('Received data:', JSON.stringify(data, null, 2))

    // If data has _payload, parse it
    if (data._payload) {
      try {
        data = JSON.parse(data._payload)
      } catch (parseError) {
        console.error('Failed to parse _payload:', parseError)
        return NextResponse.json({ error: 'Invalid _payload format' }, { status: 400 })
      }
    }

    const result = await payload.create({
      collection: 'speakers',
      data,
    })

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Error creating speaker:', error)
    return NextResponse.json({ error: error.message || 'Failed to create speaker' }, { status: 500 })
  }
}
