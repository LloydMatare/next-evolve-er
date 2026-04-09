'use client'

import React, { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { CalendarDays, Menu, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Program', href: '/program' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Previous Summit', href: '/previous-summit' },
  { name: 'Student Summit', href: '/student-summit' },
  { name: 'Contact Us', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#071022]/82 backdrop-blur-xl shadow-[0_10px_40px_rgba(3,8,20,0.35)] py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-full border px-4 transition-all duration-300 ${
            scrolled ? 'border-white/10 bg-white/6 py-2' : 'border-white/8 bg-white/4 py-3'
          }`}
        >
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image src={'/logo-white.png'} alt="logo" width={88} height={52} className="h-auto" />
              <div className="hidden sm:block">
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
                  Evolve
                </div>
                <div className="text-sm font-semibold text-white">ICT Summit 2026</div>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 ${
                    active
                      ? 'bg-white/10 text-[var(--brand-gold)]'
                      : 'text-white hover:bg-white/6 hover:text-white'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute inset-x-4 bottom-1 h-px rounded-full bg-[var(--brand-gold)]"></span>
                  )}
                </Link>
              )
            })}
            <Button
              className="ml-3 rounded-full bg-[var(--brand-gold)] px-6 py-2 text-xs font-semibold text-slate-950 hover:bg-[#ffe36b]"
              asChild
            >
              <Link href="/register">Register now</Link>
            </Button>
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:bg-white/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="border-l border-white/10 bg-[#071022] p-4 text-white"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                <div className="flex flex-col space-y-4 mt-8">
                  <div className="mb-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/60">
                      <Sparkles className="h-4 w-4 text-[var(--brand-gold)]" />
                      Event Navigation
                    </div>
                    <Link href="/" className="text-sm font-bold tracking-tight text-white">
                      EVOLVE ICT SUMMIT 2026
                    </Link>
                    <div className="mt-2 flex items-center gap-2 text-sm text-white/70">
                      <CalendarDays className="h-4 w-4 text-[var(--brand-gold)]" />
                      <span>11-12 June, Harare</span>
                    </div>
                  </div>

                  {navLinks.map((link) => {
                    const active = isActive(link.href)
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`flex items-center rounded-full py-3 pl-4 text-sm font-medium transition-colors duration-200 ${
                          active
                            ? 'bg-white/8 text-[var(--brand-gold)]'
                            : 'text-white hover:bg-white/6 hover:text-white'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )
                  })}
                  <Button
                    className="mt-4 rounded-full bg-[var(--brand-gold)] text-sm font-semibold text-slate-950 hover:bg-[#ffe36b]"
                    asChild
                  >
                    <Link href="/register">Register now</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
