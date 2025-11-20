'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { Users, Building2, Store, CheckCircle } from 'lucide-react'
import React, { useState } from 'react'

// Validation Schemas
const attendeeSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  organization: z.string().min(2, 'Organization is required'),
  position: z.string().min(2, 'Position is required'),
  country: z.string().min(2, 'Country is required'),
  ticketType: z.enum(['early-bird-1', 'early-bird-2', 'regular']),
  dietaryRestrictions: z.string().optional(),
})

const sponsorSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  contactPerson: z.string().min(2, 'Contact person name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  sponsorshipTier: z.enum(['platinum', 'gold', 'silver', 'bronze']),
  companyDescription: z.string().min(20, 'Please provide a brief description (min 20 characters)'),
  interestedInBooth: z.boolean(),
})

const exhibitorSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  contactPerson: z.string().min(2, 'Contact person name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  industry: z.string().min(2, 'Industry is required'),
  productsServices: z.string().min(20, 'Please describe your products/services (min 20 characters)'),
  boothSize: z.enum(['small', 'medium', 'large']),
  specialRequirements: z.string().optional(),
})

type AttendeeFormData = z.infer<typeof attendeeSchema>
type SponsorFormData = z.infer<typeof sponsorSchema>
type ExhibitorFormData = z.infer<typeof exhibitorSchema>

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState('attendee')

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Register</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
            Join us at Evolve ICT Summit 2026
          </p>
          <p className="text-lg text-blue-200 mt-4">June 11-12, 2026 • HICC, Harare, Zimbabwe</p>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-gradient-to-r from-blue-100 to-purple-100 p-1 grid grid-cols-3 w-full max-w-2xl">
                <TabsTrigger
                  value="attendee"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Attendee</span>
                </TabsTrigger>
                <TabsTrigger
                  value="sponsor"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Sponsor</span>
                </TabsTrigger>
                <TabsTrigger
                  value="exhibitor"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white flex items-center gap-2"
                >
                  <Store className="w-4 h-4" />
                  <span className="hidden sm:inline">Exhibitor</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Attendee Registration */}
            <TabsContent value="attendee">
              <AttendeeForm />
            </TabsContent>

            {/* Sponsor Registration */}
            <TabsContent value="sponsor">
              <SponsorForm />
            </TabsContent>

            {/* Exhibitor Registration */}
            <TabsContent value="exhibitor">
              <ExhibitorForm />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Attendee Registration Form
function AttendeeForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AttendeeFormData>({
    resolver: zodResolver(attendeeSchema),
  })

  const onSubmit = async (data: AttendeeFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Attendee Registration:', data)
    toast.success('Registration successful! Check your email for confirmation.')
    reset()
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Attendee Registration</h2>
        <p className="text-gray-700">
          Register as an attendee to access all summit sessions, exhibitions, and networking events.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              {...register('fullName')}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="john@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="+263 XXX XXX XXX"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organization *</label>
            <input
              {...register('organization')}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Company Name"
            />
            {errors.organization && (
              <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
            <input
              {...register('position')}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Job Title"
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
            <input
              {...register('country')}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Zimbabwe"
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Type *</label>
          <select
            {...register('ticketType')}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          >
            <option value="early-bird-1">Early Bird - $150 (Before April 30, 2026)</option>
            <option value="early-bird-2">Early Bird - $175 (Before May 30, 2026)</option>
            <option value="regular">Regular - $200 (From June 1, 2026)</option>
          </select>
          {errors.ticketType && (
            <p className="mt-1 text-sm text-red-600">{errors.ticketType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dietary Restrictions (Optional)
          </label>
          <textarea
            {...register('dietaryRestrictions')}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
            placeholder="Any dietary requirements or allergies..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg"
        >
          {isSubmitting ? 'Processing...' : 'Complete Registration'}
        </Button>
      </form>
    </div>
  )
}

// Sponsor Registration Form
function SponsorForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SponsorFormData>({
    resolver: zodResolver(sponsorSchema),
  })

  const onSubmit = async (data: SponsorFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Sponsor Registration:', data)
    toast.success('Thank you for your interest! Our team will contact you shortly.')
    reset()
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Sponsor Registration</h2>
        <p className="text-gray-700">
          Partner with us to gain visibility and support Africa&apos;s digital transformation.
        </p>
        <div className="mt-4 p-4 bg-purple-100 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-2">Sponsorship Tiers</h3>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Platinum: $50,000+ (Premium branding & keynote slot)</li>
            <li>• Gold: $30,000+ (Major branding & panel slot)</li>
            <li>• Silver: $15,000+ (Standard branding & exhibition)</li>
            <li>• Bronze: $5,000+ (Logo placement & exhibition)</li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              {...register('companyName')}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Your Company"
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person *
            </label>
            <input
              {...register('contactPerson')}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Full Name"
            />
            {errors.contactPerson && (
              <p className="mt-1 text-sm text-red-600">{errors.contactPerson.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="contact@company.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="+263 XXX XXX XXX"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website (Optional)
            </label>
            <input
              {...register('website')}
              type="url"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="https://www.company.com"
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sponsorship Tier *
          </label>
          <select
            {...register('sponsorshipTier')}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          >
            <option value="">Select a tier</option>
            <option value="platinum">Platinum - $50,000+</option>
            <option value="gold">Gold - $30,000+</option>
            <option value="silver">Silver - $15,000+</option>
            <option value="bronze">Bronze - $5,000+</option>
          </select>
          {errors.sponsorshipTier && (
            <p className="mt-1 text-sm text-red-600">{errors.sponsorshipTier.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Description *
          </label>
          <textarea
            {...register('companyDescription')}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
            placeholder="Tell us about your company and why you want to sponsor..."
          />
          {errors.companyDescription && (
            <p className="mt-1 text-sm text-red-600">{errors.companyDescription.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <input
            {...register('interestedInBooth')}
            type="checkbox"
            id="booth"
            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="booth" className="text-sm text-gray-700">
            I&apos;m also interested in having an exhibition booth
          </label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Sponsorship Application'}
        </Button>
      </form>
    </div>
  )
}

// Exhibitor Registration Form
function ExhibitorForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExhibitorFormData>({
    resolver: zodResolver(exhibitorSchema),
  })

  const onSubmit = async (data: ExhibitorFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Exhibitor Registration:', data)
    toast.success('Application submitted! We will contact you with booth details.')
    reset()
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Exhibitor Registration</h2>
        <p className="text-gray-700">
          Showcase your products and services to 2000+ delegates and industry leaders.
        </p>
        <div className="mt-4 p-4 bg-purple-100 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-2">Booth Packages</h3>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Small (3x2m): $2,000 - Basic setup</li>
            <li>• Medium (4x3m): $4,000 - Standard with furniture</li>
            <li>• Large (6x4m): $7,000 - Premium with full setup</li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              {...register('companyName')}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Your Company"
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person *
            </label>
            <input
              {...register('contactPerson')}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Full Name"
            />
            {errors.contactPerson && (
              <p className="mt-1 text-sm text-red-600">{errors.contactPerson.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="contact@company.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="+263 XXX XXX XXX"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website (Optional)
            </label>
            <input
              {...register('website')}
              type="url"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="https://www.company.com"
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
            <input
              {...register('industry')}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="e.g., Software, Hardware, Fintech"
            />
            {errors.industry && (
              <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Booth Size *</label>
          <select
            {...register('boothSize')}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          >
            <option value="">Select booth size</option>
            <option value="small">Small (3x2m) - $2,000</option>
            <option value="medium">Medium (4x3m) - $4,000</option>
            <option value="large">Large (6x4m) - $7,000</option>
          </select>
          {errors.boothSize && (
            <p className="mt-1 text-sm text-red-600">{errors.boothSize.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Products/Services Description *
          </label>
          <textarea
            {...register('productsServices')}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
            placeholder="Describe what you will showcase at the exhibition..."
          />
          {errors.productsServices && (
            <p className="mt-1 text-sm text-red-600">{errors.productsServices.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requirements (Optional)
          </label>
          <textarea
            {...register('specialRequirements')}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
            placeholder="Any special setup requirements, power needs, etc..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Exhibitor Application'}
        </Button>
      </form>
    </div>
  )
}
