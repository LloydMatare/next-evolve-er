//@ts-nocheck
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Search, HelpCircle, Users, Briefcase, Star, Shield, ChevronDown, Mail } from 'lucide-react'

// sample FAQ data grouped by category with icons
const faqCategories = [
  {
    id: 'general',
    title: 'General Questions',
    icon: <HelpCircle className="w-5 h-5" />,
    color: 'from-purple-500 to-fuchsia-500',
    questions: [
      {
        q: 'When will tickets be available for purchase?',
        a: 'Early bird tickets will be available starting March 1, 2026. Sign up for our newsletter to get notified about ticket releases and exclusive discounts.',
      },
      {
        q: 'Is the venue accessible for people with disabilities?',
        a: 'Yes, the Harare International Conference Centre is fully accessible with wheelchair ramps, accessible restrooms, and dedicated seating areas.',
      },
      {
        q: 'Will there be virtual attendance options?',
        a: 'Yes! We offer hybrid attendance options, including virtual passes for those who cannot attend in person.',
      },
      {
        q: 'What is the refund policy?',
        a: "Full refunds are available up to 30 days before the event. After that, tickets can be transferred to another person or credited toward next year's summit.",
      },
    ],
  },
  {
    id: 'exhibitors',
    title: 'Exhibitors',
    icon: <Briefcase className="w-5 h-5" />,
    color: 'from-fuchsia-500 to-purple-500',
    questions: [
      {
        q: 'How do I reserve an exhibition booth?',
        a: 'Exhibitor booths are reserved through our online registration form under the "Exhibitor" tab. Booths are allocated on a first-come, first-served basis.',
      },
      {
        q: 'What is included with an exhibitor booth?',
        a: 'Booth packages include a 3x3m space, one table, two chairs, and access to power and Wi-Fi. Additional amenities can be requested.',
      },
      {
        q: 'Can I customize my booth space?',
        a: 'Yes, exhibitors can customize their booth space with banners and displays. Please inform us of any special requirements in advance.',
      },
    ],
  },
  {
    id: 'partners',
    title: 'Partners',
    icon: <Users className="w-5 h-5" />,
    color: 'from-violet-500 to-purple-500',
    questions: [
      {
        q: 'How can my organization become a partner?',
        a: 'Organizations interested in partnering with the summit should reach out to partnerships@evolveictsummit.com with a brief proposal. Our team will respond within 3 business days.',
      },
      {
        q: 'What benefits do partners receive?',
        a: 'Partners receive brand visibility across all summit materials, complimentary tickets, and access to networking sessions with speakers and sponsors.',
      },
      {
        q: 'Are there different partnership levels?',
        a: 'Yes, we offer strategic, official, and supporting partnership levels with varying benefits and visibility options.',
      },
    ],
  },
  {
    id: 'sponsors',
    title: 'Sponsors',
    icon: <Star className="w-5 h-5" />,
    color: 'from-purple-500 to-violet-500',
    questions: [
      {
        q: 'What sponsorship tiers are available?',
        a: 'We offer platinum, gold, silver, and bronze tiers with varying levels of exposure and benefits. Detailed information can be found on the sponsorship page.',
      },
      {
        q: 'Can I customize a sponsorship package?',
        a: 'Absolutely. We work with sponsors to tailor packages to their needs—just contact our sponsorship team to discuss.',
      },
    ],
  },
]

// Flatten all FAQs for search functionality
const allFaqs = faqCategories.flatMap((category) =>
  category.questions.map((q) => ({ ...q, category: category.title })),
)

function Faq() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

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
      </div>

      <motion.div
        className="relative py-20 px-4 max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-fuchsia-100 px-4 py-2 rounded-full mb-6 border border-purple-200/50 shadow-sm shadow-purple-200/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shield className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Help Center
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-violet-700 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Frequently Asked Questions
          </motion.h1>

          <motion.p
            className="text-xl text-purple-700/70 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Find answers to common questions about the Evolve ICT Summit
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-xl opacity-20 group-hover:opacity-30 blur transition-opacity" />
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-purple-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-purple-900 placeholder-purple-400 shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-purple-400 hover:text-purple-600 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Category Pills */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
          {faqCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg shadow-purple-500/25`
                  : 'bg-white/80 text-purple-700 border-purple-200 hover:border-purple-400 hover:bg-purple-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              <span className="text-sm font-medium">{category.title}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Accordions */}
        <AnimatePresence mode="wait">
          {filteredCategories.length > 0 ? (
            <motion.div
              key="results"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              className="space-y-8"
            >
              {filteredCategories.map((category) => (
                <motion.section
                  key={category.id}
                  variants={itemVariants}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-xl shadow-purple-100/50"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`p-3 bg-gradient-to-r ${category.color} rounded-xl text-white shadow-lg`}
                    >
                      {category.icon}
                    </div>
                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-800 to-fuchsia-800 bg-clip-text text-transparent">
                      {category.title}
                    </h2>
                    <span className="ml-auto bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {category.questions.length}{' '}
                      {category.questions.length === 1 ? 'question' : 'questions'}
                    </span>
                  </div>

                  <Accordion type="single" collapsible className="space-y-3">
                    {category.questions.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <AccordionItem
                          value={`${category.id}-${index}`}
                          className="border border-purple-100 rounded-xl overflow-hidden bg-white/50 hover:bg-white transition-all duration-300"
                        >
                          <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                            <div className="flex items-center gap-3 text-left">
                              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 group-hover:scale-150 transition-transform" />
                              <span className="font-medium text-purple-900 group-hover:text-purple-700 transition-colors">
                                {faq.q}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div className="pl-4 border-l-2 border-purple-200">
                              <p className="text-purple-700 leading-relaxed">{faq.a}</p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>
                </motion.section>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <div className="bg-purple-100/50 rounded-2xl p-8 max-w-md mx-auto">
                <HelpCircle className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-purple-800 mb-2">No results found</h3>
                <p className="text-purple-600">
                  Try searching with different keywords or browse all categories above.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Section */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-2xl p-8 text-white shadow-xl shadow-purple-600/25">
            <h3 className="text-2xl font-semibold mb-3">Still have questions?</h3>
            <p className="text-purple-100 mb-6">
              Can't find the answer you're looking for? Please reach out to our friendly team.
            </p>
            <motion.a
              href="mailto:support@evolveictsummit.com"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
              Contact Support
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Faq
