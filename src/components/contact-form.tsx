'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Form data:', data)
    toast.success('Message sent successfully! We will get back to you soon.')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-8 md:px-0">
      <div>
        <Label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
          Full Name *
        </Label>
        <Input
          {...register('name')}
          type="text"
          id="name"
          className="w-full rounded-2xl border-white/12 bg-white/6 text-white placeholder:text-slate-400 focus-visible:ring-[var(--brand-gold)]"
          placeholder="John Doe"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
          Email Address *
        </Label>
        <Input
          {...register('email')}
          type="email"
          id="email"
          className="w-full rounded-2xl border-white/12 bg-white/6 text-white placeholder:text-slate-400 focus-visible:ring-[var(--brand-gold)]"
          placeholder="john@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-200">
          Phone Number *
        </Label>
        <Input
          {...register('phone')}
          type="tel"
          id="phone"
          className="w-full rounded-2xl border-white/12 bg-white/6 text-white placeholder:text-slate-400 focus-visible:ring-[var(--brand-gold)]"
          placeholder="+263 xxx xxx xxx"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div>
        <Label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
          Message *
        </Label>
        <Textarea
          {...register('message')}
          id="message"
          rows={5}
          className="w-full resize-none rounded-2xl border-white/12 bg-white/6 text-white placeholder:text-slate-400 focus-visible:ring-[var(--brand-gold)]"
          placeholder="Tell us about your interest in the summit..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[var(--brand-gold)] py-3 text-sm text-slate-950 hover:bg-[#ffe36b]"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
