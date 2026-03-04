// app/api/payment/status/[orderId]/route.ts
// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const { orderId } = await params

    // Find registration
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

    // Find associated payment
    const payments = await payload.find({
      collection: 'payments',
      where: {
        order_id: {
          equals: orderId,
        },
      },
    })

    const payment = payments.docs.length > 0 ? payments.docs[0] : null

    return NextResponse.json({
      status: registration.paymentStatus || registration.status,
      paymentStatus: registration.paymentStatus || registration.status,
      amount: registration.amount,
      orderId: registration.orderId,
      paymentMethod: payment?.paymentMethod || 'paynow',
      paymentId: payment?.id,
      paynowReference: payment?.paynowReference,
    })
  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json({ error: 'Failed to check status' }, { status: 500 })
  }
}
