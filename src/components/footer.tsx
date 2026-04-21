import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CalendarDays, Mail, MapPin, Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050a17] px-4 py-14 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,214,255,0.12),transparent_25%)]" />
      <div className="container-custom">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4">
              <Image
                src={'/logo-white.png'}
                alt="Evolve ICT Summit Logo"
                width={150}
                height={100}
              />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-300">
              A modern event platform for keynotes, exhibitions, partnerships, and student
              innovation across Africa&apos;s digital ecosystem.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-white/60">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-white">
              <li>
                <a href="/about" className="text-slate-300 transition-colors hover:text-[#ffcc00]">
                  About
                </a>
              </li>
              <li>
                <a href="/program" className="text-slate-300 transition-colors hover:text-[#ffcc00]">
                  Program
                </a>
              </li>
              <li>
                <a href="/speakers" className="text-slate-300 transition-colors hover:text-[#ffcc00]">
                  Speakers
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-slate-300 transition-colors hover:text-[#ffcc00]">
                  Gallery
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-white/60">
              Event Info
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[var(--brand-gold)]" />
                June 11-12, 2026
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--brand-cyan)]" />
                Harare, Zimbabwe
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[var(--brand-rose)]" />
                info@evolveictsummit.com
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--brand-gold)]" />
                Built for immersive event storytelling
              </li>
            </ul>
          </div>
        </div>
        <div className="event-divider mb-8" />
        <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-slate-400 md:flex-row">
          <p>© 2026 Evolve Africa. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
