'use client'

import { FadeIn } from '@/components/fade-in'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { BookOpen, CalendarDays, Download, Sparkles, Users } from 'lucide-react'
import Link from 'next/link'

const brochureHighlights = [
  { icon: CalendarDays, text: 'Event schedule and experience flow' },
  { icon: Users, text: 'Speaker and partner overview' },
  { icon: Sparkles, text: 'Sponsorship and exhibition opportunities' },
  { icon: BookOpen, text: 'Workshops, tracks, and planning details' },
]

export default function Brochure() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Download The Brochure"
        title="A sharper brochure page with"
        accent="clearer calls to action"
        description="This page now feels like a polished event download hub instead of a generic file link, with stronger visual emphasis on what visitors get inside the brochure."
        primaryCta={{ href: '/brochure.pdf', label: 'Open Brochure' }}
        secondaryCta={{ href: '/program', label: 'View Program' }}
        image="/bg-v.jpg"
        imageAlt="Brochure-style event visual"
        compact
      />

      <section className="section-padding px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Inside The Guide"
            title="Everything a delegate, partner, or speaker needs to plan ahead."
            description="The redesigned layout makes the brochure feel more valuable before someone even clicks download."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {brochureHighlights.map((item, index) => {
              const Icon = item.icon

              return (
                <FadeIn key={item.text} delay={index * 90}>
                  <div className="event-surface rounded-[1.8rem] p-6">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))] text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-lg font-medium text-slate-800">{item.text}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>

          <FadeIn delay={180}>
            <div className="event-panel-dark mt-10 rounded-[2.2rem] p-8 text-center md:p-12">
              <div className="mx-auto max-w-2xl">
                <h2 className="text-4xl font-semibold text-white">Download the event brochure</h2>
                <p className="mt-4 text-slate-300">
                  Access the PDF guide for a fuller look at the summit, program structure, speaker
                  opportunities, and planning essentials.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mt-8 rounded-full bg-[var(--brand-gold)] px-7 text-slate-950 hover:bg-[#ffe36b]"
                >
                  <Link href="/brochure.pdf" target="_blank" rel="noopener noreferrer">
                    Download PDF
                    <Download className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <p className="mt-4 text-sm text-slate-400">File: `/public/brochure.pdf`</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
