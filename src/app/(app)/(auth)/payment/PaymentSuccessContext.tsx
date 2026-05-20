'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowRight, Loader2, AlertCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('checking')
  const [orderId, setOrderId] = useState('')
  const [countdown, setCountdown] = useState(5)
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)
  const confettiRanRef = useRef(false)

  const fireConfetti = useCallback(() => {
    if (confettiRanRef.current) return
    confettiRanRef.current = true

    import('canvas-confetti').then((confetti) => {
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      const shoot = () => {
        confetti.default({
          ...defaults,
          particleCount: 80,
          origin: { x: 0.15, y: 0.6 },
          colors: ['#ffcc00', '#f97316', '#a855f7', '#3b82f6'],
        })
        confetti.default({
          ...defaults,
          particleCount: 80,
          origin: { x: 0.85, y: 0.6 },
          colors: ['#22c55e', '#06b6d4', '#ec4899', '#eab308'],
        })
      }

      shoot()
      setTimeout(shoot, 200)
      setTimeout(shoot, 500)
    })
  }, [])

  useEffect(() => {
    const reference = searchParams.get('reference')
    if (reference) {
      const cleanOrderId = reference.replace('Order-', '').replace('ORD-', '')
      setOrderId(cleanOrderId)
      checkPaymentStatus(cleanOrderId)
    } else {
      const paynowRef = searchParams.get('paynowReference') || searchParams.get('ref') || searchParams.get('orderId')
      if (paynowRef) {
        const cleanRef = paynowRef.replace('Order-', '').replace('ORD-', '')
        setOrderId(cleanRef)
        checkPaymentStatus(cleanRef)
      } else {
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

  useEffect(() => {
    if (status === 'success') {
      fireConfetti()
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            window.location.href = `/dashboard/${orderId}`
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [status, orderId, fireConfetti])

  const checkPaymentStatus = async (orderId: string) => {
    try {
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
        if (typeof window !== 'undefined') {
          localStorage.removeItem('lastOrderId')
        }
      } else {
        setStatus('pending')
      }
    } catch (error) {
      console.log('Error : ', error)
      setStatus('error')
    }
  }

  return (
    <>
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-50"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-lg"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />

          <div className="relative p-8 sm:p-10 text-center">
            <AnimatePresence mode="wait">
              {status === 'checking' && (
                <motion.div
                  key="checking"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-emerald-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                      Processing Payment
                    </h1>
                    <p className="text-white/60 text-sm sm:text-base">
                      Please wait while we confirm your payment...
                    </p>
                  </div>
                  <div className="flex justify-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-emerald-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6"
                >
                  <div className="relative mx-auto w-28 h-28">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-500"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                      className="absolute inset-2 rounded-full bg-[#0a051f] flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
                      >
                        <CheckCircle className="w-14 h-14 text-emerald-400" />
                      </motion.div>
                    </motion.div>
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border border-emerald-400/30"
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: i * 0.12,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                  </div>

                  <div className="space-y-2">
                    <motion.h1
                      className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-400 bg-clip-text text-transparent"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Payment Successful!
                    </motion.h1>
                    <motion.p
                      className="text-white/60"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      Your payment has been confirmed. You're all set!
                    </motion.p>
                  </div>

                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Clock className="w-4 h-4" />
                    Redirecting to dashboard in {countdown}s
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Button
                      onClick={() => (window.location.href = `/dashboard/${orderId}`)}
                      className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25"
                    >
                      View Dashboard
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {status === 'pending' && (
                <motion.div
                  key="pending"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="relative mx-auto w-24 h-24">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="absolute inset-2 rounded-full bg-[#0a051f] flex items-center justify-center">
                      <Clock className="w-12 h-12 text-amber-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                      Payment Pending
                    </h1>
                    <p className="text-white/60 text-sm sm:text-base">
                      Your payment is being processed. We'll notify you once it's confirmed.
                    </p>
                  </div>

                  <Button
                    onClick={() => (window.location.href = `/dashboard/${orderId}`)}
                    className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400 via-red-500 to-rose-500" />
                    <div className="absolute inset-2 rounded-full bg-[#0a051f] flex items-center justify-center">
                      <AlertCircle className="w-12 h-12 text-red-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                      Payment Error
                    </h1>
                    <p className="text-white/60 text-sm sm:text-base">
                      No payment reference found or an error occurred. Please try again.
                    </p>
                  </div>

                  <Button
                    onClick={() => (window.location.href = '/register')}
                    className="w-full h-12 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-400 hover:to-rose-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-red-500/25"
                  >
                    Back to Registration
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative px-8 sm:px-10 pb-8 sm:pb-10">
            {status === 'success' && orderId && (
              <motion.div
                className="p-3 rounded-xl bg-white/5 border border-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-white/40 text-xs mb-1">Order Reference</p>
                <p className="text-white/80 text-sm font-mono truncate">
                  {orderId}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}
