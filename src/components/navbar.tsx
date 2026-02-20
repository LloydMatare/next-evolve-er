'use client'

import React, { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Program', href: '/program' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Previous Summit', href: '/previous-summit' },
  { name: 'School Summit', href: '/school-summit' },
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
          ? 'bg-[#170d43]/95 backdrop-blur-md shadow-md py-3'
          : 'bg-[#170d43]/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
              <Image src={'/logo.png'} alt="logo" width={90} height={80} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium text-xs px-4 py-2 rounded-sm transition-all duration-200 relative ${
                    active
                      ? 'text-[#ffcc00]'
                      : scrolled
                        ? 'text-white hover:text-[#ffcc00]'
                        : 'text-white/90 hover:text-[#ffcc00]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-[#ffcc00] rounded-full"></span>
                  )}
                </Link>
              )
            })}
            <Button
              className={`font-semibold px-6 py-2 rounded-sm ml-4 transition-all duration-200 text-xs ${
                scrolled
                  ? 'bg-[#ffcc00] hover:bg-[#ec7211] text-white'
                  : 'bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 '
              }`}
              asChild
            >
              <Link href="/register">Register now</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={
                    scrolled ? 'text-white hover:bg-white/10' : 'text-white/90 hover:bg-white/10'
                  }
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#170d43] text-white border-l border-gray-700 p-4"
              >
                {/* Add SheetTitle for accessibility - hidden visually but available for screen readers */}
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                <div className="flex flex-col space-y-4 mt-8">
                  <div className="mb-4">
                    <Link href="/" className="text-sm md:text-xl font-bold tracking-tight">
                      <span className="text-[#ffcc00]">EVOLVE</span>
                      <span className="text-white"> ICT SUMMIT</span>
                      <span className="text-[#ffcc00] ml-2">2026</span>
                    </Link>
                  </div>

                  {navLinks.map((link) => {
                    const active = isActive(link.href)
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`font-medium  py-2 transition-colors duration-200 flex items-center text-xs${
                          active
                            ? 'text-[#ffcc00] pl-2 border-l-4 border-[#ffcc00]'
                            : 'text-white hover:text-[#ffcc00] pl-2 border-l-4 border-transparent'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )
                  })}
                  <Button
                    className="bg-[#ffcc00] hover:bg-[#ec7211] text-white  font-semibold mt-4 text-xs"
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
