// app/api/paynow/poll/route.ts
// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { getPaynowInstance } from '@/lib/paynow'

export async function POST(req: NextRequest) {
  try {
    const { pollUrl } = await req.json()

    if (!pollUrl) {
      return NextResponse.json({ success: false, error: 'pollUrl is required' }, { status: 400 })
    }

    const paynow = getPaynowInstance()
    const status = await paynow.pollTransaction(pollUrl)

    return NextResponse.json({
      success: true,
      paid: status.paid(),
      status: status.status,
      reference: status.reference,
      amount: status.amount,
      paynowReference: status.paynowReference,
    })
  } catch (error) {
    console.error('Paynow polling error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
      },
      { status: 500 },
    )
  }
}
