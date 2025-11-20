'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Image as ImageIcon, Play } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface MediaItem {
  id: number
  type: 'image' | 'video'
  url: string
  thumbnail: string
  title: string
  description: string
}

// Sample data - replace with actual images and videos
const sampleImages: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    url: '/placeholder.jpg',
    thumbnail: '/placeholder.jpg',
    title: 'Opening Ceremony 2025',
    description: 'The grand opening of Evolve ICT Summit 2025',
  },
  {
    id: 2,
    type: 'image',
    url: '/placeholder.jpg',
    thumbnail: '/placeholder.jpg',
    title: 'Keynote Address',
    description: 'Minister of ICT delivering the keynote speech',
  },
  {
    id: 3,
    type: 'image',
    url: '/placeholder.jpg',
    thumbnail: '/placeholder.jpg',
    title: 'Tech Exhibition',
    description: 'Innovative technology showcase',
  },
  {
    id: 4,
    type: 'image',
    url: '/placeholder.jpg',
    thumbnail: '/placeholder.jpg',
    title: 'Panel Discussion',
    description: 'Women in Tech Leadership panel',
  },
  {
    id: 5,
    type: 'image',
    url: '/placeholder.jpg',
    thumbnail: '/placeholder.jpg',
    title: 'Networking Session',
    description: 'Delegates networking during the event',
  },
  {
    id: 6,
    type: 'image',
    url: '/placeholder.jpg',
    thumbnail: '/placeholder.jpg',
    title: 'Innovation Showcase',
    description: 'Startups presenting their innovations',
  },
]

const sampleVideos: MediaItem[] = [
  {
    id: 1,
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/placeholder.jpg',
    title: 'Summit 2025 Highlights',
    description: 'Watch the best moments from the 2025 summit',
  },
  {
    id: 2,
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/placeholder.jpg',
    title: 'Keynote Speech',
    description: 'Full recording of the opening keynote',
  },
  {
    id: 3,
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/placeholder.jpg',
    title: 'Innovation Pitch',
    description: 'Top startup pitches from the competition',
  },
  {
    id: 4,
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/placeholder.jpg',
    title: 'Event Recap',
    description: 'Complete event summary and attendee testimonials',
  },
]

export default function GalleryPage() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openMedia = (media: MediaItem) => {
    setSelectedMedia(media)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#232f3e] via-[#161e2e] to-[#0f1419]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Gallery</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
            Moments from Evolve ICT Summit
          </p>
        </div>
      </section>

      {/* Images Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-12">
            <ImageIcon className="w-10 h-10 text-[#ff9900] mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#232f3e]">Photos</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sampleImages.map((image) => (
              <div
                key={image.id}
                onClick={() => openMedia(image)}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
              >
                <div className="w-full h-full bg-[#f3f3f3] transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center p-4">
                    <p className="font-bold">{image.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-20 px-4 bg-white border border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-12">
            <Play className="w-10 h-10 text-[#ff9900] mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#232f3e]">Videos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => openMedia(video)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden rounded-lg mb-3">
                  <div className="w-full h-full bg-[#f3f3f3]" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#ff9900] group-hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-[#232f3e] mb-1">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          {selectedMedia && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMedia.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                {selectedMedia.type === 'image' ? (
                  <div className="w-full aspect-video bg-[#f3f3f3] rounded-lg" />
                ) : (
                  <div className="w-full aspect-video">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src={selectedMedia.url}
                      title={selectedMedia.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                <p className="text-gray-600 mt-4">{selectedMedia.description}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
