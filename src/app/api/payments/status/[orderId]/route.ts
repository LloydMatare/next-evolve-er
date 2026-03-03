//@ts-nocheck
// app/api/payment/status/[orderId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Use NextRequest instead of Request for better compatibility
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    // Await the params
    const { orderId } = await params

    const registrations = await payload.find({
      collection: 'registrations',
      where: {
        orderId: {
          equals: orderId,
        },
      },
    })

    if (registrations.docs.length === 0) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }

    const registration = registrations.docs[0]

    return NextResponse.json({
      status: registration.status,
      paymentStatus: registration.paymentStatus || registration.status,
      amount: registration.amount,
    })
  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json({ error: 'Failed to check status' }, { status: 500 })
  }
}