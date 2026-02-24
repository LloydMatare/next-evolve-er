//@ts-nocheck
'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Download,
  BookOpen,
  Calendar,
  Users,
  Sparkles,
  FileText,
  Star,
  Award,
  Zap,
} from 'lucide-react'

// note: the public folder should contain a brochure.pdf file
// you can replace the link or file name as needed

function Brochure() {
  const features = [
    {
      icon: <Calendar className="w-5 h-5" />,
      text: 'Full event schedule & timeline',
      color: 'from-purple-400 to-fuchsia-400',
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: 'Speaker lineup & bios',
      color: 'from-violet-400 to-purple-400',
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: 'Sponsorship opportunities',
      color: 'from-fuchsia-400 to-pink-400',
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      text: 'Session details & workshops',
      color: 'from-purple-400 to-violet-400',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
      {/* Decorative purple background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/40 to-fuchsia-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-violet-200/40 to-purple-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-fuchsia-100/30 to-purple-100/30 rounded-full blur-3xl" />

        {/* Purple floating orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-fuchsia-300/20 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <motion.div
        className="relative py-20 px-4 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-fuchsia-100 px-4 py-2 rounded-full mb-6 border border-purple-200/50 shadow-sm shadow-purple-200/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Star className="w-4 h-4 text-purple-600 fill-purple-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Event Guide 2024
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-violet-700 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Event Brochure
          </motion.h1>

          <motion.p
            className="text-xl text-purple-700/70 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Discover everything you need to know about the summit in one comprehensive guide
          </motion.p>
        </motion.div>

        {/* Features Grid with Purple Theme */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100/80 shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 hover:border-purple-200 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-gradient-to-br ${feature.color} rounded-lg text-white`}>
                  {feature.icon}
                </div>
                <span className="text-sm font-medium text-purple-900">{feature.text}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA Card */}
        <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl border border-purple-100 p-8 md:p-10 relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Purple decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-fuchsia-50 to-violet-50 opacity-50" />
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-purple-300/30 to-fuchsia-300/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-gradient-to-br from-violet-300/30 to-purple-300/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

            {/* Purple pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, purple 1px, transparent 0)`,
                  backgroundSize: '40px 40px',
                }}
              />
            </div>

            <div className="relative">
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-800 to-fuchsia-800 bg-clip-text text-transparent mb-3">
                  Ready to explore the summit?
                </h2>
                <p className="text-purple-600/70">
                  Get instant access to our comprehensive 20-page guide featuring:
                </p>
              </motion.div>

              {/* Feature list with purple accents */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  'Complete speaker profiles',
                  'Venue information & maps',
                  'Networking opportunities',
                  'Registration details',
                  'Accommodation options',
                  'Local attractions guide',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-2 text-sm text-purple-700 bg-purple-50/50 p-2 rounded-lg"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500" />
                    {item}
                  </motion.div>
                ))}
              </motion.div>

              {/* Download Button with Purple Gradient */}
              <motion.div
                className="flex flex-col items-center gap-4"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-purple-600 via-fuchsia-600 to-violet-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/40 transition-all duration-300 overflow-hidden group"
                  asChild
                >
                  <Link href="/brochure.pdf" target="_blank" rel="noopener noreferrer">
                    <span className="relative z-10 flex items-center">
                      Download Brochure
                      <Download className="w-5 h-5 ml-2 group-hover:translate-y-0.5 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-700 to-fuchsia-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </Link>
                </Button>

                <motion.div
                  className="flex items-center gap-3 bg-gradient-to-r from-purple-100 to-fuchsia-100 px-6 py-3 rounded-full border border-purple-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-purple-600 fill-purple-600" />
                    <span className="text-sm font-medium text-purple-700">PDF</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-purple-300" />
                  <span className="text-sm text-purple-600">2.5 MB</span>
                  <span className="w-1 h-1 rounded-full bg-purple-300" />
                  <span className="text-sm text-purple-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    Opens in new tab
                  </span>
                </motion.div>

                <p className="text-xs text-purple-400 mt-2">
                  <code className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    /public/brochure.pdf
                  </code>{' '}
                  — update with your file
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Trust indicators with Purple Theme */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-8 mt-16"
        >
          {[
            { icon: <Award className="w-4 h-4" />, text: 'Updated weekly' },
            { icon: <Star className="w-4 h-4" />, text: '100+ downloads' },
            { icon: <FileText className="w-4 h-4" />, text: 'PDF format' },
          ].map((item, index) => (
            <motion.span
              key={index}
              className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 px-4 py-2 rounded-full border border-purple-100"
              whileHover={{ y: -2 }}
            >
              {item.icon}
              {item.text}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Brochure
