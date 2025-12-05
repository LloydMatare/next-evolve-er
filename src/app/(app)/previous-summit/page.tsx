'use client'

import { Navbar } from '@/components/navbar'
import { Calendar, Users, Award, TrendingUp, ImageIcon, Play } from 'lucide-react'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import SubHero from '@/components/sub-hero'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface MediaItem {
  id: number
  type: 'image' | 'video'
  url: string
  thumbnail: string
  title: string
  description: string
}

// Summit 2025 Media Data
const summit2025Images: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Opening Ceremony 2025',
    description: 'The grand opening of Evolve ICT Summit 2025',
  },
  {
    id: 2,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Keynote Address',
    description: 'Minister of ICT delivering the keynote speech',
  },
  {
    id: 3,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Tech Exhibition 2025',
    description: 'Innovative technology showcase at the exhibition hall',
  },
  {
    id: 4,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Women in Tech Panel',
    description: 'Women in Tech Leadership panel discussion',
  },
  {
    id: 5,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Networking Session 2025',
    description: 'Delegates networking during coffee break',
  },
  {
    id: 6,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Startup Pitch Finals',
    description: 'Startups presenting their innovations',
  },
  {
    id: 7,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Awards Ceremony',
    description: 'Technology innovation awards presentation',
  },
  {
    id: 8,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Closing Remarks',
    description: 'Closing ceremony and way forward',
  },
]

const summit2025Videos: MediaItem[] = [
  {
    id: 1,
    type: 'video',
    url: 'https://www.youtube.com/embed/G3OkPRWPt5Q',
    thumbnail: '/placeholder.png',
    title: 'Evolve ICT Africa Summit 2025 Highlights',
    description: 'Complete highlights from the 2025 summit',
  },
  {
    id: 2,
    type: 'video',
    url: 'https://www.youtube.com/embed/2LF1yn4hnSA',
    thumbnail: '/placeholder.png',
    title: 'Keynote Speeches 2025',
    description: 'Keynote addresses from industry leaders',
  },
  {
    id: 3,
    type: 'video',
    url: 'https://www.youtube.com/embed/-wC83hcM1WA',
    thumbnail: '/placeholder.png',
    title: 'Panel Discussions 2025',
    description: 'Insights from expert panel discussions',
  },
  {
    id: 4,
    type: 'video',
    url: 'https://www.youtube.com/embed/uN26v2_JW7s',
    thumbnail: '/placeholder.png',
    title: 'Exhibition Tour 2025',
    description: 'Tour of the technology exhibition hall',
  },
]

// Summit 2024 Media Data
const summit2024Images: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Presidential Address 2024',
    description: 'Presidential address on digital economy',
  },
  {
    id: 2,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Startup Competition',
    description: 'Startup pitch competition finals',
  },
  {
    id: 3,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'ICT Ministers Roundtable',
    description: 'Regional ICT Ministers roundtable discussion',
  },
  {
    id: 4,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Tech Demo Zone',
    description: 'Technology demonstration zone',
  },
  {
    id: 5,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Youth Hackathon',
    description: 'Youth hackathon finals and presentations',
  },
  {
    id: 6,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Networking Gala',
    description: 'Evening networking gala event',
  },
  {
    id: 7,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Workshop Sessions',
    description: 'Interactive workshop sessions',
  },
  {
    id: 8,
    type: 'image',
    url: '/placeholder.png',
    thumbnail: '/placeholder.png',
    title: 'Closing Ceremony 2024',
    description: '2024 summit closing ceremony',
  },
]

const summit2024Videos: MediaItem[] = [
  {
    id: 1,
    type: 'video',
    url: 'https://www.youtube.com/embed/G3OkPRWPt5Q',
    thumbnail: '/placeholder.png',
    title: 'Summit 2024 Official Highlights',
    description: 'Complete highlights from the 2024 summit',
  },
  {
    id: 2,
    type: 'video',
    url: 'https://www.youtube.com/embed/2LF1yn4hnSA',
    thumbnail: '/placeholder.png',
    title: 'Presidential Address 2024',
    description: 'Full presidential address on digital transformation',
  },
  {
    id: 3,
    type: 'video',
    url: 'https://www.youtube.com/embed/-wC83hcM1WA',
    thumbnail: '/placeholder.png',
    title: 'Youth Hackathon 2024',
    description: 'Youth hackathon competition and winners',
  },
  {
    id: 4,
    type: 'video',
    url: 'https://www.youtube.com/embed/uN26v2_JW7s',
    thumbnail: '/placeholder.png',
    title: 'Panel Discussions 2024',
    description: 'Expert panel discussions on various topics',
  },
]

export default function PreviousSummitPage() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const summit2025Highlights = [
    { icon: Users, label: 'Delegates', value: '1,500+' },
    { icon: Award, label: 'Speakers', value: '50+' },
    { icon: TrendingUp, label: 'Exhibitors', value: '80+' },
    { icon: Calendar, label: 'Days', value: '2' },
  ]

  const summit2024Highlights = [
    { icon: Users, label: 'Delegates', value: '1,200+' },
    { icon: Award, label: 'Speakers', value: '40+' },
    { icon: TrendingUp, label: 'Exhibitors', value: '60+' },
    { icon: Calendar, label: 'Days', value: '2' },
  ]

  const openMedia = (media: MediaItem) => {
    setSelectedMedia(media)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#170d43] via-[#161e2e] to-[#0f1419]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Previous Summits</h1>
          <p className="text-lg md:text-xl text-gray-300 ">
            Highlights from past Evolve ICT Summits
          </p>
          <SubHero />
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="2025" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-[#f3f3f3] border border-gray-200 p-1">
                <TabsTrigger
                  value="2025"
                  className="data-[state=active]:bg-[#ffcc00] data-[state=active]:text-white px-8 py-3"
                >
                  Summit 2025
                </TabsTrigger>
                <TabsTrigger
                  value="2024"
                  className="data-[state=active]:bg-[#ffcc00] data-[state=active]:text-white px-8 py-3"
                >
                  Summit 2024
                </TabsTrigger>
              </TabsList>
            </div>

            {/* 2025 Content */}
            <TabsContent value="2025">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-[#170d43] mb-6">
                  Summit 2025 at a Glance
                </h2>
                <div className="w-24 h-1 bg-[#ffcc00] mx-auto mb-8" />
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                  The inaugural Evolve ICT Summit 2025 brought together technology leaders,
                  innovators, and changemakers from across Africa and beyond.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-8 mb-16">
                {summit2025Highlights.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-sm p-8 text-center hover:shadow-xl transition-all"
                    >
                      <Icon className="w-12 h-12 text-[#ffcc00] mx-auto mb-4" />
                      <div className="text-4xl font-bold text-[#170d43] mb-2">{item.value}</div>
                      <div className="text-gray-600 font-medium">{item.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Key Moments - 2025 */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8">
                  <h3 className="text-2xl font-bold text-[#170d43] mb-4">Key Themes</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Digital Transformation in African Enterprises</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>AI and Machine Learning for Social Impact</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Cybersecurity in the Digital Age</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Fintech and Financial Inclusion</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Youth Empowerment through Technology</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8">
                  <h3 className="text-2xl font-bold text-[#170d43] mb-4">Highlights</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Minister of ICT Keynote Address</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Innovation Showcase with 30+ Startups</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Panel: Women in Tech Leadership</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Networking Gala with 1000+ Attendees</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Technology Exhibition Featuring Global Brands</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Gallery Section - 2025 */}
              <div className="mb-16">
                <div className="flex items-center mb-8">
                  <ImageIcon className="w-10 h-10 text-[#ffcc00] mr-4" />
                  <h3 className="text-3xl font-bold text-[#170d43]">Photos - Summit 2025</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                  {summit2025Images.map((image) => (
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

                {/* Videos Section - 2025 */}
                <div className="flex items-center mb-8">
                  <Play className="w-10 h-10 text-[#ffcc00] mr-4" />
                  <h3 className="text-3xl font-bold text-[#170d43]">Videos - Summit 2025</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {summit2025Videos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => openMedia(video)}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-lg mb-3">
                        <div className="w-full h-full bg-[#f3f3f3]" />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 bg-[#ffcc00] group-hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                      </div>
                      <h3 className="font-bold text-[#170d43] mb-1">{video.title}</h3>
                      <p className="text-sm text-gray-600">{video.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* 2024 Content */}
            <TabsContent value="2024">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-[#170d43] mb-6">
                  Summit 2024 at a Glance
                </h2>
                <div className="w-24 h-1 bg-[#ffcc00] mx-auto mb-8" />
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                  The 2024 summit marked a milestone in Zimbabwe&apos;s digital transformation
                  journey, bringing together pioneers and visionaries from across the continent.
                </p>
              </div>

              {/* Stats Grid - 2024 */}
              <div className="grid md:grid-cols-4 gap-8 mb-16">
                {summit2024Highlights.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-sm p-8 text-center hover:shadow-xl transition-all"
                    >
                      <Icon className="w-12 h-12 text-[#ffcc00] mx-auto mb-4" />
                      <div className="text-4xl font-bold text-[#170d43] mb-2">{item.value}</div>
                      <div className="text-gray-600 font-medium">{item.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Key Moments - 2024 */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8">
                  <h3 className="text-2xl font-bold text-[#170d43] mb-4">Key Themes</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Cloud Computing for African Businesses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Mobile Technology and Connectivity</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>E-Government Solutions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Smart Cities and IoT</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Digital Skills Development</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8">
                  <h3 className="text-2xl font-bold text-[#170d43] mb-4">Highlights</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Presidential Address on Digital Economy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Startup Pitch Competition Finals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Regional ICT Ministers Roundtable</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Technology Demo Zone with 50+ Exhibitors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 mr-3" />
                      <span>Youth Hackathon Finals</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Gallery Section - 2024 */}
              <div className="mb-16">
                <div className="flex items-center mb-8">
                  <ImageIcon className="w-10 h-10 text-[#ffcc00] mr-4" />
                  <h3 className="text-3xl font-bold text-[#170d43]">Photos - Summit 2024</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                  {summit2024Images.map((image) => (
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

                {/* Videos Section - 2024 */}
                <div className="flex items-center mb-8">
                  <Play className="w-10 h-10 text-[#ffcc00] mr-4" />
                  <h3 className="text-3xl font-bold text-[#170d43]">Videos - Summit 2024</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {summit2024Videos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => openMedia(video)}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-lg mb-3">
                        <div className="w-full h-full bg-[#f3f3f3]" />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 bg-[#ffcc00] group-hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                      </div>
                      <h3 className="font-bold text-[#170d43] mb-1">{video.title}</h3>
                      <p className="text-sm text-gray-600">{video.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-zinc-400">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Don&apos;t Miss Summit 2026!</h2>
          <p className="text-md md:text-xl text-blue-100 mb-8">
            Join us for an even bigger and better event on June 11-12, 2026
          </p>
          <Link
            href="/register"
            className="inline-block bg-[#ffcc00] hover:bg-amber-600 text-white text-sm font-bold px-12 py-4 rounded-lg transition-colors"
          >
            Register for 2026
          </Link>
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
    </div>
  )
}
