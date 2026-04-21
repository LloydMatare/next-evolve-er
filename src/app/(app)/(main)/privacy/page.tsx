import { FadeIn } from '@/components/fade-in'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Lock, Mail, Shield, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const sections = [
  {
    title: 'Information We Collect',
    items: ['Registration and contact details', 'Professional and attendance preferences', 'Payment and transaction information', 'Website analytics and service usage'],
  },
  {
    title: 'How We Use It',
    items: ['To deliver registrations and event logistics', 'To share updates and summit communications', 'To improve digital experiences and support', 'To comply with legal and operational needs'],
  },
  {
    title: 'How We Protect It',
    items: ['Restricted internal access', 'Secure payment processing', 'Operational safeguards and updates', 'Reasonable protection of personal data'],
  },
  {
    title: 'When We Share It',
    items: ['With essential event service providers', 'When legally required', 'With partners only where consent or clear necessity exists', 'In aggregated anonymous forms for reporting'],
  },
]

const rights = [
  'Access your personal data',
  'Correct inaccurate information',
  'Request deletion where applicable',
  'Restrict or object to certain processing',
  'Request data portability where supported',
]

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Privacy Policy"
        title="A clearer trust experience for"
        accent="data protection"
        description="Even policy pages should feel intentional. This refreshed layout keeps legal information easier to scan while matching the rest of the event site."
        primaryCta={{ href: '/contact', label: 'Contact The Team' }}
        secondaryCta={{ href: '/', label: 'Back to Home' }}
        image="/bg-2.jpg"
        imageAlt="Abstract digital privacy visual"
        compact
      />

      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Policy Overview"
            title="Simple structure, clearer hierarchy, less friction."
            description="This policy presentation is designed to be more readable on both desktop and mobile while keeping the important details prominent."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((section, index) => (
              <FadeIn key={section.title} delay={index * 90}>
                <div className="event-surface rounded-[1.8rem] p-7">
                  <h2 className="text-2xl font-semibold text-slate-950">{section.title}</h2>
                  <div className="mt-5 space-y-3">
                    {section.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.15rem] border border-slate-200/70 bg-white/80 p-4 text-sm text-slate-700"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[linear-gradient(180deg,#081021,#101933)] px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container-custom grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <FadeIn>
            <div className="event-panel-dark rounded-[2rem] p-8 md:p-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-gold),#ffd96c)] text-slate-950">
                <Shield className="h-6 w-6" />
              </div>
              <h2 className="text-4xl font-semibold text-white">Your data rights</h2>
              <div className="mt-6 space-y-4">
                {rights.map((right) => (
                  <div
                    key={right}
                    className="rounded-[1.2rem] border border-white/10 bg-white/6 p-4 text-slate-200"
                  >
                    {right}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="event-surface rounded-[2rem] p-8 md:p-10">
              <SectionHeading
                eyebrow="Questions?"
                title="Reach out if you need privacy or registration support."
                description="For privacy concerns, registration records, or data requests, contact the event team directly."
                align="left"
              />

              <div className="space-y-4">
                <div className="rounded-[1.25rem] border border-slate-200/70 bg-white/80 p-5 text-slate-700">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[var(--brand-blue)]" />
                    <span>info@evolveictsummit.com</span>
                  </div>
                </div>
                <div className="rounded-[1.25rem] border border-slate-200/70 bg-white/80 p-5 text-slate-700">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-[var(--brand-cyan)]" />
                    <span>Support available during business hours in CAT</span>
                  </div>
                </div>
                <div className="rounded-[1.25rem] border border-slate-200/70 bg-white/80 p-5 text-slate-700">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-[var(--brand-gold)]" />
                    <span>Last updated: April 8, 2026</span>
                  </div>
                </div>
              </div>

              <Button asChild className="mt-6 rounded-full bg-slate-950 text-white hover:bg-slate-800">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
