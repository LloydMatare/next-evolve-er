import React from 'react'
import { Shield, Lock, Eye, Server, Mail, Phone, Calendar, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Privacy() {
  const sections = [
    {
      title: 'Information We Collect',
      icon: Shield,
      points: [
        'Personal identification information (name, email address, phone number, company)',
        'Professional information (job title, industry, areas of interest)',
        'Payment information for registration and ticket purchases',
        'Communication preferences and marketing consent',
        'Website usage data through cookies and analytics',
        'Photographs and video recordings during the event',
      ],
    },
    {
      title: 'How We Use Your Information',
      icon: Eye,
      points: [
        'To process your registration and ticket purchases',
        'To communicate important event updates and information',
        'To personalize your event experience',
        'To provide customer support and address inquiries',
        'To improve our services and website functionality',
        'To comply with legal obligations and regulations',
      ],
    },
    {
      title: 'Data Protection',
      icon: Lock,
      points: [
        'We implement industry-standard security measures',
        'Regular security assessments and updates',
        'Limited access to personal data on a need-to-know basis',
        'Secure payment processing through trusted providers',
        'Regular staff training on data protection',
        'Encryption of sensitive personal information',
      ],
    },
    {
      title: 'Data Sharing',
      icon: Users,
      points: [
        'With service providers essential for event operations',
        'With sponsors and partners only with your explicit consent',
        'When required by law or legal process',
        'During business transfers or mergers',
        'With your explicit permission for specific purposes',
        'Anonymous, aggregated data for analytics and improvement',
      ],
    },
  ]

  const rights = [
    {
      title: 'Right to Access',
      description: 'You can request a copy of your personal data we hold',
    },
    {
      title: 'Right to Rectification',
      description: 'You can update or correct inaccurate personal data',
    },
    {
      title: 'Right to Erasure',
      description: 'You can request deletion of your personal data under certain conditions',
    },
    {
      title: 'Right to Restrict Processing',
      description: 'You can limit how we use your personal data',
    },
    {
      title: 'Right to Data Portability',
      description: 'You can receive your data in a structured, commonly used format',
    },
    {
      title: 'Right to Object',
      description: 'You can object to certain types of processing',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#170d43] to-[#2a1b69] py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,204,0,0.1)_0%,transparent_50%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#ffcc00]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Lock className="w-3 h-3 text-[#ffcc00]" />
                <span className="text-sm font-medium text-white">Data Protection</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              At Evolve ICT Summit, we are committed to protecting your privacy and personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website, register for our events, or interact with our services.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-[#ffcc00] p-4 mb-6">
              <p className="text-gray-700">
                <strong>Important:</strong> By using our website and services, you consent to the 
                data practices described in this policy. If you do not agree with our policies, 
                please do not use our services.
              </p>
            </div>
          </div>
        </div>

        {/* Key Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#170d43] to-[#2a1b69] rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#ffcc00]" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#ffcc00] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Your Rights */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Data Protection Rights</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Under data protection laws, you have various rights regarding your personal data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rights.map((right, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-[#ffcc00] transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-[#170d43]">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{right.title}</h3>
                </div>
                <p className="text-gray-600">{right.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cookie Policy */}
        <div className="bg-gradient-to-r from-[#170d43] to-[#2a1b69] rounded-3xl p-8 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Server className="w-7 h-7 text-[#ffcc00]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Cookie Policy</h2>
              <p className="text-gray-300">How we use cookies and tracking technologies</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="text-white font-bold mb-2">Essential Cookies</h3>
                <p className="text-gray-300 text-sm">
                  Required for basic website functionality and cannot be disabled
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="text-white font-bold mb-2">Analytics Cookies</h3>
                <p className="text-gray-300 text-sm">
                  Help us understand how visitors interact with our website
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="text-white font-bold mb-2">Marketing Cookies</h3>
                <p className="text-gray-300 text-sm">
                  Used to track visitors across websites for targeted advertising
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="text-white font-bold mb-2">Preference Cookies</h3>
                <p className="text-gray-300 text-sm">
                  Remember your settings and preferences for a better experience
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-gray-300 text-sm">
              You can control cookies through your browser settings. However, disabling 
              essential cookies may affect website functionality.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-r from-[#ffcc00] to-amber-500 rounded-xl flex items-center justify-center">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Contact Our Data Protection Team</h2>
              <p className="text-gray-600">Have questions or want to exercise your rights?</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#170d43] rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#ffcc00]" />
                </div>
                <h3 className="font-bold text-gray-900">Email</h3>
              </div>
              <p className="text-gray-600">privacy@evolveictsummit.com</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#170d43] rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#ffcc00]" />
                </div>
                <h3 className="font-bold text-gray-900">Phone</h3>
              </div>
              <p className="text-gray-600">+263 242 555 1234</p>
              <p className="text-gray-600 text-sm">Mon-Fri, 9AM-5PM CAT</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#170d43] rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#ffcc00]" />
                </div>
                <h3 className="font-bold text-gray-900">Response Time</h3>
              </div>
              <p className="text-gray-600">Within 30 days</p>
              <p className="text-gray-600 text-sm">For data rights requests</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="font-bold text-gray-900 mb-4">Our Commitment</h3>
            <p className="text-gray-600 mb-6">
              We are committed to handling your personal data with care and respect. 
              Our Data Protection Officer oversees all privacy matters and ensures 
              compliance with applicable laws and regulations.
            </p>
            <Button asChild>
              <Link href="/contact">
                Contact Data Protection Officer
              </Link>
            </Button>
          </div>
        </div>

        {/* Policy Updates */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Policy Updates</h3>
              <p className="text-gray-600 mb-3">
               {` We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the 
                "Last updated" date.`}
              </p>
              <p className="text-gray-600 text-sm">
                You are advised to review this Privacy Policy periodically for any changes. 
                Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 mb-4">
            Need more information about our data practices?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/terms">View Terms of Service</Link>
            </Button>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy