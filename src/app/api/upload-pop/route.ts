import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const orderId = formData.get('orderId') as string

    if (!file || !orderId) {
      return NextResponse.json({ success: false, error: 'Missing file or orderId' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    const registrations = await payload.find({
      collection: 'registrations',
      where: {
        orderId: { equals: orderId },
      },
    })

    if (registrations.docs.length === 0) {
      return NextResponse.json({ success: false, error: 'Registration not found' }, { status: 404 })
    }

    const registration = registrations.docs[0]

    const buffer = Buffer.from(await file.arrayBuffer())

    const mediaDoc = await payload.create({
      collection: 'media',
      data: {
        alt: `Payment Proof - ${orderId}`,
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
      id: registration.id,
      data: {
        paymentProof: mediaDoc.id,
        status: 'pending',
        notes: registration.notes
          ? registration.notes + '\n---\nPOP uploaded on ' + new Date().toISOString()
          : 'POP uploaded on ' + new Date().toISOString(),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Payment proof uploaded successfully. Your registration is now pending review.',
      mediaId: mediaDoc.id,
    })
  } catch (error) {
    console.error('Upload POP error:', error)
    return NextResponse.json({ success: false, error: 'Failed to upload payment proof' }, { status: 500 })
  }
}
