'use client'

import { FadeIn } from '@/components/fade-in'
import { Button } from '@/components/ui/button'
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type HeroStat = {
  label: string
  value: string
}

type Cta = {
  href: string
  label: string
}

interface PageHeroProps {
  eyebrow: string
  title: string
  accent?: string
  description: string
  primaryCta?: Cta
  secondaryCta?: Cta
  image?: string
  imageAlt?: string
  stats?: HeroStat[]
  compact?: boolean
}

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  primaryCta,
  secondaryCta,
  image = '/bg-v.jpg',
  imageAlt = 'Event atmosphere',
  stats = [],
  compact = false,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-32 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[#060b18]" />
      <Image src={image} alt={imageAlt} fill priority className="object-cover opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(57,214,255,0.24),transparent_24%),linear-gradient(135deg,rgba(8,12,28,0.96),rgba(7,11,26,0.82),rgba(16,27,61,0.92))]" />
      <div className="hero-noise" />
      <div className="floating-orb left-[8%] top-28 h-32 w-32 bg-cyan-400/20" />
      <div className="floating-orb bottom-10 right-[10%] h-40 w-40 bg-amber-300/16" />

      <div className="container-custom relative z-10">
        <div
          className={`grid items-center gap-8 ${compact ? 'lg:grid-cols-[1.2fr_0.8fr]' : 'lg:grid-cols-[1.1fr_0.9fr]'}`}
        >
          <FadeIn>
            <div className="max-w-3xl">
              <div className="event-chip mb-6 text-sm font-medium text-white/90">
                <CalendarDays className="h-4 w-4 text-[var(--brand-gold)]" />
                <span>{eyebrow}</span>
              </div>

              <h1 className="section-title text-balance text-white">
                {title}
                {accent ? <span className="aurora-text block">{accent}</span> : null}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200/90">{description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-200/80">
                <div className="event-chip">
                  <CalendarDays className="h-4 w-4 text-[var(--brand-gold)]" />
                  <span>11-12 June 2026</span>
                </div>
                <div className="event-chip">
                  <MapPin className="h-4 w-4 text-[var(--brand-cyan)]" />
                  <span>Harare International Conference Centre</span>
                </div>
              </div>

              {(primaryCta || secondaryCta) && (
                <div className="mt-8 flex flex-wrap gap-4">
                  {primaryCta ? (
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full bg-[var(--brand-gold)] px-7 text-slate-950 hover:bg-[#ffe36b]"
                    >
                      <Link href={primaryCta.href}>
                        {primaryCta.label}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : null}
                  {secondaryCta ? (
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-full border-white/20 bg-white/6 px-7 text-white hover:bg-white/12"
                    >
                      <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                    </Button>
                  ) : null}
                </div>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="event-panel-dark relative overflow-hidden rounded-[2rem] p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,214,255,0.18),transparent_45%)]" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10">
                <Image
                  src={image}
                  alt={imageAlt}
                  width={900}
                  height={900}
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5 backdrop-blur-md">
                    <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/70">
                      Captivating Event Energy
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      Built for keynotes, networking, live demos, and moments people remember.
                    </p>
                  </div>
                </div>
              </div>

              {stats.length > 0 ? (
                <div className="relative mt-4 grid grid-cols-2 gap-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4 backdrop-blur"
                    >
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-slate-300">{stat.label}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
