import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Users, Lightbulb, Target, TrendingUp, Calendar, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import SubHero from '@/components/sub-hero'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#232f3e] via-[#161e2e] to-[#0f1419]">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About the Summit</h1>
          <p className="text-lg md:text-xl text-gray-300 ">
            Discover the vision behind Africa&apos;s premier ICT Summit
          </p>
          <SubHero />
        </div>
      </section>

      {/* Synopsis Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#232f3e] mb-6">Event Synopsis</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-base text-gray-600">
                <p className="flex items-start">
                  <span className="font-bold text-[#232f3e] mr-2 min-w-[120px]">Theme:</span>
                  <span>Empowering Africa&apos;s Digital Leap</span>
                </p>
                <p className="flex items-start">
                  <span className="font-bold text-[#232f3e] mr-2 min-w-[120px]">Dates:</span>
                  <span>11-12 June 2026</span>
                </p>
              </div>
              <div className="space-y-4 text-base text-gray-600">
                <p className="flex items-start">
                  <span className="font-bold text-[#232f3e] mr-2 min-w-[120px]">Venue:</span>
                  <span>Harare International Conference Centre (HICC)</span>
                </p>
                <p className="flex items-start">
                  <span className="font-bold text-[#232f3e] mr-2 min-w-[120px]">Organized by:</span>
                  <span>Evolve Africa</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-[#f3f3f3]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#232f3e] mb-4">
              Overview
            </h2>
            <div className="w-20 h-1 bg-[#ff9900] mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The Evolve ICT Summit stands as Zimbabwe&apos;s premier digital transformation forum,
              a flagship platform uniting leaders across policy, business, academia, and technology
              to shape Africa&apos;s digital future.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-sm p-8 card-hover">
              <div className="w-14 h-14 bg-[#ff9900]/10 rounded-sm flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-[#ff9900]" />
              </div>
              <h3 className="text-xl font-bold text-[#232f3e] mb-4">Premier Digital Forum</h3>
              <p className="text-gray-600 leading-relaxed">
                Zimbabwe&apos;s flagship platform bringing together policy makers, business leaders,
                academics, and technology innovators.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-sm p-8 card-hover">
              <div className="w-14 h-14 bg-[#ff9900]/10 rounded-sm flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-[#ff9900]" />
              </div>
              <h3 className="text-xl font-bold text-[#232f3e] mb-4">Bold Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                Calling for collaboration across borders and sectors to drive inclusive
                technological advancement in the Fourth Industrial Revolution.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-sm p-8 card-hover">
              <div className="w-14 h-14 bg-[#ff9900]/10 rounded-sm flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[#ff9900]" />
              </div>
              <h3 className="text-xl font-bold text-[#232f3e] mb-4">Digital Hub</h3>
              <p className="text-gray-600 leading-relaxed">
                Positioning Zimbabwe as the epicenter of Africa&apos;s digital dialogue, bridging
                local creativity with continental opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#232f3e] mb-4">
              Our Purpose
            </h2>
            <div className="w-20 h-1 bg-[#ff9900] mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To accelerate Africa&apos;s digital transformation by fostering collaboration,
              knowledge sharing, and investment in ICT innovation, and emerging technologies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8">
              <div className="w-14 h-14 bg-[#ff9900]/10 rounded-sm flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-[#ff9900]" />
              </div>
              <h3 className="text-xl font-bold text-[#232f3e] mb-4">Collaborative Platform</h3>
              <p className="text-gray-600 leading-relaxed">
                A collaborative platform between government, private sector, academia, and youth.
              </p>
            </div>

            <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8">
              <div className="w-14 h-14 bg-[#ff9900]/10 rounded-sm flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-[#ff9900]" />
              </div>
              <h3 className="text-xl font-bold text-[#232f3e] mb-4">Innovation Showcase</h3>
              <p className="text-gray-600 leading-relaxed">
                A showcase stage for African-led innovation and success stories.
              </p>
            </div>

            <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8">
              <div className="w-14 h-14 bg-[#ff9900]/10 rounded-sm flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-[#ff9900]" />
              </div>
              <h3 className="text-xl font-bold text-[#232f3e] mb-4">Policy Catalyst</h3>
              <p className="text-gray-600 leading-relaxed">
                A catalyst for regional policy dialogue and technology-driven development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section-padding bg-[#f3f3f3]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#232f3e] mb-4">
              Our Objectives
            </h2>
            <div className="w-20 h-1 bg-[#ff9900] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Strategic Objectives */}
            <div className="bg-white border border-gray-200 rounded-sm p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-[#232f3e] mb-8 pb-4 border-b-2 border-[#ff9900]">
                Strategic Objectives
              </h3>
              <ol className="space-y-6">
                {[
                  "Champion Africa's Digital Leap by creating an ecosystem of shared innovation.",
                  "Showcase Zimbabwe's potential as a digital transformation hub.",
                  'Foster multi-sector collaboration between government, corporates, and startups.',
                  'Empower youth, women, and SMEs through technology access and participation.',
                  'Attract investment, partnerships, and technology transfer opportunities.',
                ].map((obj, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#ff9900] text-white rounded-sm flex items-center justify-center font-bold mr-4 text-sm">
                      {index + 1}
                    </span>
                    <span className="text-gray-600">{obj}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Operational Objectives */}
            <div className="bg-white border border-gray-200 rounded-sm p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-[#232f3e] mb-8 pb-4 border-b-2 border-[#ff9900]">
                Operational Objectives
              </h3>
              <ol className="space-y-6">
                {[
                  'Target 2,000+ Delegates and 300 sign-ups across Africa and the Diaspora.',
                  'Target 100 Exhibitors showcasing innovation, solutions, and ICT tools.',
                  '30+ Sponsors & Partners driving ecosystem impact.',
                  'A two-day multi-track program blending dialogue, exhibition, and action.',
                ].map((obj, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#232f3e] text-[#ff9900] rounded-sm flex items-center justify-center font-bold mr-4 text-sm">
                      {index + 1}
                    </span>
                    <span className="text-gray-600">{obj}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[#232f3e] text-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Join Us at the Summit</h2>
          <p className="text-s, md:text-lg text-gray-300 mb-8">
            <Calendar className="inline w-5 h-5 mr-2" />
            11-12 June 2026
            <span className="mx-4">•</span>
            <MapPin className="inline w-5 h-5 mr-2" />
            HICC, Harare, Zimbabwe
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-[#ff9900] hover:bg-[#ec7211] text-white font-semibold mt-4 md:mt-0 text-base px-10 py-6 rounded-sm"
            >
              Register Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
