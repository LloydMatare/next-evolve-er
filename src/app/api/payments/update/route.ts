// app/api/paynow/update/route.ts
// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getPaynowInstance } from '@/lib/paynow'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const data = Object.fromEntries(formData)

    console.log('Paynow webhook received:', data)

    const { reference, status, paynowreference, amount } = data
    const orderId = reference.replace('Order-', '')

    const payload = await getPayload({
      config: configPromise,
    })

    // Find the registration by orderId
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

    // Find the payment
    const payments = await payload.find({
      collection: 'payments',
      where: {
        order_id: {
          equals: orderId,
        },
      },
    })

    if (payments.docs.length > 0) {
      const payment = payments.docs[0]

      // Update payment status
      await payload.update({
        collection: 'payments',
        id: payment.id,
        data: {
          status: status === 'paid' ? 'completed' : 'failed',
          paynowReference: paynowreference,
          updatedAt: new Date().toISOString(),
        },
      })
    }

    // Update registration status if payment is successful
    if (status === 'paid') {
      await payload.update({
        collection: 'registrations',
        id: registration.id,
        data: {
          status: 'pending', // Still pending approval
          paymentStatus: 'paid',
          updatedAt: new Date().toISOString(),
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Paynow webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
