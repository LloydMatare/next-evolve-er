// app/api/payments/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await request.json()

    console.log('Payments API received data:', data) // Add this for debugging

    // Validate required fields
    if (!data.registration || !data.amount || !data.paymentMethod) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 },
      )
    }

    // Check if the data has orderId and convert to order_id
    let paymentData = { ...data }
    
    // If orderId exists in the incoming data, map it to order_id
    if (data.orderId && !data.order_id) {
      paymentData = {
        ...data,
        order_id: data.orderId,  // Map orderId to order_id
      }
      delete paymentData.orderId // Remove the old field to avoid confusion
    }

    console.log('Creating payment with processed data:', paymentData)

    // Create payment
    const payment = await payload.create({
      collection: 'payments',
      data: {
        ...paymentData,
        status: paymentData.status || 'pending',
        currency: paymentData.currency || 'USD',
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Payment created successfully',
        doc: payment,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error('Error creating payment:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create payment' },
      { status: 500 },
    )
  }
}

// GET method remains the same
export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const url = new URL(request.url)
    const registrationId = url.searchParams.get('registration')

    if (registrationId) {
      // Get payments for specific registration
      const payments = await payload.find({
        collection: 'payments',
        where: {
          registration: {
            equals: parseInt(registrationId), // Ensure it's a number if needed
          },
        },
        sort: '-createdAt',
      })

      return NextResponse.json({
        success: true,
        ...payments,
      })
    } else {
      // Get all payments (admin only)
      const page = parseInt(url.searchParams.get('page') || '1')
      const limit = parseInt(url.searchParams.get('limit') || '10')

      const payments = await payload.find({
        collection: 'payments',
        limit,
        page,
        sort: '-createdAt',
      })

      return NextResponse.json({
        success: true,
        ...payments,
      })
    }
  } catch (error: any) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch payments' },
      { status: 500 },
    )
  }
}