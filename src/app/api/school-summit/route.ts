// app/api/school-summit/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Fetch all published school summit content
    const data = await payload.find({
      collection: 'school-summit',
      where: {
        status: {
          equals: 'published',
        },
      },
      limit: 1000,
      sort: 'section,order',
    })

    // Organize data by section
    const organizedData = {
      objectives: [] as any[],
      subThemes: [] as any[],
      targetAudience: [] as any[],
      whyAttend: [] as any[],
      programmeHighlights: [] as any[],
      expectedOutcomes: [] as any[],
      featuredCards: [] as any[],
    }

    data.docs.forEach((doc: any) => {
      switch (doc.section) {
        case 'objectives':
          organizedData.objectives.push(doc)
          break
        case 'sub-themes':
          organizedData.subThemes.push(doc)
          break
        case 'target-audience':
          organizedData.targetAudience.push(doc)
          break
        case 'why-attend':
          organizedData.whyAttend.push(doc)
          break
        case 'programme-highlights':
          organizedData.programmeHighlights.push(doc)
          break
        case 'expected-outcomes':
          organizedData.expectedOutcomes.push(doc)
          break
        case 'featured-cards':
          organizedData.featuredCards.push(doc)
          break
      }
    })

    return NextResponse.json({
      success: true,
      data: organizedData,
    })
  } catch (error: any) {
    console.error('Error fetching school summit data:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch school summit data' },
      { status: 500 },
    )
  }
}
