// app/api/admin/programs/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Check if user is admin (you need authentication)
    // const user = req.user
    // if (!user || user.role !== 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const programs = await payload.find({
      collection: 'programs',
      limit: 100,
      sort: 'day,order,startTime',
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
