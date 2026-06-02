import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const registrationId = formData.get('registrationId') as string

    if (!file || !registrationId) {
      return NextResponse.json(
        { success: false, error: 'Missing file or registrationId' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })

    const buffer = Buffer.from(await file.arrayBuffer())

    const mediaDoc = await payload.create({
      collection: 'media',
      data: {
        alt: `Attendee Photo - ${registrationId}`,
      },
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
    })

    await payload.update({
      collection: 'registrations',
      id: registrationId,
      data: {
        attendeePhoto: mediaDoc.id,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Photo uploaded successfully',
      mediaId: mediaDoc.id,
      url: (mediaDoc as any).url || '',
    })
  } catch (error: any) {
    console.error('Attendee photo upload error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to upload photo' },
      { status: 500 },
    )
  }
}
