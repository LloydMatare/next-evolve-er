'use client'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { CreditCard, Smartphone, Building2, CheckCircle } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'

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
    if (!selectedPaymentMethod) {
      toast.error('Please select a payment method')
      return
    }

    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store payment info and set pending status
    const orderData = {
      ...registrationData,
      paymentMethod: selectedPaymentMethod,
      amount: getAmount(),
      status: 'pending',
      orderId: 'ORD-' + Date.now(),
      createdAt: new Date().toISOString(),
    }

    sessionStorage.setItem('pendingOrder', JSON.stringify(orderData))
    sessionStorage.removeItem('registrationData')

    toast.success('Payment initiated! Your registration is pending approval.')
    setIsProcessing(false)

    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 1500)
  }

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay with Visa, Mastercard, or American Express',
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'EcoCash, OneMoney, or Telecash',
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building2,
      description: 'Direct bank deposit or transfer',
    },
  ]

  if (!registrationData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#232f3e] via-[#161e2e] to-[#0f1419]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Checkout</h1>
          <p className="text-lg md:text-xl text-gray-300">Complete your registration payment</p>
        </div>
      </section>

      {/* Checkout Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-8 sticky top-24">
                <h2 className="text-2xl font-bold text-[#232f3e] mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Registration Type</p>
                    <p className="text-lg font-bold text-[#232f3e] capitalize">
                      {registrationData.type}
                    </p>
                  </div>

                  {registrationData.type === 'attendee' && (
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-semibold text-gray-900">{registrationData.fullName}</p>
                    </div>
                  )}

                  {(registrationData.type === 'sponsor' ||
                    registrationData.type === 'exhibitor') && (
                    <div>
                      <p className="text-sm text-gray-600">Company</p>
                      <p className="font-semibold text-gray-900">{registrationData.companyName}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{registrationData.email}</p>
                  </div>

                  {registrationData.type === 'exhibitor' && (
                    <div>
                      <p className="text-sm text-gray-600">Booth Size</p>
                      <p className="font-semibold text-gray-900 capitalize">
                        {registrationData.boothSize}
                      </p>
                    </div>
                  )}

                  {registrationData.type === 'sponsor' && (
                    <div>
                      <p className="text-sm text-gray-600">Sponsorship Tier</p>
                      <p className="font-semibold text-gray-900 capitalize">
                        {registrationData.sponsorshipTier}
                      </p>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-gray-900">Total Amount</p>
                      <p className="text-3xl font-bold text-[#ff9900]">${getAmount()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-sm border-2 border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-[#232f3e] mb-6">Select Payment Method</h2>

                <div className="space-y-4 mb-8">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                        className={`relative border-2 rounded-sm p-6 cursor-pointer transition-all ${
                          selectedPaymentMethod === method.id
                            ? 'border-[#ff9900] bg-[#ff9900]/5'
                            : 'border-gray-200 hover:border-[#ff9900]/50'
                        }`}
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-12 h-12 rounded-sm flex items-center justify-center mr-4 ${
                              selectedPaymentMethod === method.id ? 'bg-[#ff9900]' : 'bg-gray-200'
                            }`}
                          >
                            <Icon
                              className={`w-6 h-6 ${
                                selectedPaymentMethod === method.id ? 'text-white' : 'text-gray-600'
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                          {selectedPaymentMethod === method.id && (
                            <CheckCircle className="w-6 h-6 text-[#ff9900]" />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {selectedPaymentMethod && (
                  <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-6 mb-6">
                    <h3 className="font-bold text-[#232f3e] mb-3">Payment Instructions</h3>
                    {selectedPaymentMethod === 'card' && (
                      <p className="text-sm text-gray-600">
                        You will be redirected to our secure payment gateway to complete your card
                        payment.
                      </p>
                    )}
                    {selectedPaymentMethod === 'mobile' && (
                      <p className="text-sm text-gray-600">
                        Payment instructions will be sent to your phone. Please complete the
                        transaction within 24 hours.
                      </p>
                    )}
                    {selectedPaymentMethod === 'bank' && (
                      <p className="text-sm text-gray-600">
                        Bank details will be sent to your email. Please include your order ID as
                        reference.
                      </p>
                    )}
                  </div>
                )}

                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-sm p-4 mb-6">
                  <p className="text-sm text-yellow-900">
                    <strong>Note:</strong> Your registration will be pending approval after payment
                    verification. You will receive a confirmation email within 24-48 hours.
                  </p>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={!selectedPaymentMethod || isProcessing}
                  className="w-full bg-[#ff9900] hover:bg-[#ec7211] text-white py-6 text-lg font-semibold rounded-sm"
                >
                  {isProcessing ? 'Processing...' : `Pay $${getAmount()}`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
