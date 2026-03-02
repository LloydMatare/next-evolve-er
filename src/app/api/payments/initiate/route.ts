// app/api/payment/initiate/route.ts (singular "payment")
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: Request) {
  try {
    const { registrationId, amount, email, orderId, type } = await request.json()

    const payload = await getPayload({
      config: configPromise,
    })

    // For now, since we're not fully integrated with Paynow SDK,
    // we'll simulate a successful payment initiation
    // Later replace this with actual Paynow integration

    // Create a mock Paynow response
    const mockResponse = {
      success: true,
      redirectUrl: `https://www.paynow.co.zw/interface?orderId=${orderId}&amount=${amount}`,
      pollUrl: `https://www.paynow.co.zw/poll/${orderId}`,
      instructions: {
        paynow: 'Follow the instructions on the Paynow page to complete payment',
      },
    }

    // Save payment initiation in database
    await payload.create({
      collection: 'payments',
      data: {
        registration: registrationId,
        amount,
        currency: 'USD',
        paymentMethod: 'paynow',
        status: 'initiated',
        pollUrl: mockResponse.pollUrl,
        instructions: mockResponse.instructions,
        orderId,
      },
    })

    return NextResponse.json({
      success: true,
      redirectUrl: mockResponse.redirectUrl,
      pollUrl: mockResponse.pollUrl,
      instructions: mockResponse.instructions,
    })
  } catch (error) {
    console.error('Payment initiation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Payment initiation failed',
      },
      { status: 500 },
    )
  }
}
