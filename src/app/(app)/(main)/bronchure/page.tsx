'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '../../../../components/ui/button'
import { Download } from 'lucide-react'

// note: the public folder should contain a brochure.pdf file
// you can replace the link or file name as needed

function Brochure() {
  return (
    <div className="py-16 px-4 max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Event Brochure</h1>
      <p className="text-lg text-gray-700 mb-8">
        Learn more about the summit schedule, speakers, sponsors, and participation opportunities by
        downloading our full brochure.
      </p>
      <Button
        size="lg"
        className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black hover:shadow-lg hover:shadow-amber-500/25 transition-shadow"
        asChild
      >
        <Link href="/brochure.pdf" target="_blank" rel="noopener noreferrer">
          Download Brochure
          <Download className="w-5 h-5 ml-2" />
        </Link>
      </Button>
      <p className="text-sm text-gray-500 mt-4">
        (PDF will open in a new tab. Replace <code>/public/brochure.pdf</code> with the actual
        brochure file.)
      </p>
    </div>
  )
}

export default Brochure
