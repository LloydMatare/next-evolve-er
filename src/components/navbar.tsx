'use client'

import React, { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Program', href: '/program' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Previous Summit', href: '/previous-summit' },
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
        scrolled ? 'bg-[#232f3e] backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold tracking-tight flex items-center gap-2">
              <span className="text-[#ff9900]">EVOLVE</span>
              <span className="text-white hidden md:flex">ICT SUMMIT</span>
              <span className="text-[#ff9900] hidden md:flex">2026</span>
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
                  className={`font-medium text-sm px-4 py-2 rounded-sm transition-all duration-200 relative ${
                    active
                      ? 'text-[#ff9900]'
                      : scrolled
                        ? 'text-white hover:text-[#ff9900]'
                        : 'text-white/90 hover:text-[#ff9900]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-[#ff9900] rounded-full"></span>
                  )}
                </Link>
              )
            })}
            <Button
              className={`font-semibold px-6 py-2 rounded-sm ml-4 transition-all duration-200 ${
                scrolled
                  ? 'bg-[#ff9900] hover:bg-[#ec7211] text-white'
                  : 'bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20'
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
                className="bg-[#232f3e] text-white border-l border-gray-700 p-4"
              >
                {/* Add SheetTitle for accessibility - hidden visually but available for screen readers */}
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                <div className="flex flex-col space-y-4 mt-8">
                  <div className="mb-4">
                    <Link href="/" className="text-sm md:text-xl font-bold tracking-tight">
                      <span className="text-[#ff9900]">EVOLVE</span>
                      <span className="text-white"> ICT SUMMIT</span>
                      <span className="text-[#ff9900] ml-2">2026</span>
                    </Link>
                  </div>

                  {navLinks.map((link) => {
                    const active = isActive(link.href)
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`font-medium text-base py-2 transition-colors duration-200 flex items-center text-sm ${
                          active
                            ? 'text-[#ff9900] pl-2 border-l-4 border-[#ff9900]'
                            : 'text-white hover:text-[#ff9900] pl-2 border-l-4 border-transparent'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )
                  })}
                  <Button
                    className="bg-[#ff9900] hover:bg-[#ec7211] text-white text-sm font-semibold mt-4"
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
