//@ts-nocheck
// app/api/payment/update/route.ts
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    // Parse Paynow result data (this is a mock - actual implementation will depend on Paynow's format)
    const formData = await request.formData()
    const data = Object.fromEntries(formData.entries())

    // Mock extraction of payment details
    const reference = (data.reference as string) || ''
    const status = (data.status as string) || 'Paid'

    // Extract order ID from reference (e.g., "Order-ORD-12345")
    const orderId = reference.replace('Order-', '')

    // Find registration by order ID
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

    // Update registration status
    if (status === 'Paid') {
      await payload.update({
        collection: 'registrations',
        id: registration.id,
        data: {
          status: 'paid',
          paymentStatus: 'paid',
        },
      })

      // Update payment record
      const payments = await payload.find({
        collection: 'payments',
        where: {
          registration: {
            equals: registration.id,
          },
        },
      })

      if (payments.docs.length > 0) {
        await payload.update({
          collection: 'payments',
          id: payments.docs[0].id,
          data: {
            status: 'paid',
          },
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Payment update error:', error)
    return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 })
  }
}
