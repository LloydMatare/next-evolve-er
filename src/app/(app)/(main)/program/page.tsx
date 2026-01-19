'use client'

import { Navbar } from '@/components/navbar'
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
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#ffcc00]" />
          <span className="ml-2 text-[#ffcc00]">Loading program schedule...</span>
        </div>
      </div>
    )
  }

  if (error && sessions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 flex flex-col items-center justify-center">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <Button onClick={fetchPrograms} className="bg-[#ffcc00] hover:bg-[#ec7211]">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#170d43] via-[#161e2e] to-[#0f1419]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Event <span className="text-[#ffcc00]">Program</span>
          </h1>
          <p className="text-xl text-blue-100 mx-auto mb-8">
            Explore the complete schedule for EVOLVE ICT SUMMIT 2026. Plan your two days of
            learning, networking, and innovation.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center text-white">
              <Calendar className="h-5 w-5 mr-2 text-[#ffcc00]" />
              <span>June 11-12, 2026</span>
            </div>
            <div className="flex items-center text-white">
              <Clock className="h-5 w-5 mr-2 text-[#ffcc00]" />
              <span>8:00 AM - 9:00 PM Daily</span>
            </div>
            <div className="flex items-center text-white">
              <MapPin className="h-5 w-5 mr-2 text-[#ffcc00]" />
              <span>Harare International Conference Centre</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={downloadSchedule}
              className="bg-[#ffcc00] hover:bg-[#ec7211] text-white px-8 py-3"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Schedule
            </Button>
            <Button variant="outline" className="border-white text-black hover:bg-white/10">
              <Share2 className="h-5 w-5 mr-2" />
              Share Program
            </Button>
          </div>
        </div>
      </section>

      {/* Program Navigation */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Day Selector */}
            <div className="flex gap-2">
              {eventDays.map((day) => (
                <Button
                  key={day.id}
                  onClick={() => setSelectedDay(day.value as 'day-1' | 'day-2')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedDay === day.value
                      ? `bg-gradient-to-r ${day.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {day.day}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="relative lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search sessions, speakers, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="mt-8">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>

              {/* Track Filters */}
              <div className="flex flex-wrap gap-2">
                {tracks.map((track) => (
                  <Button
                    key={track.id}
                    onClick={() => setSelectedTrack(track.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedTrack === track.id
                        ? `${track.color.replace('100', '600')} text-white`
                        : `${track.color} text-gray-700 hover:opacity-80`
                    }`}
                  >
                    {track.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Session Type Filters */}
            <div className="flex flex-wrap gap-2">
              {sessionTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    selectedType === type.id
                      ? 'bg-[#ffcc00] text-white border-[#ffcc00]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#ffcc00] hover:text-[#ffcc00]'
                  }`}
                >
                  {type.icon}
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Program Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Selected Day Info */}
          <div className="mb-12">
            {eventDays
              .filter((day) => day.value === selectedDay)
              .map((day) => (
                <div key={day.id} className="text-center">
                  <div className="inline-flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-[#ffcc00]" />
                    <span className="text-lg font-semibold text-gray-700">{day.date}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {day.day}: {day.theme}
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    A day dedicated to exploring cutting-edge technologies, industry insights, and
                    networking opportunities.
                  </p>
                </div>
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
          <div className="mt-16 p-6 bg-white rounded-xl border shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Session Type Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {sessionTypes.slice(1).map((type) => (
                <div key={type.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className={`p-2 rounded-lg ${getSessionTypeColor(type.id).split(' ')[0]}`}>
                    {type.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{type.name}</p>
                    <p className="text-xs text-gray-500">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#170d43] to-[#0f1419]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience EVOLVE ICT SUMMIT 2026?
          </h2>
          <p className="text-xl text-blue-100 mb-8 text-center">
            Join industry leaders, innovators, and tech enthusiasts for two days of transformative
            discussions and networking.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-[#ffcc00] hover:bg-[#ec7211] text-white px-8 py-3 text-sm">
              Register Now
            </Button>
            <Button
              variant="outline"
              className="border-white text-black hover:bg-white/10 px-8 py-3 text-sm"
            >
              View Speakers
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
