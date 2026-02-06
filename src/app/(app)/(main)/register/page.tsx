//@ts-nocheck
'use client'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import {
  Users,
  Building2,
  Store,
  Sparkles,
  Shield,
  Award,
  Globe,
  CreditCard,
  CheckCircle,
  Calendar,
  MapPin,
  Ticket,
  ArrowRight,
  Zap,
  Star,
  Gift,
  Crown,
  TrendingUp,
} from 'lucide-react'
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
    case 'regular':
      return 250
    default:
      return 0
  }
}

function calculateSponsorAmount(tier: string): number {
  switch (tier) {
    case 'platinum':
      return 15000
    case 'gold':
      return 10000
    case 'silver':
      return 7500
    case 'bronze':
      return 5000
    default:
      return 0
  }
}

function calculateExhibitorAmount(boothSize: string): number {
  switch (boothSize) {
    case 'large':
      return 1000
    default:
      return 0
  }
}

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState('attendee')

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a]">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ffcc00]/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Ticket className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm font-medium text-white">Secure Your Spot</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Register Now</h1>

          <div className="flex justify-center">
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join{' '}
              <span className="text-[#ffcc00] font-semibold">2,000+ innovators and leaders</span>{' '}
              {`at Africa's premier ICT summit`}
            </p>
          </div>

          {/* Event Details */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="w-5 h-5 text-[#ffcc00]" />
              <span className="font-medium">June 11-12, 2026</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-5 h-5 text-[#ffcc00]" />
              <span className="font-medium">HICC, Harare, Zimbabwe</span>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Navigation */}
      <section className="py-8 px-4 bg-white border-b border-gray-200">
        <div className="container-custom">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-100 h-auto p-1 grid md:grid-cols-3 gap-4 md:gap-0 w-full max-w-4xl rounded-2xl border border-gray-200">
                <TabsTrigger
                  value="attendee"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ffcc00] data-[state=active]:to-amber-500 data-[state=active]:text-white flex items-center justify-center gap-3 px-8 py-4 rounded-xl transition-all"
                >
                  <Users className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-bold">Attendee</div>
                    <div className="text-xs opacity-80">Individual Registration</div>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="sponsor"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-400 data-[state=active]:text-white flex items-center justify-center gap-3 px-8 py-4 rounded-xl transition-all"
                >
                  <Building2 className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-bold">Sponsor</div>
                    <div className="text-xs opacity-80">Partnership Packages</div>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="exhibitor"
                  className="data-[state=active]:bg-gradient-to-r  data-[state=active]:from-emerald-500 data-[state=active]:to-teal-400 data-[state=active]:text-white flex items-center justify-center gap-3 px-8 py-4 rounded-xl transition-all"
                >
                  <Store className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-bold">Exhibitor</div>
                    <div className="text-xs opacity-80">Showcase Your Tech</div>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto">
              <TabsContent value="attendee">
                <AttendeeForm />
              </TabsContent>

              <TabsContent value="sponsor">
                <SponsorForm />
              </TabsContent>

              <TabsContent value="exhibitor">
                <ExhibitorForm />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[#ffcc00]" />
              <span className="text-sm font-medium text-gray-700">Registration Benefits</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Register?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {`Get exclusive access to Africa's premier tech event`}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Global Networking</h3>
              <p className="text-sm text-gray-600">
                Connect with 2,000+ tech leaders from across Africa
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Expert Insights</h3>
              <p className="text-sm text-gray-600">Learn from 50+ industry-leading speakers</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Innovation Showcase</h3>
              <p className="text-sm text-gray-600">
                Explore cutting-edge tech from 100+ exhibitors
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Secure Experience</h3>
              <p className="text-sm text-gray-600">SSL secured payments & data protection</p>
            </div>
          </div>
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
    watch,
  } = useForm<AttendeeFormData>({
    resolver: zodResolver(attendeeSchema),
    defaultValues: {
      ticketType: 'early-bird-2',
    },
  })

  const selectedTicket = watch('ticketType')
  const amount = calculateAttendeeAmount(selectedTicket)

  const onSubmit = async (data: AttendeeFormData) => {
    try {
      // Prepare registration data for Payload
      const registrationData = {
        type: 'attendee',
        email: data.email,
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
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-[#ffcc00] to-amber-500 p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Attendee Registration</h2>
            <p className="opacity-90">{`Secure your spot at Africa's premier ICT summit`}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">${amount}</div>
            <div className="text-sm opacity-80">per ticket</div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Ticket Options */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#ffcc00]" />
            Select Your Ticket
          </h3>
          <Controller
            name="ticketType"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <button
                  type="button"
                  onClick={() => field.onChange('regular')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    field.value === 'regular'
                      ? 'border-[#ffcc00] bg-gradient-to-br from-[#ffcc00]/10 to-amber-500/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-left">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900">Regular</span>
                      {field.value === 'regular' && (
                        <CheckCircle className="w-5 h-5 text-[#ffcc00]" />
                      )}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">$250</div>
                    {/* <div className="text-sm text-gray-600">From June 1, 2026</div> */}
                    <div className="mt-3 flex items-center gap-2 text-sm text-[#ffcc00]">
                      <Star className="w-4 h-4" />
                      <span>Standard Rate</span>
                    </div>
                  </div>
                </button>
              </div>
            )}
          />
          {errors.ticketType && (
            <p className="mt-2 text-sm text-red-600">{errors.ticketType.message}</p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#ffcc00]" />
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Full Name *</Label>
                <div className="relative">
                  <Input
                    {...register('fullName')}
                    type="text"
                    className="w-full pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition text-slate-600"
                    placeholder="John Doe"
                  />
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Email *</Label>
                <div className="relative">
                  <Input
                    {...register('email')}
                    type="email"
                    className="w-full pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition text-slate-600"
                    placeholder="john@example.com"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    @
                  </span>
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Phone *</Label>
                <div className="relative">
                  <Input
                    {...register('phone')}
                    type="tel"
                    className="w-full pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition text-slate-600"
                    placeholder="+263 XXX XXX XXX"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    📱
                  </span>
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">
                  Organization *
                </Label>
                <div className="relative">
                  <Input
                    {...register('organization')}
                    type="text"
                    className="w-full pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition text-slate-600"
                    placeholder="Company Name"
                  />
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                {errors.organization && (
                  <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Position *</Label>
                <div className="relative">
                  <Input
                    {...register('position')}
                    type="text"
                    className="w-full pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition text-slate-600"
                    placeholder="Job Title"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    💼
                  </span>
                </div>
                {errors.position && (
                  <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Country *</Label>
                <div className="relative">
                  <Input
                    {...register('country')}
                    type="text"
                    className="w-full pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition text-slate-600"
                    placeholder="Zimbabwe"
                  />
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#ffcc00]" />
              Additional Information
            </h3>
            <div>
              <Label className="block text-sm font-medium text-gray-600 mb-2">
                Dietary Restrictions (Optional)
              </Label>
              <Textarea
                {...register('dietaryRestrictions')}
                rows={3}
                className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition text-slate-600 resize-none"
                placeholder="Any dietary requirements or allergies..."
              />
            </div>
          </div>

          {/* Summary & Submit */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Ticket</span>
                    <span className="font-medium">${amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium">$0</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-2">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">${amount}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-[#ffcc00]" />
                  <span>Secure SSL encrypted payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4 text-[#ffcc00]" />
                  <span>Multiple payment options</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white font-bold px-8 py-6 rounded-xl text-lg hover:shadow-lg hover:shadow-amber-500/25 transition-shadow"
            >
              {isSubmitting ? (
                'Processing...'
              ) : (
                <>
                  Complete Registration
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Sponsor Registration Form - Fixed version
function SponsorForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SponsorFormData>({
    resolver: zodResolver(sponsorSchema),
    defaultValues: {
      sponsorshipTier: 'bronze',
    },
  })

  const selectedTier = watch('sponsorshipTier')
  const amount = calculateSponsorAmount(selectedTier)

  const tiers = [
    {
      id: 'platinum',
      name: 'Platinum',
      price: 15000,
      color: 'from-gray-700 to-gray-900',
      icon: Crown,
    },
    { id: 'gold', name: 'Gold', price: 10000, color: 'from-amber-500 to-yellow-400', icon: Award },
    { id: 'silver', name: 'Silver', price: 7500, color: 'from-gray-400 to-gray-300', icon: Star },
    {
      id: 'bronze',
      name: 'Bronze',
      price: 5000,
      color: 'from-orange-800 to-orange-600',
      icon: TrendingUp,
    },
  ]

  const onSubmit = async (data: SponsorFormData) => {
    try {
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
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Sponsorship Application</h2>
            <p className="opacity-90">{`Partner with Africa's premier tech event`}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">${amount.toLocaleString()}</div>
            <div className="text-sm opacity-80">{selectedTier} Tier</div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Tier Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-500" />
            Select Sponsorship Tier
          </h3>
          <Controller
            name="sponsorshipTier"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tiers.map((tier) => {
                  const Icon = tier.icon
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => field.onChange(tier.id)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        field.value === tier.id
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        {field.value === tier.id && (
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">{tier.name}</div>
                        <div className="text-2xl font-bold text-gray-900 my-2">
                          ${tier.price.toLocaleString()}
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Premium branding</li>
                          <li>• Speaking opportunity</li>
                          <li>• VIP access</li>
                          <li>• Exhibition space</li>
                        </ul>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          />
          {errors.sponsorshipTier && (
            <p className="mt-2 text-sm text-red-600">{errors.sponsorshipTier.message}</p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-500" />
              Company Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">
                  Company Name *
                </Label>
                <Input
                  {...register('companyName')}
                  type="text"
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-slate-600"
                  placeholder="Your Company"
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">
                  Contact Person *
                </Label>
                <Input
                  {...register('contactPerson')}
                  type="text"
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-slate-600"
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
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-slate-600"
                  placeholder="contact@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Phone *</Label>
                <Input
                  {...register('phone')}
                  type="tel"
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-slate-600"
                  placeholder="+263 XXX XXX XXX"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">
                  Website (Optional)
                </Label>
                <Input
                  {...register('website')}
                  type="url"
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-slate-600"
                  placeholder="https://example.com"
                />
                {errors.website && (
                  <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">
                  Number of Team Members *
                </Label>
                <Input
                  {...register('numberOfTeamMembers')}
                  type="number"
                  min="1"
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-slate-600"
                  placeholder="5"
                />
                {errors.numberOfTeamMembers && (
                  <p className="mt-1 text-sm text-red-600">{errors.numberOfTeamMembers.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Company Description */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              Company Description
            </h3>
            <div>
              <Label className="block text-sm font-medium text-gray-600 mb-2">
                Tell us about your company *
              </Label>
              <Textarea
                {...register('companyDescription')}
                rows={4}
                className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-slate-600 resize-none"
                placeholder="Brief description of your company's mission, products/services, and why you want to sponsor..."
              />
              {errors.companyDescription && (
                <p className="mt-1 text-sm text-red-600">{errors.companyDescription.message}</p>
              )}
            </div>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Team Members
            </h3>
            <div>
              <Label className="block text-sm font-medium text-gray-600 mb-2">
                Team Member Names and Roles *
              </Label>
              <Textarea
                {...register('teamMembers')}
                rows={3}
                className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-slate-600 resize-none"
                placeholder="John Doe - CEO, Jane Smith - Marketing Director, etc."
              />
              {errors.teamMembers && (
                <p className="mt-1 text-sm text-red-600">{errors.teamMembers.message}</p>
              )}
            </div>
          </div>

          {/* Booth Interest */}
          <div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register('interestedInBooth')}
                id="interestedInBooth"
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <Label htmlFor="interestedInBooth" className="text-gray-700 cursor-pointer">
                We are interested in having an exhibition booth at the event
              </Label>
            </div>
          </div>

          {/* Summary & Submit */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Sponsorship Summary</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sponsorship Tier</span>
                    <span className="font-medium capitalize">{selectedTier}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-medium">${amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-blue-200 pt-2">
                    <span className="font-bold text-gray-900">Total Investment</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>All benefits included in package</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4 text-blue-500" />
                  <span>Flexible payment terms available</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold px-8 py-6 rounded-xl text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
            >
              {isSubmitting ? (
                'Processing...'
              ) : (
                <>
                  Apply for Sponsorship
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
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
    watch,
  } = useForm<ExhibitorFormData>({
    resolver: zodResolver(exhibitorSchema),
    defaultValues: {
      boothSize: 'medium',
    },
  })

  const selectedBoothSize = watch('boothSize')
  const amount = calculateExhibitorAmount(selectedBoothSize)

  const boothSizes = [
    {
      id: 'large',
      name: 'Exhibitors Booth',
      price: 1000,
      size: '3x3m',
      color: 'from-emerald-600 to-teal-500',
    },
  ]

  const onSubmit = async (data: ExhibitorFormData) => {
    try {
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
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-400 p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Exhibitor Registration</h2>
            <p className="opacity-90">{`Showcase your technology to Africa's tech leaders`}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">${amount.toLocaleString()}</div>
            <div className="text-sm opacity-80">{selectedBoothSize} booth</div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Booth Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-500" />
            Select Booth Size
          </h3>
          <Controller
            name="boothSize"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {boothSizes.map((booth) => (
                  <button
                    key={booth.id}
                    type="button"
                    onClick={() => field.onChange(booth.id)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      field.value === booth.id
                        ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${booth.color} flex items-center justify-center`}
                      >
                        <Store className="w-5 h-5 text-white" />
                      </div>
                      {field.value === booth.id && (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{booth.name}</div>
                      <div className="text-sm text-gray-600 mb-2">{booth.size}</div>
                      <div className="text-2xl font-bold text-gray-900 my-2">
                        ${booth.price.toLocaleString()}
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Basic power supply</li>
                        <li>• Wi-Fi access</li>
                        <li>• Featuresd on social meadia & website</li>
                        <li>• 1 delegate Ticket</li>
                      </ul>
                    </div>
                  </button>
                ))}
              </div>
            )}
          />
          {errors.boothSize && (
            <p className="mt-2 text-sm text-red-600">{errors.boothSize.message}</p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-500" />
              Company Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">
                  Company Name *
                </Label>
                <Input
                  {...register('companyName')}
                  type="text"
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-slate-600"
                  placeholder="Your Company"
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">
                  Contact Person *
                </Label>
                <Input
                  {...register('contactPerson')}
                  type="text"
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-slate-600"
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
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-slate-600"
                  placeholder="contact@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Phone *</Label>
                <Input
                  {...register('phone')}
                  type="tel"
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-slate-600"
                  placeholder="+263 XXX XXX XXX"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">
                  Website (Optional)
                </Label>
                <Input
                  {...register('website')}
                  type="url"
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-slate-600"
                  placeholder="https://example.com"
                />
                {errors.website && (
                  <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">Industry *</Label>
                <Select
                  onValueChange={(value) => {
                    const event = { target: { name: 'industry', value } }
                    register('industry').onChange(event)
                  }}
                  defaultValue={watch('industry')}
                >
                  <SelectTrigger className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-slate-600">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software">Software Development</SelectItem>
                    <SelectItem value="telecom">Telecommunications</SelectItem>
                    <SelectItem value="fintech">FinTech</SelectItem>
                    <SelectItem value="healthtech">HealthTech</SelectItem>
                    <SelectItem value="edutech">EduTech</SelectItem>
                    <SelectItem value="iot">IoT & Hardware</SelectItem>
                    <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                    <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="cloud">Cloud Services</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.industry && (
                  <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
                )}
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">
                  Booth Number (Optional)
                </Label>
                <Input
                  {...register('boothNumber')}
                  type="text"
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-slate-600"
                  placeholder="e.g., A12, B05"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-600 mb-2">
                  Number of Team Members *
                </Label>
                <Input
                  {...register('numberOfTeamMembers')}
                  type="number"
                  min="1"
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-slate-600"
                  placeholder="5"
                />
                {errors.numberOfTeamMembers && (
                  <p className="mt-1 text-sm text-red-600">{errors.numberOfTeamMembers.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Products & Services */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              Products & Services
            </h3>
            <div>
              <Label className="block text-sm font-medium text-gray-600 mb-2">
                Describe your products/services *
              </Label>
              <Textarea
                {...register('productsServices')}
                rows={4}
                className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-slate-600 resize-none"
                placeholder="What products or services will you be showcasing? What makes your offering unique?"
              />
              {errors.productsServices && (
                <p className="mt-1 text-sm text-red-600">{errors.productsServices.message}</p>
              )}
            </div>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-500" />
              Team Members
            </h3>
            <div>
              <Label className="block text-sm font-medium text-gray-600 mb-2">
                Team Member Names *
              </Label>
              <Textarea
                {...register('teamMembers')}
                rows={3}
                className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-slate-600 resize-none"
                placeholder="List team members who will be at the booth (comma-separated)"
              />
              {errors.teamMembers && (
                <p className="mt-1 text-sm text-red-600">{errors.teamMembers.message}</p>
              )}
            </div>
          </div>

          {/* Special Requirements */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-500" />
              Special Requirements
            </h3>
            <div>
              <Label className="block text-sm font-medium text-gray-600 mb-2">
                Any special requirements for your booth?
              </Label>
              <Textarea
                {...register('specialRequirements')}
                rows={3}
                className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-slate-600 resize-none"
                placeholder="Additional power needs, specific booth location, equipment rental, etc."
              />
            </div>
          </div>

          {/* Summary & Submit */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Exhibitor Summary</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Booth Size</span>
                    <span className="font-medium capitalize">{selectedBoothSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Booth Fee</span>
                    <span className="font-medium">${amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Exhibitor Passes</span>
                    <span className="font-medium">Included (2)</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-emerald-200 pt-2">
                    <span className="font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>Booth allocation on first-come basis</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4 text-emerald-500" />
                  <span>50% deposit required for confirmation</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold px-8 py-6 rounded-xl text-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-shadow"
            >
              {isSubmitting ? (
                'Processing...'
              ) : (
                <>
                  Apply as Exhibitor
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
