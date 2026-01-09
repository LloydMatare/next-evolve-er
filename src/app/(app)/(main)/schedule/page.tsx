'use client'

import {
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  Target,
  Coffee,
  Wifi,
  Camera,
  Mic,
  Video,
  Sparkles,
  Filter,
  Download,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
  Play,
  MessageSquare,
  Award,
  Trophy,
  Briefcase,
  Globe,
  Zap,
} from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Session = {
  id: string
  time: string
  title: string
  speaker: string
  role: string
  company: string
  description: string
  category: 'keynote' | 'panel' | 'workshop' | 'networking' | 'exhibition' | 'break'
  location: string
  capacity: number
  duration: number
  tags: string[]
  featured: boolean
  registered: boolean
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(1)
  const [expandedSessions, setExpandedSessions] = useState<string[]>([])
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const days = [
    { day: 1, date: 'June 11, 2026', label: 'Day 1 - Opening & Innovation' },
    { day: 2, date: 'June 12, 2026', label: 'Day 2 - Collaboration & Future' },
  ]

  const categories = [
    {
      id: 'all',
      label: 'All Sessions',
      icon: Calendar,
      color: 'bg-gradient-to-r from-gray-600 to-gray-700',
    },
    {
      id: 'keynote',
      label: 'Keynotes',
      icon: Mic,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    },
    {
      id: 'panel',
      label: 'Panels',
      icon: Users,
      color: 'bg-gradient-to-r from-purple-500 to-pink-400',
    },
    {
      id: 'workshop',
      label: 'Workshops',
      icon: BookOpen,
      color: 'bg-gradient-to-r from-amber-500 to-orange-400',
    },
    {
      id: 'networking',
      label: 'Networking',
      icon: Globe,
      color: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    },
    {
      id: 'exhibition',
      label: 'Exhibition',
      icon: Briefcase,
      color: 'bg-gradient-to-r from-red-500 to-rose-400',
    },
  ]

  const day1Sessions: Session[] = [
    {
      id: '1',
      time: '08:00 - 09:00',
      title: 'Registration & Welcome Breakfast',
      speaker: 'Event Team',
      role: 'Host',
      company: 'Evolve ICT Summit',
      description:
        'Arrive early to register, network with fellow attendees, and enjoy a continental breakfast. Collect your event materials and get settled before the day begins.',
      category: 'break',
      location: 'Main Lobby',
      capacity: 2000,
      duration: 60,
      tags: ['Registration', 'Networking', 'Breakfast'],
      featured: false,
      registered: true,
    },
    {
      id: '2',
      time: '09:00 - 09:30',
      title: 'Official Opening Ceremony',
      speaker: 'Hon. Minister of ICT',
      role: 'Keynote Speaker',
      company: 'Government of Zimbabwe',
      description:
        "Grand opening of Evolve ICT Summit 2026 with traditional performances and official addresses. Set the stage for Africa's digital transformation journey.",
      category: 'keynote',
      location: 'Main Hall A',
      capacity: 1500,
      duration: 30,
      tags: ['Opening', 'Government', 'Africa'],
      featured: true,
      registered: true,
    },
    {
      id: '3',
      time: '09:30 - 10:30',
      title: 'Keynote: The Future of African Tech',
      speaker: 'Dr. Sarah Chen',
      role: 'Tech Innovation Lead',
      company: 'Digital Africa',
      description:
        "Exploring emerging technologies and their potential impact on African economies. From AI to blockchain, discover what's next for the continent.",
      category: 'keynote',
      location: 'Main Hall A',
      capacity: 1500,
      duration: 60,
      tags: ['AI', 'Future Tech', 'Innovation'],
      featured: true,
      registered: false,
    },
    {
      id: '4',
      time: '10:30 - 11:00',
      title: 'Networking Coffee Break',
      speaker: '',
      role: '',
      company: '',
      description: 'Refreshments and networking opportunity with speakers and fellow attendees.',
      category: 'networking',
      location: 'Networking Lounge',
      capacity: 2000,
      duration: 30,
      tags: ['Coffee', 'Networking'],
      featured: false,
      registered: true,
    },
    {
      id: '5',
      time: '11:00 - 12:30',
      title: 'Panel: Women in Tech Leadership',
      speaker: 'Moderated by Maria Rodriguez',
      role: 'Cybersecurity Expert',
      company: 'SecureTech Global',
      description:
        'Leading women in technology discuss challenges, opportunities, and strategies for advancing gender diversity in African tech leadership.',
      category: 'panel',
      location: 'Hall B',
      capacity: 500,
      duration: 90,
      tags: ['Women in Tech', 'Leadership', 'Diversity'],
      featured: true,
      registered: false,
    },
    {
      id: '6',
      time: '12:30 - 14:00',
      title: 'Lunch & Innovation Exhibition',
      speaker: '',
      role: '',
      company: '',
      description:
        'Gourmet lunch followed by exploration of the innovation exhibition hall featuring 100+ exhibitors showcasing cutting-edge technology.',
      category: 'exhibition',
      location: 'Exhibition Hall',
      capacity: 2000,
      duration: 90,
      tags: ['Lunch', 'Exhibition', 'Innovation'],
      featured: false,
      registered: true,
    },
    {
      id: '7',
      time: '14:00 - 15:30',
      title: 'AI & Machine Learning Workshop',
      speaker: 'Prof. James Okafor',
      role: 'AI Research Director',
      company: 'African Tech University',
      description:
        'Hands-on workshop exploring practical applications of AI and machine learning in African contexts. Bring your laptop for interactive sessions.',
      category: 'workshop',
      location: 'Workshop Room 1',
      capacity: 100,
      duration: 90,
      tags: ['AI', 'Machine Learning', 'Workshop'],
      featured: true,
      registered: false,
    },
    {
      id: '8',
      time: '15:30 - 16:00',
      title: 'Afternoon Coffee Break',
      speaker: '',
      role: '',
      company: '',
      description: 'Refreshments and casual networking.',
      category: 'break',
      location: 'Networking Lounge',
      capacity: 2000,
      duration: 30,
      tags: ['Coffee', 'Networking'],
      featured: false,
      registered: true,
    },
    {
      id: '9',
      time: '16:00 - 17:30',
      title: 'Startup Pitch Competition Finals',
      speaker: 'Investor Panel',
      role: 'Judges',
      company: 'Various VC Firms',
      description:
        'Top 10 African startups pitch their innovations to a panel of investors. Witness the next generation of African tech entrepreneurship.',
      category: 'panel',
      location: 'Main Hall A',
      capacity: 800,
      duration: 90,
      tags: ['Startups', 'Pitch', 'Investment'],
      featured: true,
      registered: false,
    },
    {
      id: '10',
      time: '18:00 - 21:00',
      title: 'Opening Night Gala Dinner',
      speaker: '',
      role: '',
      company: '',
      description:
        'Celebrate the first day of the summit with fine dining, live entertainment, and premium networking in an exclusive setting.',
      category: 'networking',
      location: 'Grand Ballroom',
      capacity: 1000,
      duration: 180,
      tags: ['Gala', 'Dinner', 'Networking'],
      featured: true,
      registered: false,
    },
  ]

  const day2Sessions: Session[] = [
    {
      id: '11',
      time: '08:30 - 09:30',
      title: 'Breakfast & Exhibition Viewing',
      speaker: '',
      role: '',
      company: '',
      description:
        'Morning refreshments while exploring the exhibition hall. Last chance to connect with exhibitors before sessions begin.',
      category: 'exhibition',
      location: 'Exhibition Hall',
      capacity: 2000,
      duration: 60,
      tags: ['Breakfast', 'Exhibition'],
      featured: false,
      registered: true,
    },
    {
      id: '12',
      time: '09:30 - 10:30',
      title: 'Keynote: Digital Transformation Roadmap',
      speaker: 'David Kariuki',
      role: 'Fintech Visionary',
      company: 'BankTech Africa',
      description:
        'Strategic insights on navigating digital transformation in traditional industries across Africa.',
      category: 'keynote',
      location: 'Main Hall A',
      capacity: 1500,
      duration: 60,
      tags: ['Digital Transformation', 'Strategy', 'Fintech'],
      featured: true,
      registered: false,
    },
    {
      id: '13',
      time: '10:30 - 11:00',
      title: 'Morning Coffee Break',
      speaker: '',
      role: '',
      company: '',
      description: 'Networking and refreshments.',
      category: 'break',
      location: 'Networking Lounge',
      capacity: 2000,
      duration: 30,
      tags: ['Coffee', 'Networking'],
      featured: false,
      registered: true,
    },
    {
      id: '14',
      time: '11:00 - 12:30',
      title: 'Cybersecurity Masterclass',
      speaker: 'Security Experts Panel',
      role: 'Cybersecurity Specialists',
      company: 'Multiple Organizations',
      description:
        'Advanced workshop on cybersecurity best practices, threat prevention, and digital protection strategies for African enterprises.',
      category: 'workshop',
      location: 'Hall B',
      capacity: 150,
      duration: 90,
      tags: ['Cybersecurity', 'Workshop', 'Security'],
      featured: true,
      registered: false,
    },
    {
      id: '15',
      time: '12:30 - 14:00',
      title: 'Lunch & Final Exhibition Hours',
      speaker: '',
      role: '',
      company: '',
      description: 'Final opportunity to visit exhibitors and network over lunch.',
      category: 'exhibition',
      location: 'Exhibition Hall',
      capacity: 2000,
      duration: 90,
      tags: ['Lunch', 'Exhibition', 'Networking'],
      featured: false,
      registered: true,
    },
    {
      id: '16',
      time: '14:00 - 15:30',
      title: 'Panel: The Future of Work in Africa',
      speaker: 'Industry Leaders',
      role: 'Various Executive Roles',
      company: 'Multiple Organizations',
      description:
        'Discussing how technology is reshaping workplaces, skills requirements, and employment opportunities across the continent.',
      category: 'panel',
      location: 'Main Hall A',
      capacity: 800,
      duration: 90,
      tags: ['Future of Work', 'Employment', 'Technology'],
      featured: true,
      registered: false,
    },
    {
      id: '17',
      time: '15:30 - 16:00',
      title: 'Afternoon Refreshments',
      speaker: '',
      role: '',
      company: '',
      description: 'Final networking break before closing sessions.',
      category: 'break',
      location: 'Networking Lounge',
      capacity: 2000,
      duration: 30,
      tags: ['Refreshments', 'Networking'],
      featured: false,
      registered: true,
    },
    {
      id: '18',
      time: '16:00 - 17:00',
      title: 'Awards Ceremony',
      speaker: 'Awards Committee',
      role: 'Judges',
      company: 'Evolve ICT Summit',
      description:
        'Celebrating outstanding contributions to African tech innovation. Awards for best startup, most innovative solution, and outstanding leadership.',
      category: 'keynote',
      location: 'Main Hall A',
      capacity: 1500,
      duration: 60,
      tags: ['Awards', 'Recognition', 'Celebration'],
      featured: true,
      registered: false,
    },
    {
      id: '19',
      time: '17:00 - 17:30',
      title: 'Closing Remarks & Way Forward',
      speaker: 'Summit Organizers',
      role: 'Event Hosts',
      company: 'Evolve Africa',
      description:
        "Final reflections, key takeaways, and announcement of commitments for advancing Africa's digital transformation.",
      category: 'keynote',
      location: 'Main Hall A',
      capacity: 1500,
      duration: 30,
      tags: ['Closing', 'Commitments', 'Future'],
      featured: true,
      registered: true,
    },
  ]

  const activeSessions = activeDay === 1 ? day1Sessions : day2Sessions
  const filteredSessions =
    filterCategory === 'all'
      ? activeSessions
      : activeSessions.filter((session) => session.category === filterCategory)

  const toggleSession = (id: string) => {
    setExpandedSessions((prev) =>
      prev.includes(id) ? prev.filter((sessionId) => sessionId !== id) : [...prev, id],
    )
  }

  const getCategoryIcon = (category: Session['category']) => {
    switch (category) {
      case 'keynote':
        return <Mic className="w-4 h-4" />
      case 'panel':
        return <Users className="w-4 h-4" />
      case 'workshop':
        return <BookOpen className="w-4 h-4" />
      case 'networking':
        return <Globe className="w-4 h-4" />
      case 'exhibition':
        return <Briefcase className="w-4 h-4" />
      case 'break':
        return <Coffee className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: Session['category']) => {
    switch (category) {
      case 'keynote':
        return 'bg-gradient-to-r from-blue-500 to-cyan-400'
      case 'panel':
        return 'bg-gradient-to-r from-purple-500 to-pink-400'
      case 'workshop':
        return 'bg-gradient-to-r from-amber-500 to-orange-400'
      case 'networking':
        return 'bg-gradient-to-r from-emerald-500 to-teal-400'
      case 'exhibition':
        return 'bg-gradient-to-r from-red-500 to-rose-400'
      case 'break':
        return 'bg-gradient-to-r from-gray-500 to-slate-400'
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a]">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm font-medium text-white">Event Schedule</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Summit Schedule</h1>

          <div className="flex justify-center">
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Your guide to{' '}
              <span className="text-[#ffcc00] font-semibold">
                two days of innovation, learning, and networking
              </span>{' '}
              {`at Africa's premier ICT event`}
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Navigation */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Day Selection */}
            <div className="flex flex-col sm:flex-row gap-4">
              {days.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(day.day)}
                  className={`px-6 py-4 rounded-xl text-lg font-bold transition-all ${
                    activeDay === day.day
                      ? 'bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span>{day.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Filter Categories */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filter by:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setFilterCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        filterCategory === category.id
                          ? `${category.color} text-white`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Day Header */}
      <section className="py-8 px-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {days.find((d) => d.day === activeDay)?.label}
              </h2>
              <p className="text-gray-600 mt-2">{days.find((d) => d.day === activeDay)?.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:border-[#ffcc00]"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Schedule
              </Button>
              <Button className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black font-bold">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Timeline */}
      <section className="py-8 px-4">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {filteredSessions.map((session) => {
                const isExpanded = expandedSessions.includes(session.id)
                const Icon = categories.find((c) => c.id === session.category)?.icon || Calendar

                return (
                  <div
                    key={session.id}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 ${
                      session.category === 'keynote'
                        ? 'border-blue-500'
                        : session.category === 'panel'
                          ? 'border-purple-500'
                          : session.category === 'workshop'
                            ? 'border-amber-500'
                            : session.category === 'networking'
                              ? 'border-emerald-500'
                              : session.category === 'exhibition'
                                ? 'border-red-500'
                                : 'border-gray-500'
                    }`}
                  >
                    {/* Session Header */}
                    <div
                      className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleSession(session.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        {/* Time & Category */}
                        <div className="flex-shrink-0 md:w-48">
                          <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-5 h-5 text-gray-600" />
                            <span className="font-bold text-gray-900">{session.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-8 h-8 rounded-lg ${getCategoryColor(session.category)} flex items-center justify-center`}
                            >
                              {getCategoryIcon(session.category)}
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                              {session.category.charAt(0).toUpperCase() + session.category.slice(1)}
                            </span>
                          </div>
                        </div>

                        {/* Session Info */}
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start gap-3">
                                {session.featured && (
                                  <Sparkles className="w-5 h-5 text-[#ffcc00] flex-shrink-0 mt-1" />
                                )}
                                <h3 className="text-xl font-bold text-gray-900">{session.title}</h3>
                              </div>

                              {session.speaker && (
                                <div className="flex items-center gap-3 mt-3">
                                  <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {session.speaker.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{session.speaker}</p>
                                    <p className="text-sm text-gray-600">
                                      {session.role}, {session.company}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-4">
                              <button className="text-gray-400 hover:text-[#ffcc00] transition-colors">
                                <Heart className="w-5 h-5" />
                              </button>
                              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5" />
                                ) : (
                                  <ChevronDown className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="border-t border-gray-100 px-6 pb-6 pt-4">
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Session Details */}
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2">Description</h4>
                              <p className="text-gray-600">{session.description}</p>
                            </div>

                            <div>
                              <h4 className="font-bold text-gray-900 mb-2">Tags</h4>
                              <div className="flex flex-wrap gap-2">
                                {session.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Session Logistics */}
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-bold text-gray-900 mb-3">Session Details</h4>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <MapPin className="w-5 h-5 text-gray-400" />
                                  <div>
                                    <p className="font-medium text-gray-900">{session.location}</p>
                                    <p className="text-sm text-gray-600">Venue Location</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <Users className="w-5 h-5 text-gray-400" />
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {session.capacity} capacity
                                    </p>
                                    <p className="text-sm text-gray-600">Spots available</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <Clock className="w-5 h-5 text-gray-400" />
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {formatDuration(session.duration)}
                                    </p>
                                    <p className="text-sm text-gray-600">Session duration</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                              {session.registered ? (
                                <div className="flex items-center gap-2 text-green-600">
                                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                  <span className="font-medium">
                                    You are registered for this session
                                  </span>
                                </div>
                              ) : session.capacity > 0 ? (
                                <Button className="w-full bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black font-bold">
                                  Register for Session
                                </Button>
                              ) : (
                                <div className="text-center py-2 bg-gray-50 rounded-lg">
                                  <p className="text-gray-500 font-medium">
                                    Session at full capacity
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Empty State */}
            {filteredSessions.length === 0 && (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No sessions found</h3>
                <p className="text-gray-500 mb-6">Try selecting a different day or filter</p>
                <Button
                  onClick={() => setFilterCategory('all')}
                  className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black font-bold"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Day Highlights */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Day {activeDay} Highlights
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Key sessions and must-attend events for today
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {activeSessions
              .filter((session) => session.featured)
              .slice(0, 3)
              .map((session) => (
                <div
                  key={session.id}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg ${getCategoryColor(session.category)} flex items-center justify-center`}
                    >
                      {getCategoryIcon(session.category)}
                    </div>
                    <div>
                      <span className="text-sm text-gray-300">{session.time}</span>
                      <p className="font-medium">{session.location}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{session.title}</h3>
                  {session.speaker && <p className="text-gray-300 mb-4">{session.speaker}</p>}
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10"
                    onClick={() => toggleSession(session.id)}
                  >
                    View Details
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Venue Map & Info */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#ffcc00] to-amber-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Venue Information</h2>
                  <p className="text-gray-600">Harare International Conference Centre</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Key Locations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mic className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Main Hall A</p>
                        <p className="text-sm text-gray-600">Keynotes & Plenary Sessions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Hall B</p>
                        <p className="text-sm text-gray-600">Panels & Workshops</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Exhibition Hall</p>
                        <p className="text-sm text-gray-600">100+ Tech Exhibitors</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Coffee className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium">Networking Lounge</p>
                        <p className="text-sm text-gray-600">Refreshments & Networking</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">Venue Services</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Free WiFi
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Charging Stations
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Accessibility
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Parking
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden border border-gray-200">
              {/* Map Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-[#ffcc00] mx-auto mb-4 opacity-50" />
                  <p className="text-gray-400">Venue Map</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Interactive floor plan and location guide
                  </p>
                </div>
              </div>

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-gray-700">Main Sessions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded"></div>
                      <span className="text-gray-700">Breakout Rooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span className="text-gray-700">Exhibition Area</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                      <span className="text-gray-700">Networking Zones</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#170d43] via-[#1a1448] to-[#0f172a]">
        <div className="container-custom max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm font-medium text-white">Plan Your Experience</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Join Us?</h2>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {`            Register now to secure your spot and build your personalized schedule for Africa's premier ICT event.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black font-bold px-8 py-6 rounded-xl text-lg hover:shadow-lg hover:shadow-amber-500/25"
              asChild
            >
              <Link href="/register">
                Register for Summit
                <Calendar className="w-5 h-5 ml-2" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg"
              asChild
            >
              <Link href="/speakers">
                View All Speakers
                <Users className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
