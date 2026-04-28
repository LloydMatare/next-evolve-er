'use client'

import { useState, useEffect } from 'react'
import { CountdownTimer } from '@/components/countdown-timer'
import { FadeIn } from '@/components/fade-in'
import HeroSection from '@/components/hero-section'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
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
      'Connecting government, private sector, academica and students into one collaborative ecosystem.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Showcases',
    description:
      'Showcasing African-built solutions, innovation stories and emerging technology breakthrough.',
  },
  {
    icon: Shield,
    title: 'Expert Insights',
    description:
      'Driving conversations that shape digital policy, infrastructure groeth, and future-ready development.',
  },
  {
    icon: Zap,
    title: 'Growth Opportunities',
    description:
      'Expanding opportunities for investmen, partnerships, and technology transfer across borders.',
  },
]

const journey = [
  'Keynotes from continental tech and policy voices',
  'Investor, sponsor, and talent matchmaking sessions',
  'Hands-on masterclasses for builders and students',
  'Startup showcases, demos, and partnership lounges',
]

const stats = [
  { value: '100+', label: 'Delegates expected' },
  { value: '10+', label: 'Expert speakers' },
  { value: '30+', label: 'Featured exhibitors' },
  { value: '10+', label: 'Global partners' },
]

const scheduleEvents = [
  {
    time: '09:00 AM',
    title: 'Opening Keynote',
    speaker: 'Dr. T.A. Mavetera',
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
    name: 'Dr W Rukanda',
    company: 'Monipac',
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
  const [featuredSpeakers, setFeaturedSpeakers] = useState<{
    name: string
    role: string
    image: string
    bio: string
    twitter?: string
    linkedin?: string
  }>([])
  const [loadingSpeakers, setLoadingSpeakers] = useState(true)
  const [selectedSpeaker, setSelectedSpeaker] = useState<(typeof featuredSpeakers)[0] | null>(null)

  const [booths, setBooths] = useState<{
    id: string
    number: string
    company: string
    logo: string
    description: string
    website?: string
    position: { x: number; y: number; width: number; height: number }
  }>([])
  const [selectedBooth, setSelectedBooth] = useState<(typeof booths)[0] | null>(null)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartY, setDragStartY] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const boothsPerPage = 60 // 5 rows * 12 columns

  useEffect(() => {
    const fetchFeaturedSpeakers = async () => {
      try {
        const response = await fetch('/api/speakers?limit=4&sort=-order')
        if (response.ok) {
          const data = await response.json()
          const speakers = (data.docs || []).map((s: any) => ({
            name: s.name,
            role: s.designation,
            image: s.photo?.url || '',
            bio: s.bio,
            twitter: s.twitter,
            linkedin: s.linkedin,
          }))
          setFeaturedSpeakers(speakers)
        }
      } catch (error) {
        console.error('Error fetching speakers:', error)
      } finally {
        setLoadingSpeakers(false)
      }
    }

    const fetchBooths = async () => {
      try {
        const response = await fetch('/api/registrations?where[type][equals]=exhibitor&limit=100')
        console.log('Booths response:', response.status, response.ok)
        if (response.ok) {
          const data = await response.json()
          console.log('Booths data:', data)
          const boothData = (data.docs || [])
            .filter((reg: any) => reg.boothNumber && reg.status === 'paid')
            .map((reg: any, index: number) => ({
              id: reg.id,
              number: reg.boothNumber,
              company: reg.companyName || reg.firstName + ' ' + reg.lastName,
              logo: reg.companyLogo?.url || '',
              description: reg.productsServices || '',
              website: reg.website,
              position: {
                x: 100 + (index % 5) * 150, // Example positions
                y: 100 + Math.floor(index / 5) * 120,
                width: 120,
                height: 80,
              },
            }))
          console.log('Filtered booth data:', boothData)
          // If no booths, add some mock data for testing
          if (boothData.length === 0) {
            const mockBooths = []
            for (let i = 1; i <= 63; i++) {
              mockBooths.push({
                id: `mock${i}`,
                number: `G${i}`,
                company: `Company ${i}`,
                logo: '',
                description: `Description for booth G${i}`,
                website: 'https://example.com',
                position: { x: 0, y: 0, width: 120, height: 80 }, // Position will be calculated in render
              })
            }
            setBooths(mockBooths)
          } else {
            setBooths(boothData)
          }
        }
      } catch (error) {
        console.error('Error fetching booths:', error)
      }
    }

    fetchFeaturedSpeakers()
    fetchBooths()
  }, [])

  // Pagination calculations
  const totalPages = Math.ceil(booths.length / boothsPerPage)
  const startIndex = (currentPage - 1) * boothsPerPage
  const endIndex = startIndex + boothsPerPage
  const currentBooths = booths.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSelectedBooth(null) // Clear selection when changing pages
  }

  const speakersToShow = featuredSpeakers.length > 0 ? featuredSpeakers : speakers

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

      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Exhibition Floor Plan"
            title="Explore our exhibition booths."
            description="Click on the red-marked booths to learn more about our exhibitors."
          />

          <div className="mt-10 grid lg:grid-cols-3 gap-8">
            {/* Floor Plan - Left Side (2/3 width) */}
            <div className="lg:col-span-2">
              <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl shadow-lg p-6 min-h-[600px]">
                {/* Floor Plan Image with Zoom */}
                <div className="mb-6 flex justify-center">
                  <div className="relative group">
                    <img
                      src="/floor_plan_page.png"
                      alt="Exhibition Floor Plan"
                      className="w-full h-auto rounded-lg shadow-md border border-slate-300 max-h-[500px] cursor-pointer transition-transform duration-300 group-hover:scale-105"
                      onClick={() => setZoomedImage('/floor_plan_page.jpeg')}
                      onError={(e) => {
                        console.error('Failed to load floor plan image:', e.srcElement.src)
                        e.target.src = '/floor_plan_page.png' // Try PNG as fallback
                      }}
                    />
                  </div>
                </div>

                {/* Floor Plan Grid */}
                <div className="grid grid-cols-8 gap-2">
                  {/* Entrance */}
                  <div className="col-span-8 text-center py-3">
                    <div className="bg-blue-100 rounded-lg p-3 border-2 border-blue-300">
                      <h3 className="text-base font-semibold text-blue-800">ENTRANCE</h3>
                      <p className="text-xs text-blue-600">Main Exhibition Hall</p>
                    </div>
                  </div>

                  {/* Booth Areas */}
                  {currentBooths.map((booth, index) => {
                    // Calculate grid position based on index
                    const row = Math.floor(index / 8) + 1
                    const col = (index % 8) + 1

                    return (
                      <div
                        key={booth.id}
                        className={`rounded cursor-pointer flex flex-col items-center justify-center text-white font-bold text-xs transition-all duration-200 hover:scale-105 hover:shadow-lg p-2 min-h-[50px] ${
                          booth.id.startsWith('mock')
                            ? 'bg-gray-400 hover:bg-gray-500 border-2 border-gray-500 text-gray-900'
                            : 'bg-red-500 hover:bg-red-600 border-2 border-red-700'
                        }`}
                        style={{
                          gridColumn: col,
                          gridRow: row + 1, // +1 to account for entrance row
                        }}
                        onClick={() => setSelectedBooth(booth)}
                        title={`Click to view ${booth.company} details`}
                      >
                        <div className="text-center">
                          <div className="text-sm font-bold leading-tight">
                            G{index + 1 + (currentPage - 1) * boothsPerPage}
                          </div>
                          <div className="text-xs opacity-90 truncate max-w-full leading-tight">
                            {booth.company}
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* Empty spaces for layout */}
                  {Array.from({ length: Math.max(0, 40 - currentBooths.length) }, (_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="bg-slate-50 border border-slate-200 rounded opacity-50 min-h-[50px]"
                      style={{
                        gridColumn: (i % 8) + 1,
                        gridRow: Math.floor(i / 8) + Math.ceil(currentBooths.length / 8) + 1,
                      }}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 border border-red-700 rounded"></div>
                    <span>Occupied Booths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 border border-red-500 rounded"></div>
                    <span>Sample Booths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-50 border border-slate-200 rounded"></div>
                    <span>Available Space</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                    <span>Facilities</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booth List - Right Side (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booth Directory</h3>

                {/* Booth List */}
                <div className="space-y-2 max-h-[400px] overflow-y-auto mb-4">
                  {currentBooths.map((booth, index) => (
                    <div
                      key={booth.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedBooth?.id === booth.id
                          ? 'bg-red-50 border-red-200'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedBooth(booth)}
                    >
                      <div className="text-sm font-semibold text-gray-900">
                        Booth G{index + 1 + (currentPage - 1) * boothsPerPage}
                      </div>
                      <div className="text-xs text-gray-600 truncate">{booth.company}</div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                    >
                      ← Prev
                    </button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-2 py-1 text-sm rounded ${
                            currentPage === page
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                    >
                      Next →
                    </button>
                  </div>
                )}

                {/* Register Button */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Link href="/register?type=exhibitor">
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                      Register for Booth
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
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
            {!loadingSpeakers && featuredSpeakers.length === 0
              ? speakers.map((speaker, index) => (
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
                ))
              : speakersToShow.map((speaker, index) => (
                  <FadeIn key={speaker.name} delay={index * 100}>
                    <div
                      className="group relative overflow-hidden rounded-[1.8rem] cursor-pointer hover:ring-2 hover:ring-[#ffcc00] transition-all"
                      onClick={() => setSelectedSpeaker(speaker)}
                    >
                      {speaker.image ? (
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="aspect-[3/4] w-full object-cover"
                        />
                      ) : (
                        <div className="aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-800/10">
                            <div className="text-center">
                              <Users className="mx-auto h-12 w-12 text-slate-400" />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
                <Button className="rounded-full bg-white px-5 py-3 text-[var(--brand-blue)] hover:bg-white/90">
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
                  <Link href="/partnerships" className="text-white/80">
                    <p className="text-white/80">Become a Partner</p>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <Dialog open={!!selectedSpeaker} onOpenChange={() => setSelectedSpeaker(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {selectedSpeaker?.name}
            </DialogTitle>
            <DialogDescription className="text-lg font-medium text-[#ffcc00]">
              {selectedSpeaker?.role}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {selectedSpeaker?.image && (
              <img
                src={selectedSpeaker.image}
                alt={selectedSpeaker.name}
                className="w-full max-h-96 object-contain rounded-xl mb-4"
              />
            )}
            <p className="text-gray-600">{selectedSpeaker?.bio}</p>
            {(selectedSpeaker?.twitter || selectedSpeaker?.linkedin) && (
              <div className="mt-4 flex gap-4">
                {selectedSpeaker?.twitter && (
                  <a
                    href={`https://twitter.com/${selectedSpeaker.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Twitter
                  </a>
                )}
                {selectedSpeaker?.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${selectedSpeaker.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedBooth} onOpenChange={() => setSelectedBooth(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Booth {selectedBooth?.number} - {selectedBooth?.company}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedBooth?.logo && (
              <img
                src={selectedBooth.logo}
                alt={selectedBooth.company}
                className="w-full max-h-48 object-contain rounded-xl mb-4"
              />
            )}
            <p className="text-gray-600 mb-4">{selectedBooth?.description}</p>
            {selectedBooth?.website && (
              <div className="flex gap-4">
                <a
                  href={selectedBooth.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <Globe className="w-4 h-4" /> Visit Website
                </a>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Zoomed Floor Plan Dialog */}
      <Dialog
        open={!!zoomedImage}
        onOpenChange={() => {
          setZoomedImage(null)
          setZoomLevel(1)
          setPanX(0)
          setPanY(0)
        }}
      >
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">
              Exhibition Floor Plan - Zoom View
            </DialogTitle>
          </DialogHeader>
          <div className="relative mt-4">
            <button
              onClick={() => {
                setZoomedImage(null)
                setZoomLevel(1)
                setPanX(0)
                setPanY(0)
              }}
              className="absolute top-2 right-2 text-white hover:text-gray-200 bg-black/50 rounded-full p-2"
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex justify-center items-start">
              <div className="relative inline-block">
                {/* Zoom controls */}
                <div className="absolute top-2 left-2 flex space-x-2 bg-black/50 rounded-full p-1">
                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.25))}
                    className="text-white hover:text-gray-200 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(3, prev + 0.25))}
                    className="text-white hover:text-gray-200 px-2 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      setZoomLevel(1)
                      setPanX(0)
                      setPanY(0)
                    }}
                    className="text-white hover:text-gray-200 px-2 py-1 rounded"
                  >
                    1:1
                  </button>
                </div>
                <div
                  className="relative"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`,
                    transformOrigin: 'top left',
                    width: '100%',
                    height: '100%',
                    userSelect: 'none',
                  }}
                >
                  <img
                    src={zoomedImage}
                    alt="Exhibition Floor Plan (Zoomed)"
                    className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-xl border border-slate-300 cursor-grab"
                    onMouseDown={(e) => {
                      if (zoomLevel > 1) {
                        setIsDragging(true)
                        setDragStartX(e.clientX - panX)
                        setDragStartY(e.clientY - panY)
                      }
                    }}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseLeave={() => setIsDragging(false)}
                    onMouseMove={(e) => {
                      if (isDragging) {
                        setPanX(e.clientX - dragStartX)
                        setPanY(e.clientY - dragStartY)
                      }
                    }}
                    onWheel={(e) => {
                      e.preventDefault()
                      const delta = e.deltaY < 0 ? 0.1 : -0.1
                      setZoomLevel((prev) => {
                        const newZoom = Math.max(0.5, Math.min(3, prev + delta))
                        // Adjust pan to zoom towards mouse position
                        const zoomFactor = newZoom / prev
                        setPanX((prev) => (e.clientX - panX) * (1 - zoomFactor) + panX)
                        setPanY((prev) => (e.clientY - panY) * (1 - zoomFactor) + panY)
                        return newZoom
                      })
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
