import { ArrowRight, Calendar, MapPin, Play, Sparkles } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { FadeIn } from './fade-in'

function HeroSection() {
  const highlights = [
    '2,000+ delegates',
    '50+ expert speakers',
    '100+ exhibitors',
    'Hybrid experiences',
    'Investor networking',
    'Student innovation labs',
  ]

  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-12 pt-28 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[#040816]" />
      <Image
        src="/bg-1.jpg"
        alt="ICT Summit Background"
        fill
        className="object-cover opacity-35"
        priority
        quality={100}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,214,255,0.18),transparent_26%),linear-gradient(125deg,rgba(4,8,22,0.92),rgba(9,16,36,0.82),rgba(12,24,58,0.94))]" />
      <div className="hero-noise" />
      <div className="event-grid absolute inset-0 opacity-20" />
      <div className="floating-orb left-[6%] top-24 h-32 w-32 bg-cyan-400/20" />
      <div className="floating-orb bottom-24 right-[8%] h-44 w-44 bg-amber-300/16" />

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <FadeIn>
            <div className="max-w-3xl">
              <div className="event-chip mb-6 text-sm font-medium text-white/90">
                <Sparkles className="h-4 w-4 text-[var(--brand-gold)]" />
                <span>{`Africa's Premier Digital Experience Summit`}</span>
              </div>

              <h1 className="section-title text-balance text-white">
                Evolve ICT Summit
                <span className="aurora-text block">2026</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200/90 md:text-xl">
                A cinematic, future-facing event destination for founders, students, policy
                leaders, and digital builders shaping Africa&apos;s next leap.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-200/80">
                <div className="event-chip">
                  <Calendar className="h-4 w-4 text-[var(--brand-gold)]" />
                  <span>June 11-12, 2026</span>
                </div>
                <div className="event-chip">
                  <MapPin className="h-4 w-4 text-[var(--brand-cyan)]" />
                  <span>Harare International Conference Centre</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="rounded-full bg-[var(--brand-gold)] px-7 text-slate-950 hover:bg-[#ffe36b]"
                  asChild
                >
                  <Link href="/register">
                    Register Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/6 px-7 text-white hover:bg-white/12"
                  asChild
                >
                  <Link href="/gallery">
                    Watch Highlights
                    <Play className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="event-panel-dark relative overflow-hidden rounded-[2rem] p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,204,0,0.16),transparent_35%)]" />
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10">
                <Image
                  src="/event-pulse.gif"
                  alt="Animated summit atmosphere"
                  width={900}
                  height={900}
                  unoptimized
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02050e] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-[1.35rem] border border-white/10 bg-black/35 p-5 backdrop-blur-md">
                    <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/70">
                      Motion-first experience
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      Designed to feel alive before attendees even arrive.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-4 grid grid-cols-2 gap-3">
                {[
                  { value: '2K+', label: 'delegates' },
                  { value: '50+', label: 'speakers' },
                  { value: '100+', label: 'exhibitors' },
                  { value: '30+', label: 'partners' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.2rem] border border-white/10 bg-white/6 p-4 backdrop-blur"
                  >
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm capitalize text-slate-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="marquee mt-12">
          <div className="marquee-track">
            {[...highlights, ...highlights].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm text-white/85 backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
