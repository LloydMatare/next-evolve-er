'use client'

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
import { PRICES } from '@/lib/prices'
import { FadeIn } from '@/components/fade-in'
import { PageHero } from '@/components/page-hero'

export default function CheckoutPage() {
  const [registrationData, setRegistrationData] = useState<any>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const FULL_BOARD_AMOUNT = 12000

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
        return PRICES.ATTENDEE.REGULAR
      case 'sponsor':
        switch (registrationData.sponsorshipTier) {
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
      case 'exhibitor':
        return PRICES.EXHIBITOR.LARGE
      default:
        return 0
    }
  }

  const getPayableAmount = () => {
    if (selectedPaymentMethod === 'full-board') return FULL_BOARD_AMOUNT
    return getAmount()
  }

  const handlePayment = async () => {
    if (!selectedPaymentMethod || !registrationData?.id) {
      toast.error('Please select a payment method')
      return
    }

    setIsProcessing(true)

    try {
      const amount = getPayableAmount()

      if (selectedPaymentMethod === 'paynow') {
        const testModeEmail = 'digitalpayments@compulink.co.zw' // Replace with your Paynow test email

        // Initiate Paynow payment
        const response = await fetch('/api/payments/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            registrationId: registrationData.id,
            amount,
            email: testModeEmail, // Use merchant email for
            orderId: registrationData.orderId,
            type: registrationData.type,
          }),
        })

        const data = await response.json()

        if (data.success) {
          // Create payment record
          const paymentData = {
            registration: registrationData.id,
            order_id: registrationData.orderId, // Added for consistency
            amount: amount,
            currency: 'USD',
            paymentMethod: 'paynow',
            status: 'initiated',
          }

          await createPayment(paymentData)
          await updateRegistrationStatus(registrationData.id, 'pending', 'paynow')

          // Store order data
          const orderData = {
            ...registrationData,
            paymentMethod: 'paynow',
            amount: amount,
            status: 'pending',
            pollUrl: data.pollUrl,
          }

          sessionStorage.setItem('pendingOrder', JSON.stringify(orderData))
          sessionStorage.removeItem('registrationData')

          // Redirect to Paynow
          window.location.href = data.redirectUrl
        } else {
          toast.error(data.error || 'Payment initiation failed')
        }
      } else {
        // Handle other payment methods (card, mobile, bank, full board)
        const paymentData = {
          registration: registrationData.id,
          order_id: registrationData.orderId, // CRITICAL FIX: Add this line!
          amount: amount,
          currency: 'USD',
          paymentMethod: selectedPaymentMethod,
          status: 'pending',
        }

        console.log('Creating payment with data:', paymentData) // Add for debugging

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
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('Failed to process payment. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  // Define payment methods only once
  const paymentMethods = [
    // {
    //   id: 'card',
    //   name: 'Credit/Debit Card',
    //   icon: CreditCard,
    //   description: 'Pay with Visa, Mastercard, or American Express',
    //   color: 'from-blue-500 to-purple-600',
    //   badge: 'Most Popular',
    // },
    // {
    //   id: 'mobile',
    //   name: 'Mobile Money',
    //   icon: Smartphone,
    //   description: 'EcoCash, OneMoney, or Telecash',
    //   color: 'from-emerald-500 to-teal-600',
    //   badge: 'Fast & Secure',
    // },
    // {
    //   id: 'bank',
    //   name: 'Bank Transfer',
    //   icon: Building2,
    //   description: 'Direct bank deposit or transfer',
    //   color: 'from-amber-500 to-orange-600',
    //   badge: 'Corporate',
    // },
    {
      id: 'paynow',
      name: 'Paynow',
      icon: Smartphone,
      description: 'Pay with EcoCash, OneMoney, Telecash, or Visa/Mastercard',
      color: 'from-green-500 to-emerald-600',
      badge: 'Instant Payment',
    },
    ...(registrationData &&
    (registrationData.type === 'sponsor' || registrationData.type === 'exhibitor')
      ? [
          {
            id: 'full-board',
            name: 'Full Board',
            icon: Building2,
            description: 'Pay the full board package for sponsors and exhibitors',
            color: 'from-amber-500 to-orange-600',
            badge: 'Package',
          },
        ]
      : []),
  ]

  if (!registrationData) {
    return (
      <div className="min-h-screen">
        <div className="container-custom px-4 pt-32 sm:px-6 lg:px-8">
          <div className="event-panel-dark mx-auto max-w-xl rounded-[2rem] p-8 text-center text-white">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-[var(--brand-gold)]" />
            <p className="text-sm font-semibold text-white/85">Loading your order…</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Secure Checkout"
        title="Complete your"
        accent="payment"
        description="Choose a payment method and finalize your registration. Your order will move into verification immediately after payment."
        primaryCta={{ href: '/register', label: 'Back to Registration' }}
        secondaryCta={{ href: '/faq', label: 'Help Center' }}
        image="/bg-1.jpg"
        imageAlt="Checkout background"
        compact
      />

      {/* Main Content */}
      <section className="relative -mt-10 px-4 pb-24 sm:px-6 lg:px-8">
        <div className="container-custom max-w-2xl md:max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary - Left Sidebar */}
            <FadeIn className="lg:col-span-1">
              <div className="event-surface sticky top-24 rounded-[2rem] p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
                  <BadgeCheck className="w-8 h-8 text-[var(--brand-gold)]" />
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
                  <div className="rounded-[1.75rem] border border-[rgba(255,204,0,0.22)] bg-[rgba(255,204,0,0.10)] p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-lg font-bold text-gray-900">Including all fees</p>
                      </div>
                      <p className="text-lg md:text-4xl font-bold text-[var(--brand-gold)]">
                        ${getPayableAmount()}
                      </p>
                    </div>
                  </div>
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
            </FadeIn>

            {/* Payment Method Selection - Main Content */}
            <FadeIn className="lg:col-span-2">
              <div className="event-surface overflow-hidden rounded-[2rem] p-0">
                {/* Form Header */}
                <div className="event-panel-dark p-8 text-white">
                  <h2 className="text-3xl font-semibold mb-2">Select payment method</h2>
                  <p className="text-slate-300">{`Choose how you'd like to complete your payment.`}</p>
                </div>

                <div className="p-8">
                  {/* Payment Methods Grid */}
                  <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
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
                                  ? 'border-[rgba(57,214,255,0.55)] bg-[rgba(57,214,255,0.08)] shadow-lg'
                                  : 'border-slate-200/80 hover:border-slate-300 hover:shadow-lg'
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-blue),var(--brand-cyan))] text-white">
                                  <Icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-gray-900">{method.name}</h3>
                                    {selectedPaymentMethod === method.id ? (
                                      <CheckCircle className="w-5 h-5 text-[var(--brand-blue)]" />
                                    ) : null}
                                  </div>
                                  <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                                  <span className="inline-block rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700">
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

                      {selectedPaymentMethod === 'paynow' && (
                        <div className="space-y-4">
                          <p className="text-gray-700">
                            You will be redirected to Paynow's secure payment page to complete your
                            payment using:
                          </p>
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                            <ul className="space-y-3 text-sm text-gray-700">
                              <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>EcoCash (Zimswitch)</span>
                              </li>
                              <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>OneMoney</span>
                              </li>
                              <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Telecash</span>
                              </li>
                              <li className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Visa/Mastercard</span>
                              </li>
                            </ul>
                            <p className="text-sm text-gray-600 mt-4">
                              After payment, you'll be redirected back to our site automatically.
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedPaymentMethod === 'full-board' && (
                        <div className="space-y-4">
                          <p className="text-gray-700">
                            This option applies the full board package for sponsors and exhibitors.
                          </p>
                          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">Full Board Amount</span>
                              <span className="text-2xl font-bold text-gray-900">
                                ${FULL_BOARD_AMOUNT}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-3">
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
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <div className="flex items-center justify-center gap-3">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing Payment...
                          </div>
                        ) : (
                          <>
                            {selectedPaymentMethod === 'paynow'
                              ? 'Pay with Paynow'
                              : `Pay $${getPayableAmount()}`}
                            <Lock className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>

                    <Button
                      onClick={() => window.history.back()}
                      variant="outline"
                      className="w-full rounded-full border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-50"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Registration
                    </Button>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}
