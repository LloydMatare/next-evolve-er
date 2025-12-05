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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </Label>
        <Input
          {...register('name')}
          type="text"
          id="name"
          className="w-full  rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition"
          placeholder="John Doe"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </Label>
        <Input
          {...register('email')}
          type="email"
          id="email"
          className="w-full  rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition"
          placeholder="john@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </Label>
        <Input
          {...register('phone')}
          type="tel"
          id="phone"
          className="w-full  rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition"
          placeholder="+263 xxx xxx xxx"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div>
        <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </Label>
        <Textarea
          {...register('message')}
          id="message"
          rows={5}
          className="w-full  rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition resize-none"
          placeholder="Tell us about your interest in the summit..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#ffcc00] hover:bg-amber-600 cursor-pointer text-white py-3 text-sm"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
