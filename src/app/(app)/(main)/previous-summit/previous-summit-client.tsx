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
  Users,
} from 'lucide-react'
import React, { useState } from 'react'
import Link from 'next/link'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import type { MediaItem, SummitData } from './page'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/page-hero'
import { FadeIn } from '@/components/fade-in'
import { SectionHeading } from '@/components/section-heading'

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
      <div className="min-h-screen">
        <div className="container-custom px-4 pt-32 sm:px-6 lg:px-8">
          <div className="event-surface mx-auto max-w-2xl rounded-[2rem] p-10 text-center">
            <h2 className="text-3xl font-semibold text-slate-950">No previous summits available</h2>
            <p className="mt-3 text-slate-600">Check back later for summit information.</p>
            <div className="mt-6 flex justify-center">
              <Button asChild className="rounded-full bg-slate-950 text-white hover:bg-slate-800">
                <Link href="/">Back to home</Link>
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
        eyebrow="Our Legacy"
        title="Past summits, lasting"
        accent="event momentum"
        description="Relive the memorable moments, insights, and innovations from previous editions — and see how the summit keeps growing year after year."
        primaryCta={{ href: '/register', label: 'Register for 2026' }}
        secondaryCta={{ href: '/gallery', label: 'View Gallery' }}
        image="/bg-1.jpg"
        imageAlt="Past summit background"
        compact
      />

      {/* Video Hero Section */}
      <section className="relative h-[400px] overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <video className="h-full w-full object-cover" autoPlay loop muted playsInline>
            <source
              src="https://cdn.coverr.co/videos/coverr-crowd-at-conference-1-2642/1080p.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/50" />
        </div>
        <div className="relative flex h-full items-center">
          <div className="container-custom">
            <FadeIn>
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  <Film className="mr-2 h-4 w-4" />
                  Relive The Magic
                </div>
                <h2 className="text-4xl font-semibold text-white md:text-5xl">
                  Every moment captured
                </h2>
                <p className="mt-4 text-lg text-slate-300">
                  Watch highlights from previous summits and see why Evolve is Africa's premier tech
                  gathering.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Timeline Navigation */}
      <section className="sticky top-0 z-40 border-b border-white/10 bg-white/82 backdrop-blur-xl">
        <div className="container-custom px-4 py-6 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="event-surface rounded-[2rem] p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Summit Journey
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-slate-950">
                    Choose an edition
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {summitsData.map((summit) => (
                    <Button
                      key={summit.year}
                      type="button"
                      variant="outline"
                      onClick={() => setActiveYear(summit.year)}
                      className={`rounded-full border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-50 ${
                        activeYear === summit.year ? 'border-slate-900 text-slate-950' : ''
                      }`}
                    >
                      Summit {summit.year}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Summit Overview */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          {/* Summit Theme Card */}
          <FadeIn>
            <div className="event-panel-dark rounded-[2.2rem] p-8 md:p-12">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                    Summit {activeYear}
                  </div>
                  <h2 className="mt-5 text-4xl font-semibold text-white md:text-5xl">
                    {activeSummit.title}
                  </h2>
                  <p className="mt-4 text-lg text-slate-300">{activeSummit.theme}</p>
                </div>

                <div className="grid w-full gap-3 sm:grid-cols-2 lg:max-w-md">
                  {[
                    { value: activeSummit.stats.delegates, label: 'Delegates' },
                    { value: activeSummit.stats.speakers, label: 'Speakers' },
                    { value: activeSummit.stats.exhibitors, label: 'Exhibitors' },
                    { value: activeSummit.stats.countries, label: 'Countries' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 text-center"
                    >
                      <div className="text-3xl font-semibold text-white">{stat.value}</div>
                      <div className="mt-2 text-xs font-bold uppercase tracking-[0.24em] text-slate-300">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Key Highlights */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* Summit Themes */}
            <FadeIn>
              <div className="event-surface rounded-[2rem] p-8 md:p-10">
                <SectionHeading
                  eyebrow="Key Themes"
                  title={`Focus areas for Summit ${activeYear}`}
                  description="A snapshot of the headline topics that defined the edition."
                  align="left"
                />

                <div className="space-y-3">
                  {activeSummit.themes.map((theme, index) => (
                    <div
                      key={theme}
                      className="rounded-[1.25rem] border border-slate-200/70 bg-white/80 p-4 text-slate-700"
                    >
                      {theme}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Summit Highlights */}
            <FadeIn delay={120}>
              <div className="event-surface rounded-[2rem] p-8 md:p-10">
                <SectionHeading
                  eyebrow="Highlights"
                  title={`Memorable moments from Summit ${activeYear}`}
                  description="The moments that shaped the edition and created momentum."
                  align="left"
                />

                <div className="space-y-3">
                  {activeSummit.highlights.map((highlight, index) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200/70 bg-white/80 p-4 text-slate-700"
                    >
                      <Star className="mt-1 h-5 w-5 flex-none text-[var(--brand-gold)]" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-[linear-gradient(180deg,#ffffff,#eef4ff)] px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          {/* Photos */}
          {activeImages.length > 0 && (
            <div className="mb-16">
              <SectionHeading
                eyebrow="Photo Gallery"
                title="Captured moments worth revisiting."
                description={`Browse highlights from Summit ${activeYear}.`}
                align="left"
              />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {activeImages.map((image) => (
                  <FadeIn key={image.id}>
                    <div
                      onClick={() => openMedia(image)}
                      className="event-surface event-card-hover group relative cursor-pointer overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-0"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <Image src={image.url} alt={image.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-transparent opacity-85" />

                        <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">
                          <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur">
                            {image.category}
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleLike(image.id)
                            }}
                            className="rounded-full border-white/16 bg-white/10 text-white hover:bg-white/16"
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                likedItems.includes(image.id)
                                  ? 'fill-red-500 text-red-500'
                                  : 'text-white'
                              }`}
                            />
                          </Button>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h4 className="text-lg font-semibold">{image.title}</h4>
                          <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
                            <Maximize2 className="h-4 w-4" />
                            <span className="font-semibold">Quick view</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
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

      {/* Testimonials Section */}
      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Attendee Voices"
            title="What participants say."
            description="Hear from delegates who experienced our summits firsthand."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Dr. James Wilson',
                company: 'TechCorp Africa',
                quote:
                  'The summit connected us with partners we never thought possible. Incredible networking.',
              },
              {
                name: 'Sarah Chen',
                company: 'Innovate Hub',
                quote:
                  "Best tech event I've attended in Africa. The quality of speakers was exceptional.",
              },
              {
                name: 'Marcus Johnson',
                company: 'Startup Kenya',
                quote:
                  'We found three investors and two strategic partners. Absolutely worth attending.',
              },
            ].map((testimonial, index) => (
              <FadeIn key={testimonial.name} delay={index * 100}>
                <div className="event-surface rounded-[1.8rem] p-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
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
