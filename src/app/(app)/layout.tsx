import React from 'react'
import './styles.css'
import { Toaster } from 'sonner'
import { Footer } from '@/components/footer'

export const metadata = {
  title: "Evolve ICT Summit 2026 | Empowering Africa's Digital Leap",
  description:
    "Join us at the Evolve ICT Summit 2026 on June 11-12 at HICC, Zimbabwe. Africa's premier digital transformation forum uniting leaders in technology, business, and innovation.",
  keywords:
    'ICT Summit, Evolve Africa, Digital Transformation, Technology Conference, Zimbabwe, HICC, Innovation, African Tech, Fourth Industrial Revolution',
  openGraph: {
    title: 'Evolve ICT Summit 2026',
    description: "Empowering Africa's Digital Leap - June 11-12, 2026 at HICC, Zimbabwe",
    type: 'website',
    locale: 'en_US',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
