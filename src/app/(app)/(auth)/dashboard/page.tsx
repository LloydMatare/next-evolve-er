'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function DashboardPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const orderIdFromUrl = params.get('orderId')
    if (orderIdFromUrl) {
      window.location.href = `/dashboard/${orderIdFromUrl}`
      return
    }

    const data = sessionStorage.getItem('pendingOrder')
    if (data) {
      try {
        const order = JSON.parse(data)
        if (order.orderId) {
          window.location.href = `/dashboard/${order.orderId}`
        }
      } catch {}
    }
  }, [])

  return (
    <div className="min-h-screen">
      <section className="relative px-4 pb-10 pt-32 sm:px-6 lg:px-8">
        <div className="container-custom">
          <div className="event-panel-dark rounded-[2.2rem] p-8 md:p-12 text-center">
            <h1 className="text-3xl font-semibold text-white mb-4">Welcome to your Dashboard</h1>
            <p className="text-slate-300 mb-8">You don't have any active registrations yet.</p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Register for the Summit
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
