'use client'

import React, { useState, useEffect } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date('2026-06-11T00:00:00').getTime()

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <TimeBox value={timeLeft.days} label="Days" />
        <TimeBox value={timeLeft.hours} label="Hours" />
        <TimeBox value={timeLeft.minutes} label="Minutes" />
        <TimeBox value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  )
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-gradient-to-br from-white to-[#f3f3f3] border-2 border-[#ffcc00]/40 rounded-lg p-6 md:p-8 text-center hover:shadow-xl hover:border-[#ffcc00] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-[#ffcc00]/5 rounded-bl-full"></div>
      {/* Animated pulse effect */}
      <div className="absolute inset-0 bg-[#ffcc00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#ffcc00] mb-2 drop-shadow-sm">
          {value.toString().padStart(2, '0')}
        </div>
        <div className="text-xs md:text-sm text-[#170d43] uppercase tracking-wider font-bold">
          {label}
        </div>
      </div>
    </div>
  )
}
