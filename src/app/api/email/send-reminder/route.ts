import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { sendEmail, buildReminderEmailHtml, getDashboardLink } from '@/lib/email'

export async function POST() {
  try {
    const payload = await getPayload({ config: configPromise })

    const now = new Date()
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)

    const registrations = await payload.find({
      collection: 'registrations',
      where: {
        and: [
          {
            status: { equals: 'payment-pending' },
          },
          {
            reminderSent: { not_equals: true },
          },
        ],
      },
      limit: 100,
    })

    const results = { sent: 0, failed: 0, total: registrations.docs.length }

    for (const reg of registrations.docs) {
      try {
        const regDate = new Date(reg.createdAt)
        const daysSinceRegistration = Math.floor((now.getTime() - regDate.getTime()) / (1000 * 60 * 60 * 24))

        if (daysSinceRegistration < 2) continue

        const name = reg.attendeeDetails?.fullName || reg.sponsorDetails?.contactPerson || reg.exhibitorDetails?.contactPerson || 'Valued Client'
        const dueDate = reg.paymentDueDate
          ? new Date(reg.paymentDueDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : 'Within 3 days of registration'

        if (!reg.orderId) continue
        const dashboardLink = getDashboardLink(reg.orderId)

        const html = buildReminderEmailHtml({
          name,
          orderId: reg.orderId,
          amount: reg.amount || 0,
          dueDate,
          dashboardLink,
        })

        if (!reg.email) continue
        const sent = await sendEmail({
          to: reg.email,
          subject: 'Payment Reminder - Evolve ICT Summit 2026',
          html,
        })

        if (sent) {
          await payload.update({
            collection: 'registrations',
            id: reg.id,
            data: { reminderSent: true },
          })
          results.sent++
        } else {
          results.failed++
        }
      } catch (err) {
        console.error(`Failed to send reminder for ${reg.orderId}:`, err)
        results.failed++
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error('Reminder cron error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
