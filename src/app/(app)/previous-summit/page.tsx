'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Calendar, Users, Award, TrendingUp } from 'lucide-react'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function PreviousSummitPage() {
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

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#232f3e] via-[#161e2e] to-[#0f1419]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Previous Summits</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">
            Highlights from past Evolve ICT Summits
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="2025" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-[#f3f3f3] border border-gray-200 p-1">
                <TabsTrigger value="2025" className="data-[state=active]:bg-[#ff9900] data-[state=active]:text-white px-8 py-3">
                  Summit 2025
                </TabsTrigger>
                <TabsTrigger value="2024" className="data-[state=active]:bg-[#ff9900] data-[state=active]:text-white px-8 py-3">
                  Summit 2024
                </TabsTrigger>
              </TabsList>
            </div>

            {/* 2025 Content */}
            <TabsContent value="2025">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-[#232f3e] mb-6">
                  Summit 2025 at a Glance
                </h2>
                <div className="w-24 h-1 bg-[#ff9900] mx-auto mb-8" />
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
                      <Icon className="w-12 h-12 text-[#ff9900] mx-auto mb-4" />
                      <div className="text-4xl font-bold text-[#232f3e] mb-2">{item.value}</div>
                      <div className="text-gray-600 font-medium">{item.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Key Moments - 2025 */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8">
                  <h3 className="text-2xl font-bold text-[#232f3e] mb-4">Key Themes</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Digital Transformation in African Enterprises</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>AI and Machine Learning for Social Impact</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Cybersecurity in the Digital Age</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Fintech and Financial Inclusion</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Youth Empowerment through Technology</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8">
                  <h3 className="text-2xl font-bold text-[#232f3e] mb-4">Highlights</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Minister of ICT Keynote Address</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Innovation Showcase with 30+ Startups</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Panel: Women in Tech Leadership</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Networking Gala with 1000+ Attendees</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Technology Exhibition Featuring Global Brands</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Gallery Preview - 2025 */}
              <div className="mb-12">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-[#232f3e] mb-4">Summit 2025 Gallery</h3>
                  <div className="w-16 h-1 bg-[#ff9900] mx-auto" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-[#f3f3f3] rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* 2024 Content */}
            <TabsContent value="2024">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-[#232f3e] mb-6">
                  Summit 2024 at a Glance
                </h2>
                <div className="w-24 h-1 bg-[#ff9900] mx-auto mb-8" />
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
                      <Icon className="w-12 h-12 text-[#ff9900] mx-auto mb-4" />
                      <div className="text-4xl font-bold text-[#232f3e] mb-2">{item.value}</div>
                      <div className="text-gray-600 font-medium">{item.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Key Moments - 2024 */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8">
                  <h3 className="text-2xl font-bold text-[#232f3e] mb-4">Key Themes</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Cloud Computing for African Businesses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Mobile Technology and Connectivity</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>E-Government Solutions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Smart Cities and IoT</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Digital Skills Development</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8">
                  <h3 className="text-2xl font-bold text-[#232f3e] mb-4">Highlights</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Presidential Address on Digital Economy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Startup Pitch Competition Finals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Regional ICT Ministers Roundtable</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Technology Demo Zone with 50+ Exhibitors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#ff9900] rounded-full mt-2 mr-3" />
                      <span>Youth Hackathon Finals</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Gallery Preview - 2024 */}
              <div className="mb-12">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-[#232f3e] mb-4">Summit 2024 Gallery</h3>
                  <div className="w-16 h-1 bg-[#ff9900] mx-auto" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-[#f3f3f3] rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Don&apos;t Miss Summit 2026!
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join us for an even bigger and better event on June 11-12, 2026
          </p>
          <a
            href="/"
            className="inline-block bg-[#ff9900] hover:bg-purple-600 text-white font-bold text-lg px-12 py-4 rounded-lg transition-colors"
          >
            Register for 2026
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
