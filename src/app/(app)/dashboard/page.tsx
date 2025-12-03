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
} from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [orderData, setOrderData] = useState<any>(null)

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

  if (!orderData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const getStatusBadge = () => {
    if (orderData.status === 'approved') {
      return (
        <span className="inline-flex items-center px-4 py-2 rounded-sm bg-green-50 border border-green-200 text-green-700 font-semibold">
          <CheckCircle className="w-4 h-4 mr-2" />
          Approved
        </span>
      )
    }
    return (
      <span className="inline-flex items-center px-4 py-2 rounded-sm bg-yellow-50 border border-yellow-200 text-yellow-700 font-semibold">
        <Clock className="w-4 h-4 mr-2" />
        Pending Approval
      </span>
    )
  }

  const downloadQRCode = () => {
    // In production, this would generate and download the actual QR code
    alert('QR Code download functionality will be available after approval')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-br from-[#232f3e] via-[#161e2e] to-[#0f1419]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">My Dashboard</h1>
          <p className="text-xl text-blue-100">
            View your registration details and event information
          </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Status Banner */}
          <div className="bg-white rounded-sm shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Status</h2>
                <p className="text-gray-600 mb-4 md:mb-0">Order ID: {orderData.orderId}</p>
              </div>
              {getStatusBadge()}
            </div>

            {orderData.status === 'pending' && (
              <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-sm">
                <p className="text-sm text-yellow-900">
                  <strong>Note:</strong> Your registration is currently under review. You will
                  receive a confirmation email once your payment has been verified and your
                  registration is approved (typically within 24-48 hours).
                </p>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Registration Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal/Company Information */}
              <div className="bg-white rounded-sm shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#232f3e] mb-6">
                  {orderData.type === 'attendee' ? 'Personal Information' : 'Company Information'}
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {orderData.type === 'attendee' ? (
                    <>
                      <div className="flex items-start space-x-3">
                        <User className="w-5 h-5 text-[#ff9900] mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Full Name</p>
                          <p className="font-semibold text-gray-900">{orderData.fullName}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Building2 className="w-5 h-5 text-[#ff9900] mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Organization</p>
                          <p className="font-semibold text-gray-900">{orderData.organization}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <User className="w-5 h-5 text-[#ff9900] mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Position</p>
                          <p className="font-semibold text-gray-900">{orderData.position}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-[#ff9900] mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Country</p>
                          <p className="font-semibold text-gray-900">{orderData.country}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start space-x-3">
                        <Building2 className="w-5 h-5 text-[#ff9900] mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Company Name</p>
                          <p className="font-semibold text-gray-900">{orderData.companyName}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <User className="w-5 h-5 text-[#ff9900] mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Contact Person</p>
                          <p className="font-semibold text-gray-900">{orderData.contactPerson}</p>
                        </div>
                      </div>
                      {orderData.numberOfTeamMembers && (
                        <div className="flex items-start space-x-3">
                          <Users className="w-5 h-5 text-[#ff9900] mt-1" />
                          <div>
                            <p className="text-sm text-gray-600">Team Members</p>
                            <p className="font-semibold text-gray-900">
                              {orderData.numberOfTeamMembers}
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-[#ff9900] mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{orderData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-[#ff9900] mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">{orderData.phone}</p>
                    </div>
                  </div>
                </div>

                {orderData.teamMembers && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Team Member Details</p>
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">
                      {orderData.teamMembers}
                    </p>
                  </div>
                )}
              </div>

              {/* Registration Details */}
              <div className="bg-white rounded-sm shadow-lg p-8">
                <h3 className="text-2xl font-bold text-[#232f3e] mb-6">Registration Details</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Registration Type</p>
                    <p className="font-semibold text-gray-900 capitalize">{orderData.type}</p>
                  </div>

                  {orderData.type === 'attendee' && (
                    <div>
                      <p className="text-sm text-gray-600">Ticket Type</p>
                      <p className="font-semibold text-gray-900 capitalize">
                        {orderData.ticketType?.replace('-', ' ')}
                      </p>
                    </div>
                  )}

                  {orderData.type === 'sponsor' && (
                    <div>
                      <p className="text-sm text-gray-600">Sponsorship Tier</p>
                      <p className="font-semibold text-gray-900 capitalize">
                        {orderData.sponsorshipTier}
                      </p>
                    </div>
                  )}

                  {orderData.type === 'exhibitor' && (
                    <>
                      <div>
                        <p className="text-sm text-gray-600">Booth Size</p>
                        <p className="font-semibold text-gray-900 capitalize">
                          {orderData.boothSize}
                        </p>
                      </div>
                      {orderData.boothNumber && (
                        <div>
                          <p className="text-sm text-gray-600">Booth Number</p>
                          <p className="font-semibold text-gray-900">{orderData.boothNumber}</p>
                        </div>
                      )}
                    </>
                  )}

                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-semibold text-gray-900 capitalize">
                      {orderData.paymentMethod}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Amount Paid</p>
                    <p className="font-semibold text-[#ff9900] text-xl">${orderData.amount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Info & QR Code */}
            <div className="lg:col-span-1 space-y-8">
              {/* QR Code */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-sm shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Event Pass</h3>

                {orderData.status === 'approved' ? (
                  <div className="bg-white rounded-2xl p-6 text-center">
                    <QrCode className="w-full h-48 text-gray-900 mb-4" />
                    <p className="text-sm text-gray-600 mb-4">
                      Scan this QR code at the event entrance
                    </p>
                    <Button
                      onClick={downloadQRCode}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download QR Code
                    </Button>
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
                    <QrCode className="w-32 h-32 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">
                      Your QR code will be generated after registration approval
                    </p>
                  </div>
                )}
              </div>

              {/* Event Information */}
              <div className="bg-white rounded-sm shadow-lg p-8">
                <h3 className="text-xl font-bold text-[#232f3e] mb-6">Event Information</h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-[#ff9900] mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold text-gray-900">June 11-12, 2026</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-[#ff9900] mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Venue</p>
                      <p className="font-semibold text-gray-900">
                        Harare International Conference Centre (HICC)
                        <br />
                        <span className="text-sm text-gray-600">Harare, Zimbabwe</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white" asChild>
                    <Link href="/program">View Full Program</Link>
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
