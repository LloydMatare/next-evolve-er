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
  Award,
  BarChart,
  Globe,
  Shield,
  Zap,
  ChevronRight,
  Download,
  Share2,
  Filter,
  Search,
} from 'lucide-react'
import { useState } from 'react'

// Event Schedule Data
const eventDays = [
  {
    id: 1,
    date: 'June 11, 2026',
    day: 'Day 1',
    theme: 'Digital Transformation & Innovation',
    color: 'from-blue-600 to-purple-600',
  },
  {
    id: 2,
    date: 'June 12, 2026',
    day: 'Day 2',
    theme: 'Future Tech & Sustainability',
    color: 'from-amber-600 to-orange-600',
  },
]

const timeSlots = [
  {
    time: '08:00 - 09:00',
    duration: '1h',
    type: 'registration',
    title: 'Registration & Welcome Coffee',
    description: 'Arrival, badge pickup, and networking over morning refreshments',
    icon: <Coffee className="h-5 w-5" />,
    speaker: null,
    venue: 'Main Lobby',
    capacity: 'All attendees',
    track: null,
    color: 'bg-blue-50 border-blue-200',
  },
  {
    time: '09:00 - 09:30',
    duration: '30m',
    type: 'opening',
    title: 'Opening Ceremony',
    description: 'Official welcome and summit opening by event organizers and government officials',
    icon: <Mic className="h-5 w-5" />,
    speaker: 'Ministry of ICT, Zimbabwe',
    venue: 'Main Auditorium',
    capacity: 'All attendees',
    track: 'Main Stage',
    color: 'bg-purple-50 border-purple-200',
    featured: true,
  },
  {
    time: '09:30 - 10:30',
    duration: '1h',
    type: 'keynote',
    title: 'Keynote: The Future of Digital Africa',
    description: 'Exploring digital transformation opportunities across the African continent',
    icon: <Globe className="h-5 w-5" />,
    speaker: 'Dr. Sarah Moyo, African Development Bank',
    venue: 'Main Auditorium',
    capacity: '500 attendees',
    track: 'Main Stage',
    color: 'bg-amber-50 border-amber-200',
    featured: true,
  },
  {
    time: '10:30 - 11:00',
    duration: '30m',
    type: 'break',
    title: 'Networking Break',
    description: 'Refreshments and networking opportunity',
    icon: <Network className="h-5 w-5" />,
    speaker: null,
    venue: 'Exhibition Hall',
    capacity: 'All attendees',
    track: null,
    color: 'bg-green-50 border-green-200',
  },
  {
    time: '11:00 - 12:30',
    duration: '1.5h',
    type: 'panel',
    title: 'Panel: Cybersecurity in the Digital Age',
    description: 'Experts discuss emerging threats and defense strategies',
    icon: <Shield className="h-5 w-5" />,
    speaker: 'Multiple speakers',
    venue: 'Conference Room A',
    capacity: '200 attendees',
    track: 'Security Track',
    color: 'bg-red-50 border-red-200',
  },
  {
    time: '11:00 - 12:30',
    duration: '1.5h',
    type: 'workshop',
    title: 'AI & Machine Learning Workshop',
    description: 'Hands-on session on implementing AI solutions',
    icon: <Zap className="h-5 w-5" />,
    speaker: 'Tech Innovators Inc.',
    venue: 'Conference Room B',
    capacity: '100 attendees',
    track: 'AI Track',
    color: 'bg-indigo-50 border-indigo-200',
  },
  {
    time: '12:30 - 14:00',
    duration: '1.5h',
    type: 'lunch',
    title: 'Lunch & Exhibition Viewing',
    description: 'Catered lunch and time to visit exhibition booths',
    icon: <Utensils className="h-5 w-5" />,
    speaker: null,
    venue: 'Dining Hall & Exhibition Area',
    capacity: 'All attendees',
    track: null,
    color: 'bg-yellow-50 border-yellow-200',
  },
  {
    time: '14:00 - 15:30',
    duration: '1.5h',
    type: 'workshop',
    title: 'Cloud Migration Strategies',
    description: 'Practical guide to moving to cloud infrastructure',
    icon: <Video className="h-5 w-5" />,
    speaker: 'Cloud Solutions Ltd.',
    venue: 'Conference Room A',
    capacity: '150 attendees',
    track: 'Cloud Track',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    time: '14:00 - 15:30',
    duration: '1.5h',
    type: 'talk',
    title: 'Fintech Revolution in Africa',
    description: 'How technology is transforming financial services',
    icon: <BarChart className="h-5 w-5" />,
    speaker: 'James Chifamba, Fintech Association',
    venue: 'Conference Room C',
    capacity: '180 attendees',
    track: 'Fintech Track',
    color: 'bg-green-50 border-green-200',
  },
  {
    time: '15:30 - 16:00',
    duration: '30m',
    type: 'break',
    title: 'Afternoon Tea Break',
    description: 'Refreshments and networking',
    icon: <Coffee className="h-5 w-5" />,
    speaker: null,
    venue: 'Networking Lounge',
    capacity: 'All attendees',
    track: null,
    color: 'bg-amber-50 border-amber-200',
  },
  {
    time: '16:00 - 17:30',
    duration: '1.5h',
    type: 'panel',
    title: 'Startup Ecosystem in Zimbabwe',
    description: 'Entrepreneurs share experiences and opportunities',
    icon: <Briefcase className="h-5 w-5" />,
    speaker: 'Multiple startup founders',
    venue: 'Main Auditorium',
    capacity: '300 attendees',
    track: 'Entrepreneurship Track',
    color: 'bg-purple-50 border-purple-200',
    featured: true,
  },
  {
    time: '17:30 - 18:00',
    duration: '30m',
    type: 'closing',
    title: 'Day 1 Closing Remarks',
    description: 'Summary of key takeaways and preview of Day 2',
    icon: <Mic className="h-5 w-5" />,
    speaker: 'Event Chairperson',
    venue: 'Main Auditorium',
    capacity: 'All attendees',
    track: 'Main Stage',
    color: 'bg-gray-50 border-gray-200',
  },
  {
    time: '18:30 - 21:00',
    duration: '2.5h',
    type: 'networking',
    title: 'Networking Dinner & Awards',
    description: 'Cocktail reception, dinner, and industry awards ceremony',
    icon: <Award className="h-5 w-5" />,
    speaker: null,
    venue: 'Grand Ballroom',
    capacity: 'Invitation only',
    track: 'Social Event',
    color: 'bg-red-50 border-red-200',
    featured: true,
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
]

const sessionTypes = [
  { id: 'all', name: 'All Types', icon: <Filter className="h-4 w-4" /> },
  { id: 'keynote', name: 'Keynotes', icon: <Mic className="h-4 w-4" /> },
  { id: 'panel', name: 'Panels', icon: <Users className="h-4 w-4" /> },
  { id: 'workshop', name: 'Workshops', icon: <Briefcase className="h-4 w-4" /> },
  { id: 'talk', name: 'Talks', icon: <Video className="h-4 w-4" /> },
  { id: 'networking', name: 'Networking', icon: <Network className="h-4 w-4" /> },
  { id: 'break', name: 'Breaks', icon: <Coffee className="h-4 w-4" /> },
]

export default function ProgramPage() {
  const [selectedDay, setSelectedDay] = useState(1)
  const [selectedTrack, setSelectedTrack] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSessions = timeSlots.filter((session) => {
    const matchesDay = selectedDay === 1 // For simplicity, all sessions shown on Day 1
    const matchesTrack =
      selectedTrack === 'all' ||
      session.track?.includes(selectedTrack) ||
      (selectedTrack === 'main' && session.track === 'Main Stage')
    const matchesType = selectedType === 'all' || session.type === selectedType
    const matchesSearch =
      searchQuery === '' ||
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (session.speaker && session.speaker.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesDay && matchesTrack && matchesType && matchesSearch
  })

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
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#232f3e] via-[#161e2e] to-[#0f1419]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Event <span className="text-[#ff9900]">Program</span>
          </h1>
          <p className="text-xl text-blue-100  mx-auto mb-8">
            Explore the complete schedule for EVOLVE ICT SUMMIT 2026. Plan your two days of
            learning, networking, and innovation.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center text-white">
              <Calendar className="h-5 w-5 mr-2 text-[#ff9900]" />
              <span>June 11-12, 2026</span>
            </div>
            <div className="flex items-center text-white">
              <Clock className="h-5 w-5 mr-2 text-[#ff9900]" />
              <span>8:00 AM - 9:00 PM Daily</span>
            </div>
            <div className="flex items-center text-white">
              <MapPin className="h-5 w-5 mr-2 text-[#ff9900]" />
              <span>Harare International Conference Centre</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-[#ff9900] hover:bg-[#ec7211] text-white px-8 py-3">
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
                  onClick={() => setSelectedDay(day.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedDay === day.id
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
                className="w-full pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9900] focus:border-transparent"
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
                      ? 'bg-[#ff9900] text-white border-[#ff9900]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#ff9900] hover:text-[#ff9900]'
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
              .filter((day) => day.id === selectedDay)
              .map((day) => (
                <div key={day.id} className="text-center">
                  <div className="inline-flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-[#ff9900]" />
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
          <div className="space-y-6">
            {filteredSessions.map((session, index) => (
              <Card
                key={index}
                className={`overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
                  session.featured ? 'border-[#ff9900]' : session.color
                } hover:-translate-y-1`}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Time Slot */}
                    <div className="lg:w-48 p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-r">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-bold text-gray-900">{session.time}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">Duration: {session.duration}</div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSessionTypeColor(session.type)}`}
                      >
                        {session.icon}
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
                              <span className="px-2 py-1 bg-[#ff9900] text-white text-xs font-bold rounded">
                                FEATURED
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-4">{session.description}</p>

                          <div className="flex flex-wrap gap-4 text-sm">
                            {session.speaker && (
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span className="font-medium">{session.speaker}</span>
                              </div>
                            )}
                            {session.venue && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span>{session.venue}</span>
                              </div>
                            )}
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
                                {session.track}
                              </span>
                            </div>
                          )}
                          <Button variant="outline" className="w-full">
                            Add to Schedule
                          </Button>
                          {session.featured && (
                            <Button className="w-full bg-[#ff9900] hover:bg-[#ec7211] text-white">
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
      <section className="py-16 px-4 bg-gradient-to-r from-[#232f3e] to-[#0f1419]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience EVOLVE ICT SUMMIT 2026?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join industry leaders, innovators, and tech enthusiasts for two days of transformative
            discussions and networking.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-[#ff9900] hover:bg-[#ec7211] text-white px-8 py-3 text-lg">
              Register Now
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
            >
              View Speakers
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
