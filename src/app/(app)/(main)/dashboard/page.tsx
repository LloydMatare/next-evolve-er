'use client'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import {
  CheckCircle,
  Clock,
  Download,
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  MapPin,
  Users,
  QrCode,
  Ticket,
  Award,
  Store,
  Badge,
  Shield,
  ArrowRight,
  Sparkles,
  Zap,
  Bell,
  Copy,
  Check,
} from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export default function DashboardPage() {
  const [orderData, setOrderData] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Get order data from sessionStorage
    const data = sessionStorage.getItem('pendingOrder')
    if (data) {
      setOrderData(JSON.parse(data))
    } else {
      // Redirect if no data
      window.location.href = '/'
    }
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Order ID copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ffcc00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const getStatusBadge = () => {
    if (orderData.status === 'approved') {
      return (
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-emerald-500/25"
        >
          <CheckCircle className="w-5 h-5" />
          Approved & Confirmed
        </motion.div>
      )
    }
    return (
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-amber-500/25"
      >
        <Clock className="w-5 h-5" />
        Pending Approval
      </motion.div>
    )
  }

  const getTypeIcon = () => {
    switch (orderData.type) {
      case 'attendee':
        return <User className="w-5 h-5" />
      case 'sponsor':
        return <Award className="w-5 h-5" />
      case 'exhibitor':
        return <Store className="w-5 h-5" />
      default:
        return <Ticket className="w-5 h-5" />
    }
  }

  const downloadQRCode = () => {
    // In production, this would generate and download the actual QR code
    alert('QR Code download functionality will be available after approval')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Animated Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a]">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Badge className="w-4 h-4 text-[#ffcc00]" />
              <span className="text-sm font-medium text-white">My Dashboard</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Welcome back!</h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Track your registration and access event details
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="py-12 px-4">
        <div className="container-custom max-w-7xl mx-auto">
          {/* Status & Order Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {getTypeIcon()}
                  <h2 className="text-2xl font-bold text-gray-900">Registration Dashboard</h2>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-4">
                    <p className="text-sm text-gray-600">Order ID</p>
                    <div className="flex items-center gap-2">
                      <code className="font-mono font-bold text-gray-900 text-lg">
                        {orderData.orderId}
                      </code>
                      <button
                        onClick={() => copyToClipboard(orderData.orderId)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-4">
                    <p className="text-sm text-gray-600">Amount Paid</p>
                    <p className="text-2xl font-bold text-[#ffcc00]">${orderData.amount}</p>
                  </div>
                </div>
              </div>

              <div>{getStatusBadge()}</div>
            </div>

            {orderData.status === 'pending' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200"
              >
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Registration Under Review</h4>
                    <p className="text-amber-900">
                      Your registration is currently being reviewed. You will receive a confirmation
                      email once your payment has been verified and your registration is approved
                      (typically within 24-48 hours).
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Registration Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Personal/Company Information Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {orderData.type === 'attendee' ? 'Personal Information' : 'Company Information'}
                  </h3>
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {orderData.type === 'attendee' ? (
                    <>
                      <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Full Name</p>
                            <p className="font-bold text-gray-900">{orderData.fullName}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Organization</p>
                            <p className="font-bold text-gray-900">{orderData.organization}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                            <User className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Position</p>
                            <p className="font-bold text-gray-900">{orderData.position}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Country</p>
                            <p className="font-bold text-gray-900">{orderData.country}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Company Name</p>
                            <p className="font-bold text-gray-900">{orderData.companyName}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                            <User className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Contact Person</p>
                            <p className="font-bold text-gray-900">{orderData.contactPerson}</p>
                          </div>
                        </div>
                      </div>

                      {orderData.numberOfTeamMembers && (
                        <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border border-gray-200">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                              <Users className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Team Members</p>
                              <p className="font-bold text-gray-900">
                                {orderData.numberOfTeamMembers}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Email & Phone - Common fields */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-xl flex items-center justify-center">
                        <Mail className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-bold text-gray-900">{orderData.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                        <Phone className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-bold text-gray-900">{orderData.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {orderData.teamMembers && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="w-5 h-5 text-[#ffcc00]" />
                      <h4 className="font-bold text-gray-900">Team Member Details</h4>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-200">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap font-medium">
                        {orderData.teamMembers}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Registration Details Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Registration Details</h3>
                  <Zap className="w-6 h-6 text-[#ffcc00]" />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-2xl border border-blue-100">
                    <p className="text-sm text-blue-600 mb-2">Registration Type</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                        {getTypeIcon()}
                      </div>
                      <p className="font-bold text-gray-900 capitalize">{orderData.type}</p>
                    </div>
                  </div>

                  {orderData.type === 'attendee' && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-2xl border border-purple-100">
                      <p className="text-sm text-purple-600 mb-2">Ticket Type</p>
                      <p className="font-bold text-gray-900 capitalize">
                        {orderData.ticketType?.replace(/-/g, ' ')}
                      </p>
                    </div>
                  )}

                  {orderData.type === 'sponsor' && (
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-5 rounded-2xl border border-amber-100">
                      <p className="text-sm text-amber-600 mb-2">Sponsorship Tier</p>
                      <p className="font-bold text-gray-900 capitalize">
                        {orderData.sponsorshipTier}
                      </p>
                    </div>
                  )}

                  {orderData.type === 'exhibitor' && (
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-100">
                      <p className="text-sm text-emerald-600 mb-2">Booth Size</p>
                      <p className="font-bold text-gray-900 capitalize">{orderData.boothSize}</p>
                    </div>
                  )}

                  {orderData.type === 'exhibitor' && orderData.boothNumber && (
                    <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-5 rounded-2xl border border-indigo-100">
                      <p className="text-sm text-indigo-600 mb-2">Booth Number</p>
                      <p className="font-bold text-gray-900">{orderData.boothNumber}</p>
                    </div>
                  )}

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-2xl border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Payment Method</p>
                    <p className="font-bold text-gray-900 capitalize">{orderData.paymentMethod}</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#ffcc00]/10 to-amber-500/10 p-5 rounded-2xl border border-[#ffcc00]/20">
                    <p className="text-sm text-amber-600 mb-2">Total Investment</p>
                    <p className="text-2xl font-bold text-[#ffcc00]">${orderData.amount}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Event Info & QR Code */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-1 space-y-8"
            >
              {/* QR Code Card */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl shadow-2xl p-8 text-white overflow-hidden relative">
                <div className="absolute top-4 right-4">
                  <Sparkles className="w-6 h-6 text-white/50" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Digital Event Pass</h3>
                  <p className="text-blue-100 mb-6">Your gateway to the summit</p>

                  {orderData.status === 'approved' ? (
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20"
                    >
                      <div className="bg-white rounded-xl p-4 mb-4 inline-block">
                        <QrCode className="w-48 h-48 text-gray-900" />
                      </div>
                      <p className="text-sm text-blue-100 mb-6">
                        Scan this QR code at the event entrance
                      </p>
                      <Button
                        onClick={downloadQRCode}
                        className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 rounded-xl shadow-lg"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Digital Pass
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                      <div className="bg-white/20 rounded-xl p-4 mb-4 inline-block">
                        <QrCode className="w-48 h-48 text-white/50" />
                      </div>
                      <p className="text-sm text-blue-100 mb-2">Your QR code will be generated</p>
                      <p className="text-xs text-blue-200">Available after registration approval</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Event Information Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#ffcc00]" />
                  Event Information
                </h3>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-bold text-gray-900">June 11-12, 2026</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Venue</p>
                        <p className="font-bold text-gray-900">
                          Harare International Conference Centre
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Harare, Zimbabwe</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Button
                    className="w-full bg-gradient-to-r from-[#ffcc00] to-amber-500 hover:from-amber-500 hover:to-[#ffcc00] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    asChild
                  >
                    <Link href="/program" className="flex items-center justify-center gap-2">
                      View Full Program
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Need Help Card */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Contact our support team for any questions about your registration
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-900">
                      support@evolveictsummit.com
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-900">+263 242 123 456</span>
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
