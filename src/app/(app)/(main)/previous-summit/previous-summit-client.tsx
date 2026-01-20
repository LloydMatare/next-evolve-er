'use client'

import {
  Calendar,
  Play,
  ChevronRight,
  Star,
  Trophy,
  Sparkles,
  Target,
  Zap,
  BookOpen,
  MapPin,
  Heart,
  Share2,
  Download,
  Maximize2,
  Film,
  Camera,
} from 'lucide-react'
import React, { useState } from 'react'
import Link from 'next/link'
import SubHero from '@/components/sub-hero'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import type { MediaItem, SummitData } from './page'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface PreviousSummitClientProps {
  summitsData: SummitData[]
}

export default function PreviousSummitClient({ summitsData }: PreviousSummitClientProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeYear, setActiveYear] = useState(summitsData[0]?.year || '2025')
  const [likedItems, setLikedItems] = useState<string[]>([])

  const openMedia = (media: MediaItem) => {
    setSelectedMedia(media)
    setIsDialogOpen(true)
  }

  const toggleLike = (id: string) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const summitDataMap = Object.fromEntries(summitsData.map((s) => [s.year, s]))
  const activeSummit = summitDataMap[activeYear]
  const activeImages = activeSummit?.images || []
  const activeVideos = activeSummit?.videos || []

  if (!summitsData.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Previous Summits Available</h2>
          <p className="text-gray-600">Check back later for summit information</p>
        </div>
      </div>
    )
  }

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

            <div className="flex gap-4 flex-wrap">
              {summitsData.map((summit) => (
                <Button
                  key={summit.year}
                  onClick={() => setActiveYear(summit.year)}
                  className={`transition-all ${
                    activeYear === summit.year
                      ? `bg-gradient-to-r ${summit.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Summit {summit.year}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Summit Overview */}
      <section className="py-16 px-4">
        <div className="container-custom">
          {/* Summit Theme Card */}
          <div
            className={`relative rounded-3xl overflow-hidden ${activeSummit.gradient} p-8 md:p-12 mb-16 text-white`}
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
                  <h2 className="text-4xl md:text-5xl font-bold mb-2">{activeSummit.title}</h2>
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
          {activeImages.length > 0 && (
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
                      <Image src={image.url} alt={image.title} fill className="object-cover" />

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
                          <Maximize2
                            className="w-6 h-6 text-wh
                          ite"
                          />
                        </div>
                      </div>

                      {/* Like Button */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(image.id)
                        }}
                        className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${likedItems.includes(image.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                        />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos */}
          {activeVideos.length > 0 && (
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
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />

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
          )}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {summitsData.map((summit) => (
              <div
                key={summit.year}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-2">{summit.year}</div>
                  <div className="text-sm opacity-80">Summit Year</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-80">Delegates</span>
                    <span className="font-bold">{summit.stats.delegates}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-80">Speakers</span>
                    <span className="font-bold">{summit.stats.speakers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-80">Exhibitors</span>
                    <span className="font-bold">{summit.stats.exhibitors}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-80">Countries</span>
                    <span className="font-bold">{summit.stats.countries}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Summit CTA */}
      <section className="relative py-20 px-4 overflow-hidden">
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

            <p className="text-xl text-white/90 mb-8 text-center">
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
                <div className="text-xl font-bold mb-1">100+ Delegates</div>
                <div className="text-sm opacity-80">Expected Attendance</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button className="bg-white text-gray-900 hover:bg-gray-100 font-bold transition-all duration-300 hover:scale-105">
                  Register for 2026
                  <ChevronRight className="w-5 h-5 inline ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button className="bg-transparent hover:bg-white/10 text-white border-2 border-white/30 font-bold transition-colors">
                  Learn More
                </Button>
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
                  <Image
                    src={selectedMedia.url}
                    alt={selectedMedia.title}
                    fill
                    className="object-contain"
                  />
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
                    <Button
                      onClick={() => toggleLike(selectedMedia.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${likedItems.includes(selectedMedia.id) ? 'fill-red-500 text-red-500' : ''}`}
                      />
                      <span>
                        {selectedMedia.likes + (likedItems.includes(selectedMedia.id) ? 1 : 0)}
                      </span>
                    </Button>
                    <Button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </Button>
                    {selectedMedia.type === 'image' && (
                      <Button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                        <span>Download</span>
                      </Button>
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
