//@ts-nocheck
'use client'

import { FadeIn } from '@/components/fade-in'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import {
  Users,
  Building2,
  Globe,
  CheckCircle,
  ArrowRight,
  Search,
  UserPlus,
  Ticket,
  Shield,
  Image as ImageIcon,
  Upload,
  X,
  Download,
  CalendarDays,
  MapPin,
  Sparkles,
  BadgeCheck,
} from 'lucide-react'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { toJpeg } from 'html-to-image'

type Attendee = {
  id: string
  fullName: string
  email: string
  phone: string
  organization: string
  position: string
  country: string
  photoUrl?: string
}

const rsvpSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  organization: z.string().min(2, 'Organization is required'),
  position: z.string().min(2, 'Position is required'),
  country: z.string().min(2, 'Country is required'),
  dietaryRestrictions: z.string().optional(),
})

type RsvpFormData = z.infer<typeof rsvpSchema>

function AttendeeBadge({ attendee }: { attendee: Attendee }) {
  const badgeRef = useRef<HTMLDivElement>(null)

  const handleDownload = useCallback(() => {
    if (!badgeRef.current) return
    const node = badgeRef.current

    toJpeg(node, {
      quality: 0.95,
      backgroundColor: '#0f1837',
      pixelRatio: 2,
    }).then((dataUrl) => {
      const link = document.createElement('a')
      link.download = `evolve-2026-attendee-${attendee.fullName.replace(/\s+/g, '-').toLowerCase()}.jpg`
      link.href = dataUrl
      link.click()
    }).catch((err) => {
      console.error('Download failed:', err)
      toast.error('Failed to download badge')
    })
  }, [attendee.fullName])

  return (
    <div className="space-y-4">
      <div
        ref={badgeRef}
        className="relative w-[400px] h-[560px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f1837] via-[#1a2744] to-[#0d1732] p-0"
      >
        {/* Decorative orbs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--brand-gold)]/8 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[var(--brand-cyan)]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[var(--brand-blue)]/5 blur-3xl" />

        {/* Border accent */}
        <div className="absolute inset-0 rounded-2xl border border-white/10" />

        {/* Top gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--brand-gold)] to-transparent" />

        {/* Header */}
        <div className="relative px-8 pt-8 pb-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Evolve ICT Summit 2026
          </div>
          <div className="flex items-center justify-center gap-2 text-white/60 text-xs">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>11-12 June 2026</span>
            <span className="mx-2">•</span>
            <MapPin className="w-3.5 h-3.5" />
            <span>Harare, Zimbabwe</span>
          </div>
        </div>

        {/* Photo */}
        <div className="relative flex justify-center mt-2">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-[var(--brand-gold)]/30 ring-offset-4 ring-offset-[#0f1837]">
              {attendee.photoUrl ? (
                <img
                  src={attendee.photoUrl}
                  alt={attendee.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-cyan)] flex items-center justify-center text-white text-4xl font-bold">
                  {attendee.fullName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <BadgeCheck className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Attendee Info */}
        <div className="relative px-8 text-center mt-5">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {attendee.fullName}
          </h2>
          {attendee.position && (
            <p className="text-sm text-white/70 mt-1">{attendee.position}</p>
          )}
          {attendee.organization && (
            <div className="flex items-center justify-center gap-2 mt-3">
              <Building2 className="w-4 h-4 text-[var(--brand-gold)]" />
              <span className="text-sm font-medium text-white/80">{attendee.organization}</span>
            </div>
          )}
          {attendee.country && (
            <div className="flex items-center justify-center gap-2 mt-1.5">
              <Globe className="w-3.5 h-3.5 text-[var(--brand-cyan)]" />
              <span className="text-sm text-white/60">{attendee.country}</span>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="relative px-8 mt-6">
          <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 py-3">
            <BadgeCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">Confirmed Attending</span>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
          <div className="flex items-center justify-center gap-3 text-xs text-white/40">
            <Ticket className="w-3.5 h-3.5" />
            <span>evolveictsummit.com</span>
          </div>
        </div>
      </div>

      <Button
        onClick={handleDownload}
        className="w-full rounded-xl bg-[var(--brand-gold)] text-slate-950 hover:bg-[#ffe36b] font-semibold"
      >
        <Download className="w-4 h-4 mr-2" />
        Download as JPG
      </Button>
    </div>
  )
}

export default function AttendeePage() {
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showRsvpForm, setShowRsvpForm] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null)
  const [page, setPage] = useState(1)
  const perPage = 12

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RsvpFormData>({
    resolver: zodResolver(rsvpSchema),
  })

  const fetchAttendees = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/registrations?limit=100&type=attendee')
      if (response.ok) {
        const data = await response.json()
        const docs = data.docs || []
        const mapped = docs
          .filter((reg: any) =>
            ['approved', 'paid'].includes(reg.status)
          )
          .map((reg: any) => ({
            id: reg.id,
            fullName: reg.attendeeDetails?.fullName || reg.email,
            email: reg.email,
            phone: reg.attendeeDetails?.phone || '',
            organization: reg.attendeeDetails?.organization || '',
            position: reg.attendeeDetails?.position || '',
            country: reg.attendeeDetails?.country || '',
            photoUrl: reg.attendeePhoto?.url || '',
          }))
        setAttendees(mapped)
      }
    } catch (error) {
      console.error('Error fetching attendees:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAttendees()
  }, [])

  useEffect(() => {
    setPage(1)
  }, [searchQuery])

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearPhoto = () => {
    setPhotoFile(null)
    setPhotoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const onSubmit = async (data: RsvpFormData) => {
    try {
      setUploading(true)
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'attendee',
          email: data.email,
          status: 'approved',
          amount: 0,
          paymentMethod: 'pending',
          attendeeDetails: {
            fullName: data.fullName,
            phone: data.phone,
            organization: data.organization,
            position: data.position,
            country: data.country,
            ticketType: 'regular',
            dietaryRestrictions: data.dietaryRestrictions || '',
          },
        }),
      })

      if (!response.ok) {
        const err = await response.text()
        throw new Error(err || 'Failed to RSVP')
      }

      const result = await response.json()
      const registrationId = result.doc?.id

      if (photoFile && registrationId) {
        const photoForm = new FormData()
        photoForm.append('file', photoFile)
        photoForm.append('registrationId', registrationId)

        const photoRes = await fetch('/api/attendee-photo', {
          method: 'POST',
          body: photoForm,
        })

        if (!photoRes.ok) {
          console.warn('Photo upload failed, but RSVP was created')
        }
      }

      toast.success('RSVP confirmed! Welcome to Evolve ICT Summit 2026.')
      reset()
      clearPhoto()
      setShowRsvpForm(false)
      fetchAttendees()
    } catch (error) {
      console.error('RSVP error:', error)
      toast.error('Failed to submit RSVP. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const filteredAttendees = attendees.filter((a) => {
    const q = searchQuery.toLowerCase()
    return (
      a.fullName.toLowerCase().includes(q) ||
      a.organization.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q)
    )
  })

  const totalPages = Math.ceil(filteredAttendees.length / perPage)
  const paginatedAttendees = filteredAttendees.slice(
    (page - 1) * perPage,
    page * perPage
  )

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Attendees"
        title="Meet the delegates at"
        accent="Evolve 2026"
        description="Connect with innovators, leaders, and changemakers from across Africa and beyond. RSVP now to secure your spot."
        primaryCta={{ href: '#rsvp-section', label: 'RSVP Now' }}
        secondaryCta={{ href: '/program', label: 'View Program' }}
        image="/bg-1.jpg"
        imageAlt="Event crowd"
        compact
      />

      {/* Attendee Directory */}
      <section className="section-padding px-4 pb-12 sm:px-6 lg:px-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <SectionHeading
              eyebrow="Directory"
              title="Who's coming"
              description="Browse registered attendees. Click a card to view and download their attendance badge."
              align="left"
            />
            <Button
              onClick={() => setShowRsvpForm(!showRsvpForm)}
              className="rounded-full bg-[var(--brand-gold)] text-slate-950 hover:bg-[#ffe36b] shrink-0"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {showRsvpForm ? 'Close RSVP' : 'RSVP to Attend'}
            </Button>
          </div>

          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search attendees by name, organization, or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 rounded-xl border border-slate-200 bg-white"
            />
          </div>

          {/* RSVP Form */}
          {showRsvpForm && (
            <FadeIn>
              <div id="rsvp-section" className="mb-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
                <div className="bg-gradient-to-r from-[#ffcc00] to-amber-500 p-6 md:p-8 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl md:text-3xl font-bold mb-2">RSVP for Evolve 2026</h2>
                      <p className="opacity-90">Confirm your attendance at Africa&apos;s premier ICT summit</p>
                    </div>
                    <Ticket className="h-10 w-10 opacity-80 hidden sm:block" />
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="block text-sm font-medium text-gray-600 mb-2">Full Name *</Label>
                        <Input
                          {...register('fullName')}
                          placeholder="John Doe"
                          className="w-full rounded-xl border border-gray-300"
                        />
                        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
                      </div>
                      <div>
                        <Label className="block text-sm font-medium text-gray-600 mb-2">Email *</Label>
                        <Input
                          {...register('email')}
                          type="email"
                          placeholder="john@example.com"
                          className="w-full rounded-xl border border-gray-300"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                      </div>
                      <div>
                        <Label className="block text-sm font-medium text-gray-600 mb-2">Phone *</Label>
                        <Input
                          {...register('phone')}
                          type="tel"
                          placeholder="+263 XXX XXX XXX"
                          className="w-full rounded-xl border border-gray-300"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <Label className="block text-sm font-medium text-gray-600 mb-2">Organization *</Label>
                        <Input
                          {...register('organization')}
                          placeholder="Company Name"
                          className="w-full rounded-xl border border-gray-300"
                        />
                        {errors.organization && <p className="mt-1 text-sm text-red-600">{errors.organization.message}</p>}
                      </div>
                      <div>
                        <Label className="block text-sm font-medium text-gray-600 mb-2">Position *</Label>
                        <Input
                          {...register('position')}
                          placeholder="Job Title"
                          className="w-full rounded-xl border border-gray-300"
                        />
                        {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>}
                      </div>
                      <div>
                        <Label className="block text-sm font-medium text-gray-600 mb-2">Country *</Label>
                        <Input
                          {...register('country')}
                          placeholder="Zimbabwe"
                          className="w-full rounded-xl border border-gray-300"
                        />
                        {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>}
                      </div>
                    </div>

                    <div>
                      <Label className="block text-sm font-medium text-gray-600 mb-2">Profile Photo (Optional)</Label>
                      <div className="flex items-start gap-4">
                        <div
                          className="flex-shrink-0 w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 cursor-pointer hover:border-[var(--brand-gold)] transition-colors"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {photoPreview ? (
                            <img
                              src={photoPreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center">
                              <ImageIcon className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                              <span className="text-xs text-gray-400">Photo</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoSelect}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="rounded-xl border-gray-300"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Choose Photo
                          </Button>
                          <p className="text-xs text-gray-400 mt-2">
                            JPG, PNG or WEBP. Max 5MB.
                          </p>
                          {photoPreview && (
                            <button
                              type="button"
                              onClick={clearPhoto}
                              className="mt-2 text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                            >
                              <X className="w-3 h-3" />
                              Remove photo
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="block text-sm font-medium text-gray-600 mb-2">
                        Dietary Restrictions (Optional)
                      </Label>
                      <Textarea
                        {...register('dietaryRestrictions')}
                        rows={2}
                        className="w-full rounded-xl border border-gray-300 resize-none"
                        placeholder="Any dietary requirements or allergies..."
                      />
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#ffcc00]" />
                            <span>Free RSVP — no payment required</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-[#ffcc00]" />
                            <span>Your information is secure</span>
                          </div>
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting || uploading}
                          className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white rounded-xl px-8 py-3 hover:shadow-lg hover:shadow-amber-500/25 transition-shadow"
                        >
                          {isSubmitting || uploading ? (
                            'Submitting...'
                          ) : (
                            <>
                              Confirm RSVP
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Attendee Grid */}
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-[1.8rem] bg-white border border-slate-100 p-6 animate-pulse">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200" />
                    <div className="flex-1">
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-slate-100 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-3 bg-slate-100 rounded w-2/3 mb-2" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredAttendees.length === 0 ? (
            <div className="text-center py-16">
              <Users className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                {searchQuery ? 'No attendees match your search' : 'No attendees yet'}
              </h3>
              <p className="text-slate-400 mb-6">
                {searchQuery
                  ? 'Try a different search term'
                  : 'Be the first to RSVP for Evolve ICT Summit 2026'}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => setShowRsvpForm(true)}
                  className="rounded-full bg-[var(--brand-gold)] text-slate-950 hover:bg-[#ffe36b]"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  RSVP Now
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {paginatedAttendees.map((attendee, index) => (
                  <FadeIn key={attendee.id} delay={index * 50}>
                    <button
                      onClick={() => setSelectedAttendee(attendee)}
                      className="w-full text-left event-surface event-card-hover rounded-[1.8rem] p-6 cursor-pointer transition-all hover:ring-2 hover:ring-[var(--brand-gold)]/30"
                    >
                      <div className="flex items-start justify-between mb-4">
                        {attendee.photoUrl ? (
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow">
                            <img
                              src={attendee.photoUrl}
                              alt={attendee.fullName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-cyan)] text-white font-bold text-lg">
                            {attendee.fullName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                          Confirmed
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-950">{attendee.fullName}</h3>
                      <div className="mt-3 space-y-2 text-sm text-slate-500">
                        {attendee.organization && (
                          <div className="flex items-center gap-2">
                            <Building2 className="h-3.5 w-3.5 shrink-0" />
                            <span>{attendee.organization}</span>
                          </div>
                        )}
                        {attendee.position && (
                          <div className="flex items-center gap-2">
                            <Users className="h-3.5 w-3.5 shrink-0" />
                            <span>{attendee.position}</span>
                          </div>
                        )}
                        {attendee.country && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-3.5 w-3.5 shrink-0" />
                            <span>{attendee.country}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  </FadeIn>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="rounded-xl border-slate-300"
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant={p === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPage(p)}
                      className={`rounded-xl min-w-[2.5rem] ${
                        p === page
                          ? 'bg-[var(--brand-gold)] text-slate-950 hover:bg-[#ffe36b]'
                          : 'border-slate-300'
                      }`}
                    >
                      {p}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="rounded-xl border-slate-300"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Attendee Badge Dialog */}
      <Dialog open={!!selectedAttendee} onOpenChange={(open) => !open && setSelectedAttendee(null)}>
        <DialogContent className="max-w-md rounded-2xl border-0 bg-transparent shadow-none p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Attendee Badge</DialogTitle>
          </DialogHeader>
          {selectedAttendee && <AttendeeBadge attendee={selectedAttendee} />}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="section-padding px-4 pb-24 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="container-custom event-panel-dark rounded-[2.2rem] p-8 text-center md:p-12">
            <div className="mx-auto max-w-3xl">
              <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                Not registered yet?
              </div>
              <h2 className="mt-5 text-4xl font-semibold text-white md:text-5xl">
                Don&apos;t miss Africa&apos;s defining tech gathering.
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Join 100+ delegates, 10+ speakers, and industry leaders from across the continent.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => {
                    setShowRsvpForm(true)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  size="lg"
                  className="rounded-full bg-[var(--brand-gold)] px-7 text-slate-950 hover:bg-[#ffe36b]"
                >
                  RSVP Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
