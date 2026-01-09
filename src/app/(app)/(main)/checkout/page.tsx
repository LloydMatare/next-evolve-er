//@ts-nocheck
'use client'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import {
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle,
  Shield,
  Lock,
  Sparkles,
  Zap,
  ArrowLeft,
  BadgeCheck,
} from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { createPayment, updateRegistrationStatus } from '@/lib/api'
import { motion } from 'framer-motion'

export default function CheckoutPage() {
  const [registrationData, setRegistrationData] = useState<any>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Get registration data from sessionStorage
    const data = sessionStorage.getItem('registrationData')
    if (data) {
      setRegistrationData(JSON.parse(data))
    } else {
      // Redirect back if no data
      window.location.href = '/register'
    }
  }, [])

  const getAmount = () => {
    if (!registrationData) return 0

    switch (registrationData.type) {
      case 'attendee':
        switch (registrationData.ticketType) {
          case 'early-bird-1':
            return 150
          case 'early-bird-2':
            return 175
          case 'regular':
            return 200
          default:
            return 0
        }
      case 'sponsor':
        switch (registrationData.sponsorshipTier) {
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
      case 'exhibitor':
        switch (registrationData.boothSize) {
          case 'small':
            return 2000
          case 'medium':
            return 4000
          case 'large':
            return 7000
          default:
            return 0
        }
      default:
        return 0
    }
  }

  const handlePayment = async () => {
    if (!selectedPaymentMethod || !registrationData?.id) {
      toast.error('Please select a payment method')
      return
    }

    setIsProcessing(true)

    try {
      const amount = getAmount()

      // Create payment record in Payload
      const paymentData = {
        registration: registrationData.id,
        amount: amount,
        currency: 'USD',
        paymentMethod: selectedPaymentMethod,
        status: 'pending',
      }

      const paymentResponse = await createPayment(paymentData)

      // Update registration status and payment method
      await updateRegistrationStatus(registrationData.id, 'pending', selectedPaymentMethod)

      // Store in sessionStorage for dashboard
      const orderData = {
        ...registrationData,
        paymentId: paymentResponse.doc.id,
        transactionId: paymentResponse.doc.transactionId,
        paymentMethod: selectedPaymentMethod,
        amount: amount,
        status: 'pending',
        orderId: registrationData.orderId || 'ORD-' + Date.now(),
        createdAt: new Date().toISOString(),
      }

      sessionStorage.setItem('pendingOrder', JSON.stringify(orderData))
      sessionStorage.removeItem('registrationData')

      toast.success('Payment initiated! Your registration is pending approval.')

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1500)
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('Failed to process payment. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay with Visa, Mastercard, or American Express',
      color: 'from-blue-500 to-purple-600',
      badge: 'Most Popular',
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'EcoCash, OneMoney, or Telecash',
      color: 'from-emerald-500 to-teal-600',
      badge: 'Fast & Secure',
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building2,
      description: 'Direct bank deposit or transfer',
      color: 'from-amber-500 to-orange-600',
      badge: 'Corporate',
    },
  ]

  if (!registrationData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ffcc00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your order...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      {/* Hero Section with Animated Background */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a]">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ffcc00]/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Lock className="w-4 h-4 text-[#ffcc00]" />
              <span className="text-sm font-medium text-white">Secure Checkout</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Complete Payment</h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Almost there! Complete your payment to secure your spot
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container-custom max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary - Left Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 border border-gray-100 sticky top-24">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
                  <BadgeCheck className="w-8 h-8 text-[#ffcc00]" />
                </div>

                <div className="space-y-6">
                  {/* Registration Type Badge */}
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffcc00]/10 to-amber-500/10 px-4 py-2 rounded-full">
                    <span className="text-sm font-semibold text-gray-700 capitalize">
                      {registrationData.type}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {registrationData.type === 'attendee' && (
                      <>
                        <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">Name</p>
                          <p className="font-bold text-gray-900 text-lg">
                            {registrationData.fullName}
                          </p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">Ticket Type</p>
                          <p className="font-bold text-gray-900 capitalize">
                            {registrationData.ticketType?.replace(/-/g, ' ')}
                          </p>
                        </div>
                      </>
                    )}

                    {(registrationData.type === 'sponsor' ||
                      registrationData.type === 'exhibitor') && (
                      <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Company</p>
                        <p className="font-bold text-gray-900 text-lg">
                          {registrationData.companyName}
                        </p>
                      </div>
                    )}

                    {registrationData.type === 'sponsor' && (
                      <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Contact Person</p>
                        <p className="font-bold text-gray-900">{registrationData.contactPerson}</p>
                      </div>
                    )}

                    <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <p className="font-bold text-gray-900">{registrationData.email}</p>
                    </div>

                    {registrationData.type === 'exhibitor' && (
                      <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Booth Size</p>
                        <p className="font-bold text-gray-900 capitalize">
                          {registrationData.boothSize}
                        </p>
                      </div>
                    )}

                    {registrationData.type === 'sponsor' && (
                      <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Sponsorship Tier</p>
                        <p className="font-bold text-gray-900 capitalize">
                          {registrationData.sponsorshipTier}
                        </p>
                      </div>
                    )}

                    {registrationData.orderId && (
                      <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Order ID</p>
                        <p className="font-bold text-gray-900 font-mono">
                          {registrationData.orderId}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Total Amount */}
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-[#ffcc00]/10 to-amber-500/10 rounded-2xl p-6 border border-[#ffcc00]/20"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-lg font-bold text-gray-900">Including all fees</p>
                      </div>
                      <p className="text-4xl font-bold text-[#ffcc00]">${getAmount()}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Security Badge */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-emerald-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">SSL Secured Payment</p>
                      <p className="text-xs text-gray-600">256-bit encryption</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Method Selection - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-8 text-white">
                  <h2 className="text-3xl font-bold mb-2">Select Payment Method</h2>
                  <p className="opacity-90">{`Choose how you'd like to complete your payment`}</p>
                </div>

                <div className="p-8">
                  {/* Payment Methods Grid */}
                  <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon
                        return (
                          <motion.div
                            key={method.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <button
                              onClick={() => setSelectedPaymentMethod(method.id)}
                              className={`relative w-full text-left p-6 rounded-2xl border-2 transition-all ${
                                selectedPaymentMethod === method.id
                                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg shadow-blue-500/20'
                                  : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div
                                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center flex-shrink-0`}
                                >
                                  <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-gray-900">{method.name}</h3>
                                    {selectedPaymentMethod === method.id && (
                                      <CheckCircle className="w-5 h-5 text-blue-500" />
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                                  <span className="inline-block bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                                    {method.badge}
                                  </span>
                                </div>
                              </div>
                            </button>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Payment Instructions */}
                  {selectedPaymentMethod && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 mb-8"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-5 h-5 text-[#ffcc00]" />
                        <h3 className="font-bold text-gray-900 text-lg">Payment Instructions</h3>
                      </div>

                      {selectedPaymentMethod === 'card' && (
                        <div className="space-y-4">
                          <p className="text-gray-700">
                            You will be redirected to our secure payment gateway powered by Stripe.
                          </p>
                          <div className="bg-white rounded-xl p-5 border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded"></div>
                              <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded"></div>
                              <div className="w-10 h-6 bg-gradient-to-r from-blue-800 to-blue-900 rounded"></div>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-600">
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span>Secure SSL encryption</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span>No card details stored</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span>Instant payment confirmation</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {selectedPaymentMethod === 'mobile' && (
                        <div className="space-y-4">
                          <p className="text-gray-700">
                            Payment instructions will be sent to your phone number.
                          </p>
                          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-200">
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div className="bg-white rounded-lg p-3 text-center">
                                <p className="text-xs text-gray-600 mb-1">EcoCash</p>
                                <p className="font-mono text-sm font-bold">+263 77 123 4567</p>
                              </div>
                              <div className="bg-white rounded-lg p-3 text-center">
                                <p className="text-xs text-gray-600 mb-1">OneMoney</p>
                                <p className="font-mono text-sm font-bold">+263 78 123 4567</p>
                              </div>
                              <div className="bg-white rounded-lg p-3 text-center">
                                <p className="text-xs text-gray-600 mb-1">Telecash</p>
                                <p className="font-mono text-sm font-bold">+263 71 123 4567</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">
                              Reference:{' '}
                              <span className="font-bold font-mono bg-white px-3 py-1 rounded-lg">
                                {registrationData.orderId || 'ORDER'}
                              </span>
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedPaymentMethod === 'bank' && (
                        <div className="space-y-4">
                          <p className="text-gray-700">
                            Bank details will be sent to your email for reference.
                          </p>
                          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="bg-white rounded-lg p-4">
                                <p className="text-xs text-gray-600 mb-1">Bank</p>
                                <p className="font-bold">CBZ Bank</p>
                              </div>
                              <div className="bg-white rounded-lg p-4">
                                <p className="text-xs text-gray-600 mb-1">Account Name</p>
                                <p className="font-bold">Evolve ICT Summit</p>
                              </div>
                              <div className="bg-white rounded-lg p-4">
                                <p className="text-xs text-gray-600 mb-1">Account Number</p>
                                <p className="font-mono font-bold">4567890123</p>
                              </div>
                              <div className="bg-white rounded-lg p-4">
                                <p className="text-xs text-gray-600 mb-1">Branch</p>
                                <p className="font-bold">Harare Main</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">
                              Reference:{' '}
                              <span className="font-bold font-mono bg-white px-3 py-1 rounded-lg">
                                {registrationData.orderId || 'ORDER'}
                              </span>
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Important Notice */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200 mb-8"
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Important Notice</h4>
                        <p className="text-sm text-amber-900">
                          Your registration will be pending approval after payment verification. You
                          will receive a confirmation email within 24-48 hours. Please keep your
                          transaction reference for tracking purposes.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Button
                        onClick={handlePayment}
                        disabled={!selectedPaymentMethod || isProcessing}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-bold px-8 py-6 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <div className="flex items-center justify-center gap-3">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing Payment...
                          </div>
                        ) : (
                          <>
                            Pay ${getAmount()}
                            <Lock className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>

                    <Button
                      onClick={() => window.history.back()}
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-4 rounded-xl transition-all"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Registration
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
