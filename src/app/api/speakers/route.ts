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
