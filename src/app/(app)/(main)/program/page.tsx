'use client'

import { FadeIn } from '@/components/fade-in'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Mic,
  Coffee,
  Utensils,
  Briefcase,
  Network,
  Video,
  ChevronRight,
  Download,
  Share2,
  Filter,
  Search,
  Loader2,
} from 'lucide-react'
import { useState, useEffect } from 'react'

// Types
interface ProgramSession {
  id: string
  title: string
  description: string
  day: 'day-1' | 'day-2'
  startTime: string
  endTime: string
  duration: string
  type: string
  track?: string
  speakerName?: string
  speakerTitle?: string
  venue: string
  capacity?: string
  featured: boolean
  color: string
  order: number
  createdAt: string
  updatedAt: string
}

const eventDays = [
  {
    id: 1,
    date: 'June 11, 2026',
    day: 'Day 1',
    theme: 'Digital Transformation & Innovation',
    color: 'from-blue-600 to-purple-600',
    value: 'day-1',
  },
  {
    id: 2,
    date: 'June 12, 2026',
    day: 'Day 2',
    theme: 'Future Tech & Sustainability',
    color: 'from-amber-600 to-orange-600',
    value: 'day-2',
  },
]

const tracks = [
  { id: 'all', name: 'All Tracks', color: 'bg-gray-100' },
  { id: 'main', name: 'Main Stage', color: 'bg-purple-100' },
  { id: 'ai', name: 'AI Track', color: 'bg-indigo-100' },
  { id: 'security', name: 'Security Track', color: 'bg-red-100' },
  { id: 'cloud', name: 'Cloud Track', color: 'bg-blue-100' },
  { id: 'fintech', name: 'Fintech Track', color: 'bg-green-100' },
  { id: 'entrepreneurship', name: 'Entrepreneurship Track', color: 'bg-amber-100' },
  { id: 'social', name: 'Social Event', color: 'bg-pink-100' },
]

const sessionTypes = [
  { id: 'all', name: 'All Types', icon: <Filter className="h-4 w-4" /> },
  { id: 'keynote', name: 'Keynotes', icon: <Mic className="h-4 w-4" /> },
  { id: 'panel', name: 'Panels', icon: <Users className="h-4 w-4" /> },
  { id: 'workshop', name: 'Workshops', icon: <Briefcase className="h-4 w-4" /> },
  { id: 'talk', name: 'Talks', icon: <Video className="h-4 w-4" /> },
  { id: 'networking', name: 'Networking', icon: <Network className="h-4 w-4" /> },
  { id: 'break', name: 'Breaks', icon: <Coffee className="h-4 w-4" /> },
  { id: 'registration', name: 'Registration', icon: <Users className="h-4 w-4" /> },
  { id: 'opening', name: 'Opening', icon: <Mic className="h-4 w-4" /> },
  { id: 'closing', name: 'Closing', icon: <Mic className="h-4 w-4" /> },
  { id: 'lunch', name: 'Lunch', icon: <Utensils className="h-4 w-4" /> },
]

export default function ProgramPage() {
  const [selectedDay, setSelectedDay] = useState<'day-1' | 'day-2'>('day-1')
  const [selectedTrack, setSelectedTrack] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sessions, setSessions] = useState<ProgramSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPrograms()
  }, [selectedDay, selectedTrack, selectedType, searchQuery])

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      setError(null)

      // Build query parameters
      const params = new URLSearchParams()
      params.append('day', selectedDay)

      if (selectedTrack !== 'all') {
        params.append('track', selectedTrack)
      }

      if (selectedType !== 'all') {
        params.append('type', selectedType)
      }

      if (searchQuery) {
        params.append('search', searchQuery)
      }

      const response = await fetch(`/api/programs-schedule?${params}`)

      if (!response.ok) {
        throw new Error('Failed to fetch program data')
      }

      const data = await response.json()

      if (data.success) {
        setSessions(data.data)
      } else {
        throw new Error(data.error || 'Failed to load programs')
      }
    } catch (err: any) {
      console.error('Error fetching programs:', err)
      setError(err.message || 'Failed to load program schedule')
      // Fallback to sample data if API fails
      setSessions(getSampleSessions())
    } finally {
      setLoading(false)
    }
  }

  const getSampleSessions = (): ProgramSession[] => {
    // Fallback data - you can keep your original timeSlots data here
    // Convert your original timeSlots to ProgramSession format
    return [] // Return empty array or sample data
  }

  const getVenueDisplayName = (venue: string): string => {
    const venues: Record<string, string> = {
      'main-auditorium': 'Main Auditorium',
      'room-a': 'Conference Room A',
      'room-b': 'Conference Room B',
      'room-c': 'Conference Room C',
      'exhibition-hall': 'Exhibition Hall',
      'dining-hall': 'Dining Hall',
      'networking-lounge': 'Networking Lounge',
      'grand-ballroom': 'Grand Ballroom',
      'main-lobby': 'Main Lobby',
    }
    return venues[venue] || venue
  }

  const getSessionTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      keynote: 'Keynote',
      panel: 'Panel Discussion',
      workshop: 'Workshop',
      talk: 'Expert Talk',
      networking: 'Networking',
      registration: 'Registration',
      opening: 'Opening',
      closing: 'Closing',
      lunch: 'Lunch',
      break: 'Break',
    }
    return labels[type] || type
  }

  const getSessionTypeIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      keynote: <Mic className="h-5 w-5" />,
      panel: <Users className="h-5 w-5" />,
      workshop: <Briefcase className="h-5 w-5" />,
      talk: <Video className="h-5 w-5" />,
      networking: <Network className="h-5 w-5" />,
      registration: <Users className="h-5 w-5" />,
      opening: <Mic className="h-5 w-5" />,
      closing: <Mic className="h-5 w-5" />,
      lunch: <Utensils className="h-5 w-5" />,
      break: <Coffee className="h-5 w-5" />,
    }
    return icons[type] || <Briefcase className="h-5 w-5" />
  }

  const getSessionTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      keynote: 'bg-amber-100 text-amber-800 border-amber-200',
      panel: 'bg-purple-100 text-purple-800 border-purple-200',
      workshop: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      talk: 'bg-blue-100 text-blue-800 border-blue-200',
      networking: 'bg-green-100 text-green-800 border-green-200',
      registration: 'bg-gray-100 text-gray-800 border-gray-200',
      opening: 'bg-red-100 text-red-800 border-red-200',
      closing: 'bg-gray-100 text-gray-800 border-gray-200',
      lunch: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      break: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    }
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getTrackDisplayName = (track?: string) => {
    if (!track) return null
    const trackMap: Record<string, string> = {
      main: 'Main Stage',
      ai: 'AI Track',
      security: 'Security Track',
      cloud: 'Cloud Track',
      fintech: 'Fintech Track',
      entrepreneurship: 'Entrepreneurship Track',
      social: 'Social Event',
    }
    return trackMap[track] || track
  }

  const formatTime = (time: string) => {
    // Format time from "09:00" to "9:00 AM"
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const downloadSchedule = () => {
    // Create ICS file or PDF for download
    const scheduleText = sessions
      .map(
        (session) =>
          `${formatTime(session.startTime)} - ${formatTime(session.endTime)}: ${session.title}`,
      )
      .join('\n')

    const blob = new Blob([scheduleText], { type: 'text/calendar' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `evolve-ict-summit-2026-schedule-${selectedDay}.ics`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="container-custom px-4 pt-32 sm:px-6 lg:px-8">
          <div className="event-panel-dark mx-auto flex max-w-xl items-center justify-center gap-3 rounded-[2rem] p-6 text-white">
            <Loader2 className="h-5 w-5 animate-spin text-[var(--brand-gold)]" />
            <span className="text-sm font-semibold tracking-wide text-white/85">
              Loading program schedule…
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (error && sessions.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container-custom px-4 pt-32 sm:px-6 lg:px-8">
          <div className="event-surface mx-auto max-w-2xl rounded-[2rem] p-8 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--destructive)]">
              Couldn&apos;t load schedule
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950">Please try again.</h1>
            <p className="mt-3 text-slate-600">{error}</p>
            <div className="mt-6 flex justify-center">
              <Button
                onClick={fetchPrograms}
                className="rounded-full bg-slate-950 text-white hover:bg-slate-800"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Summit Program"
        title="Plan your two-day"
        accent="summit journey"
        description="Explore keynotes, panels, workshops, and networking sessions. Filter by day, track, and session type to build the schedule you want."
        primaryCta={{ href: '/brochure', label: 'Download Brochure' }}
        secondaryCta={{ href: '/register', label: 'Register Now' }}
        image="/bg-2.jpg"
        imageAlt="Event program background"
        compact
      />

      <section className="relative -mt-10 px-4 pb-8 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="container-custom event-panel-dark rounded-[2rem] p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  Schedule Tools
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                  Download and share the program.
                </h2>
                <p className="mt-3 max-w-2xl text-slate-300">
                  Add sessions to your plan, download an ICS schedule, or share the program with
                  your team.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={downloadSchedule}
                  className="rounded-full bg-[var(--brand-gold)] text-slate-950 hover:bg-[#ffe36b]"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download ICS
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-white/16 bg-white/6 text-white hover:bg-white/12"
                  onClick={() => {
                    try {
                      navigator.clipboard.writeText(window.location.href)
                    } catch {
                      // no-op
                    }
                  }}
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Program Navigation */}
      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="container-custom">
          <FadeIn>
            <div className="event-surface rounded-[2rem] p-6 md:p-8">
              <SectionHeading
                eyebrow="Browse The Agenda"
                title="Filter by day, track, and session type."
                description="A faster way to build your personal schedule and find the sessions that matter most."
              />

              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                {/* Day Selector */}
                <div className="flex flex-wrap gap-2">
                  {eventDays.map((day) => (
                    <Button
                      key={day.id}
                      onClick={() => setSelectedDay(day.value as 'day-1' | 'day-2')}
                      variant="outline"
                      className={`rounded-full border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-50 ${
                        selectedDay === day.value
                          ? 'border-[rgba(57,214,255,0.55)] text-slate-950'
                          : ''
                      }`}
                    >
                      <Calendar className="mr-2 h-4 w-4 text-[var(--brand-blue)]" />
                      {day.day}
                    </Button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative lg:w-[26rem]">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search sessions, speakers, topics…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 w-full rounded-full border border-slate-200/80 bg-white pl-12 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-[rgba(57,214,255,0.5)] focus:ring-4 focus:ring-[rgba(57,214,255,0.14)]"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="mt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Filter className="h-4 w-4 text-[var(--brand-blue)]" />
                    Filters
                  </div>

                  {/* Track Filters */}
                  <div className="flex flex-wrap gap-2">
                    {tracks.map((track) => (
                      <Button
                        key={track.id}
                        onClick={() => setSelectedTrack(track.id)}
                        variant="outline"
                        className={`rounded-full border-slate-200 bg-white/80 text-sm text-slate-700 hover:bg-slate-50 ${
                          selectedTrack === track.id ? 'border-slate-900 text-slate-950' : ''
                        }`}
                      >
                        {track.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Session Type Filters */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {sessionTypes.map((type) => (
                    <Button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      variant="outline"
                      className={`rounded-full border-slate-200 bg-white/80 text-sm text-slate-700 hover:bg-slate-50 ${
                        selectedType === type.id
                          ? 'border-[rgba(57,214,255,0.55)] text-slate-950'
                          : ''
                      }`}
                    >
                      <span className="mr-2 text-[var(--brand-blue)]">{type.icon}</span>
                      {type.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Program Content */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          {/* Selected Day Info */}
          <div className="mb-12">
            {eventDays
              .filter((day) => day.value === selectedDay)
              .map((day) => (
                <FadeIn key={day.id}>
                  <div className="event-surface rounded-[2rem] p-8 text-center md:p-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      <Calendar className="h-4 w-4 text-[var(--brand-blue)]" />
                      {day.date}
                    </div>
                    <h2 className="mt-5 text-4xl font-semibold text-slate-950 md:text-5xl">
                      {day.day}: {day.theme}
                    </h2>
                    <p className="section-copy mt-4 mx-auto max-w-3xl">
                      A day dedicated to exploring cutting-edge technologies, industry insights, and
                      networking opportunities.
                    </p>
                  </div>
                </FadeIn>
              ))}
          </div>

          {/* Schedule Timeline */}
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No sessions found for the selected filters.</p>
              <Button
                onClick={() => {
                  setSelectedTrack('all')
                  setSelectedType('all')
                  setSearchQuery('')
                }}
                className="mt-4 bg-[#ffcc00] hover:bg-[#ec7211]"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {sessions.map((session) => (
                <Card
                  key={session.id}
                  className={`overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
                    session.featured ? 'border-[#ffcc00]' : session.color
                  } hover:-translate-y-1`}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Time Slot */}
                      <div className="lg:w-48 p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-r">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="font-bold text-gray-900">
                            {formatTime(session.startTime)} - {formatTime(session.endTime)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Duration: {session.duration}
                        </div>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSessionTypeColor(session.type)}`}
                        >
                          {getSessionTypeIcon(session.type)}
                          <span className="ml-1.5">{getSessionTypeLabel(session.type)}</span>
                        </span>
                      </div>

                      {/* Session Details */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-xl font-bold text-gray-900">{session.title}</h3>
                              {session.featured && (
                                <span className="px-2 py-1 bg-[#ffcc00] text-white text-xs font-bold rounded">
                                  FEATURED
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 mb-4">{session.description}</p>

                            <div className="flex flex-wrap gap-4 text-sm">
                              {session.speakerName && (
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-gray-400" />
                                  <div>
                                    <span className="font-medium">{session.speakerName}</span>
                                    {session.speakerTitle && (
                                      <span className="text-gray-500 ml-2">
                                        {session.speakerTitle}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span>{getVenueDisplayName(session.venue)}</span>
                              </div>
                              {session.capacity && (
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-gray-400" />
                                  <span>Capacity: {session.capacity}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2 lg:w-48">
                            {session.track && (
                              <div className="px-3 py-1.5 bg-gray-100 rounded-lg text-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {getTrackDisplayName(session.track)}
                                </span>
                              </div>
                            )}
                            <Button variant="outline" className="w-full">
                              Add to Schedule
                            </Button>
                            {session.featured && (
                              <Button className="w-full bg-[#ffcc00] hover:bg-[#ec7211] text-white">
                                Learn More <ChevronRight className="h-4 w-4 ml-2" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Legend */}
          <div className="mt-16">
            <FadeIn>
              <div className="event-surface rounded-[2rem] p-8 md:p-10">
                <h3 className="text-2xl font-semibold text-slate-950 mb-6">Session Type Legend</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {sessionTypes.slice(1).map((type) => (
                    <div
                      key={type.id}
                      className="flex items-center gap-3 rounded-[1.25rem] border border-slate-200/70 bg-white/80 p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(67,97,238,0.12)] text-[var(--brand-blue)]">
                        {type.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-950">{type.name}</p>
                        <p className="text-xs text-slate-500">
                          {type.id === 'keynote' && 'Main presentations'}
                          {type.id === 'panel' && 'Group discussions'}
                          {type.id === 'workshop' && 'Hands-on sessions'}
                          {type.id === 'talk' && 'Expert presentations'}
                          {type.id === 'networking' && 'Social events'}
                          {type.id === 'break' && 'Refreshment breaks'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container-custom">
          <FadeIn>
            <div className="event-panel-dark rounded-[2.2rem] p-8 text-center md:p-12">
              <div className="mx-auto max-w-3xl">
                <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  Ready to join?
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
                    <a href="/register">Register Now</a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full border-white/16 bg-white/6 px-7 text-white hover:bg-white/12"
                  >
                    <a href="/speakers" className="text-white">
                      <p className="text-white/80">View Speakers</p>
                    </a>
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
