'use client'

import {
  Calendar,
  Users,
  Award,
  TrendingUp,
  ImageIcon,
  Play,
  ChevronRight,
  Star,
  Trophy,
  Sparkles,
  Target,
  Zap,
  BookOpen,
  Clock,
  MapPin,
  Heart,
  Share2,
  Download,
  Maximize2,
  Film,
  Camera,
} from 'lucide-react'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import SubHero from '@/components/sub-hero'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface MediaItem {
  id: number
  type: 'image' | 'video'
  url: string
  thumbnail: string
  title: string
  description: string
  category: string
  year: number
  likes: number
}

interface SummitStats {
  year: string
  theme: string
  delegates: string
  speakers: string
  exhibitors: string
  startups: string
  countries: string
  partnerships: string
}

// Summit Data
const summitData = {
  '2025': {
    theme: 'Digital Transformation: The Future is Now',
    highlights: [
      'Minister of ICT Keynote Address',
      'Innovation Showcase with 30+ Startups',
      'Panel: Women in Tech Leadership',
      'Networking Gala with 1000+ Attendees',
      'Technology Exhibition Featuring Global Brands',
      'AI & ML Workshop Series',
      'Cybersecurity Masterclass',
      'Startup Pitch Competition Finals',
    ],
    themes: [
      'Digital Transformation in African Enterprises',
      'AI and Machine Learning for Social Impact',
      'Cybersecurity in the Digital Age',
      'Fintech and Financial Inclusion',
      'Youth Empowerment through Technology',
      'Sustainable Tech Solutions',
      'E-Government Services',
      'Healthcare Technology Innovations',
    ],
    stats: {
      delegates: '1,500+',
      speakers: '50+',
      exhibitors: '80+',
      startups: '30+',
      countries: '25+',
      partnerships: '40+',
      days: '2',
    },
    color: 'from-blue-500 to-cyan-400',
    gradient: 'bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500',
  },
  '2024': {
    theme: 'Connecting Africa: Digital Frontiers',
    highlights: [
      'Presidential Address on Digital Economy',
      'Startup Pitch Competition Finals',
      'Regional ICT Ministers Roundtable',
      'Technology Demo Zone with 50+ Exhibitors',
      'Youth Hackathon Finals',
      'Mobile Technology Summit',
      'E-Government Solutions Forum',
      'Digital Skills Development Workshop',
    ],
    themes: [
      'Cloud Computing for African Businesses',
      'Mobile Technology and Connectivity',
      'E-Government Solutions',
      'Smart Cities and IoT',
      'Digital Skills Development',
      'Telecommunications Infrastructure',
      'Data Privacy and Regulations',
      'Green Technology Initiatives',
    ],
    stats: {
      delegates: '1,200+',
      speakers: '40+',
      exhibitors: '60+',
      startups: '25+',
      countries: '20+',
      partnerships: '30+',
      days: '2',
    },
    color: 'from-purple-500 to-pink-400',
    gradient: 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500',
  },
}

// Media Data
const summit2025Images: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Grand Opening Ceremony 2025',
    description: 'The spectacular opening of Evolve ICT Summit 2025 with traditional performances',
    category: 'Ceremony',
    year: 2025,
    likes: 245,
  },
  {
    id: 2,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Ministerial Keynote Address',
    description: 'Minister of ICT delivering the keynote speech on digital transformation',
    category: 'Speeches',
    year: 2025,
    likes: 189,
  },
  {
    id: 3,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Tech Innovation Expo',
    description: 'Cutting-edge technology showcase at the exhibition hall',
    category: 'Exhibition',
    year: 2025,
    likes: 312,
  },
  {
    id: 4,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Women in Tech Leadership Panel',
    description: 'Empowering discussion on gender diversity in tech leadership',
    category: 'Panels',
    year: 2025,
    likes: 267,
  },
  {
    id: 5,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Networking Gala Dinner',
    description: 'Evening gala fostering connections between investors and innovators',
    category: 'Networking',
    year: 2025,
    likes: 178,
  },
  {
    id: 6,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Startup Pitch Competition Finals',
    description: 'Final round of the startup competition with live judging',
    category: 'Competition',
    year: 2025,
    likes: 234,
  },
  {
    id: 7,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Technology Awards Ceremony',
    description: 'Recognition of outstanding innovation and contributions',
    category: 'Awards',
    year: 2025,
    likes: 156,
  },
  {
    id: 8,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'AI & ML Workshop',
    description: 'Hands-on workshop on artificial intelligence applications',
    category: 'Workshops',
    year: 2025,
    likes: 198,
  },
]

const summit2025Videos: MediaItem[] = [
  {
    id: 1,
    type: 'video',
    url: 'https://www.youtube.com/embed/G3OkPRWPt5Q',
    thumbnail: '/placeholder.png',
    title: 'Evolve ICT Summit 2025 Highlights',
    description: 'Complete highlights and key moments from the 2025 summit',
    category: 'Highlights',
    year: 2025,
    likes: 456,
  },
  {
    id: 2,
    type: 'video',
    url: 'https://www.youtube.com/embed/2LF1yn4hnSA',
    thumbnail: '/placeholder.png',
    title: 'Keynote Speeches Collection',
    description: 'All keynote addresses from industry leaders and ministers',
    category: 'Speeches',
    year: 2025,
    likes: 289,
  },
  {
    id: 3,
    type: 'video',
    url: 'https://www.youtube.com/embed/-wC83hcM1WA',
    thumbnail: '/placeholder.png',
    title: 'Panel Discussions Recap',
    description: 'Insightful discussions from expert panels across various tracks',
    category: 'Panels',
    year: 2025,
    likes: 234,
  },
  {
    id: 4,
    type: 'video',
    url: 'https://www.youtube.com/embed/uN26v2_JW7s',
    thumbnail: '/placeholder.png',
    title: 'Exhibition Hall Tour',
    description: 'Virtual tour of the technology exhibition and innovation showcase',
    category: 'Exhibition',
    year: 2025,
    likes: 187,
  },
]

const summit2024Images: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Presidential Address 2024',
    description: 'Historic presidential address on digital economy transformation',
    category: 'Speeches',
    year: 2024,
    likes: 321,
  },
  {
    id: 2,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Startup Competition Finals',
    description: 'Exciting finals of the startup pitch competition',
    category: 'Competition',
    year: 2024,
    likes: 245,
  },
  {
    id: 3,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'ICT Ministers Roundtable',
    description: 'Regional ICT Ministers discussing digital collaboration',
    category: 'Panels',
    year: 2024,
    likes: 189,
  },
  {
    id: 4,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Tech Demo Zone',
    description: 'Interactive technology demonstration zone',
    category: 'Exhibition',
    year: 2024,
    likes: 278,
  },
  {
    id: 5,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Youth Hackathon Finals',
    description: 'Young innovators showcasing their tech solutions',
    category: 'Competition',
    year: 2024,
    likes: 312,
  },
  {
    id: 6,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Networking Gala 2024',
    description: 'Evening gala with international delegates',
    category: 'Networking',
    year: 2024,
    likes: 167,
  },
  {
    id: 7,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Workshop Sessions',
    description: 'Interactive workshop sessions with experts',
    category: 'Workshops',
    year: 2024,
    likes: 198,
  },
  {
    id: 8,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Closing Ceremony 2024',
    description: 'Memorable closing ceremony with future commitments',
    category: 'Ceremony',
    year: 2024,
    likes: 156,
  },
]

const summit2024Videos: MediaItem[] = [
  {
    id: 1,
    type: 'video',
    url: 'https://www.youtube.com/embed/G3OkPRWPt5Q',
    thumbnail: '/placeholder.png',
    title: 'Summit 2024 Official Highlights',
    description: 'Complete highlights from the groundbreaking 2024 summit',
    category: 'Highlights',
    year: 2024,
    likes: 543,
  },
  {
    id: 2,
    type: 'video',
    url: 'https://www.youtube.com/embed/2LF1yn4hnSA',
    thumbnail: '/placeholder.png',
    title: 'Presidential Address 2024',
    description: 'Full presidential address on digital transformation agenda',
    category: 'Speeches',
    year: 2024,
    likes: 398,
  },
  {
    id: 3,
    type: 'video',
    url: 'https://www.youtube.com/embed/-wC83hcM1WA',
    thumbnail: '/placeholder.png',
    title: 'Youth Hackathon Competition',
    description: 'Youth hackathon competition and winners announcement',
    category: 'Competition',
    year: 2024,
    likes: 267,
  },
  {
    id: 4,
    type: 'video',
    url: 'https://www.youtube.com/embed/uN26v2_JW7s',
    thumbnail: '/placeholder.png',
    title: 'Panel Discussions 2024',
    description: 'Expert panel discussions on various digital topics',
    category: 'Panels',
    year: 2024,
    likes: 189,
  },
]

export default function PreviousSummitPage() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeYear, setActiveYear] = useState('2025')
  const [likedItems, setLikedItems] = useState<number[]>([])

  const openMedia = (media: MediaItem) => {
    setSelectedMedia(media)
    setIsDialogOpen(true)
  }

  const toggleLike = (id: number) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const activeSummit = summitData[activeYear as keyof typeof summitData]
  const activeImages = activeYear === '2025' ? summit2025Images : summit2024Images
  const activeVideos = activeYear === '2025' ? summit2025Videos : summit2024Videos

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f1419]">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ffcc00]/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Trophy className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm font-medium text-white">Our Legacy</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Past Summits</h1>

          <div className="flex justify-center">
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Relive the{' '}
              <span className="text-[#ffcc00] font-semibold">
                memorable moments, insights, and innovations
              </span>{' '}
              from our previous events
            </p>
          </div>

          <SubHero />
        </div>
      </section>

      {/* Timeline Navigation */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Summit Journey</h2>
              <p className="text-gray-600 mt-1">Explore our evolution through the years</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setActiveYear('2025')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeYear === '2025'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Summit 2025
              </button>
              <button
                onClick={() => setActiveYear('2024')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeYear === '2024'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-400 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Summit 2024
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Summit Overview */}
      <section className="py-16 px-4">
        <div className="container-custom">
          {/* Summit Theme Card */}
          <div
            className={`relative rounded-3xl overflow-hidden ${activeYear === '2025' ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500' : 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500'} p-8 md:p-12 mb-16 text-white`}
          >
            <div className="absolute top-6 right-6">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                Year {activeYear}
              </div>
            </div>

            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <Target className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2">Summit {activeYear}</h2>
                  <p className="text-xl opacity-90">{activeSummit.theme}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">
                    {activeSummit.stats.delegates}
                  </div>
                  <div className="text-sm opacity-80">Delegates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">
                    {activeSummit.stats.speakers}
                  </div>
                  <div className="text-sm opacity-80">Speakers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">
                    {activeSummit.stats.exhibitors}
                  </div>
                  <div className="text-sm opacity-80">Exhibitors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">
                    {activeSummit.stats.countries}
                  </div>
                  <div className="text-sm opacity-80">Countries</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Summit Themes */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-[#ffcc00] to-amber-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Key Themes</h3>
                  <p className="text-gray-600">Focus areas of Summit {activeYear}</p>
                </div>
              </div>

              <div className="space-y-4">
                {activeSummit.themes.map((theme, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{theme}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summit Highlights */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Event Highlights</h3>
                  <p className="text-gray-600">Memorable moments from Summit {activeYear}</p>
                </div>
              </div>

              <div className="space-y-4">
                {activeSummit.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#ffcc00] to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          {/* Photos */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#ffcc00] to-amber-500 rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">Photo Gallery</h3>
                  <p className="text-gray-600">Captured moments from Summit {activeYear}</p>
                </div>
              </div>
              <span className="text-gray-500">{activeImages.length} photos</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {activeImages.map((image) => (
                <div
                  key={image.id}
                  onClick={() => openMedia(image)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="aspect-square relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h4 className="font-bold mb-1">{image.title}</h4>
                        <p className="text-sm text-gray-300">{image.category}</p>
                      </div>
                    </div>

                    {/* Quick View Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                        <Maximize2 className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Like Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(image.id)
                      }}
                      className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${likedItems.includes(image.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Film className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">Video Highlights</h3>
                  <p className="text-gray-600">Watch key moments from Summit {activeYear}</p>
                </div>
              </div>
              <span className="text-gray-500">{activeVideos.length} videos</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => openMedia(video)}
                  className="group cursor-pointer"
                >
                  {/* Video Card */}
                  <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    {/* Video Thumbnail */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-center justify-center">
                      <div className="w-20 h-20 bg-[#ffcc00] group-hover:bg-amber-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-2xl">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          {video.category}
                        </span>
                        <div className="flex items-center gap-1 text-sm">
                          <Heart className="w-4 h-4" />
                          {video.likes + (likedItems.includes(video.id) ? 1 : 0)}
                        </div>
                      </div>
                      <h4 className="font-bold">{video.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Comparison */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#170d43] to-[#2a1b69]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Summit Evolution</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Witness our growth and impact through the years
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {Object.entries(summitData).map(([year, data]) => (
              <div key={year} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-2">{year}</div>
                  <div className="text-sm opacity-80">Summit Year</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-80">Delegates</span>
                    <span className="font-bold">{data.stats.delegates}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-80">Speakers</span>
                    <span className="font-bold">{data.stats.speakers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-80">Exhibitors</span>
                    <span className="font-bold">{data.stats.exhibitors}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-80">Countries</span>
                    <span className="font-bold">{data.stats.countries}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Growth Stats */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2">25%</div>
                <div className="text-sm opacity-80">Growth in 1 Year</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-80">Delegates Growth</span>
                  <span className="font-bold text-green-400">+25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-80">Speaker Increase</span>
                  <span className="font-bold text-green-400">+25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-80">Exhibitor Growth</span>
                  <span className="font-bold text-green-400">+33%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-80">Country Reach</span>
                  <span className="font-bold text-green-400">+25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Summit CTA */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffcc00] via-amber-500 to-orange-400" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Next Chapter</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for Summit 2026?
            </h2>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Building on our legacy, Summit 2026 promises to be bigger, better, and more impactful
              than ever before.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <Calendar className="w-8 h-8 mx-auto mb-3" />
                <div className="text-xl font-bold mb-1">June 11-12, 2026</div>
                <div className="text-sm opacity-80">Save the Dates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <MapPin className="w-8 h-8 mx-auto mb-3" />
                <div className="text-xl font-bold mb-1">Harare, Zimbabwe</div>
                <div className="text-sm opacity-80">HICC Venue</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                <Target className="w-8 h-8 mx-auto mb-3" />
                <div className="text-xl font-bold mb-1">2,000+ Delegates</div>
                <div className="text-sm opacity-80">Expected Attendance</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <button className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105">
                  Register for 2026
                  <ChevronRight className="w-5 h-5 inline ml-2" />
                </button>
              </Link>
              <Link href="/about">
                <button className="bg-transparent hover:bg-white/10 text-white border-2 border-white/30 font-bold px-8 py-4 rounded-xl text-lg transition-colors">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Media Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-6xl p-0 overflow-hidden bg-black border-none">
          {selectedMedia && (
            <div className="relative">
              {/* Media Content */}
              <div className="relative aspect-video bg-gray-900">
                {selectedMedia.type === 'image' ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-white text-center">
                      <Camera className="w-20 h-20 mx-auto mb-4 opacity-50" />
                      <p className="text-gray-400">Image preview would appear here</p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    className="w-full h-full"
                    src={selectedMedia.url}
                    title={selectedMedia.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>

              {/* Media Info */}
              <div className="bg-white p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMedia.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        {selectedMedia.category}
                      </span>
                      <span>Summit {selectedMedia.year}</span>
                      <span>•</span>
                      <span>{selectedMedia.type === 'video' ? 'Video' : 'Photo'}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{selectedMedia.description}</p>

                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLike(selectedMedia.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${likedItems.includes(selectedMedia.id) ? 'fill-red-500 text-red-500' : ''}`}
                      />
                      <span>
                        {selectedMedia.likes + (likedItems.includes(selectedMedia.id) ? 1 : 0)}
                      </span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                    {selectedMedia.type === 'image' && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                        <span>Download</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
