import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || '')

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@evolveictsummit.com'
const FROM_NAME = process.env.RESEND_FROM_NAME || 'Evolve ICT Summit'

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  try {
    await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to,
      subject,
      html,
    })
    return true
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
}

export function getDashboardLink(orderId: string) {
  const baseUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return `${baseUrl}/dashboard?orderId=${orderId}`
}

export function buildConfirmationEmailHtml({
  name,
  orderId,
  amount,
  dueDate,
  dashboardLink,
}: {
  name: string
  orderId: string
  amount: number
  dueDate: string
  dashboardLink: string
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f4f4f4; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 40px; text-align: center;">
              <h1 style="color: #ffcc00; margin: 0; font-size: 28px;">Evolve ICT Summit 2026</h1>
              <p style="color: #ffffff; margin: 8px 0 0; font-size: 16px;">Registration Confirmed</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="font-size: 18px; color: #333;">Hi ${name},</p>
              <p style="font-size: 16px; color: #555; line-height: 1.6;">
                Thank you for registering for the Evolve ICT Summit 2026! Your registration has been received successfully.
              </p>
              <table width="100%" cellpadding="12" style="background: #f9f9f9; border-radius: 12px; margin: 24px 0;">
                <tr>
                  <td style="font-size: 14px; color: #888;">Order ID</td>
                  <td style="font-size: 14px; color: #333; font-weight: bold;">${orderId}</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #888;">Amount Due</td>
                  <td style="font-size: 14px; color: #333; font-weight: bold;">$${amount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #888;">Payment Due By</td>
                  <td style="font-size: 14px; color: #e53e3e; font-weight: bold;">${dueDate}</td>
                </tr>
              </table>
              <p style="font-size: 16px; color: #555; line-height: 1.6;">
                You selected to pay later. Please complete your payment within 3 days to secure your spot.
                You can pay via Paynow or upload proof of payment from your dashboard.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 24px 0;">
                    <a href="${dashboardLink}"
                       style="background: linear-gradient(135deg, #ffcc00, #f59e0b); color: #000; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 16px; font-weight: bold; display: inline-block;">
                      Go to My Dashboard
                    </a>
                  </td>
                </tr>
              </table>
              <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
              <p style="font-size: 14px; color: #999;">
                If you have any questions, contact us at info@evolveictsummit.com
              </p>
            </td>
          </tr>
          <tr>
            <td style="background: #1a1a2e; padding: 20px; text-align: center;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                &copy; 2026 Evolve ICT Summit. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function buildReminderEmailHtml({
  name,
  orderId,
  amount,
  dueDate,
  dashboardLink,
}: {
  name: string
  orderId: string
  amount: number
  dueDate: string
  dashboardLink: string
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f4f4f4; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, #e53e3e, #c53030); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Payment Reminder</h1>
              <p style="color: #feb2b2; margin: 8px 0 0; font-size: 16px;">Evolve ICT Summit 2026</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="font-size: 18px; color: #333;">Hi ${name},</p>
              <p style="font-size: 16px; color: #555; line-height: 1.6;">
                This is a friendly reminder that your payment of <strong>$${amount.toLocaleString()}</strong> for the Evolve ICT Summit 2026 is due by <strong>${dueDate}</strong>.
              </p>
              <table width="100%" cellpadding="12" style="background: #fff5f5; border-radius: 12px; margin: 24px 0; border: 1px solid #fecaca;">
                <tr>
                  <td style="font-size: 14px; color: #888;">Order ID</td>
                  <td style="font-size: 14px; color: #333; font-weight: bold;">${orderId}</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #888;">Amount Due</td>
                  <td style="font-size: 14px; color: #e53e3e; font-weight: bold;">$${amount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #888;">Due Date</td>
                  <td style="font-size: 14px; color: #e53e3e; font-weight: bold;">${dueDate}</td>
                </tr>
              </table>
              <p style="font-size: 16px; color: #555; line-height: 1.6;">
                Please complete your payment or upload proof of payment from your dashboard to avoid losing your spot.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 24px 0;">
                    <a href="${dashboardLink}"
                       style="background: linear-gradient(135deg, #ffcc00, #f59e0b); color: #000; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 16px; font-weight: bold; display: inline-block;">
                      Pay Now or Upload POP
                    </a>
                  </td>
                </tr>
              </table>
              <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
              <p style="font-size: 14px; color: #999;">
                If you have already paid, please ignore this message. Questions? Email info@evolveictsummit.com
              </p>
            </td>
          </tr>
          <tr>
            <td style="background: #1a1a2e; padding: 20px; text-align: center;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                &copy; 2026 Evolve ICT Summit. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
