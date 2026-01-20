'use client'

import { Navbar } from '@/components/navbar'
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
import SubHero from '@/components/sub-hero'
import Image from 'next/image'
import type { MediaItem } from './page'
import { Button } from '@/components/ui/button'

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
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f1419]">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ffcc00]/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Grid className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm font-medium text-white">Visual Journey</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Gallery</h1>

          <p className="text-xl md:text-2xl text-gray-300 text-center mb-8">
            Relive the{' '}
            <span className="text-[#ffcc00] font-semibold">magic, moments, and milestones</span> of
            {` Africa's premier ICT summit`}
          </p>

          <SubHero />
        </div>
      </section>

      {/* Filter Controls */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#ffcc00]" />
              <span className="font-medium text-gray-700">Filter by:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Category Filters */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Category:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                        activeCategory === category
                          ? 'bg-[#ffcc00] text-gray-900 font-medium'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Year Filters */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Year:</span>
                <div className="flex gap-2">
                  {years.map((year) => (
                    <Button
                      key={year}
                      onClick={() => setActiveYear(year)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                        activeYear === year
                          ? 'bg-[#170d43] text-white font-medium'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#ffcc00]/10 text-[#ffcc00]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-lg ${viewMode === 'masonry' ? 'bg-[#ffcc00]/10 text-[#ffcc00]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 bg-current rounded" />
                    <div className="w-1.5 h-1.5 bg-current rounded" />
                  </div>
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 bg-current rounded" />
                    <div className="w-1.5 h-1.5 bg-current rounded" />
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section className="py-16 px-4">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#ffcc00]/10 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-[#ffcc00]" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#170d43]">Photos</h2>
                <p className="text-gray-600 mt-1">{filteredImages.length} moments captured</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredImages.length} of {images.length} photos
            </div>
          </div>

          <div
            className={`grid ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-6`}
          >
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onClick={() => openMedia(image)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  {image.url ? (
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-bold text-lg mb-2">{image.title}</h3>
                      <p className="text-sm text-gray-300 line-clamp-2">{image.description}</p>
                    </div>
                  </div>

                  {/* Top Right Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                      {image.category}
                    </div>
                  </div>

                  {/* Bottom Left Info */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-4">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(image.id)
                      }}
                      className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${likedItems.includes(image.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                      />
                      <span className="text-white text-sm">
                        {image.likes + (likedItems.includes(image.id) ? 1 : 0)}
                      </span>
                    </Button>
                    <div className="text-white/80 text-sm bg-black/30 px-3 py-1.5 rounded-full">
                      {image.year}
                    </div>
                  </div>
                </div>

                {/* Quick View Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-500">No photos found</h3>
              <p className="text-gray-400 mt-2">Try changing your filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#ffcc00]/10 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-[#ffcc00]" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#170d43]">Videos</h2>
                <p className="text-gray-600 mt-1">{filteredVideos.length} featured videos</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Total views:{' '}
              {filteredVideos.reduce((sum, video) => sum + (video.views || 0), 0).toLocaleString()}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                {/* Video Card */}
                <div
                  onClick={() => openMedia(video)}
                  className="relative aspect-video overflow-hidden rounded-2xl bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Video Thumbnail */}
                  {video.thumbnail && video.thumbnail !== '/placeholder.png' ? (
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                  )}

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-center justify-center">
                    <div className="w-20 h-20 bg-[#ffcc00] group-hover:bg-amber-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-2xl">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>

                  {/* Video Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium bg-[#ffcc00] text-gray-900 px-3 py-1 rounded-full">
                        {video.category}
                      </span>
                      <span className="text-sm opacity-75">{video.year}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{video.title}</h3>
                    <p className="text-sm text-gray-300 line-clamp-2 mb-3">{video.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Play className="w-4 h-4" />
                          <span>{video.views?.toLocaleString() || '0'}</span>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleLike(video.id)
                          }}
                          className="flex items-center gap-1 hover:text-[#ffcc00] transition-colors"
                        >
                          <Heart
                            className={`w-4 h-4 ${likedItems.includes(video.id) ? 'fill-red-500 text-red-500' : ''}`}
                          />
                          <span>{video.likes + (likedItems.includes(video.id) ? 1 : 0)}</span>
                        </Button>
                      </div>
                      <div className="opacity-75">Watch now →</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-20">
              <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-500">No videos found</h3>
              <p className="text-gray-400 mt-2">Try changing your filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#170d43] to-[#2a1b69]">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">{images.length}</div>
              <div className="text-gray-300">Photos</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">{videos.length}</div>
              <div className="text-gray-300">Videos</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">{categories.length - 1}</div>
              <div className="text-gray-300">Categories</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">{years.length - 1}</div>
              <div className="text-gray-300">Years of Content</div>
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
