import { ArrowRight, Calendar, MapPin, Play, Sparkles } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

function HeroSection() {
  return (
    <div>
      {/* Hero Section - Full Width */}
      <section className="relative min-h-screen w-full flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/bg-1.jpg" // Replace with your actual image path
            alt="ICT Summit Background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60" />
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
              {`Empowering Africa's`}{' '}
              <span className="text-[#ffcc00] font-semibold">Digital Leap.</span>
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
              className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105"
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
              className="bg-transparent hover:bg-white/10 text-white border-white/30"
              asChild
            >
              <Link href="/gallery">
                Watch Highlights
                <Play className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection
