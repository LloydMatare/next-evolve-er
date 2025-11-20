import Link from 'next/link'
import React from 'react'

export function Footer() {
  return (
    <footer className="bg-[#232f3e] text-white py-12 px-4 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-[#ff9900]">EVOLVE</span>
              <span className="text-white"> ICT SUMMIT 2026</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering Africa&apos;s Digital Leap
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#ff9900] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-[#ff9900] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-400 hover:text-[#ff9900] transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-400 hover:text-[#ff9900] transition-colors"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wide">Event Info</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/previous-summit"
                  className="text-gray-400 hover:text-[#ff9900] transition-colors"
                >
                  Previous Summit
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-gray-400 hover:text-[#ff9900] transition-colors"
                >
                  Register
                </Link>
              </li>
              <li className="text-gray-400">June 11-12, 2026</li>
              <li className="text-gray-400">Harare, Zimbabwe</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wide">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>info@evolveictsummit.com</li>
              <li>+263 XXX XXX XXX</li>
              <li>HICC, Harare, Zimbabwe</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">© 2026 Evolve Africa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
