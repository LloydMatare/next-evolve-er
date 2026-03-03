//@ts-nocheck
// app/payment/success/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toast } from 'sonner'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('checking')
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    const reference = searchParams.get('reference')
    if (reference) {
      setOrderId(reference.replace('Order-', ''))
      checkPaymentStatus(reference.replace('Order-', ''))
    }
  }, [searchParams])

  const checkPaymentStatus = async (orderId: string) => {
    try {
      const response = await fetch(`/api/payment/status/${orderId}`)
      const data = await response.json()

      if (data.status === 'paid') {
        setStatus('success')
        toast.success('Payment successful! Redirecting to dashboard...')
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 2000)
      } else {
        setStatus('pending')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a] flex items-center justify-center p-4">
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
                Your payment has been confirmed. You'll be redirected to your dashboard.
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
                Your payment is being processed. We'll notify you once confirmed.
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
        </div>
      </motion.div>
    </div>
  )
}
