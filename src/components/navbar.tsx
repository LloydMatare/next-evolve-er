// components/Navbar.tsx
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Blogs', href: '/blogs' },
]

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white text-blue-950 z-50 py-6">
      <div className="container  px-4">
        <div className="flex justify-between items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className=" font-medium text-lg hover:text-blue-200 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <Button>Register</Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white">
                <div className="flex flex-col space-y-6 mt-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-gray-900 font-medium text-lg hover:text-blue-600 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  ))}
                  <Button>Register</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
