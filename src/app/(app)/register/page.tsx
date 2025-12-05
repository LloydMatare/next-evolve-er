//@ts-nocheck
'use client'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { Users, Building2, Store } from 'lucide-react'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Controller } from 'react-hook-form'

// API utility
import { createRegistration } from '@/lib/api'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

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
  numberOfTeamMembers: z.string().min(1, 'Number of team members is required'),
  teamMembers: z.string().min(10, 'Please provide team member names and roles (comma-separated)'),
  interestedInBooth: z.boolean().default(false),
})

const exhibitorSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  contactPerson: z.string().min(2, 'Contact person name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  industry: z.string().min(2, 'Industry is required'),
  productsServices: z
    .string()
    .min(20, 'Please describe your products/services (min 20 characters)'),
  boothSize: z.enum(['small', 'medium', 'large']),
  boothNumber: z.string().optional(),
  numberOfTeamMembers: z.string().min(1, 'Number of team members is required'),
  teamMembers: z.string().min(10, 'Please provide team member names (comma-separated)'),
  specialRequirements: z.string().optional(),
})

type AttendeeFormData = z.infer<typeof attendeeSchema>
type SponsorFormData = z.infer<typeof sponsorSchema>
type ExhibitorFormData = z.infer<typeof exhibitorSchema>

// Helper functions
function calculateAttendeeAmount(ticketType: string): number {
  switch (ticketType) {
    case 'early-bird-1':
      return 150
    case 'early-bird-2':
      return 175
    case 'regular':
      return 200
    default:
      return 0
  }
}

function calculateSponsorAmount(tier: string): number {
  switch (tier) {
    case 'platinum':
      return 50000
    case 'gold':
      return 30000
    case 'silver':
      return 15000
    case 'bronze':
      return 5000
    default:
      return 0
  }
}

function calculateExhibitorAmount(boothSize: string): number {
  switch (boothSize) {
    case 'small':
      return 2000
    case 'medium':
      return 4000
    case 'large':
      return 7000
    default:
      return 0
  }
}

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState('attendee')

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#170d43] via-[#161e2e] to-[#0f1419]">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Register</h1>
          <p className="text-lg md:text-xl text-gray-300  mx-auto">
            Join us at Evolve ICT Summit 2026
          </p>
          <p className="text-base text-gray-400 mt-4">June 11-12, 2026 • HICC, Harare, Zimbabwe</p>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="section-padding bg-[#f3f3f3]  md:bg-white">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-[#f3f3f3] p-1 grid md:grid-cols-3 gap-6 md:gap-0 w-full h-full max-w-2xl border border-gray-200">
                <TabsTrigger
                  value="attendee"
                  className="data-[state=active]:bg-[#ffcc00] data-[state=active]:text-white flex  items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Attendee</span>
                </TabsTrigger>
                <TabsTrigger
                  value="sponsor"
                  className="data-[state=active]:bg-[#ffcc00] data-[state=active]:text-white flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Sponsor</span>
                </TabsTrigger>
                <TabsTrigger
                  value="exhibitor"
                  className="data-[state=active]:bg-[#ffcc00] data-[state=active]:text-white flex items-center gap-2"
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
    </div>
  )
}

// Attendee Registration Form
function AttendeeForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AttendeeFormData>({
    resolver: zodResolver(attendeeSchema),
  })

  const onSubmit = async (data: AttendeeFormData) => {
    try {
      // Calculate amount
      const amount = calculateAttendeeAmount(data.ticketType)

      // Prepare registration data for Payload
      const registrationData = {
        type: 'attendee',
        email: data.email, // Email at root level
        status: 'pending',
        amount: amount,
        paymentMethod: 'pending',
        attendeeDetails: {
          fullName: data.fullName,
          phone: data.phone,
          organization: data.organization,
          position: data.position,
          country: data.country,
          ticketType: data.ticketType,
          dietaryRestrictions: data.dietaryRestrictions || '',
        },
      }

      // Save to Payload CMS
      const response = await createRegistration(registrationData)

      // Store in sessionStorage for checkout
      sessionStorage.setItem(
        'registrationData',
        JSON.stringify({
          id: response.doc.id,
          orderId: response.doc.orderId,
          type: 'attendee',
          email: data.email,
          fullName: data.fullName,
          amount: amount,
          ticketType: data.ticketType,
        }),
      )

      toast.success('Registration submitted! Proceeding to checkout...')

      // Redirect to checkout
      setTimeout(() => {
        window.location.href = '/checkout'
      }, 1000)
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Failed to submit registration. Please try again.')
    }
  }

  return (
    <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#170d43] mb-4">Attendee Registration</h2>
        <p className="text-gray-600">
          Register as an attendee to access all summit sessions, exhibitions, and networking events.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">Full Name *</Label>
            <Input
              {...register('fullName')}
              type="text"
              className="w-full rounded-sm border text-slate-600 border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">Email *</Label>
            <Input
              {...register('email')}
              type="email"
              className="w-full rounded-sm border text-slate-600 border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition"
              placeholder="john@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">Phone *</Label>
            <Input
              {...register('phone')}
              type="tel"
              className="w-full rounded-sm border text-slate-600 border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition"
              placeholder="+263 XXX XXX XXX"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">Organization *</Label>
            <Input
              {...register('organization')}
              type="text"
              className="w-full rounded-sm border text-slate-600 border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition"
              placeholder="Company Name"
            />
            {errors.organization && (
              <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">Position *</Label>
            <Input
              {...register('position')}
              type="text"
              className="w-full rounded-sm border text-slate-600 border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition"
              placeholder="Job Title"
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">Country *</Label>
            <Input
              {...register('country')}
              type="text"
              className="w-full rounded-sm border text-slate-600 border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition"
              placeholder="Zimbabwe"
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-600 mb-2">Ticket Type *</Label>
          <Controller
            name="ticketType"
            control={control}
            render={({ field }) => (
              <div>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select ticket type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="early-bird-1">
                      Early Bird - $150 (Before April 30, 2026)
                    </SelectItem>
                    <SelectItem value="early-bird-2">
                      Early Bird - $175 (Before May 30, 2026)
                    </SelectItem>
                    <SelectItem value="regular">Regular - $200 (From June 1, 2026)</SelectItem>
                  </SelectContent>
                </Select>

                {errors.ticketType && (
                  <p className="mt-1 text-sm text-red-600">{errors.ticketType.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-600 mb-2">
            Dietary Restrictions (Optional)
          </Label>
          <Textarea
            {...register('dietaryRestrictions')}
            rows={3}
            className="w-full rounded-sm border text-slate-600 border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition resize-none"
            placeholder="Any dietary requirements or allergies..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#ffcc00] hover:bg-[#ec7211] text-white py-4 text-sm font-semibold rounded-sm"
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
    control,
    formState: { errors, isSubmitting },
  } = useForm<SponsorFormData>({
    resolver: zodResolver(sponsorSchema),
  })

  const onSubmit = async (data: SponsorFormData) => {
    try {
      // Calculate amount
      const amount = calculateSponsorAmount(data.sponsorshipTier)

      // Prepare registration data for Payload
      const registrationData = {
        type: 'sponsor',
        email: data.email,
        status: 'pending',
        amount: amount,
        paymentMethod: 'pending',
        sponsorDetails: {
          companyName: data.companyName,
          contactPerson: data.contactPerson,
          phone: data.phone,
          website: data.website || '',
          sponsorshipTier: data.sponsorshipTier,
          companyDescription: data.companyDescription,
          numberOfTeamMembers: parseInt(data.numberOfTeamMembers),
          teamMembers: data.teamMembers,
          interestedInBooth: data.interestedInBooth,
        },
      }

      // Save to Payload CMS
      const response = await createRegistration(registrationData)

      // Store in sessionStorage for checkout
      sessionStorage.setItem(
        'registrationData',
        JSON.stringify({
          id: response.doc.id,
          orderId: response.doc.orderId,
          type: 'sponsor',
          email: data.email,
          companyName: data.companyName,
          contactPerson: data.contactPerson,
          amount: amount,
          sponsorshipTier: data.sponsorshipTier,
        }),
      )

      toast.success('Sponsorship application submitted! Proceeding to checkout...')

      // Redirect to checkout
      setTimeout(() => {
        window.location.href = '/checkout'
      }, 1000)
    } catch (error) {
      console.error('Sponsor registration error:', error)
      toast.error('Failed to submit sponsorship application. Please try again.')
    }
  }

  return (
    <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#170d43] mb-4">Sponsor Registration</h2>
        <p className="text-gray-600">
          Partner with us to gain visibility and support Africa&apos;s digital transformation.
        </p>
        <div className="mt-4 p-4 bg-[#f3f3f3] border border-gray-200 rounded-sm">
          <h3 className="font-bold text-[#170d43] mb-2">Sponsorship Tiers</h3>
          <ul className="text-sm text-gray-600 space-y-1">
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
            <Label className="block text-sm font-medium text-gray-600 mb-2">Company Name *</Label>
            <Input
              {...register('companyName')}
              type="text"
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition"
              placeholder="Your Company"
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">Contact Person *</Label>
            <Input
              {...register('contactPerson')}
              type="text"
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition"
              placeholder="Full Name"
            />
            {errors.contactPerson && (
              <p className="mt-1 text-sm text-red-600">{errors.contactPerson.message}</p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">Email *</Label>
            <Input
              {...register('email')}
              type="email"
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition"
              placeholder="contact@company.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">Phone *</Label>
            <Input
              {...register('phone')}
              type="tel"
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition"
              placeholder="+263 XXX XXX XXX"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          <div className="md:col-span-2">
            <Label className="block text-sm font-medium text-gray-600 mb-2">
              Website (Optional)
            </Label>
            <Input
              {...register('website')}
              type="url"
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition"
              placeholder="https://www.company.com"
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-600 mb-2">Sponsorship Tier *</Label>
          <Controller
            name="sponsorshipTier"
            control={control}
            render={({ field }) => (
              <div>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a tier" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="platinum">Platinum - $50,000+</SelectItem>
                    <SelectItem value="gold">Gold - $30,000+</SelectItem>
                    <SelectItem value="silver">Silver - $15,000+</SelectItem>
                    <SelectItem value="bronze">Bronze - $5,000+</SelectItem>
                  </SelectContent>
                </Select>

                {errors.sponsorshipTier && (
                  <p className="mt-1 text-sm text-red-600">{errors.sponsorshipTier.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-600 mb-2">
            Company Description *
          </Label>
          <Textarea
            {...register('companyDescription')}
            rows={4}
            className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition resize-none"
            placeholder="Tell us about your company and why you want to sponsor..."
          />
          {errors.companyDescription && (
            <p className="mt-1 text-sm text-red-600">{errors.companyDescription.message}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">
              Number of Team Members *
            </Label>
            <Input
              {...register('numberOfTeamMembers')}
              type="number"
              min="1"
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition"
              placeholder="e.g., 5"
            />
            {errors.numberOfTeamMembers && (
              <p className="mt-1 text-sm text-red-600">{errors.numberOfTeamMembers.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label className="block text-sm font-medium text-gray-600 mb-2">
              Team Member Details *
            </Label>
            <Textarea
              {...register('teamMembers')}
              rows={4}
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition resize-none"
              placeholder="List team member names and roles (e.g., John Doe - Marketing Director, Jane Smith - Brand Manager)"
            />
            {errors.teamMembers && (
              <p className="mt-1 text-sm text-red-600">{errors.teamMembers.message}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Input
            {...register('interestedInBooth')}
            type="checkbox"
            id="booth"
            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <Label htmlFor="booth" className="text-sm text-gray-600">
            I&apos;m also interested in having an exhibition booth
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#ffcc00] hover:bg-[#ec7211] font-semibold rounded-sm text-white py-4 text-sm"
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
    control,
    formState: { errors, isSubmitting },
  } = useForm<ExhibitorFormData>({
    resolver: zodResolver(exhibitorSchema),
  })

  const onSubmit = async (data: ExhibitorFormData) => {
    try {
      // Calculate amount
      const amount = calculateExhibitorAmount(data.boothSize)

      // Prepare registration data for Payload
      const registrationData = {
        type: 'exhibitor',
        email: data.email,
        status: 'pending',
        amount: amount,
        paymentMethod: 'pending',
        exhibitorDetails: {
          companyName: data.companyName,
          contactPerson: data.contactPerson,
          phone: data.phone,
          website: data.website || '',
          industry: data.industry,
          productsServices: data.productsServices,
          boothSize: data.boothSize,
          boothNumber: data.boothNumber || '',
          numberOfTeamMembers: parseInt(data.numberOfTeamMembers),
          teamMembers: data.teamMembers,
          specialRequirements: data.specialRequirements || '',
        },
      }

      // Save to Payload CMS
      const response = await createRegistration(registrationData)

      // Store in sessionStorage for checkout
      sessionStorage.setItem(
        'registrationData',
        JSON.stringify({
          id: response.doc.id,
          orderId: response.doc.orderId,
          type: 'exhibitor',
          email: data.email,
          companyName: data.companyName,
          contactPerson: data.contactPerson,
          amount: amount,
          boothSize: data.boothSize,
        }),
      )

      toast.success('Exhibitor application submitted! Proceeding to checkout...')

      // Redirect to checkout
      setTimeout(() => {
        window.location.href = '/checkout'
      }, 1000)
    } catch (error) {
      console.error('Exhibitor registration error:', error)
      toast.error('Failed to submit exhibitor application. Please try again.')
    }
  }

  return (
    <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#170d43] mb-4">Exhibitor Registration</h2>
        <p className="text-gray-600">
          Showcase your products and services to 2000+ delegates and industry leaders.
        </p>
        <div className="mt-4 p-4 bg-[#f3f3f3] border border-gray-200 rounded-sm">
          <h3 className="font-bold text-[#170d43] mb-2">Booth Packages</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Small (3x2m): $2,000 - Basic setup</li>
            <li>• Medium (4x3m): $4,000 - Standard with furniture</li>
            <li>• Large (6x4m): $7,000 - Premium with full setup</li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">Company Name *</Label>
            <Input
              {...register('companyName')}
              type="text"
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition"
              placeholder="Your Company"
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">Contact Person *</Label>
            <Input
              {...register('contactPerson')}
              type="text"
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition"
              placeholder="Full Name"
            />
            {errors.contactPerson && (
              <p className="mt-1 text-sm text-red-600">{errors.contactPerson.message}</p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">Email *</Label>
            <Input
              {...register('email')}
              type="email"
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition"
              placeholder="contact@company.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">Phone *</Label>
            <Input
              {...register('phone')}
              type="tel"
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition"
              placeholder="+263 XXX XXX XXX"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">
              Website (Optional)
            </Label>
            <Input
              {...register('website')}
              type="url"
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition"
              placeholder="https://www.company.com"
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
            )}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">Industry *</Label>
            <Input
              {...register('industry')}
              type="text"
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition"
              placeholder="e.g., Software, Hardware, Fintech"
            />
            {errors.industry && (
              <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">Booth Size *</Label>
            <Controller
              name="boothSize"
              control={control}
              render={({ field }) => (
                <div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select booth size" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="small">Small (3x2m) - $2,000</SelectItem>
                      <SelectItem value="medium">Medium (4x3m) - $4,000</SelectItem>
                      <SelectItem value="large">Large (6x4m) - $7,000</SelectItem>
                    </SelectContent>
                  </Select>

                  {errors.boothSize && (
                    <p className="mt-1 text-sm text-red-600">{errors.boothSize.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">
              Preferred Booth Number (Optional)
            </Label>
            <Input
              {...register('boothNumber')}
              type="text"
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition"
              placeholder="e.g., B-12 (if you have a preference)"
            />
            <p className="mt-1 text-xs text-gray-500">Booth numbers assigned upon approval</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-sm font-medium text-gray-600 mb-2">
              Number of Team Members *
            </Label>
            <Input
              {...register('numberOfTeamMembers')}
              type="number"
              min="1"
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition"
              placeholder="e.g., 3"
            />
            {errors.numberOfTeamMembers && (
              <p className="mt-1 text-sm text-red-600">{errors.numberOfTeamMembers.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label className="block text-sm font-medium text-gray-600 mb-2">
              Team Member Names *
            </Label>
            <Textarea
              {...register('teamMembers')}
              rows={3}
              className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition resize-none"
              placeholder="List all team member names (e.g., John Doe, Jane Smith, Mike Johnson)"
            />
            {errors.teamMembers && (
              <p className="mt-1 text-sm text-red-600">{errors.teamMembers.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-600 mb-2">
            Products/Services Description *
          </Label>
          <Textarea
            {...register('productsServices')}
            rows={4}
            className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition resize-none"
            placeholder="Describe what you will showcase at the exhibition..."
          />
          {errors.productsServices && (
            <p className="mt-1 text-sm text-red-600">{errors.productsServices.message}</p>
          )}
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-600 mb-2">
            Special Requirements (Optional)
          </Label>
          <Textarea
            {...register('specialRequirements')}
            rows={3}
            className="w-full rounded-sm border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] text-slate-600 focus:border-transparent outline-none transition resize-none"
            placeholder="Any special setup requirements, power needs, etc..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#ffcc00] hover:bg-[#ec7211] font-semibold rounded-sm text-white py-4 text-sm"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Exhibitor Application'}
        </Button>
      </form>
    </div>
  )
}
