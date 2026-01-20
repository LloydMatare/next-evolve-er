import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function Footer() {
  return (
    <footer className="bg-[#170d43] text-white py-12 px-4 border-t border-gray-700">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              <Image src={'/logo.png'} alt="Evolve ICT Summit Logo" width={150} height={100} />
            </div>
            <p className="text-gray-400! text-sm leading-relaxed">
              Empowering Africa&apos;s Digital Leap
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>
                <a href="#about" className="text-gray-400! hover:text-[#ffcc00] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#objectives"
                  className="text-gray-400! hover:text-[#ffcc00] transition-colors"
                >
                  Program
                </a>
              </li>
              <li>
                <a
                  href="#speakers"
                  className="text-gray-400! hover:text-[#ffcc00] transition-colors"
                >
                  Speakers
                </a>
              </li>
              <li>
                <a
                  href="#tickets"
                  className="text-gray-400! hover:text-[#ffcc00] transition-colors"
                >
                  Tickets
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wide">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400!">
              <li className="text-gray-400!">June 11-12, 2026</li>
              <li className="text-gray-400!">Harare, Zimbabwe</li>
              <li className="text-gray-400!">info@evolveictsummit.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400!">© 2026 Evolve Africa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
