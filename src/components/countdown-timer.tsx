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
      <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-[#170d43]">
        Countdown to Summit
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
    <div className="bg-white border border-gray-200 rounded-sm p-6 text-center hover:shadow-md transition-all duration-200">
      <div className="text-4xl md:text-5xl font-bold text-[#ffcc00] mb-2">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wide font-semibold">
        {label}
      </div>
    </div>
  )
}
