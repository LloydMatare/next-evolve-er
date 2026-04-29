//@ts-nocheck
// app/payment/success/PaymentSuccessContent.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('checking')
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    const reference = searchParams.get('reference')
    if (reference) {
      const cleanOrderId = reference.replace('Order-', '').replace('ORD-', '')
      setOrderId(cleanOrderId)
      checkPaymentStatus(cleanOrderId)
    } else {
      // Try other common parameter names Paynow might use
      const paynowRef = searchParams.get('paynowReference') || searchParams.get('ref') || searchParams.get('orderId')
      if (paynowRef) {
        const cleanRef = paynowRef.replace('Order-', '').replace('ORD-', '')
        setOrderId(cleanRef)
        checkPaymentStatus(cleanRef)
      } else {
        // Try to get order ID from localStorage (set before redirect)
        const savedOrderId = typeof window !== 'undefined' ? localStorage.getItem('lastOrderId') : null
        if (savedOrderId) {
          setOrderId(savedOrderId)
          checkPaymentStatus(savedOrderId)
        } else {
          setStatus('error')
        }
      }
    }
  }, [searchParams])

  const checkPaymentStatus = async (orderId: string) => {
    try {
      // Add 10-second timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      )
      const response = await Promise.race([
        fetch(`/api/payment/status/${orderId}`),
        timeoutPromise,
      ]) as Response

      const data = await response.json()

      if (response.ok && (data.status === 'paid' || data.paymentStatus === 'paid')) {
        setStatus('success')
        toast.success('Payment successful! Redirecting to dashboard...')
        // Clear saved order ID
        if (typeof window !== 'undefined') {
          localStorage.removeItem('lastOrderId')
        }
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 2000)
      } else {
        setStatus('pending')
      }
    } catch (error) {
      console.log('Error : ', error)
      setStatus('error')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
        {status === 'checking' && (
          <>
            <div className="w-20 h-20 border-4 border-[#ffcc00] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-white mb-2">Processing Payment</h1>
            <p className="text-gray-300">Please wait while we confirm your payment...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-gray-300 mb-6">
              Your payment has been confirmed. You will be redirected to your dashboard.
            </p>
          </>
        )}

        {status === 'pending' && (
          <>
            <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Payment Pending</h1>
            <p className="text-gray-300 mb-6">
              Your payment is being processed. We will notify you once confirmed.
            </p>
            <Button
              onClick={() => (window.location.href = '/dashboard')}
              className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Payment Error</h1>
            <p className="text-gray-300 mb-6">
              No payment reference found or an error occurred. Please try again.
            </p>
            <Button
              onClick={() => (window.location.href = '/register')}
              className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white"
            >
              Back to Registration
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </>
        )}
      </div>
    </motion.div>
  )
}
