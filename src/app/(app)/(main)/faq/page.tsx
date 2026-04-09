'use client'

import { FadeIn } from '@/components/fade-in'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Briefcase, HelpCircle, Mail, Search, Shield, Star, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

type FaqItem = {
  q: string
  a: string
}

type FaqCategory = {
  id: 'general' | 'exhibitors' | 'partners' | 'sponsors'
  title: string
  Icon: React.ComponentType<{ className?: string }>
  questions: FaqItem[]
}

const faqCategories: FaqCategory[] = [
  {
    id: 'general',
    title: 'General Questions',
    Icon: HelpCircle,
    questions: [
      {
        q: 'When will tickets be available for purchase?',
        a: 'Early bird tickets will be available starting March 1, 2026. Sign up for our newsletter to get notified about ticket releases and exclusive discounts.',
      },
      {
        q: 'Is the venue accessible for people with disabilities?',
        a: 'Yes, the Harare International Conference Centre is fully accessible with wheelchair ramps, accessible restrooms, and dedicated seating areas.',
      },
      {
        q: 'Will there be virtual attendance options?',
        a: 'Yes. We offer hybrid attendance options, including virtual passes for those who cannot attend in person.',
      },
      {
        q: 'What is the refund policy?',
        a: "Full refunds are available up to 30 days before the event. After that, tickets can be transferred to another person or credited toward next year's summit.",
      },
    ],
  },
  {
    id: 'exhibitors',
    title: 'Exhibitors',
    Icon: Briefcase,
    questions: [
      {
        q: 'How do I reserve an exhibition booth?',
        a: 'Exhibitor booths are reserved through our registration flow under the exhibitor option. Booths are allocated on a first-come, first-served basis.',
      },
      {
        q: 'What is included with an exhibitor booth?',
        a: 'Booth packages include a 3x3m space, one table, two chairs, and access to power and Wi-Fi. Additional amenities can be requested.',
      },
      {
        q: 'Can I customize my booth space?',
        a: 'Yes, exhibitors can customize their booth space with banners and displays. Please inform us of any special requirements in advance.',
      },
    ],
  },
  {
    id: 'partners',
    title: 'Partners',
    Icon: Users,
    questions: [
      {
        q: 'How can my organization become a partner?',
        a: 'Reach out to partnerships@evolveictsummit.com with a short proposal and objectives. The team will respond within 3 business days.',
      },
      {
        q: 'What benefits do partners receive?',
        a: 'Partners receive brand visibility across summit materials, complimentary tickets, and access to curated networking sessions with speakers and sponsors.',
      },
      {
        q: 'Are there different partnership levels?',
        a: 'Yes. We offer strategic, official, and supporting partnership levels with varying benefits and visibility options.',
      },
    ],
  },
  {
    id: 'sponsors',
    title: 'Sponsors',
    Icon: Star,
    questions: [
      {
        q: 'What sponsorship tiers are available?',
        a: 'We offer platinum, gold, silver, and bronze tiers with varying levels of exposure and benefits. Details are available on the partnerships page.',
      },
      {
        q: 'Can I customize a sponsorship package?',
        a: 'Yes. We can tailor packages to your goals—reach out to the team and we’ll shape a plan that matches your audience and activation needs.',
      },
    ],
  },
]

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategoryId, setActiveCategoryId] = useState<FaqCategory['id'] | 'all'>('all')

  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const filteredByQuery = faqCategories
      .map((category) => ({
        ...category,
        questions:
          query.length === 0
            ? category.questions
            : category.questions.filter(
                (q) => q.q.toLowerCase().includes(query) || q.a.toLowerCase().includes(query),
              ),
      }))
      .filter((category) => category.questions.length > 0)

    if (activeCategoryId === 'all') return filteredByQuery
    return filteredByQuery.filter((category) => category.id === activeCategoryId)
  }, [activeCategoryId, searchQuery])

  const totalMatches = filteredCategories.reduce((sum, category) => sum + category.questions.length, 0)

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Help Center"
        title="Frequently asked questions for"
        accent="attendees and partners"
        description="The refreshed FAQ experience keeps answers easy to find, while matching the same modern event atmosphere and motion used across the rest of the site."
        primaryCta={{ href: '/register', label: 'Register Now' }}
        secondaryCta={{ href: '/contact', label: 'Contact Support' }}
        image="/bg-1.jpg"
        imageAlt="Summit stage lighting and audience"
        compact
      />

      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Search & Browse"
            title="Find your answer quickly."
            description="Search across tickets, exhibitor logistics, sponsorship, partnerships, and general event questions."
          />

          <FadeIn>
            <div className="event-surface rounded-[2rem] p-6 md:p-8">
              <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search the FAQ…"
                    className="h-12 w-full rounded-full border border-slate-200/80 bg-white px-12 text-slate-900 shadow-sm outline-none transition focus:border-[rgba(57,214,255,0.5)] focus:ring-4 focus:ring-[rgba(57,214,255,0.14)]"
                  />
                  {searchQuery.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-sm font-semibold text-slate-500 hover:bg-slate-100"
                    >
                      Clear
                    </button>
                  ) : null}
                </div>

                <div className="rounded-full border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">{totalMatches}</span> matches
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveCategoryId('all')}
                  className={`rounded-full border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-50 ${
                    activeCategoryId === 'all' ? 'border-slate-900 text-slate-950' : ''
                  }`}
                >
                  All
                </Button>
                {faqCategories.map((category) => {
                  const active = activeCategoryId === category.id
                  const Icon = category.Icon
                  return (
                    <Button
                      key={category.id}
                      type="button"
                      variant="outline"
                      onClick={() => setActiveCategoryId(active ? 'all' : category.id)}
                      className={`rounded-full border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-50 ${
                        active ? 'border-[rgba(57,214,255,0.6)] text-slate-950' : ''
                      }`}
                    >
                      <Icon className="mr-2 h-4 w-4 text-[var(--brand-blue)]" />
                      {category.title}
                    </Button>
                  )
                })}
              </div>
            </div>
          </FadeIn>

          <div className="mt-10 space-y-6">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, categoryIndex) => {
                const Icon = category.Icon
                return (
                  <FadeIn key={category.id} delay={categoryIndex * 90}>
                    <div className="event-surface rounded-[2rem] p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))] text-white">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-semibold text-slate-950">{category.title}</h2>
                          <p className="text-sm text-slate-500">
                            {category.questions.length} question{category.questions.length === 1 ? '' : 's'}
                          </p>
                        </div>
                      </div>

                      <Accordion type="single" collapsible className="mt-6 space-y-3">
                        {category.questions.map((faq, index) => (
                          <AccordionItem
                            key={`${category.id}-${faq.q}`}
                            value={`${category.id}-${index}`}
                            className="rounded-[1.35rem] border border-slate-200/70 bg-white/70 px-1"
                          >
                            <AccordionTrigger className="px-5 py-4 text-left text-base font-semibold text-slate-900 hover:no-underline">
                              {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="px-5 pb-5 text-slate-600">
                              {faq.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </FadeIn>
                )
              })
            ) : (
              <FadeIn>
                <div className="event-surface rounded-[2rem] p-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(67,97,238,0.12)] text-[var(--brand-blue)]">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-slate-950">No results found</h3>
                  <p className="mt-3 text-slate-600">Try a different keyword or clear your filters.</p>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container-custom">
          <FadeIn>
            <div className="event-panel-dark rounded-[2.2rem] p-8 md:p-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                    Still need help?
                  </div>
                  <h2 className="mt-5 text-4xl font-semibold text-white">Talk to the team.</h2>
                  <p className="mt-4 max-w-2xl text-slate-300">
                    For sponsorship, exhibitor logistics, speaker inquiries, or registration support, reach out and we’ll respond as quickly as possible.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-[var(--brand-gold)] px-7 text-slate-950 hover:bg-[#ffe36b]"
                  >
                    <Link href="/contact">
                      Contact Support
                      <Mail className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full border-white/16 bg-white/6 px-7 text-white hover:bg-white/12"
                  >
                    <Link href="/partnerships">Partnerships</Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
