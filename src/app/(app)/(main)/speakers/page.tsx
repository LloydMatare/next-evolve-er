'use client'

import {
  Mic,
  Award,
  Briefcase,
  Globe,
  Linkedin,
  Twitter,
  MessageSquare,
  Play,
  Filter,
  Search,
  Star,
  Heart,
  ChevronDown,
  Sparkles,
  Target,
  Zap,
  BookOpen,
  Users,
  Building,
  MapPin,
} from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Speaker = {
  id: string
  name: string
  title: string
  company: string
  bio: string
  image: string
  category: 'keynote' | 'panelist' | 'workshop' | 'moderator'
  topics: string[]
  featured: boolean
  social: {
    twitter?: string
    linkedin?: string
    website?: string
  }
  session: {
    title: string
    time: string
    location: string
  }
}

export default function Speakers() {
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [likedSpeakers, setLikedSpeakers] = useState<string[]>([])
  const [expandedSpeaker, setExpandedSpeaker] = useState<string | null>(null)
  const [allSpeakers, setAllSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch speakers from Payload API
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/speakers?limit=1000&sort=-createdAt`)

        if (!response.ok) {
          throw new Error('Failed to fetch speakers')
        }

        const data = await response.json()
        const speakers = data.docs || []

        // Transform Payload speaker data to match app format
        const transformedSpeakers = speakers.map((speaker: any) => ({
          id: speaker.id,
          name: speaker.name,
          title: speaker.designation,
          company: speaker.organization,
          bio: speaker.bio,
          image: speaker.photo?.url || '/placeholder.png',
          category: speaker.category || 'panelist',
          topics: speaker.expertise?.map((e: any) => e.topic) || [],
          featured: speaker.featured || false,
          social: {
            twitter: speaker.twitter,
            linkedin: speaker.linkedin,
            website: speaker.website,
          },
          session: {
            title: speaker.session?.title || 'TBA',
            time: speaker.session?.time || 'TBA',
            location: speaker.session?.location || 'TBA',
          },
        }))

        setAllSpeakers(transformedSpeakers)
        setError(null)
      } catch (err) {
        console.error('Error fetching speakers:', err)
        setError('Failed to load speakers. Please try again later.')
        setAllSpeakers([])
      } finally {
        setLoading(false)
      }
    }

    fetchSpeakers()
  }, [])

  const featuredSpeakers = allSpeakers.filter((speaker) => speaker.featured)

  const categories = [
    { id: 'all', label: 'All Speakers', icon: Users, count: allSpeakers.length },
    {
      id: 'keynote',
      label: 'Keynote Speakers',
      icon: Mic,
      count: allSpeakers.filter((s) => s.category === 'keynote').length,
    },
    {
      id: 'panelist',
      label: 'Panelists',
      icon: MessageSquare,
      count: allSpeakers.filter((s) => s.category === 'panelist').length,
    },
    {
      id: 'workshop',
      label: 'Workshop Leaders',
      icon: BookOpen,
      count: allSpeakers.filter((s) => s.category === 'workshop').length,
    },
    {
      id: 'moderator',
      label: 'Moderators',
      icon: Target,
      count: allSpeakers.filter((s) => s.category === 'moderator').length,
    },
  ]

  const filteredSpeakers = allSpeakers.filter((speaker) => {
    if (filterCategory !== 'all' && speaker.category !== filterCategory) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        speaker.name.toLowerCase().includes(query) ||
        speaker.title.toLowerCase().includes(query) ||
        speaker.company.toLowerCase().includes(query) ||
        speaker.topics.some((topic) => topic.toLowerCase().includes(query))
      )
    }
    return true
  })

  const toggleLike = (speakerId: string) => {
    setLikedSpeakers((prev) =>
      prev.includes(speakerId) ? prev.filter((id) => id !== speakerId) : [...prev, speakerId],
    )
  }

  const getCategoryColor = (category: Speaker['category']) => {
    switch (category) {
      case 'keynote':
        return 'from-blue-500 to-cyan-400'
      case 'panelist':
        return 'from-purple-500 to-pink-400'
      case 'workshop':
        return 'from-amber-500 to-orange-400'
      case 'moderator':
        return 'from-emerald-500 to-teal-400'
    }
  }

  const getCategoryIcon = (category: Speaker['category']) => {
    switch (category) {
      case 'keynote':
        return <Mic className="w-4 h-4" />
      case 'panelist':
        return <MessageSquare className="w-4 h-4" />
      case 'workshop':
        return <BookOpen className="w-4 h-4" />
      case 'moderator':
        return <Target className="w-4 h-4" />
    }
  }

  const formatCategory = (category: Speaker['category']) => {
    switch (category) {
      case 'keynote':
        return 'Keynote Speaker'
      case 'panelist':
        return 'Panelist'
      case 'workshop':
        return 'Workshop Leader'
      case 'moderator':
        return 'Moderator'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b text-black from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a]">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Mic className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm font-medium text-white">Meet the Experts</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Featured Speakers</h1>

          <div className="flex justify-center ">
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Learn from{' '}
              <span className="text-[#ffcc00] font-semibold">{`Africa's brightest minds`}</span> and
              global thought leaders shaping the future of technology
            </p>
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="py-16 px-4">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[#ffcc00]" />
              <span className="text-sm font-medium text-gray-700">Headline Speakers</span>
            </div>
            <h2 className="text-md md:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Keynote Presentations
            </h2>
            <p className="text-xl text-gray-600 text-center">
              Hear from industry pioneers and visionaries at the forefront of digital transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {featuredSpeakers.map((speaker) => (
              <div
                key={speaker.id}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800"
              >
                {/* Speaker Card */}
                <div className="relative p-6 text-white">
                  {/* Featured Badge */}
                  {speaker.featured && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </div>
                    </div>
                  )}

                  {/* Speaker Avatar */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-4 border-white/10 group-hover:border-[#ffcc00]/50 transition-all" />
                    <div
                      className={`absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br ${getCategoryColor(speaker.category)} rounded-full flex items-center justify-center`}
                    >
                      {getCategoryIcon(speaker.category)}
                    </div>
                  </div>

                  {/* Speaker Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{speaker.name}</h3>
                    <p className="text-[#ffcc00] font-medium mb-1">{speaker.title}</p>
                    <p className="text-gray-400 text-sm mb-4">{speaker.company}</p>

                    {/* Topics */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {speaker.topics.slice(0, 2).map((topic, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/10 text-white text-xs rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {speaker.social.twitter && (
                        <a
                          href={`https://twitter.com/${speaker.social.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {speaker.social.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${speaker.social.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Session Info Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <div className="space-y-3">
                    <h4 className="font-bold text-lg">{speaker.session.title}</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#ffcc00]" />
                        <span>{speaker.session.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#ffcc00]" />
                        <span>{speaker.session.location}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black font-bold"
                      onClick={() => setExpandedSpeaker(speaker.id)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search speakers by name, topic, or company..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffcc00]/50 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    onClick={() => setFilterCategory(category.id)}
                    className={`flex items-center gap-2 transition-all ${
                      filterCategory === category.id
                        ? 'bg-gradient-to-r from-[#170d43] to-[#2a1b69] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{category.label}</span>
                    <span className="text-sm opacity-75">({category.count})</span>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* All Speakers Grid */}
      <section className="py-16 px-4">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">All Speakers</h2>
              <p className="text-gray-600 mt-1">
                {filteredSpeakers.length} speakers found
                {filterCategory !== 'all' &&
                  ` in ${categories.find((c) => c.id === filterCategory)?.label}`}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-300">
                <DownloadIcon className="w-4 text-black h-4 mr-2" />
                Export List
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffcc00]" />
              </div>
              <p className="text-gray-600">Loading speakers...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-red-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">Error loading speakers</h3>
              <p className="text-gray-500 mb-6">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black "
              >
                Try Again
              </Button>
            </div>
          ) : filteredSpeakers.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No speakers found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? `No results found for "${searchQuery}". Try different keywords.`
                  : 'No speakers found for the selected filter.'}
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => {
                    setFilterCategory('all')
                    setSearchQuery('')
                  }}
                  className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredSpeakers.map((speaker) => (
                <div
                  key={speaker.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Speaker Card */}
                  <div className="relative p-6">
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`px-3 py-1 bg-gradient-to-br ${getCategoryColor(speaker.category)} text-white text-xs font-medium rounded-full`}
                      >
                        {formatCategory(speaker.category)}
                      </div>
                    </div>

                    {/* Speaker Avatar */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-4 border-gray-100" />
                        <Button
                          onClick={() => toggleLike(speaker.id)}
                          className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${likedSpeakers.includes(speaker.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                          />
                        </Button>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 text-center">
                        {speaker.name}
                      </h3>
                      <p className="text-sm text-[#ffcc00] font-medium text-center mt-1">
                        {speaker.title}
                      </p>
                      <p className="text-sm text-gray-600 text-center mt-1">{speaker.company}</p>
                    </div>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-2 mb-6 justify-center">
                      {speaker.topics.slice(0, 3).map((topic, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Session Info */}
                    <div className="space-y-3 border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Session:</span>
                        <span className="font-medium text-gray-900 truncate ml-2">
                          {speaker.session.title}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Time:</span>
                        <span className="font-medium text-gray-900">{speaker.session.time}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Location:</span>
                        <span className="font-medium text-gray-900">
                          {speaker.session.location}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                      <Button
                        className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                        onClick={() =>
                          setExpandedSpeaker(expandedSpeaker === speaker.id ? null : speaker.id)
                        }
                      >
                        {expandedSpeaker === speaker.id ? 'Hide Details' : 'View Profile'}
                      </Button>
                      <Button className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black font-bold">
                        <Play className="w-4 h-4 mr-2" />
                        Session
                      </Button>
                    </div>

                    {/* Expanded Bio */}
                    {expandedSpeaker === speaker.id && (
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-3">
                          About {speaker.name.split(' ')[0]}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4">{speaker.bio}</p>

                        <div className="flex gap-3">
                          {speaker.social.twitter && (
                            <a
                              href={`https://twitter.com/${speaker.social.twitter}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                              <Twitter className="w-4 h-4 text-white" />
                            </a>
                          )}
                          {speaker.social.linkedin && (
                            <a
                              href={`https://linkedin.com/in/${speaker.social.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                            >
                              <Linkedin className="w-4 h-4 text-white" />
                            </a>
                          )}
                          {speaker.social.website && (
                            <a
                              href={`https://${speaker.social.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                            >
                              <Globe className="w-4 h-4 text-white" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#170d43] to-[#2a1b69]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Speaker Community</h2>
            <p className="text-gray-300 text-center">
              Bringing together the brightest minds from across Africa and the world
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-3">
                {allSpeakers.length}
              </div>
              <div className="text-gray-300">Total Speakers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-3">
                {featuredSpeakers.length}
              </div>
              <div className="text-gray-300">Featured Speakers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-3">
                {allSpeakers.filter((s) => s.category === 'keynote').length}
              </div>
              <div className="text-gray-300">Keynote Speakers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-3">
                {allSpeakers.filter((s) => s.category === 'workshop').length}
              </div>
              <div className="text-gray-300">Workshops</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container-custom max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-6">
            <Award className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm font-medium text-gray-700">Join Our Lineup</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Want to Speak at Evolve ICT Summit?
          </h2>

          <p className="text-md md:text-xl text-gray-600 mb-8 text-center">
            {`            Share your expertise with Africa's premier tech audience. Applications for speaking opportunities are now open.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black  hover:shadow-lg hover:shadow-amber-500/25"
              asChild
            >
              <Link href="/speakers/apply">
                Apply to Speak
                <Mic className="w-5 h-5 ml-2" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:border-[#ffcc00] "
              asChild
            >
              <Link href="/schedule">
                View Full Schedule
                <Calendar className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Helper icon component
function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function Calendar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
