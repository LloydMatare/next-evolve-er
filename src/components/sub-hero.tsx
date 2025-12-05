import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

function SubHero() {
  return (
    <div className="">
      {/* Subtitle */}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-normal tracking-wide mb-8 text-gray-300 ">
        Empowering Africa&apos;s Digital Leap
      </h2>

      {/* Description */}
      <p className="text-base md:text-lg text-gray-400  mb-12 leading-relaxed">
        Join us at Zimbabwe&apos;s premier digital transformation forum uniting leaders across
        policy, business, academia, and technology to shape Africa&apos;s digital future.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
        <Button
          size="lg"
          className="bg-[#ffcc00] hover:bg-[#ec7211] text-white font-semibold text-sm px-10 py-6 rounded-sm transition-all duration-200"
          asChild
        >
          <Link href="/register">
            Register now <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="bg-transparent hover:bg-white/10 text-white border-white/30 font-semibold text-sm px-10 py-6 rounded-sm transition-all duration-200"
          asChild
        >
          <Link href="#about">Learn more</Link>
        </Button>
      </div>
    </div>
  )
}

export default SubHero
