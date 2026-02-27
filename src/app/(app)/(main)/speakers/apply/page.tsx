//@ts-nocheck
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { createSpeakerApplication } from '@/lib/api'
import {
  User,
  Mail,
  Building2,
  Briefcase,
  FileText,
  Mic2,
  Hash,
  Linkedin,
  Twitter,
  Globe,
  Calendar,
  Sparkles,
  ChevronRight,
  Award,
  CheckCircle2,
  X,
  Users,
} from 'lucide-react'

const speakerSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  organization: z.string().min(2, 'Organization is required'),
  designation: z.string().min(2, 'Designation is required'),
  bio: z.string().min(20, 'Biography must be at least 20 characters'),
  category: z.enum(['keynote', 'panelist', 'workshop', 'moderator']),
  topics: z.string().optional(),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
  twitter: z.string().optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  sessionTitle: z.string().optional(),
  sessionDescription: z.string().optional(),
})

type SpeakerFormData = z.infer<typeof speakerSchema>

const formSections = [
  {
    id: 'personal',
    title: 'Personal Information',
    icon: <User className="w-5 h-5" />,
    color: 'from-purple-500 to-fuchsia-500',
    fields: ['name', 'email', 'organization', 'designation'],
  },
  {
    id: 'professional',
    title: 'Professional Details',
    icon: <Briefcase className="w-5 h-5" />,
    color: 'from-fuchsia-500 to-purple-500',
    fields: ['bio', 'category', 'topics'],
  },
  {
    id: 'social',
    title: 'Social & Online',
    icon: <Globe className="w-5 h-5" />,
    color: 'from-violet-500 to-purple-500',
    fields: ['linkedin', 'twitter', 'website'],
  },
  {
    id: 'session',
    title: 'Session Proposal',
    icon: <Mic2 className="w-5 h-5" />,
    color: 'from-purple-500 to-violet-500',
    fields: ['sessionTitle', 'sessionDescription'],
  },
]

const categoryOptions = [
  {
    value: 'keynote',
    label: 'Keynote Speaker',
    icon: <Award className="w-4 h-4" />,
    color: 'purple',
  },
  { value: 'panelist', label: 'Panelist', icon: <Users className="w-4 h-4" />, color: 'fuchsia' },
  {
    value: 'workshop',
    label: 'Workshop Leader',
    icon: <Sparkles className="w-4 h-4" />,
    color: 'violet',
  },
  { value: 'moderator', label: 'Moderator', icon: <Mic2 className="w-4 h-4" />, color: 'purple' },
]

export default function SpeakersApply() {
  const [currentSection, setCurrentSection] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SpeakerFormData>({
    resolver: zodResolver(speakerSchema),
    mode: 'onChange',
  })

  const formValues = watch()

  const onSubmit = async (data: SpeakerFormData) => {
    try {
      const payloadData = {
        name: data.name,
        email: data.email,
        organization: data.organization,
        designation: data.designation,
        bio: data.bio,
        category: data.category,
        expertise: data.topics ? data.topics.split(',').map((t) => ({ topic: t.trim() })) : [],
        linkedin: data.linkedin || '',
        twitter: data.twitter || '',
        website: data.website || '',
        session: {
          title: data.sessionTitle || '',
          description: data.sessionDescription || '',
        },
      }

      await createSpeakerApplication(payloadData)
      toast.success('Your application has been submitted. We will review it shortly!')
      setShowSuccess(true)
      reset()
      setTimeout(() => setShowSuccess(false), 5000)
    } catch (err) {
      console.error('Failed to submit speaker application', err)
      toast.error('Failed to submit application. Please try again.')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const nextSection = () => {
    if (currentSection < formSections.length - 1) {
      setCurrentSection(currentSection + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-12 px-4">
      {/* Decorative purple background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/40 to-fuchsia-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-violet-200/40 to-purple-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-fuchsia-100/30 to-purple-100/30 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative max-w-3xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-fuchsia-100 px-4 py-2 rounded-full mb-6 border border-purple-200/50 shadow-sm shadow-purple-200/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic2 className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Speaker Applications
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-violet-700 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Apply to Speak
          </motion.h1>

          <motion.p
            className="text-xl text-purple-700/70 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Share your expertise at the Evolve ICT Summit 2026
          </motion.p>
        </motion.div>

        {/* Success Banner */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6" />
                <span>Application submitted successfully! We'll review it shortly.</span>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className="hover:bg-white/20 rounded-lg p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-purple-600">
              Section {currentSection + 1} of {formSections.length}
            </span>
            <span className="text-sm text-purple-500">
              {Math.round(((currentSection + 1) / formSections.length) * 100)}% Complete.
            </span>
          </div>
          <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSection + 1) / formSections.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Section Navigation */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-8">
          {formSections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => setCurrentSection(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                currentSection === index
                  ? `bg-gradient-to-r ${section.color} text-white border-transparent shadow-lg shadow-purple-500/25`
                  : 'bg-white/80 text-purple-700 border-purple-200 hover:border-purple-400 hover:bg-purple-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section.icon}
              <span className="text-sm font-medium hidden sm:inline">{section.title}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          variants={itemVariants}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-purple-100 shadow-xl shadow-purple-100/50"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Personal Information Section */}
                {currentSection === 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl text-white shadow-lg">
                        <User className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-800 to-fuchsia-800 bg-clip-text text-transparent">
                        Personal Information
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="name"
                          className="block text-sm font-medium text-purple-700 mb-2"
                        >
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Full Name *
                          </div>
                        </Label>
                        <Input
                          {...register('name')}
                          id="name"
                          className="w-full rounded-xl border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white/80"
                          placeholder="Jane Doe"
                        />
                        {errors.name && (
                          <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor="email"
                          className="block text-sm font-medium text-purple-700 mb-2"
                        >
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address *
                          </div>
                        </Label>
                        <Input
                          {...register('email')}
                          type="email"
                          id="email"
                          className="w-full rounded-xl border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white/80"
                          placeholder="jane@example.com"
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor="organization"
                          className="block text-sm font-medium text-purple-700 mb-2"
                        >
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Organization *
                          </div>
                        </Label>
                        <Input
                          {...register('organization')}
                          id="organization"
                          className="w-full rounded-xl border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white/80"
                          placeholder="Compulink"
                        />
                        {errors.organization && (
                          <p className="mt-2 text-sm text-red-500">{errors.organization.message}</p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor="designation"
                          className="block text-sm font-medium text-purple-700 mb-2"
                        >
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            Designation / Title *
                          </div>
                        </Label>
                        <Input
                          {...register('designation')}
                          id="designation"
                          className="w-full rounded-xl border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white/80"
                          placeholder="Senior Developer"
                        />
                        {errors.designation && (
                          <p className="mt-2 text-sm text-red-500">{errors.designation.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Professional Details Section */}
                {currentSection === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-xl text-white shadow-lg">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-800 to-fuchsia-800 bg-clip-text text-transparent">
                        Professional Details
                      </h2>
                    </div>

                    <div>
                      <Label
                        htmlFor="bio"
                        className="block text-sm font-medium text-purple-700 mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Short Biography *
                        </div>
                      </Label>
                      <Textarea
                        {...register('bio')}
                        id="bio"
                        rows={5}
                        className="w-full rounded-xl border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none bg-white/80"
                        placeholder="A brief description about yourself..."
                      />
                      {errors.bio && (
                        <p className="mt-2 text-sm text-red-500">{errors.bio.message}</p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="category"
                        className="block text-sm font-medium text-purple-700 mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <Mic2 className="w-4 h-4" />
                          Speaker Category *
                        </div>
                      </Label>
                      <select
                        {...register('category')}
                        id="category"
                        className="w-full rounded-xl border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition p-3 bg-white/80 text-purple-900"
                      >
                        {categoryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="mt-2 text-sm text-red-500">{errors.category.message}</p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="topics"
                        className="block text-sm font-medium text-purple-700 mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4" />
                          Areas of Expertise (comma separated)
                        </div>
                      </Label>
                      <Input
                        {...register('topics')}
                        id="topics"
                        className="w-full rounded-xl border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white/80"
                        placeholder="AI, Web Development, Cybersecurity"
                      />
                    </div>
                  </div>
                )}

                {/* Social & Online Section */}
                {currentSection === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl text-white shadow-lg">
                        <Globe className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-800 to-fuchsia-800 bg-clip-text text-transparent">
                        Social & Online
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="linkedin"
                          className="block text-sm font-medium text-purple-700 mb-2"
                        >
                          <div className="flex items-center gap-2">
                            <Linkedin className="w-4 h-4" />
                            LinkedIn Profile
                          </div>
                        </Label>
                        <Input
                          {...register('linkedin')}
                          id="linkedin"
                          className="w-full rounded-xl border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white/80"
                          placeholder="https://linkedin.com/in/username"
                        />
                        {errors.linkedin && (
                          <p className="mt-2 text-sm text-red-500">{errors.linkedin.message}</p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor="twitter"
                          className="block text-sm font-medium text-purple-700 mb-2"
                        >
                          <div className="flex items-center gap-2">
                            <Twitter className="w-4 h-4" />
                            Twitter Handle
                          </div>
                        </Label>
                        <Input
                          {...register('twitter')}
                          id="twitter"
                          className="w-full rounded-xl border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white/80"
                          placeholder="@username"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="website"
                          className="block text-sm font-medium text-purple-700 mb-2"
                        >
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Personal Website
                          </div>
                        </Label>
                        <Input
                          {...register('website')}
                          id="website"
                          className="w-full rounded-xl border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white/80"
                          placeholder="https://example.com"
                        />
                        {errors.website && (
                          <p className="mt-2 text-sm text-red-500">{errors.website.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Session Proposal Section */}
                {currentSection === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl text-white shadow-lg">
                        <Mic2 className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-800 to-fuchsia-800 bg-clip-text text-transparent">
                        Session Proposal
                      </h2>
                    </div>

                    <div>
                      <Label
                        htmlFor="sessionTitle"
                        className="block text-sm font-medium text-purple-700 mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Proposed Session Title
                        </div>
                      </Label>
                      <Input
                        {...register('sessionTitle')}
                        id="sessionTitle"
                        className="w-full rounded-xl border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white/80"
                        placeholder="Building scalable APIs with Node.js"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="sessionDescription"
                        className="block text-sm font-medium text-purple-700 mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Session Description
                        </div>
                      </Label>
                      <Textarea
                        {...register('sessionDescription')}
                        id="sessionDescription"
                        rows={4}
                        className="w-full rounded-xl border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none bg-white/80"
                        placeholder="A few lines describing your talk or workshop."
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Form Navigation Buttons */}
            <div className="flex justify-between gap-4 pt-6 border-t border-purple-100">
              {currentSection > 0 && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    onClick={prevSection}
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-xl"
                  >
                    Previous Section
                  </Button>
                </motion.div>
              )}

              <div className="flex-1" />

              {currentSection < formSections.length - 1 ? (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    onClick={nextSection}
                    className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30"
                  >
                    Next Section
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-600/30 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                </motion.div>
              )}
            </div>
          </form>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-8 mt-12"
        >
          {[
            {
              icon: <CheckCircle2 className="w-4 h-4" />,
              text: 'Applications reviewed within 5 days',
            },
            { icon: <Sparkles className="w-4 h-4" />, text: 'Selected speakers get free pass' },
            { icon: <Award className="w-4 h-4" />, text: 'Featured on summit website' },
          ].map((item, index) => (
            <motion.span
              key={index}
              className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 px-4 py-2 rounded-full border border-purple-100"
              whileHover={{ y: -2 }}
            >
              {item.icon}
              {item.text}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
