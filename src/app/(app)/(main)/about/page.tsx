import { Button } from '@/components/ui/button'
import {
  Users,
  Lightbulb,
  Target,
  TrendingUp,
  Calendar,
  MapPin,
  ArrowRight,
  Globe,
  Award,
  Heart,
  Zap,
  Shield,
  Network,
  Sparkles,
  Star,
  Trophy,
  Mic,
  Briefcase,
  Building,
  Flag,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function AboutPage() {
  const stats = [
    { label: 'Expected Attendees', value: '2,000+', icon: Users },
    { label: 'Exhibitors', value: '100+', icon: Building },
    { label: 'Speakers', value: '50+', icon: Mic },
    { label: 'Countries', value: '30+', icon: Globe },
  ]

  const coreValues = [
    {
      icon: Network,
      title: 'Vision',
      description:
        "Let's think about our world, Zimbabwe, Africa.Where we are today and where we would like to be tommorrow and how we can strategize together to get there.",
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description:
        "It is said you cannot do the same thing and expectt a different answer,Let's think of new ways that we can employ using ICT in order to advance the world we live in.",
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Heart,
      title: 'Relevance',
      description:
        "Let's employ our knowledge and understanding of ICT to approprietely enhance our world and enviromnet in Africa.",
      color: 'from-red-500 to-orange-400',
    },
    {
      icon: Shield,
      title: 'Mentorship',
      description:
        "A good man leaves an inheritance for his children's children. Let's impart the wealth of ICT KNOWLEDGE we have to the next generation.",
      color: 'from-green-500 to-emerald-400',
    },
  ]

  const keynoteThemes = [
    'Emerging Technologies',
    'Digital Transformation & Infrastructure',
    'Cybersecurirty & Digital Trust',
    'Digital Economy & Skills',
    'Data privacy, Governance & Regulation',
    'Innovation, Startups & Enterprenuership',
    'Blockchain, Digital Identity & Trust',
    'Cloud & Zero-Trust Architecures',
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Animated Background */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f1419]">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ffcc00]/5 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm font-medium text-white">{`Africa's Premier ICT Event`}</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Evolve
            <span className="block text-[#ffcc00] mt-2">ICT Summit</span>
          </h1>

          <div className="flex justify-center">
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              {`Shaping Africa's Digital Future Through  `}
              <span className="text-[#ffcc00] font-semibold">
                Innovation, Collaboration & Transformation
              </span>
            </p>
          </div>

          {/* Stats bar */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <Icon className="w-8 h-8 text-[#ffcc00] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              )
            })}
          </div> */}
        </div>
      </section>

      {/* Event Synopsis Card */}
      <section className="section-padding bg-white relative -mt-10">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-[#170d43] to-[#2a1b69] rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#ffcc00]/20 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-[#ffcc00]" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Event Overview</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-[#ffcc00]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-300">Dates</div>
                        <div className="text-lg font-semibold text-white">11-12 June 2026</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#ffcc00]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-300">Venue</div>
                        <div className="text-lg font-semibold text-white">
                          Harare International Conference Centre
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-[#ffcc00]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-300">Theme</div>
                        <div className="text-lg font-semibold text-white">
                          {`  Empowering Africa's Digital Leap`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-[#ffcc00]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-300">Organized by</div>
                        <div className="text-lg font-semibold text-white">Evolve Africa</div>
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
                    className="mt-6 bg-[#ffcc00] hover:bg-[#e6b800] text-black font-semibold"
                    asChild
                  >
                    <Link href="/program">
                      View Program <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-[#f8f9fa]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
              <Star className="w-4 h-4 text-[#ffcc00]" />
              <span className="text-sm font-medium text-gray-700">Our Foundation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#170d43] mb-4">Core Values</h2>
            <p className="text-lg text-gray-600 text-center">
              Guiding principles that shape every aspect of our summit
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-100 rounded-full blur-xl opacity-50" />
              <div className="relative bg-gradient-to-br from-[#170d43] to-[#2a1b69] rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-[#ffcc00]" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-lg leading-relaxed">
                  {`To establish Zimbabwe as Africa's premier digital transformation hub, catalyzing
                  innovation and sustainable growth across the continent.`}
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-100 rounded-full blur-xl opacity-50" />
              <div className="relative bg-gradient-to-br from-[#ffcc00] to-[#ff9900] rounded-2xl p-8 text-gray-900">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-gray-900" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-lg leading-relaxed">
                  {`  Accelerate Africa's digital transformation by fostering collaboration, showcasing
                  innovation, and driving investment in ICT for inclusive growth.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Themes */}
      <section className="section-padding bg-gradient-to-b from-[#f8f9fa] to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
              <Sparkles className="w-4 h-4 text-[#ffcc00]" />
              <span className="text-sm font-medium text-gray-700">Focus Areas</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#170d43] mb-4">
              Key Discussion Themes
            </h2>
            <p className="text-lg text-gray-600 text-center">
              Exploring the frontiers of digital transformation in Africa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keynoteThemes.map((theme, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-[#ffcc00] transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#ffcc00]/10 rounded-lg flex items-center justify-center group-hover:bg-[#ffcc00]/20 transition-colors">
                    <span className="text-lg font-bold text-[#170d43]">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#170d43] transition-colors">
                    {theme}
                  </h3>
                </div>
                {/* <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Multiple sessions</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#ffcc00] transition-colors" />
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#170d43] mb-4">Summit Timeline</h2>
            <p className="text-lg text-gray-600">Two days packed with insights and innovation</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Day 1 */}
            <div className="bg-gradient-to-br from-[#170d43] to-[#2a1b69] rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-sm text-gray-300">Day 1</div>
                  <h3 className="text-2xl font-bold">Opening & Keynotes</h3>
                </div>
                <div className="text-3xl font-bold text-[#ffcc00]">11</div>
              </div>

              <div className="space-y-4">
                {[
                  { time: '08:00', title: 'Registration & Networking', desc: 'Welcome breakfast' },
                  { time: '10:00', title: 'Opening Ceremony', desc: 'Official launch' },
                  { time: '11:30', title: 'Keynote Address', desc: "Africa's Digital Future" },
                  { time: '14:00', title: 'Panel Discussions', desc: 'Multiple tracks' },
                ].map((session, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
                    <div className="font-bold text-[#ffcc00] min-w-[60px]">{session.time}</div>
                    <div>
                      <div className="font-semibold">{session.title}</div>
                      <div className="text-sm text-gray-300">{session.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Day 2 */}
            <div className="bg-gradient-to-br from-[#ffcc00] to-[#ff9900] rounded-2xl p-8 text-gray-900">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-sm text-gray-700">Day 2</div>
                  <h3 className="text-2xl font-bold">Workshops & Closing</h3>
                </div>
                <div className="text-3xl font-bold text-gray-900">12</div>
              </div>

              <div className="space-y-4">
                {[
                  { time: '09:00', title: 'Expert Workshops', desc: 'Hands-on sessions' },
                  { time: '11:00', title: 'Startup Pitch', desc: 'Innovation showcase' },
                  { time: '14:00', title: 'Networking Lunch', desc: 'Business connections' },
                  { time: '16:00', title: 'Closing Ceremony', desc: 'Awards & commitments' },
                ].map((session, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-black/10 rounded-xl">
                    <div className="font-bold text-gray-900 min-w-[60px]">{session.time}</div>
                    <div>
                      <div className="font-semibold">{session.title}</div>
                      <div className="text-sm text-gray-700">{session.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="section-padding bg-[#f8f9fa]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#170d43] mb-4">
              Who Should Attend
            </h2>
            <p className="text-lg text-gray-600 text-center">
              {`Join Africa's most influential digital transformation community`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Briefcase,
                title: 'Business Leaders',
                desc: 'CEOs, CTOs, Digital Transformation Heads',
              },
              {
                icon: Building,
                title: 'Government Officials',
                desc: 'Policy makers & Regulatory bodies',
              },
              {
                icon: Users,
                title: 'Tech Innovators',
                desc: 'Startups, Developers, Entrepreneurs',
              },
              { icon: Flag, title: 'Investors', desc: 'VCs, Angels, Development Partners' },
            ].map((audience, index) => {
              const Icon = audience.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-[#ffcc00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#ffcc00]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{audience.title}</h3>
                  <p className="text-gray-600 text-sm">{audience.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#170d43] via-[#2a1b69] to-[#170d43]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,204,0,0.1)_0%,transparent_50%)]" />

        <div className="section-padding relative z-10">
          <div className="container-custom max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Trophy className="w-4 h-4 text-[#ffcc00]" />
              <span className="text-sm font-medium text-white">Limited Spots Available</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {` Be Part of Africa's Digital Revolution`}
            </h2>

            <p className="text-xl text-gray-300 mb-8 text-center">
              Join visionary leaders, innovators, and change-makers shaping the future of technology
              in Africa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-[#ffcc00] hover:bg-[#e6b800] text-black font-bold  shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                asChild
              >
                <Link href="/register">
                  Secure Your Spot <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 text-white border-white/30 font-semibold "
                asChild
              >
                <Link href="/register">Become a Sponsor</Link>
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#ffcc00]" />
                  <span>11-12 June 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#ffcc00]" />
                  <span>HICC, Harare</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#ffcc00]" />
                  <span>Hybrid Event Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
