import React from 'react'
import Link from 'next/link'
import { Users, Briefcase, Globe, Award, ArrowRight } from 'lucide-react'
import { Button } from '../../../../components/ui/button'

function Partnerships() {
  return (
    <div className="min-h-screen bg-white text-black">
      <section className="relative bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-12">
          <div className="w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Partner With Evolve</h1>
            <p className="text-lg text-purple-100 mb-6">
              Join our network of organisations investing in youth skills, innovation, and
              opportunity across Africa. Reach students, showcase solutions, and hire talent.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/register" className="">
                  Register Interest <ArrowRight className="w-4 h-4 inline-block ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-purple-600 text-white hover:bg-purple-700 text-white"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          <div className="w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-black/20">
              <img
                src="/images/partnerships-hero.svg"
                alt="Partnerships"
                className="w-full h-56 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Partner With Us</h2>
            <p className="text-gray-600 mt-2">
              Access talented students, build brand affinity, and co-create impact.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-purple-50 rounded-md flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Talent Pipeline</h3>
              <p className="text-sm text-gray-600">
                Connect with emerging tech talent across universities and colleges.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-purple-50 rounded-md flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Brand Visibility</h3>
              <p className="text-sm text-gray-600">
                Showcase your solutions to students, educators, and partners.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-purple-50 rounded-md flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Community Impact</h3>
              <p className="text-sm text-gray-600">
                Collaborate on programs that advance digital skills and inclusion.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-purple-50 rounded-md flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Recognition</h3>
              <p className="text-sm text-gray-600">
                Be recognised as a key supporter of youth tech ecosystems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Sponsorship Tiers</h2>
            <p className="text-gray-600 mt-2">Flexible packages for companies of all sizes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Bronze</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">$2,500</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>Logo on website</li>
                <li>1x booth space</li>
                <li>Access to student CVs</li>
              </ul>
              <Button asChild className="bg-purple-600 text-white hover:bg-purple-700 text-white">
                <Link href="/contact">Enquire</Link>
              </Button>
            </div>

            <div className="border-2 border-purple-600 rounded-xl p-6 text-center bg-purple-50">
              <h3 className="text-xl font-semibold mb-2">Silver</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">$7,500</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>Prominent logo placement</li>
                <li>2x booth spaces + speaking slot</li>
                <li>Targeted recruitment session</li>
              </ul>
              <Button asChild className="bg-purple-600 text-white hover:bg-purple-700 text-white">
                <Link href="/contact">Enquire</Link>
              </Button>
            </div>

            <div className="border rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Gold</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">$15,000</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>Title sponsor</li>
                <li>Keynote slot + large booth</li>
                <li>Custom program partnership</li>
              </ul>
              <Button asChild className="bg-purple-600 text-white hover:bg-purple-700 text-white">
                <Link href="/contact">Enquire</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to partner?</h2>
          <p className="text-purple-100 mb-8">
            Get in touch to design a package that meets your goals.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/contact">Contact Our Team</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-purple-600 text-white hover:bg-purple-700 text-white"
            >
              <Link href="/register">Register Interest</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Partnerships
