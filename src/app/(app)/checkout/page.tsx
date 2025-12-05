//@ts-nocheck
'use client'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { CreditCard, Smartphone, Building2, CheckCircle } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { createPayment, updateRegistrationStatus } from '@/lib/api'

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
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#170d43] via-[#161e2e] to-[#0f1419]">
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
                <h2 className="text-2xl font-bold text-[#170d43] mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Registration Type</p>
                    <p className="text-lg font-bold text-[#170d43] capitalize">
                      {registrationData.type}
                    </p>
                  </div>

                  {registrationData.type === 'attendee' && (
                    <>
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-semibold text-gray-900">{registrationData.fullName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Ticket Type</p>
                        <p className="font-semibold text-gray-900 capitalize">
                          {registrationData.ticketType?.replace('-', ' ')}
                        </p>
                      </div>
                    </>
                  )}

                  {(registrationData.type === 'sponsor' ||
                    registrationData.type === 'exhibitor') && (
                    <div>
                      <p className="text-sm text-gray-600">Company</p>
                      <p className="font-semibold text-gray-900">{registrationData.companyName}</p>
                    </div>
                  )}

                  {registrationData.type === 'sponsor' && (
                    <div>
                      <p className="text-sm text-gray-600">Contact Person</p>
                      <p className="font-semibold text-gray-900">
                        {registrationData.contactPerson}
                      </p>
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

                  {registrationData.orderId && (
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-semibold text-gray-900">{registrationData.orderId}</p>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-gray-900">Total Amount</p>
                      <p className="text-3xl font-bold text-[#ffcc00]">${getAmount()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-sm border-2 border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-[#170d43] mb-6">Select Payment Method</h2>

                <div className="space-y-4 mb-8">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                        className={`relative border-2 rounded-sm p-6 cursor-pointer transition-all ${
                          selectedPaymentMethod === method.id
                            ? 'border-[#ffcc00] bg-[#ffcc00]/5'
                            : 'border-gray-200 hover:border-[#ffcc00]/50'
                        }`}
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-12 h-12 rounded-sm flex items-center justify-center mr-4 ${
                              selectedPaymentMethod === method.id ? 'bg-[#ffcc00]' : 'bg-gray-200'
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
                            <CheckCircle className="w-6 h-6 text-[#ffcc00]" />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {selectedPaymentMethod && (
                  <div className="bg-[#f3f3f3] border border-gray-200 rounded-sm p-6 mb-6">
                    <h3 className="font-bold text-[#170d43] mb-3">Payment Instructions</h3>
                    {selectedPaymentMethod === 'card' && (
                      <div className="text-sm text-gray-600 space-y-2">
                        <p>
                          You will be redirected to our secure payment gateway to complete your card
                          payment.
                        </p>
                        <div className="bg-white p-4 rounded border border-gray-300 mt-2">
                          <p className="font-semibold mb-1">Card Payment Details:</p>
                          <p>• Visa, Mastercard, and American Express accepted</p>
                          <p>• Secure SSL encryption</p>
                          <p>• No card details stored on our servers</p>
                        </div>
                      </div>
                    )}
                    {selectedPaymentMethod === 'mobile' && (
                      <div className="text-sm text-gray-600 space-y-2">
                        <p>
                          Payment instructions will be sent to your phone. Please complete the
                          transaction within 24 hours.
                        </p>
                        <div className="bg-white p-4 rounded border border-gray-300 mt-2">
                          <p className="font-semibold mb-1">Mobile Money Details:</p>
                          <p>• EcoCash: Send to +263 77 123 4567</p>
                          <p>• OneMoney: Send to +263 78 123 4567</p>
                          <p>• Telecash: Send to +263 71 123 4567</p>
                          <p className="mt-2">
                            Reference:{' '}
                            <span className="font-semibold">
                              {registrationData.orderId || 'ORDER'}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedPaymentMethod === 'bank' && (
                      <div className="text-sm text-gray-600 space-y-2">
                        <p>
                          Bank details will be sent to your email. Please include your order ID as
                          reference.
                        </p>
                        <div className="bg-white p-4 rounded border border-gray-300 mt-2">
                          <p className="font-semibold mb-1">Bank Transfer Details:</p>
                          <p>• Bank: CBZ Bank</p>
                          <p>• Account Name: Evolve ICT Summit</p>
                          <p>• Account Number: 4567890123</p>
                          <p>• Branch: Harare Main</p>
                          <p className="mt-2">
                            Reference:{' '}
                            <span className="font-semibold">
                              {registrationData.orderId || 'ORDER'}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-sm p-4 mb-6">
                  <p className="text-sm text-yellow-900">
                    <strong>Note:</strong> Your registration will be pending approval after payment
                    verification. You will receive a confirmation email within 24-48 hours. Please
                    keep your transaction reference for tracking purposes.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handlePayment}
                    disabled={!selectedPaymentMethod || isProcessing}
                    className="w-full bg-[#ffcc00] hover:bg-[#ec7211] text-white text-sm py-6 font-semibold rounded-sm"
                  >
                    {isProcessing ? 'Processing Payment...' : `Pay $${getAmount()}`}
                  </Button>

                  <Button
                    onClick={() => window.history.back()}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 py-4 text-sm"
                  >
                    Back to Registration
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
