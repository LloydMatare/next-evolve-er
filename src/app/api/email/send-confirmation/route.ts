import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, buildConfirmationEmailHtml, getDashboardLink } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email, name, orderId, amount, dueDate } = await request.json()

    if (!email || !orderId) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const formattedDate = new Date(dueDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    const dashboardLink = getDashboardLink(orderId)

    const html = buildConfirmationEmailHtml({
      name: name || 'Valued Client',
      orderId,
      amount: amount || 0,
      dueDate: formattedDate,
      dashboardLink,
    })

    const sent = await sendEmail({
      to: email,
      subject: 'Registration Confirmed - Evolve ICT Summit 2026',
      html,
    })

    if (sent) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
