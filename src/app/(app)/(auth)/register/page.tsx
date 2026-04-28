'use client'

import { FadeIn } from '@/components/fade-in'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
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
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
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
import { PRICES } from '@/lib/prices'

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

const FULL_BOARD_AMOUNT = 12000

// Helper functions
function calculateAttendeeAmount(ticketType: string): number {
  // Always return the regular price regardless of ticket type
  return PRICES.ATTENDEE.REGULAR
}

function calculateSponsorAmount(tier: string): number {
  switch (tier) {
    case 'platinum':
      return PRICES.SPONSOR.PLATINUM
    case 'gold':
      return PRICES.SPONSOR.GOLD
    case 'silver':
      return PRICES.SPONSOR.SILVER
    case 'bronze':
      return PRICES.SPONSOR.BRONZE
    default:
      return 0
  }
}

function calculateExhibitorAmount(boothSize: string): number {
  // Always return the large booth price
  return PRICES.EXHIBITOR.LARGE
}

const fullBoardSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  contactPerson: z.string().min(2, 'Contact person name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  numberOfTeamMembers: z.string().min(1, 'Number of team members is required'),
  teamMembers: z.string().min(10, 'Please provide team member names (comma-separated)'),
  specialRequirements: z.string().optional(),
})

type FullBoardFormData = z.infer<typeof fullBoardSchema>

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('type') || 'attendee'
  const [activeTab, setActiveTab] = useState(initialTab)
  const [selectedSponsorTier, setSelectedSponsorTier] = useState<
    'platinum' | 'gold' | 'silver' | 'bronze'
  >('bronze')

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Register"
        title="Secure your spot for"
        accent="Evolve 2026"
        description="Choose the registration path that fits you — attendee, sponsor, exhibitor, or full boarding — and move smoothly into checkout."
        primaryCta={{ href: '/program', label: 'Explore Program' }}
        secondaryCta={{ href: '/partnerships', label: 'Partnerships' }}
        image="/bg-1.jpg"
        imageAlt="Event crowd and stage lights"
        compact
      />

      {/* Registration Navigation */}
      <section className="relative -mt-10 px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container-custom">
          <Tabs
            value={activeTab}
            onValueChange={(val) => {
              setActiveTab(val)
              // ensure that the sponsor tab has a sensible default tier when opened
              if (val === 'sponsor') setSelectedSponsorTier((t) => t || 'bronze')
            }}
            className="w-full"
          >
            <FadeIn>
              <div className="event-surface rounded-[2rem] p-6 md:p-8">
                <SectionHeading
                  eyebrow="Choose a path"
                  title="Registration options designed for different goals."
                  description="Attending, sponsoring, exhibiting, or coming as a full-board partner — pick the option that fits and continue to checkout."
                />

                <div className="flex justify-center">
                  <TabsList className="grid h-auto w-full max-w-5xl gap-3 rounded-[1.75rem] border border-slate-200/70 bg-white/70 p-2 md:grid-cols-4">
                    <TabsTrigger
                      value="attendee"
                      className="rounded-[1.35rem] px-5 py-4 data-[state=active]:bg-slate-950 data-[state=active]:text-white"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <Users className="h-5 w-5 text-[var(--brand-gold)]" />
                        <div>
                          <div className="text-sm font-semibold">Attendee</div>
                          <div className="text-xs opacity-70">Individual</div>
                        </div>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="sponsor"
                      className="rounded-[1.35rem] px-5 py-4 data-[state=active]:bg-slate-950 data-[state=active]:text-white"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <Building2 className="h-5 w-5 text-[var(--brand-blue)]" />
                        <div>
                          <div className="text-sm font-semibold">Sponsor</div>
                          <div className="text-xs opacity-70">Packages</div>
                        </div>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="exhibitor"
                      className="rounded-[1.35rem] px-5 py-4 data-[state=active]:bg-slate-950 data-[state=active]:text-white"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <Store className="h-5 w-5 text-[var(--brand-cyan)]" />
                        <div>
                          <div className="text-sm font-semibold">Exhibitor</div>
                          <div className="text-xs opacity-70">Showcase</div>
                        </div>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="full-board"
                      className="rounded-[1.35rem] px-5 py-4 data-[state=active]:bg-slate-950 data-[state=active]:text-white"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <Ticket className="h-5 w-5 text-[var(--brand-rose)]" />
                        <div>
                          <div className="text-sm font-semibold">Full Boarding</div>
                          <div className="text-xs opacity-70">Complete</div>
                        </div>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </div>

            {/* Content */}
                <div className="mt-8">
                  <TabsContent value="attendee">
                    <AttendeeForm />
                  </TabsContent>

                  <TabsContent value="sponsor">
                    <SponsorForm initialTier={selectedSponsorTier} />
                  </TabsContent>

                  <TabsContent value="exhibitor">
                    <ExhibitorForm />
                  </TabsContent>

                  <TabsContent value="full-board">
                    <FullBoardForm />
                  </TabsContent>
                </div>
              </div>
            </FadeIn>
          </Tabs>
        </div>
      </section>

      <section className="section-padding bg-[linear-gradient(180deg,#ffffff,#eef4ff)] px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Why register"
            title="Because momentum belongs to the prepared."
            description="Registering gives you access, visibility, and a smoother onsite experience."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: 'Global networking', Icon: Globe },
              { title: 'Expert insights', Icon: Award },
              { title: 'Innovation showcase', Icon: Zap },
              { title: 'Secure experience', Icon: Shield },
            ].map((item, index) => (
              <FadeIn key={item.title} delay={index * 90}>
                <div className="event-surface event-card-hover rounded-[1.8rem] p-6 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))] text-white">
                    <item.Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                </div>
              </FadeIn>
            ))}
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
            <h2 className="text-lg md:text-3xl font-bold mb-2">Attendee Registration</h2>
            <p className="opacity-90">{`Secure your spot at Africa's premier ICT summit`}</p>
          </div>
          <div className="text-right">
            <div className="text-lg md:text-4xl font-bold">${amount}</div>
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
              className="w-full mt-6 bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white  hover:shadow-lg hover:shadow-amber-500/25 transition-shadow"
            >
              {isSubmitting ? (
                'Processing...'
              ) : (
                <>
                 Register
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
function SponsorForm({ initialTier }: { initialTier?: 'platinum' | 'gold' | 'silver' | 'bronze' }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SponsorFormData>({
    resolver: zodResolver(sponsorSchema),
    defaultValues: {
      sponsorshipTier: initialTier || 'bronze',
    },
  })

  // Keep form in sync when parent changes the initial tier
  useEffect(() => {
    if (initialTier) {
      try {
        const values = getValues()
        reset({ ...values, sponsorshipTier: initialTier })
      } catch (e) {
        reset({ sponsorshipTier: initialTier })
      }
    }
  }, [initialTier, getValues, reset])

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
            <h2 className="text-lg md:text-3xl font-bold mb-2">Sponsorship Application</h2>
            <p className="opacity-90">{`Partner with Africa's premier tech event`}</p>
          </div>
          <div className="text-right">
            <div className="text-lg md:text-4xl font-bold">${amount.toLocaleString()}</div>
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
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white  hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
            >
              {isSubmitting ? (
                'Processing...'
              ) : (
                <>
                  Apply
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
            <h2 className="text-lg ms:text-3xl font-bold mb-2">Exhibitor Registration</h2>
            <p className="opacity-90">{`Showcase your technology to Africa's tech leaders`}</p>
          </div>
          <div className="text-right">
            <div className="text-lg ms:text-4xl font-bold">${amount.toLocaleString()}</div>
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
                  placeholder="e.g., G1, G12, G25"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Booth numbers range from G1 to G63. Leave blank for automatic assignment.
                </p>
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
              className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-400 text-white  hover:shadow-lg hover:shadow-emerald-500/25 transition-shadow"
            >
              {isSubmitting ? (
                'Processing...'
              ) : (
                <>
                  Apply
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

// Full Boarding Registration Form
function FullBoardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FullBoardFormData>({
    resolver: zodResolver(fullBoardSchema),
  })

  const onSubmit = async (data: FullBoardFormData) => {
    try {
      // Prepare registration data for Payload
      const registrationData = {
        type: 'full-board',
        email: data.email,
        status: 'pending',
        amount: FULL_BOARD_AMOUNT,
        paymentMethod: 'pending',
        fullBoardDetails: {
          companyName: data.companyName,
          contactPerson: data.contactPerson,
          phone: data.phone,
          website: data.website || '',
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
          type: 'full-board',
          email: data.email,
          companyName: data.companyName,
          contactPerson: data.contactPerson,
          amount: FULL_BOARD_AMOUNT,
        }),
      )

      toast.success('Full boarding application submitted! Proceeding to checkout...')

      // Redirect to checkout
      setTimeout(() => {
        window.location.href = '/checkout'
      }, 1000)
    } catch (error) {
      console.error('Full boarding registration error:', error)
      toast.error('Failed to submit full boarding application. Please try again.')
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-400 p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-3xl font-bold mb-2">Full Boarding Package</h2>
            <p className="opacity-90">Complete package for sponsors and exhibitors</p>
          </div>
          <div className="text-right">
            <div className="text-lg md:text-4xl font-bold">
              ${FULL_BOARD_AMOUNT.toLocaleString()}
            </div>
            <div className="text-sm opacity-80">Full Board</div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Package Highlights</h3>
          <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
            <li>• Premium branding and visibility</li>
            <li>• Speaking opportunity</li>
            <li>• VIP access and hospitality</li>
            <li>• Exhibition space included</li>
            <li>• Delegates included</li>
            <li>• Priority placement</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-500" />
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
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-slate-600"
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
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-slate-600"
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
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-slate-600"
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
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-slate-600"
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
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-slate-600"
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
                  className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-slate-600"
                  placeholder="5"
                />
                {errors.numberOfTeamMembers && (
                  <p className="mt-1 text-sm text-red-600">{errors.numberOfTeamMembers.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" />
              Team Members
            </h3>
            <div>
              <Label className="block text-sm font-medium text-gray-600 mb-2">
                Team Member Names *
              </Label>
              <Textarea
                {...register('teamMembers')}
                rows={3}
                className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-slate-600 resize-none"
                placeholder="List team members who will attend (comma-separated)"
              />
              {errors.teamMembers && (
                <p className="mt-1 text-sm text-red-600">{errors.teamMembers.message}</p>
              )}
            </div>
          </div>

          {/* Special Requirements */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Special Requirements
            </h3>
            <div>
              <Label className="block text-sm font-medium text-gray-600 mb-2">
                Any special requirements?
              </Label>
              <Textarea
                {...register('specialRequirements')}
                rows={3}
                className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-slate-600 resize-none"
                placeholder="Additional requirements or notes"
              />
            </div>
          </div>

          {/* Summary & Submit */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Full Boarding Summary</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Package</span>
                    <span className="font-medium">Full Boarding</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-amber-200 pt-2">
                    <span className="font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${FULL_BOARD_AMOUNT.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-amber-500" />
                  <span>All benefits included in package</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4 text-amber-500" />
                  <span>Flexible payment terms available</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-400 text-white hover:shadow-lg hover:shadow-amber-500/25 transition-shadow"
            >
              {isSubmitting ? (
                'Processing...'
              ) : (
                <>
                  Apply
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
