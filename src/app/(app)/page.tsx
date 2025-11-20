import { Navbar } from '@/components/navbar'
import { CountdownTimer } from '@/components/countdown-timer'
import { PricingCard } from '@/components/pricing-card'
import { StatsCounter } from '@/components/stats-counter'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  MapPin,
  Users,
  Lightbulb,
  Target,
  TrendingUp,
  ArrowRight,
  Mail,
  Phone,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ContactForm } from '@/components/contact-form'

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 pt-20 bg-gradient-to-br from-[#232f3e] via-[#161e2e] to-[#0f1419] relative overflow-hidden"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="text-center text-white max-w-7xl mx-auto relative z-10 py-20">
          {/* Event Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-[#ff9900]/10 border border-[#ff9900]/30 rounded-full">
              <span className="text-[#ff9900] text-sm font-semibold uppercase tracking-wide">
                June 11–12, 2026 | Harare, Zimbabwe
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="mb-6">
            <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight">
              EVOLVE ICT SUMMIT
            </span>
            <span className="block text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-tight mt-2 text-[#ff9900]">
              2026
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-normal tracking-wide mb-8 text-gray-300 max-w-4xl mx-auto">
            Empowering Africa&apos;s Digital Leap
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join us at Zimbabwe&apos;s premier digital transformation forum uniting leaders across
            policy, business, academia, and technology to shape Africa&apos;s digital future.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button
              size="lg"
              className="bg-[#ff9900] hover:bg-[#ec7211] text-white font-semibold text-base px-10 py-6 rounded-sm transition-all duration-200"
              asChild
            >
              <Link href="/register">
                Register now <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent hover:bg-white/10 text-white border-white/30 font-semibold text-base px-10 py-6 rounded-sm transition-all duration-200"
              asChild
            >
              <Link href="#about">Learn more</Link>
            </Button>
          </div>

          {/* Event Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#ff9900] mb-2">2,000+</div>
              <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                Delegates
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#ff9900] mb-2">100+</div>
              <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                Exhibitors
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#ff9900] mb-2">30+</div>
              <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                Sponsors
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <CountdownTimer />
      </section>

      {/* Synopsis Section */}
      <section id="about" className="section-padding bg-[#f3f3f3]">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#232f3e] mb-4">
                About the Summit
              </h2>
              <div className="w-20 h-1 bg-[#ff9900] mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-sm p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-[#ff9900] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#232f3e] text-lg mb-2">Event Dates</h3>
                    <p className="text-gray-600">June 11-12, 2026</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-sm p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-[#ff9900] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#232f3e] text-lg mb-2">Venue</h3>
                    <p className="text-gray-600">
                      Harare International Conference Centre (HICC), Zimbabwe
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-sm p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <Target className="w-6 h-6 text-[#ff9900] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#232f3e] text-lg mb-2">Theme</h3>
                    <p className="text-gray-600">Empowering Africa&apos;s Digital Leap</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-sm p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <Users className="w-6 h-6 text-[#ff9900] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#232f3e] text-lg mb-2">Organized by</h3>
                    <p className="text-gray-600">Evolve Africa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#232f3e] mb-4">
              Why Attend
            </h2>
            <div className="w-20 h-1 bg-[#ff9900] mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join Africa&apos;s premier digital transformation forum and be part of shaping the
              continent&apos;s technological future.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-sm p-8 card-hover">
              <div className="w-14 h-14 bg-[#ff9900]/10 rounded-sm flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-[#ff9900]" />
              </div>
              <h3 className="text-xl font-bold text-[#232f3e] mb-4">
                Premier Digital Forum
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Zimbabwe&apos;s flagship platform uniting leaders across policy, business, academia,
                and technology to shape Africa&apos;s digital future.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-sm p-8 card-hover">
              <div className="w-14 h-14 bg-[#ff9900]/10 rounded-sm flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-[#ff9900]" />
              </div>
              <h3 className="text-xl font-bold text-[#232f3e] mb-4">Bold Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                Driving inclusive technological advancement, innovation, and resilience across borders
                and sectors in the Fourth Industrial Revolution.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-sm p-8 card-hover">
              <div className="w-14 h-14 bg-[#ff9900]/10 rounded-sm flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[#ff9900]" />
              </div>
              <h3 className="text-xl font-bold text-[#232f3e] mb-4">Africa&apos;s Digital Hub</h3>
              <p className="text-gray-600 leading-relaxed">
                Zimbabwe positioned as the epicenter of Africa&apos;s digital dialogue, bridging local
                creativity with continental opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section id="purpose" className="section-padding bg-[#232f3e] text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Purpose</h2>
            <div className="w-20 h-1 bg-[#ff9900] mx-auto mb-8" />
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              To accelerate Africa&apos;s digital transformation by fostering collaboration, knowledge
              sharing, and investment in ICT innovation and emerging technologies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/5 border border-white/10 rounded-sm p-8 hover:bg-white/10 transition-all">
              <div className="w-14 h-14 bg-[#ff9900]/20 rounded-sm flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-[#ff9900]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Collaborative Platform</h3>
              <p className="text-gray-300 leading-relaxed">
                A collaborative platform between government, private sector, academia, and youth.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-sm p-8 hover:bg-white/10 transition-all">
              <div className="w-14 h-14 bg-[#ff9900]/20 rounded-sm flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-[#ff9900]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Innovation Showcase</h3>
              <p className="text-gray-300 leading-relaxed">
                A showcase stage for African-led innovation and success stories.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-sm p-8 hover:bg-white/10 transition-all">
              <div className="w-14 h-14 bg-[#ff9900]/20 rounded-sm flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-[#ff9900]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Policy Catalyst</h3>
              <p className="text-gray-300 leading-relaxed">
                A catalyst for regional policy dialogue and technology-driven development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section id="objectives" className="section-padding bg-[#f3f3f3]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#232f3e] mb-4">
              Summit Objectives
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
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#ff9900] text-white rounded-sm flex items-center justify-center font-bold mr-4 text-sm">
                    1
                  </span>
                  <span className="text-gray-700">
                    Champion Africa&apos;s Digital Leap by creating an ecosystem of shared
                    innovation.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#ff9900] text-white rounded-sm flex items-center justify-center font-bold mr-4 text-sm">
                    2
                  </span>
                  <span className="text-gray-600">
                    Showcase Zimbabwe&apos;s potential as a digital transformation hub.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#ff9900] text-white rounded-sm flex items-center justify-center font-bold mr-4 text-sm">
                    3
                  </span>
                  <span className="text-gray-600">
                    Foster multi-sector collaboration between government, corporates, and startups.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#ff9900] text-white rounded-sm flex items-center justify-center font-bold mr-4 text-sm">
                    4
                  </span>
                  <span className="text-gray-600">
                    Empower youth, women, and SMEs through technology access and participation.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#ff9900] text-white rounded-sm flex items-center justify-center font-bold mr-4 text-sm">
                    5
                  </span>
                  <span className="text-gray-600">
                    Attract investment, partnerships, and technology transfer opportunities.
                  </span>
                </li>
              </ol>
            </div>

            {/* Operational Objectives */}
            <div className="bg-white border border-gray-200 rounded-sm p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-[#232f3e] mb-8 pb-4 border-b-2 border-[#ff9900]">
                Operational Objectives
              </h3>
              <ol className="space-y-6">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#232f3e] text-[#ff9900] rounded-sm flex items-center justify-center font-bold mr-4 text-sm">
                    1
                  </span>
                  <span className="text-gray-600">
                    Target 2,000+ Delegates and 300 sign-ups across Africa and the Diaspora.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#232f3e] text-[#ff9900] rounded-sm flex items-center justify-center font-bold mr-4 text-sm">
                    2
                  </span>
                  <span className="text-gray-600">
                    Target 100 Exhibitors showcasing innovation, solutions, and ICT tools.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#232f3e] text-[#ff9900] rounded-sm flex items-center justify-center font-bold mr-4 text-sm">
                    3
                  </span>
                  <span className="text-gray-600">
                    30+ Sponsors & Partners driving ecosystem impact.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#232f3e] text-[#ff9900] rounded-sm flex items-center justify-center font-bold mr-4 text-sm">
                    4
                  </span>
                  <span className="text-gray-600">
                    A two-day multi-track program blending dialogue, exhibition, and action.
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Pricing Section */}
      <section id="tickets" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#232f3e] mb-4">
              Passes & Registration
            </h2>
            <div className="w-20 h-1 bg-[#ff9900] mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Early bird tickets available now. Registration closes June 30, 2026.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <PricingCard
              title="Early Bird"
              price="150"
              period="Before April 30, 2026"
              features={[
                'Full event access',
                'Regular seating',
                'Lunch provided',
                'Networking sessions',
                'Conference materials',
              ]}
            />
            <PricingCard
              title="Early Bird"
              price="175"
              period="Before May 30, 2026"
              features={[
                'Full event access',
                'Regular seating',
                'Lunch provided',
                'Networking sessions',
                'Conference materials',
              ]}
              highlighted
            />
            <PricingCard
              title="Regular"
              price="200"
              period="From June 1, 2026"
              features={[
                'Full event access',
                'Regular seating',
                'Lunch provided',
                'Networking sessions',
                'Conference materials',
              ]}
            />
          </div>

          <div className="mt-12 text-center">
            <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-6 max-w-3xl mx-auto mb-8">
              <p className="text-base text-gray-700">
                <span className="font-bold text-[#232f3e]">Important:</span> The cut-off date for
                registration and payment is June 30, 2026.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-[#ff9900] hover:bg-[#ec7211] text-white font-semibold text-base px-10 py-6 rounded-sm"
            >
              Become an Exhibitor
            </Button>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="section-padding bg-[#232f3e] text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Featured Speakers</h2>
            <div className="w-20 h-1 bg-[#ff9900] mx-auto mb-6" />
            <p className="text-lg text-gray-300">Coming Soon</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-sm p-6 text-center hover:bg-white/10 transition-all"
              >
                <div className="w-32 h-32 bg-white/10 rounded-sm mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Speaker {i}</h3>
                <p className="text-sm text-gray-400">Position & Company</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-[#f3f3f3]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#232f3e] mb-4">Get In Touch</h2>
              <div className="w-20 h-1 bg-[#ff9900] mb-8" />

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-[#ff9900] mt-1" />
                  <div>
                    <h3 className="font-bold text-[#232f3e] mb-1">Event Date</h3>
                    <p className="text-gray-600">11-12 June 2026</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-[#ff9900] mt-1" />
                  <div>
                    <h3 className="font-bold text-[#232f3e] mb-1">Location</h3>
                    <p className="text-gray-600">
                      Harare International Conference Centre
                      <br />
                      Harare, Zimbabwe
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-[#ff9900] mt-1" />
                  <div>
                    <h3 className="font-bold text-[#232f3e] mb-1">Email</h3>
                    <p className="text-gray-600">info@evolveictsummit.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-[#ff9900] mt-1" />
                  <div>
                    <h3 className="font-bold text-[#232f3e] mb-1">Phone</h3>
                    <p className="text-gray-600">+263 XXX XXX XXX</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white border border-gray-200 rounded-sm p-8">
              <h3 className="text-2xl font-bold text-[#232f3e] mb-6">Send us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#232f3e] text-white py-12 px-4 border-t border-gray-700">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-[#ff9900]">EVOLVE</span>
                <span className="text-white"> ICT SUMMIT 2026</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering Africa&apos;s Digital Leap
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-[#ff9900] transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#objectives"
                    className="text-gray-400 hover:text-[#ff9900] transition-colors"
                  >
                    Program
                  </a>
                </li>
                <li>
                  <a
                    href="#speakers"
                    className="text-gray-400 hover:text-[#ff9900] transition-colors"
                  >
                    Speakers
                  </a>
                </li>
                <li>
                  <a
                    href="#tickets"
                    className="text-gray-400 hover:text-[#ff9900] transition-colors"
                  >
                    Tickets
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wide">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>June 11-12, 2026</li>
                <li>Harare, Zimbabwe</li>
                <li>info@evolveictsummit.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2026 Evolve Africa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
