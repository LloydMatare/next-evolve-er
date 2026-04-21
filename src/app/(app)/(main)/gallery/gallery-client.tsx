'use client'

import {
  Image as ImageIcon,
  Play,
  Grid,
  Video,
  Filter,
  X,
  Maximize2,
  Download,
  Share2,
  Heart,
} from 'lucide-react'
import React, { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'
import type { MediaItem } from './page'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/page-hero'
import { FadeIn } from '@/components/fade-in'
import { SectionHeading } from '@/components/section-heading'

interface GalleryClientProps {
  images: MediaItem[]
  videos: MediaItem[]
  categories: string[]
  years: string[]
}

export default function GalleryClient({ images, videos, categories, years }: GalleryClientProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeYear, setActiveYear] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')
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

  const filteredImages = images.filter((item) => {
    if (activeCategory !== 'All' && item.category !== activeCategory) return false
    if (activeYear !== 'All' && item.year.toString() !== activeYear) return false
    return true
  })

  const filteredVideos = videos.filter((item) => {
    if (activeCategory !== 'All' && item.category !== activeCategory) return false
    if (activeYear !== 'All' && item.year.toString() !== activeYear) return false
    return true
  })

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Summit Gallery"
        title="Photos, film, and replay-worthy"
        accent="event moments"
        description="The gallery now sits inside the same modern event shell, so the visual storytelling feels cohesive from the homepage through to media highlights."
        primaryCta={{ href: '/register', label: 'Join The Event' }}
        secondaryCta={{ href: '/previous-summit', label: 'View Past Editions' }}
        image="/bg-1.jpg"
        imageAlt="Audience and stage lights"
        compact
      />

      <section className="sticky top-0 z-40 border-b border-white/10 bg-white/82 backdrop-blur-xl">
        <div className="container-custom px-4 py-6 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="event-surface rounded-[2rem] p-5 md:p-6">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Filter className="h-4 w-4 text-[var(--brand-blue)]" />
                    Filters
                  </div>

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-slate-500">Category</span>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Button
                            key={category}
                            type="button"
                            variant="outline"
                            onClick={() => setActiveCategory(category)}
                            className={`rounded-full border-slate-200 bg-white/80 text-sm text-slate-700 hover:bg-slate-50 ${
                              activeCategory === category
                                ? 'border-[rgba(57,214,255,0.55)] text-slate-950'
                                : ''
                            }`}
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-slate-500">Year</span>
                      <div className="flex flex-wrap gap-2">
                        {years.map((year) => (
                          <Button
                            key={year}
                            type="button"
                            variant="outline"
                            onClick={() => setActiveYear(year)}
                            className={`rounded-full border-slate-200 bg-white/80 text-sm text-slate-700 hover:bg-slate-50 ${
                              activeYear === year ? 'border-slate-900 text-slate-950' : ''
                            }`}
                          >
                            {year}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setViewMode('grid')}
                    className={`rounded-full border-slate-200 bg-white/80 ${
                      viewMode === 'grid'
                        ? 'border-[rgba(57,214,255,0.55)] text-slate-950'
                        : 'text-slate-600'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                    <span className="ml-2 text-sm font-semibold">Grid</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setViewMode('masonry')}
                    className={`rounded-full border-slate-200 bg-white/80 ${
                      viewMode === 'masonry'
                        ? 'border-[rgba(57,214,255,0.55)] text-slate-950'
                        : 'text-slate-600'
                    }`}
                  >
                    <span className="flex h-4 w-4 flex-col justify-center gap-0.5">
                      <span className="flex gap-0.5">
                        <span className="h-1.5 w-1.5 rounded bg-current" />
                        <span className="h-1.5 w-1.5 rounded bg-current" />
                      </span>
                      <span className="flex gap-0.5">
                        <span className="h-1.5 w-1.5 rounded bg-current" />
                        <span className="h-1.5 w-1.5 rounded bg-current" />
                      </span>
                    </span>
                    <span className="ml-2 text-sm font-semibold">Masonry</span>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Photo Highlights"
            title="A gallery that feels like the event."
            description="Browse curated moments with the same premium surfaces, hover motion, and visual storytelling as the rest of the site."
          />

          <div
            className={`grid ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-6`}
          >
            {filteredImages.map((image) => (
              <FadeIn key={image.id} className="h-full">
                <div
                  onClick={() => openMedia(image)}
                  className="event-surface event-card-hover group relative h-full cursor-pointer overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-0"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {image.url ? (
                      <Image
                        src={image.url}
                        alt={image.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-[linear-gradient(135deg,rgba(67,97,238,0.18),rgba(57,214,255,0.16))]" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-transparent opacity-85" />

                    <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">
                      <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur">
                        {image.category}
                      </div>
                      <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur">
                        {image.year}
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-lg font-semibold">{image.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-200/90">
                        {image.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleLike(image.id)
                          }}
                          className="rounded-full border-white/16 bg-white/10 text-white hover:bg-white/16"
                        >
                          -*
                          <Heart
                            className={`h-4 w-4 ${
                              likedItems.includes(image.id)
                                ? 'fill-red-500 text-red-500'
                                : 'text-white'
                            }`}
                          />
                          <span className="ml-2 text-sm font-semibold">
                            {image.likes + (likedItems.includes(image.id) ? 1 : 0)}
                          </span>
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-white/80">
                          <Maximize2 className="h-4 w-4" />
                          <span className="font-semibold">Quick view</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <FadeIn>
              <div className="event-surface mt-10 rounded-[2rem] p-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(67,97,238,0.12)] text-[var(--brand-blue)]">
                  <ImageIcon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-slate-950">No photos found</h3>
                <p className="mt-3 text-slate-600">Try changing your filters.</p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      <section className="section-padding bg-[linear-gradient(180deg,#ffffff,#eef4ff)] px-4 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Video Replays"
            title="Watch keynote moments and highlight reels."
            description="A cleaner, more cinematic video grid that still feels part of the same event website."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <FadeIn key={video.id}>
                <div
                  onClick={() => openMedia(video)}
                  className="event-surface event-card-hover group relative cursor-pointer overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-0"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#050814]">
                    {video.thumbnail && video.thumbnail !== '/placeholder.png' ? (
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover opacity-95"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(57,214,255,0.18),transparent_55%)]" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-transparent" />

                    <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">
                      <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur">
                        {video.category}
                      </div>
                      <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur">
                        {video.year}
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-gold)] text-slate-950 shadow-2xl transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-7 w-7 translate-x-px" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-lg font-semibold">{video.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-200/90">
                        {video.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-white/80">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          <span className="font-semibold">
                            {video.views?.toLocaleString() || '0'}
                          </span>
                          <span>views</span>
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleLike(video.id)
                          }}
                          className="rounded-full border-white/16 bg-white/10 text-white hover:bg-white/16"
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              likedItems.includes(video.id)
                                ? 'fill-red-500 text-red-500'
                                : 'text-white'
                            }`}
                          />
                          <span className="ml-2 font-semibold">
                            {video.likes + (likedItems.includes(video.id) ? 1 : 0)}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <FadeIn>
              <div className="event-surface mt-10 rounded-[2rem] p-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(67,97,238,0.12)] text-[var(--brand-blue)]">
                  <Video className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-slate-950">No videos found</h3>
                <p className="mt-3 text-slate-600">Try changing your filters.</p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      <section className="section-padding px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container-custom">
          <FadeIn>
            <div className="event-panel-dark rounded-[2.2rem] p-8 md:p-12">
              <div className="grid gap-6 text-center md:grid-cols-4">
                {[
                  { value: images.length, label: 'Photos' },
                  { value: videos.length, label: 'Videos' },
                  { value: Math.max(categories.length - 1, 0), label: 'Categories' },
                  { value: Math.max(years.length - 1, 0), label: 'Years' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.75rem] border border-white/10 bg-white/6 p-6"
                  >
                    <div className="text-4xl font-semibold text-white md:text-5xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-xs font-bold uppercase tracking-[0.24em] text-slate-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
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
                  selectedMedia.url ? (
                    <Image
                      src={selectedMedia.url}
                      alt={selectedMedia.title}
                      fill
                      className="object-contain"
                      sizes="90vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-white text-center">
                        <ImageIcon className="w-20 h-20 mx-auto mb-4 opacity-50" />
                        <p className="text-gray-400">Image not available</p>
                      </div>
                    </div>
                  )
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

              {/* Media Info Panel */}
              <div className="bg-white p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMedia.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        {selectedMedia.category}
                      </span>
                      <span>{selectedMedia.year}</span>
                      <span>•</span>
                      <span>{selectedMedia.type === 'video' ? 'Video' : 'Photo'}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </Button>
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
                    {selectedMedia.type === 'image' && selectedMedia.url && (
                      <a
                        href={selectedMedia.url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        <span>Download</span>
                      </a>
                    )}
                  </div>

                  <div className="text-sm text-gray-500">
                    {selectedMedia.type === 'video' && selectedMedia.views && (
                      <span>{selectedMedia.views.toLocaleString()} views</span>
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
