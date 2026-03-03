//@ts-nocheck
// app/api/payment/initiate/route.ts
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { paynow } from '@/lib/paynow'

export async function POST(request: Request) {
  try {
    const { registrationId, amount, email, orderId, type } = await request.json()

    console.log('Payment initiation request:', { registrationId, amount, email, orderId, type })

    const payload = await getPayload({
      config: configPromise,
    })

    // Create a Paynow payment
    const payment = paynow.createPayment(`Order-${orderId}`, email)
    payment.add('Registration Fee', amount, 1)

    // Send payment to Paynow
    const response = await paynow.send(payment)

    console.log('Paynow response:', response)

    if (response.success) {
      // Save payment initiation in database
      const paymentData = {
        registration: registrationId,
        order_id: orderId,        // FIXED: Changed from orderId to order_id
        amount: amount,
        currency: 'USD',
        paymentMethod: 'paynow',
        status: 'initiated',
        pollUrl: response.pollUrl,
        instructions: response.instructions,
      }

      console.log('Creating payment with data:', paymentData)

      const result = await payload.create({
        collection: 'payments',
        data: paymentData,
      })

      console.log('Payment created successfully:', result.id)

      return NextResponse.json({
        success: true,
        redirectUrl: response.redirectUrl,
        pollUrl: response.pollUrl,
        instructions: response.instructions,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: response.error || 'Payment initiation failed',
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error('Payment initiation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Payment initiation failed: ' + (error.message || 'Unknown error'),
      },
      { status: 500 },
    )
  }
}