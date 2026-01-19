//@ts-nocheck
import { CountdownTimer } from '@/components/countdown-timer'
import { PricingCard } from '@/components/pricing-card'
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
  Sparkles,
  Trophy,
  Zap,
  Globe,
  Star,
  Heart,
  ChevronRight,
  Play,
  MessageSquare,
  Award,
  Shield,
  Network,
  BookOpen,
  TargetIcon,
  Rocket,
  Briefcase,
  Building,
  Flag,
  Download,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ContactForm } from '@/components/contact-form'

function Home() {
  const stats = [
    {
      label: 'Expected Delegates',
      value: '2,000+',
      icon: Users,
      color: 'from-blue-500 to-cyan-400',
    },
    {
      label: 'Featured Exhibitors',
      value: '100+',
      icon: Building,
      color: 'from-purple-500 to-pink-400',
    },
    { label: 'Expert Speakers', value: '50+', icon: Award, color: 'from-amber-500 to-orange-400' },
    { label: 'Global Partners', value: '30+', icon: Globe, color: 'from-emerald-500 to-teal-400' },
  ]

  const features = [
    {
      icon: Lightbulb,
      title: 'Innovation Showcase',
      description: "Explore cutting-edge tech from Africa's brightest minds",
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: Network,
      title: 'Strategic Networking',
      description: 'Connect with industry leaders and decision makers',
      color: 'from-purple-500 to-pink-400',
    },
    {
      icon: TargetIcon,
      title: 'Growth Opportunities',
      description: 'Access investment and partnership prospects',
      color: 'from-amber-500 to-orange-400',
    },
    {
      icon: Shield,
      title: 'Expert Insights',
      description: "Learn from thought leaders shaping Africa's digital future",
      color: 'from-emerald-500 to-teal-400',
    },
  ]

  const objectives = [
    {
      number: '01',
      title: "Champion Africa's Digital Leap",
      description: 'Creating an ecosystem of shared innovation',
    },
    {
      number: '02',
      title: "Showcase Zimbabwe's Potential",
      description: 'Positioning as a digital transformation hub',
    },
    {
      number: '03',
      title: 'Foster Multi-Sector Collaboration',
      description: 'Bridging government, corporates, and startups',
    },
    {
      number: '04',
      title: 'Empower Youth & Women',
      description: 'Technology access and participation opportunities',
    },
    {
      number: '05',
      title: 'Attract Investment',
      description: 'Partnerships and technology transfer prospects',
    },
    {
      number: '06',
      title: 'Build Continental Connections',
      description: 'Networking across African tech ecosystems',
    },
  ]

  const speakers = [
    // {
    //   name: 'Dr. Sarah Chen',
    //   role: 'Tech Innovation Lead',
    //   company: 'Digital Africa',
    //   color: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    // },
    // {
    //   name: 'Prof. James Okafor',
    //   role: 'AI Research Director',
    //   company: 'African Tech University',
    //   color: 'bg-gradient-to-r from-purple-500 to-pink-400',
    // },
    // {
    //   name: 'Maria Rodriguez',
    //   role: 'Cybersecurity Expert',
    //   company: 'SecureTech Global',
    //   color: 'bg-gradient-to-r from-amber-500 to-orange-400',
    // },
    // {
    //   name: 'David Kariuki',
    //   role: 'Fintech Visionary',
    //   company: 'BankTech Africa',
    //   color: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    // },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Width */}
      <section className="relative min-h-screen w-full flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a] w-full">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ffcc00]/5 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] w-full" />

        <div className="relative z-10 text-center w-full px-4 sm:px-6 lg:px-8">
          {/* Event Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm font-medium text-white">{`Africa's Premier ICT Summit`}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight px-4">
            Evolve
            <span className="block text-[#ffcc00] mt-2">ICT Summit 2026</span>
          </h1>

          {/* Subtitle */}
          <div className="flex justify-center">
            <p className="text-xl md:text-2xl text-gray-300 text-center mb-8 px-4">
              {` Shaping Africa's Digital Future Through`}{' '}
              <span className="text-[#ffcc00] font-semibold">Innovation & Collaboration</span>
            </p>
          </div>

          {/* Event Details */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 px-4">
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="w-5 h-5 text-[#ffcc00]" />
              <span className="font-medium">June 11-12, 2026</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-5 h-5 text-[#ffcc00]" />
              <span className="font-medium">Harare International Conference Centre</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 px-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white font-bold px-8 py-6 rounded-xl text-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/register">
                Register Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent hover:bg-white/10 text-white border-white/30 font-bold px-8 py-6 rounded-xl text-lg"
              asChild
            >
              <Link href="#about">
                Watch Highlights
                <Play className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-3`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
                </div>
              )
            })}
          </div> */}
        </div>
      </section>

      {/* Countdown Timer - Full Width */}
      <section className="relative py-16 w-full bg-gradient-to-r from-[#170d43] to-[#2a1b69] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,204,0,0.1)_0%,transparent_50%)] w-full" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {` Don't Miss Africa's Premier Tech Event`}
                </h2>
                <p className="text-gray-300">Early bird registration closes in</p>
              </div>
              <div className="flex-shrink-0">
                <CountdownTimer />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 w-full bg-gradient-to-b from-white to-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
                <Target className="w-4 h-4 text-[#ffcc00]" />
                <span className="text-sm font-medium text-gray-700">Our Vision</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {` Africa's Digital Transformation Hub`}
              </h2>
              <p className="text-xl text-gray-600 text-center">
                Connecting visionaries, innovators, and change-makers to shape the future of
                technology in Africa.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Event Details */}
            <div className="bg-gradient-to-r from-[#170d43] to-[#2a1b69] rounded-3xl p-8 md:p-12 text-white">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-[#ffcc00]" />
                    </div>
                    <h3 className="text-3xl font-bold">Event Overview</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-[#ffcc00]" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">Dates</div>
                          <div className="text-lg font-semibold">June 11-12, 2026</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-[#ffcc00]" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">Venue</div>
                          <div className="text-lg font-semibold">HICC, Harare</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-[#ffcc00]" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">Theme</div>
                          <div className="text-lg font-semibold">{`Empowering Africa's Digital Leap`}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-[#ffcc00]" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">Organizer</div>
                          <div className="text-lg font-semibold">Evolve Africa</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:text-right">
                  <div className="inline-flex flex-col items-end">
                    <div className="text-6xl font-bold text-[#ffcc00]">2</div>
                    <div className="text-white font-medium">Days of Innovation</div>
                    <div className="mt-2 text-sm text-gray-300">Multiple tracks & sessions</div>
                    <Button
                      className="mt-6 bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black font-bold px-8 py-6 rounded-xl hover:shadow-lg hover:shadow-amber-500/25"
                      asChild
                    >
                      <Link href="/schedule">
                        View Schedule <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section id="objectives" className="py-20 w-full bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
                <Target className="w-4 h-4 text-[#ffcc00]" />
                <span className="text-sm font-medium text-gray-700">Our Mission</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Summit Objectives
              </h2>
              <p className="text-xl text-center text-gray-600">
                Driving measurable impact through strategic goals and partnerships
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {objectives.map((obj, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#170d43] to-[#2a1b69] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-2xl font-bold text-[#ffcc00]">{obj.number}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{obj.title}</h3>
                      <p className="text-gray-600">{obj.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 w-full bg-gradient-to-br from-[#170d43] via-[#1a1448] to-[#0f172a]"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Star className="w-4 h-4 text-[#ffcc00]" />
                <span className="text-sm font-medium text-white">Choose Your Experience</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get Your Pass</h2>
              <p className="text-xl text-gray-300 text-center">
                Select the perfect ticket for your summit experience. Early bird discounts
                available.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <PricingCard
                title="Early Bird"
                price="150"
                period="Before April 30, 2026"
                features={[
                  'Full 2-day summit access',
                  'Regular seating arrangement',
                  'Daily lunch & refreshments',
                  'Access to networking sessions',
                  'Conference materials kit',
                  'Digital certificate',
                ]}
              />
              <PricingCard
                title="Standard"
                price="200"
                period="Most Popular Choice"
                features={[
                  'Full 2-day summit access',
                  'Priority seating areas',
                  'Daily lunch & refreshments',
                  'VIP networking events',
                  'Premium conference kit',
                  'Digital certificate + badge',
                  'Exhibition hall access',
                ]}
                highlighted
              />
              <PricingCard
                title="VIP"
                price="350"
                period="Ultimate Experience"
                features={[
                  'Full 2-day summit access',
                  'Front-row VIP seating',
                  'Gourmet dining experiences',
                  'Exclusive VIP networking',
                  'Premium gift package',
                  'Photo with speakers',
                  'Private lounge access',
                  'Priority exhibition access',
                ]}
              />
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-400 mb-6">Group discounts available for 5+ registrations</p>
              <Button
                className="bg-gradient-to-r from-emerald-500 to-teal-400 text-white px-8 py-6 rounded-xl text-lg font-bold hover:shadow-lg hover:shadow-emerald-500/25"
                asChild
              >
                <Link href="/register">
                  Register Your Team
                  <Users className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Preview */}
      <section id="speakers" className="py-20 w-full bg-gradient-to-b from-white to-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
                <Award className="w-4 h-4 text-[#ffcc00]" />
                <span className="text-sm font-medium text-gray-700">Meet the Experts</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured Speakers
              </h2>
              <p className="text-xl text-gray-600 text-center">
                {` Learn from Africa's brightest minds and global thought leaders`}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-center"
                >
                  {/* Speaker Avatar */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-4 border-white/10 group-hover:border-[#ffcc00]/50 transition-all" />
                    <div
                      className={`absolute -bottom-2 -right-2 w-12 h-12 ${speaker.color} rounded-full flex items-center justify-center`}
                    >
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{speaker.name}</h3>
                  <p className="text-[#ffcc00] font-medium mb-1">{speaker.role}</p>
                  <p className="text-gray-400 text-sm">{speaker.company}</p>

                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-center gap-3">
                      <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                        <Twitter className="w-5 h-5 text-white" />
                      </button>
                      <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                        <Linkedin className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                className="bg-gradient-to-r from-[#170d43] to-[#2a1b69] text-white px-8 py-6 rounded-xl text-lg font-bold hover:shadow-lg hover:shadow-purple-500/25"
                asChild
              >
                <Link href="/speakers">
                  View All Speakers
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors & Partners */}
      <section
        id="sponsors"
        className="py-20 w-full bg-gradient-to-br from-[#170d43] via-[#1a1448] to-[#0f172a]"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Briefcase className="w-4 h-4 text-[#ffcc00]" />
                <span className="text-sm font-medium text-white">Strategic Partners</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our Partners & Sponsors
              </h2>
              <p className="text-xl text-gray-300 text-center">
                {`     Join forces with Africa's leading organizations driving digital innovation`}
              </p>
            </div>

            {/* Sponsor Logos Grid */}
            {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex items-center justify-center hover:bg-white/10 hover:border-[#ffcc00]/30 transition-all duration-300 group"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏢</div>
                    <div className="text-xs text-gray-400 group-hover:text-[#ffcc00] transition-colors">
                      Partner {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div> */}

            <div className="text-center">
              <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Become a Partner</h3>
                <p className="text-gray-300 mb-6">
                  {`Join our elite group of sponsors and gain exclusive access to Africa's tech leaders`}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black font-bold "
                    asChild
                  >
                    <Link href="/register">View Sponsorship Packages</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/30 text-black hover:bg-white/10"
                  >
                    <Link href="/contact">Request Information</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 w-full bg-gradient-to-b from-white to-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-6">
                  <MessageSquare className="w-4 h-4 text-[#ffcc00]" />
                  <span className="text-sm font-medium text-gray-700">Get in Touch</span>
                </div>

                <h2 className="text-4xl font-bold text-gray-900 mb-6">{`  Let's Connect`}</h2>

                <p className="text-lg text-gray-600 mb-8">
                  Have questions about the summit? Our team is ready to help you with registration,
                  partnerships, speaking opportunities, and more.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">info@evolveictsummit.com</p>
                      <p className="text-gray-600">support@evolveictsummit.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600">+263 242 123 456</p>
                      <p className="text-gray-600">+263 242 987 654</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Location</h3>
                      <p className="text-gray-600">313 Samora Machel Ave, Eastlea</p>
                      <p className="text-gray-600">Harare, Zimbabwe</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: Twitter, label: 'Twitter', color: 'bg-blue-500' },
                      { icon: Linkedin, label: 'LinkedIn', color: 'bg-blue-700' },
                      { icon: Facebook, label: 'Facebook', color: 'bg-blue-600' },
                      {
                        icon: Instagram,
                        label: 'Instagram',
                        color: 'bg-gradient-to-r from-purple-500 to-pink-500',
                      },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href="#"
                        className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity`}
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5 text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gradient-to-br from-[#170d43] to-[#2a1b69] rounded-3xl p-8 text-white">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-[#ffcc00]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Send a Message</h3>
                    <p className="text-gray-300">We typically respond within 24 hours</p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#170d43] via-[#2a1b69] to-[#170d43] w-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,204,0,0.1)_0%,transparent_50%)] w-full" />

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#ffcc00]" />
              <span className="text-sm font-medium text-white">Last Call</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {` Ready to Shape Africa's Digital Future?`}
            </h2>

            <p className="text-xl text-gray-300 mb-8 text-center">
              {`Join 2,000+ tech leaders, innovators, and change-makers at Africa's premier ICT summit.`}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black font-bold px-8 py-6 rounded-xl text-lg hover:shadow-lg hover:shadow-amber-500/25 transition-shadow"
                asChild
              >
                <Link href="/register">
                  Secure Your Spot
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 text-white border-white/30 font-bold px-8 py-6 rounded-xl text-lg"
                asChild
              >
                <Link href="/brochure">
                  Download Brochure
                  <Download className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
