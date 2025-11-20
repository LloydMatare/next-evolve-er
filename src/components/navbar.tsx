'use client'

import React, { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Previous Summit', href: '/previous-summit' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#232f3e] backdrop-blur-sm shadow-md py-3'
          : 'bg-[#232f3e]/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-[#ff9900]">EVOLVE</span>
              <span className="text-white"> ICT SUMMIT</span>
              <span className="text-[#ff9900] ml-2">2026</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-[#ff9900] font-medium text-sm px-4 py-2 rounded-sm transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <Button
              className="bg-[#ff9900] hover:bg-[#ec7211] text-white font-semibold px-6 py-2 rounded-sm ml-4 transition-all duration-200"
              asChild
            >
              <Link href="/register">Register now</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#232f3e] text-white border-l border-gray-700">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-white hover:text-[#ff9900] font-medium text-base py-2 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  ))}
                  <Button
                    className="bg-[#ff9900] hover:bg-[#ec7211] text-white font-semibold mt-4"
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
