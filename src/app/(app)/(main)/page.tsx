'use client'

import { useState } from 'react'
import { CountdownTimer } from '@/components/countdown-timer'
import { FadeIn } from '@/components/fade-in'
import HeroSection from '@/components/hero-section'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Award,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Clock,
  Globe,
  Lightbulb,
  MapPin,
  Network,
  Play,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react'
import Link from 'next/link'

const experiences = [
  {
    icon: Network,
    title: 'Strategic Networking',
    description:
      'Connect ministries, enterprises, startups, universities, and investors in one room.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Showcases',
    description:
      'Turn exhibitions and demos into headline moments with polished presentation spaces.',
  },
  {
    icon: Shield,
    title: 'High-Trust Conversations',
    description:
      'Shape policy, infrastructure, security, and growth strategies with industry leaders.',
  },
  {
    icon: Zap,
    title: 'Immersive Event Energy',
    description:
      'Blend live motion, dynamic staging, and memorable attendee journeys from first click onward.',
  },
]

const journey = [
  'Keynotes from continental tech and policy voices',
  'Investor, sponsor, and talent matchmaking sessions',
  'Hands-on masterclasses for builders and students',
  'Startup showcases, demos, and partnership lounges',
]

const stats = [
  { value: '2,000+', label: 'Delegates expected' },
  { value: '50+', label: 'Expert speakers' },
  { value: '100+', label: 'Featured exhibitors' },
  { value: '30+', label: 'Global partners' },
]

const scheduleEvents = [
  { time: '09:00 AM', title: 'Opening Keynote', speaker: 'Dr. Sarah Chen', location: 'Main Hall' },
  {
    time: '10:30 AM',
    title: 'AI in African Markets',
    speaker: 'Marcus Johnson',
    location: 'Room A',
  },
  { time: '12:00 PM', title: 'Networking Lunch', speaker: '', location: 'Exhibition Area' },
  {
    time: '02:00 PM',
    title: 'Startup Pitch Competition',
    speaker: 'Various',
    location: 'Innovation Lab',
  },
  {
    time: '04:00 PM',
    title: 'Panel: Future of Tech',
    speaker: 'Multiple Speakers',
    location: 'Main Hall',
  },
]

const speakers = [
  { name: 'Dr. Sarah Chen', role: 'CEO, TechVentures Africa', image: '/placeholder-speaker-1.jpg' },
  { name: 'Marcus Johnson', role: 'Founder, AI Solutions', image: '/placeholder-speaker-2.jpg' },
  {
    name: 'Amara Okonkwo',
    role: 'Director, Digital Innovation',
    image: '/placeholder-speaker-3.jpg',
  },
  { name: 'David Mwangi', role: 'CTO, Kenya Tech Hub', image: '/placeholder-speaker-4.jpg' },
]

const testimonials = [
  {
    quote: 'This summit transformed how we approach digital transformation in our organization.',
    name: 'James Wilson',
    company: 'TechCorp Ltd',
  },
  {
    quote: 'The networking opportunities were invaluable. We found three key partners here.',
    name: 'Lisa Chen',
    company: 'Innovate Africa',
  },
  {
    quote: "Best tech event I've attended in Africa. The quality of speakers was exceptional.",
    name: 'Robert Kimani',
    company: 'Digital Solutions',
  },
]

const faqs = [
  {
    question: 'When is the summit taking place?',
    answer:
      'The summit will be held on June 11-12, 2026 at the Harare International Conference Centre.',
  },
  {
    question: 'How can I register?',
    answer:
      'You can register through our registration page. Early bird pricing is available until May 1st, 2026.',
  },
  {
    question: 'Is there a virtual attendance option?',
    answer:
      'Yes, we offer both in-person and virtual attendance options with full access to keynotes and sessions.',
  },
  {
    question: 'What COVID-19 safety measures are in place?',
    answer:
      'We will follow all local health guidelines and provide sanitization stations throughout the venue.',
  },
]

function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <FadeIn delay={index * 50}>
      <div className="event-surface overflow-hidden rounded-[1.25rem]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between p-5 text-left"
        >
          <span className="font-semibold text-slate-950">{faq.question}</span>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-slate-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-500" />
          )}
        </button>
        {isOpen && (
          <div className="px-5 pb-5">
            <p className="text-slate-600">{faq.answer}</p>
          </div>
        )}
      </div>
    </FadeIn>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="relative -mt-10 px-4 pb-8 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="container-custom event-panel-dark rounded-[2rem] p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
                  Countdown To Launch
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                  Don&apos;t miss Africa&apos;s next defining digital gathering.
                </h2>
                <p className="mt-4 max-w-xl text-slate-300">
                  Early momentum matters. The site now leads with motion, atmosphere, and a premium
                  event feel that makes registration and exploration more compelling.
                </p>
              </div>
              <CountdownTimer />
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Event Vision"
            title="A modern summit website that feels like the event already started."
            description="Every section is designed to feel more premium, kinetic, and focused on the moments attendees care about most."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {experiences.map((item, index) => {
              const Icon = item.icon

              return (
                <FadeIn key={item.title} delay={index * 100}>
                  <div className="event-surface event-card-hover rounded-[1.8rem] p-6">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))] text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative h-[500px] overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <video className="h-full w-full object-cover" autoPlay loop muted playsInline>
            <source
              src="https://cdn.coverr.co/videos/coverr-abstract-digital-animation-8762/1080p.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50" />
        </div>
        <div className="relative flex h-full items-center">
          <div className="container-custom">
            <FadeIn>
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex rounded-full bg-[var(--brand-gold)]/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                  Watch Previous Summit
                </div>
                <h2 className="text-4xl font-semibold text-white md:text-5xl">
                  Experience the energy of past summits
                </h2>
                <p className="mt-4 text-lg text-slate-300">
                  Relive the highlights from our previous events and see why this is Africa's
                  premier tech gathering.
                </p>
                <Button className="mt-6 rounded-full bg-white text-slate-950 hover:bg-white/90">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Highlights
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Impact Snapshot"
            title="Momentum you can see at a glance."
            description="The redesigned surfaces use clearer hierarchy and stronger visual contrast to make event value instantly legible."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 90}>
                <div className="event-surface rounded-[1.8rem] p-7 text-center">
                  <div className="text-4xl font-semibold text-slate-950">{stat.value}</div>
                  <div className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-500">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Event Schedule"
            title="Two days of impactful sessions and networking."
            description="Explore our carefully curated agenda designed to inspire, educate, and connect."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <FadeIn>
              <div className="event-surface rounded-[2rem] p-6 md:p-8">
                <h3 className="mb-6 text-2xl font-semibold text-slate-950">
                  Day 1 - June 11, 2026
                </h3>
                <div className="space-y-4">
                  {scheduleEvents.slice(0, 3).map((event, index) => (
                    <div
                      key={index}
                      className="flex gap-4 rounded-[1.25rem] border border-slate-200/60 bg-white/50 p-4"
                    >
                      <div className="flex flex-col items-center justify-center rounded-[1rem] bg-[var(--brand-blue)]/10 px-3 py-2 text-center">
                        <Clock className="h-4 w-4 text-[var(--brand-blue)]" />
                        <span className="mt-1 text-xs font-semibold text-[var(--brand-blue)]">
                          {event.time}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-950">{event.title}</h4>
                        <p className="text-sm text-slate-500">
                          {event.speaker} • {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={120}>
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-6 md:p-8">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80')] bg-cover bg-center opacity-20" />
                <div className="relative">
                  <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                    Event Highlight
                  </div>
                  <div className="aspect-video w-full overflow-hidden rounded-[1.25rem] bg-slate-800">
                    <video className="h-full w-full object-cover" autoPlay loop muted playsInline>
                      <source
                        src="https://cdn.coverr.co/videos/coverr-business-conference-1675/1080p.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">Opening Ceremony</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Join us for an unforgettable opening with special performances and keynote
                    address.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[linear-gradient(180deg,#eef4ff,#f8fafc)] px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Featured Speakers"
            title="Learn from industry leaders and innovators."
            description="Meet the experts shaping Africa's digital future."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {speakers.map((speaker, index) => (
              <FadeIn key={speaker.name} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-[1.8rem]">
                  <div className="aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-800/10">
                      <div className="text-center">
                        <Users className="mx-auto h-12 w-12 text-slate-400" />
                        <p className="mt-2 text-sm text-slate-500">Speaker Photo</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h4 className="text-lg font-semibold text-white">{speaker.name}</h4>
                    <p className="text-sm text-white/80">{speaker.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-2 border-slate-300 px-6"
            >
              <Link href="/speakers">
                View All Speakers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="What Attendees Say"
            title="Hear from past attendees."
            description="The feedback from our community keeps us motivated."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={testimonial.name} delay={index * 100}>
                <div className="event-surface rounded-[1.8rem] p-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Award
                        key={i}
                        className="h-5 w-5 fill-[var(--brand-gold)] text-[var(--brand-gold)]"
                      />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed text-slate-700">"{testimonial.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-blue)] text-white">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[linear-gradient(180deg,#f8fafc,#eef4ff)] px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions."
              description="Find answers to common questions about the summit."
            />

            <div className="mt-10 space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={faq.question} faq={faq} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <video className="h-full w-full object-cover" autoPlay loop muted playsInline>
            <source
              src="https://cdn.coverr.co/videos/coverr-particles-abstract-background-1568/1080p.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-blue)]/90 to-[var(--brand-cyan)]/80" />
        </div>
        <div className="relative py-16 md:py-24">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold text-white md:text-4xl">
                  Stay updated with our newsletter
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Get the latest updates on speakers, schedule, and exclusive offers directly to
                  your inbox.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full border-2 border-white/20 bg-white/10 px-5 py-3 text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none"
                />
                <Button className="rounded-full bg-white px-6 text-[var(--brand-blue)] hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding px-4 pb-24 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="container-custom event-panel-dark rounded-[2.2rem] p-8 text-center md:p-12">
            <div className="mx-auto max-w-3xl">
              <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                Ready To Join?
              </div>
              <h2 className="mt-5 text-4xl font-semibold text-white md:text-5xl">
                Bring your team, your ambition, and your next big idea.
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Register for the summit, explore partnerships, or discover the student track.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[var(--brand-gold)] px-7 text-slate-950 hover:bg-[#ffe36b]"
                >
                  <Link href="/register">Register Now</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/16 bg-white/6 px-7 text-white hover:bg-white/12"
                >
                  <Link href="/partnerships">Become a Partner</Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
