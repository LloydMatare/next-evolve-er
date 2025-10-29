// Home.tsx
import { Navbar } from '@/components/navbar'
import React from 'react'

function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center text-white max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="mb-8">
            <span className="block text-6xl md:text-8xl font-bold tracking-wide leading-tight">
              ICT
            </span>
            <span className="block text-7xl md:text-9xl font-bold tracking-widest leading-tight mt-2">
              SUMMIT
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light tracking-widest mb-12 uppercase">
            {`    EMPOWERING AFRICA'S DIGITAL LEAP`}
          </h2>

          {/* Date Section */}
          <div className="space-y-4 mt-16">
            <p className="text-lg md:text-xl font-semibold tracking-widest uppercase">
              SAVE THE DATE!
            </p>
            <p className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide">
              10-13 JUNE 2026
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-light tracking-wide opacity-90">
              TROUBECK RESORT, NYANGA, ZIMBABWE
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
