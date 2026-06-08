'use client'

import {
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  Target,
  Coffee,
  Wifi,
  Camera,
  Mic,
  Video,
  Sparkles,
  Filter,
  Download,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
  Play,
  MessageSquare,
  Award,
  Trophy,
  Briefcase,
  Globe,
  Zap,
} from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Session = {
  id: string
  time: string
  title: string
  speaker: string
  role: string
  company: string
  description: string
  category: 'keynote' | 'panel' | 'workshop' | 'networking' | 'exhibition' | 'break' | 'talk' | 'opening' | 'closing' | 'registration' | 'lunch'
  location: string
  capacity: number
  duration: number
  tags: string[]
  featured: boolean
  registered: boolean
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(1)
  const [expandedSessions, setExpandedSessions] = useState<string[]>([])
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const days = [
    { day: 1, date: 'June 11, 2026', label: 'Day 1 — Securing Africa\'s Digital Future' },
    { day: 2, date: 'June 12, 2026', label: 'Day 2 — Driving Africa\'s Digital Economy' },
  ]

  const categories = [
    {
      id: 'all',
      label: 'All Sessions',
      icon: Calendar,
      color: 'bg-gradient-to-r from-gray-600 to-gray-700',
    },
    {
      id: 'keynote',
      label: 'Keynotes',
      icon: Mic,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    },
    {
      id: 'panel',
      label: 'Panels',
      icon: Users,
      color: 'bg-gradient-to-r from-purple-500 to-pink-400',
    },
    {
      id: 'talk',
      label: 'Presentations',
      icon: Video,
      color: 'bg-gradient-to-r from-indigo-500 to-violet-400',
    },
    {
      id: 'opening',
      label: 'Opening',
      icon: Sparkles,
      color: 'bg-gradient-to-r from-amber-500 to-yellow-400',
    },
    {
      id: 'closing',
      label: 'Closing',
      icon: Award,
      color: 'bg-gradient-to-r from-rose-500 to-red-400',
    },
    {
      id: 'registration',
      label: 'Registration',
      icon: Users,
      color: 'bg-gradient-to-r from-gray-500 to-slate-400',
    },
    {
      id: 'networking',
      label: 'Networking',
      icon: Globe,
      color: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    },
    {
      id: 'exhibition',
      label: 'Exhibition',
      icon: Briefcase,
      color: 'bg-gradient-to-r from-red-500 to-rose-400',
    },
    {
      id: 'break',
      label: 'Break',
      icon: Coffee,
      color: 'bg-gradient-to-r from-gray-500 to-slate-400',
    },
    {
      id: 'lunch',
      label: 'Lunch',
      icon: Coffee,
      color: 'bg-gradient-to-r from-orange-500 to-amber-400',
    },
  ]

  const day1Sessions: Session[] = [
    {
      id: '1',
      time: '08:00 – 08:55',
      title: 'Arrivals, Registration & Exhibition Viewing',
      speaker: '',
      role: '',
      company: '',
      description:
        'Morning arrival and registration. Collect your badge, event materials, and explore the exhibition hall before the formal programme begins.',
      category: 'registration',
      location: 'Main Lobby / Exhibition Hall',
      capacity: 2000,
      duration: 55,
      tags: ['Registration', 'Exhibition', 'Networking'],
      featured: false,
      registered: true,
    },
    {
      id: '2',
      time: '08:55 – 09:00',
      title: 'Opening Prayer',
      speaker: 'Pastor Eunice Nyamuda',
      role: '',
      company: '',
      description: 'Opening prayer to commence the Evolve ICT Summit 2026.',
      category: 'opening',
      location: 'Main Hall',
      capacity: 1500,
      duration: 5,
      tags: ['Prayer', 'Opening'],
      featured: false,
      registered: true,
    },
    {
      id: '3',
      time: '09:00 – 09:10',
      title: 'Opening Remarks & Welcome Address',
      speaker: 'Mr Edward Nyamuda',
      role: 'Summit Organiser',
      company: 'Evolve ICT Summit',
      description:
        'Welcome address and opening remarks setting the vision for the summit and Africa\'s digital future.',
      category: 'opening',
      location: 'Main Hall',
      capacity: 1500,
      duration: 10,
      tags: ['Opening', 'Welcome', 'Vision'],
      featured: true,
      registered: true,
    },
    {
      id: '4',
      time: '09:10 – 09:40',
      title: 'Keynote: Building a Resilient Digital Zimbabwe — Infrastructure, Connectivity & the Road to Digital Sovereignty',
      speaker: 'Mr Simon Nyamuda',
      role: 'Managing Director',
      company: 'Compulink',
      description:
        'A keynote exploring how Zimbabwe can build resilient digital infrastructure, expand connectivity, and chart a path toward digital sovereignty in an increasingly interconnected world.',
      category: 'keynote',
      location: 'Main Hall',
      capacity: 1500,
      duration: 30,
      tags: ['Digital Infrastructure', 'Connectivity', 'Digital Sovereignty'],
      featured: true,
      registered: true,
    },
    {
      id: '5',
      time: '09:40 – 09:55',
      title: 'Women in Cybersecurity',
      speaker: 'Cordelia Allway',
      role: 'Security Engineer',
      company: 'Check Point',
      description:
        'A spotlight session on the role and impact of women in the cybersecurity field, sharing insights from industry practice.',
      category: 'talk',
      location: 'Main Hall',
      capacity: 1500,
      duration: 15,
      tags: ['Women in Tech', 'Cybersecurity', 'Diversity'],
      featured: false,
      registered: true,
    },
    {
      id: '6',
      time: '09:55 – 10:00',
      title: 'National Anthem',
      speaker: '',
      role: '',
      company: '',
      description: 'The National Anthem of Zimbabwe.',
      category: 'opening',
      location: 'Main Hall',
      capacity: 1500,
      duration: 5,
      tags: ['National Anthem', 'Opening'],
      featured: false,
      registered: true,
    },
    {
      id: '7',
      time: '10:00 – 10:05',
      title: 'Introduction of the Guest of Honour',
      speaker: 'Ministry of ICT Representative',
      role: '',
      company: 'Ministry of ICT, Postal & Courier Services',
      description: 'Formal introduction of the Guest of Honour.',
      category: 'opening',
      location: 'Main Hall',
      capacity: 1500,
      duration: 5,
      tags: ['Guest of Honour', 'Opening'],
      featured: false,
      registered: true,
    },
    {
      id: '8',
      time: '10:05 – 10:35',
      title: 'Guest of Honour Address',
      speaker: 'Hon. Minister Tatenda Mavetera',
      role: 'Minister of ICT, Postal & Courier Services',
      company: 'Government of Zimbabwe',
      description:
        'Official address from the Minister of ICT, setting governmental vision and policy direction for Zimbabwe\'s digital transformation journey.',
      category: 'keynote',
      location: 'Main Hall',
      capacity: 1500,
      duration: 30,
      tags: ['Government', 'Policy', 'Digital Transformation'],
      featured: true,
      registered: true,
    },
    {
      id: '9',
      time: '10:35 – 11:30',
      title: 'Tea Break, Exhibits & Networking',
      speaker: '',
      role: '',
      company: '',
      description: 'Refreshments and networking with speakers, exhibitors, and fellow attendees.',
      category: 'break',
      location: 'Exhibition Hall / Networking Lounge',
      capacity: 2000,
      duration: 55,
      tags: ['Coffee', 'Exhibition', 'Networking'],
      featured: false,
      registered: true,
    },
    {
      id: '10',
      time: '11:30 – 12:00',
      title: 'Fintech, Financial Inclusion & the Digital Wallet Revolution in Africa',
      speaker: 'Mr Bongani Zamchiya',
      role: 'Board Chairperson',
      company: 'Mukuru Zimbabwe',
      description:
        'An exploration of how fintech and digital wallets are driving financial inclusion across Africa, with insights from one of the continent\'s leading fintech entrepreneurs.',
      category: 'talk',
      location: 'Main Hall',
      capacity: 1500,
      duration: 30,
      tags: ['Fintech', 'Financial Inclusion', 'Digital Wallets'],
      featured: false,
      registered: true,
    },
    {
      id: '11',
      time: '12:00 – 12:30',
      title: 'Artificial Intelligence in Telecommunications — How NetOne is Powering the Next Generation of Connectivity',
      speaker: 'Eng. Raphael Mushanawani',
      role: 'Group CEO',
      company: 'NetOne Cellular',
      description:
        'A presentation on how NetOne is leveraging artificial intelligence to transform telecommunications and deliver next-generation connectivity in Zimbabwe.',
      category: 'talk',
      location: 'Main Hall',
      capacity: 1500,
      duration: 30,
      tags: ['AI', 'Telecommunications', 'Connectivity'],
      featured: false,
      registered: true,
    },
    {
      id: '12',
      time: '12:30 – 13:00',
      title: 'Panel 1: "Securing Africa\'s Digital Future: Trust, Tools & Transformation"',
      speaker: 'Moderated by Dr. Whisper Rukanda',
      role: 'Moderator',
      company: '',
      description:
        'A high-level panel discussion on securing Africa\'s digital landscape. Panelists: Simon Nyamuda (Compulink), Eng. Raphael Mushanawani (NetOne), Bongai Zamchiya, Cordelia Allway (Check Point).',
      category: 'panel',
      location: 'Main Hall',
      capacity: 1500,
      duration: 30,
      tags: ['Cybersecurity', 'Digital Trust', 'Transformation'],
      featured: true,
      registered: true,
    },
    {
      id: '13',
      time: '13:00 – 14:00',
      title: 'Lunch Break',
      speaker: '',
      role: '',
      company: '',
      description: 'Lunch break with opportunities for networking and exhibition viewing.',
      category: 'lunch',
      location: 'Dining Hall',
      capacity: 2000,
      duration: 60,
      tags: ['Lunch', 'Networking'],
      featured: false,
      registered: true,
    },
    {
      id: '14',
      time: '14:00 – 14:30',
      title: 'AI-Powered Cybersecurity — Leveraging Artificial Intelligence to Detect, Respond & Recover',
      speaker: 'Riaz Hamiid Alqadri',
      role: 'Cybersecurity, Technology & Business Leader',
      company: '',
      description:
        'How artificial intelligence is transforming cybersecurity — enabling faster threat detection, automated response, and robust recovery strategies.',
      category: 'talk',
      location: 'Main Hall',
      capacity: 1500,
      duration: 30,
      tags: ['AI', 'Cybersecurity', 'Threat Detection'],
      featured: false,
      registered: true,
    },
    {
      id: '15',
      time: '14:30 – 15:00',
      title: 'CIRT in Action — Zimbabwe\'s National Cyber Incident Response Framework',
      speaker: 'Zivo Keith Chamba',
      role: 'CIRT & Enforcement Manager',
      company: 'POTRAZ',
      description:
        'An inside look at Zimbabwe\'s national Computer Incident Response Team (CIRT) framework and how the country is building cyber resilience at a national level.',
      category: 'talk',
      location: 'Main Hall',
      capacity: 1500,
      duration: 30,
      tags: ['CIRT', 'Cyber Resilience', 'Incident Response'],
      featured: false,
      registered: true,
    },
    {
      id: '16',
      time: '15:00 – 15:30',
      title: 'Cybersecurity in the Age of AI — Protecting Enterprises and Critical Infrastructure',
      speaker: 'Mutsa Mabhande',
      role: 'Chief Information Security Officer (CISO) & Business Resilience Specialist',
      company: '',
      description:
        'Strategies for protecting enterprises and critical national infrastructure against evolving cyber threats in an AI-driven threat landscape.',
      category: 'talk',
      location: 'Main Hall',
      capacity: 1500,
      duration: 30,
      tags: ['CISO', 'Critical Infrastructure', 'Enterprise Security'],
      featured: false,
      registered: true,
    },
    {
      id: '17',
      time: '15:30 – 16:00',
      title: 'Panel 2: "The Human Firewall — Cybersecurity Culture, Awareness & the Fight Against Social Engineering in African Organisations"',
      speaker: 'Moderated by Nunudzai Mvera',
      role: 'Moderator',
      company: '',
      description:
        'A panel exploring the human element in cybersecurity — building a security culture, raising awareness, and combating social engineering. Panelists: Riaz Hamiid Alqadri, Zivo Keith Chamba (POTRAZ), Mutsa Mabhande, Tawanda Tongogara.',
      category: 'panel',
      location: 'Main Hall',
      capacity: 1500,
      duration: 30,
      tags: ['Human Firewall', 'Security Culture', 'Social Engineering'],
      featured: true,
      registered: true,
    },
    {
      id: '18',
      time: '16:00 – 16:05',
      title: 'Day 1 Closing Announcements',
      speaker: '',
      role: '',
      company: '',
      description: 'Closing announcements and information for Day 2 of the summit.',
      category: 'closing',
      location: 'Main Hall',
      capacity: 1500,
      duration: 5,
      tags: ['Closing', 'Announcements'],
      featured: false,
      registered: true,
    },
    {
      id: '19',
      time: '16:05 – 17:30',
      title: 'Exhibition & Business Matching',
      speaker: '',
      role: '',
      company: '',
      description:
        'Extended exhibition time with structured business matching opportunities for delegates, exhibitors, and partners.',
      category: 'exhibition',
      location: 'Exhibition Hall',
      capacity: 2000,
      duration: 85,
      tags: ['Exhibition', 'Business Matching', 'Networking'],
      featured: false,
      registered: true,
    },
  ]

  const day2Sessions: Session[] = [
    {
      id: '20',
      time: '08:00 – 08:55',
      title: 'Arrivals, Registration & Exhibition Viewing',
      speaker: '',
      role: '',
      company: '',
      description:
        'Morning arrival and registration for Day 2. Collect your materials and explore the exhibition hall.',
      category: 'registration',
      location: 'Main Lobby / Exhibition Hall',
      capacity: 2000,
      duration: 55,
      tags: ['Registration', 'Exhibition', 'Networking'],
      featured: false,
      registered: true,
    },
    {
      id: '21',
      time: '08:55 – 09:00',
      title: 'Opening Prayer',
      speaker: '',
      role: '',
      company: '',
      description: 'Opening prayer to commence Day 2 of the Evolve ICT Summit 2026.',
      category: 'opening',
      location: 'Main Hall',
      capacity: 1500,
      duration: 5,
      tags: ['Prayer', 'Opening'],
      featured: false,
      registered: true,
    },
    {
      id: '22',
      time: '09:00 – 09:10',
      title: 'Welcome & Day 2 Remarks',
      speaker: '',
      role: '',
      company: '',
      description: 'Welcome address and overview of the Day 2 programme.',
      category: 'opening',
      location: 'Main Hall',
      capacity: 1500,
      duration: 10,
      tags: ['Welcome', 'Day 2'],
      featured: false,
      registered: true,
    },
    {
      id: '23',
      time: '09:10 – 09:40',
      title: 'Keynote: Digital Transformation at Scale — How AI and Data are Redefining Telecoms & Business in Africa',
      speaker: 'Maria Chinomwe',
      role: 'AI Technology Services Executive',
      company: 'Econet Wireless Zimbabwe',
      description:
        'A keynote on how artificial intelligence and data analytics are transforming telecommunications and business operations across Africa, drawing from Econet\'s实践经验.',
      category: 'keynote',
      location: 'Main Hall',
      capacity: 1500,
      duration: 30,
      tags: ['Digital Transformation', 'AI', 'Data', 'Telecoms'],
      featured: true,
      registered: true,
    },
    {
      id: '24',
      time: '09:40 – 10:10',
      title: 'Designing Zimbabwe\'s Digital Future — A Blueprint for National Digital Transformation',
      speaker: 'Dr Panashe Chiurunge',
      role: 'Chief AI Strategist',
      company: '',
      description:
        'A strategic presentation outlining a comprehensive blueprint for Zimbabwe\'s national digital transformation, covering policy, infrastructure, and innovation.',
      category: 'talk',
      location: 'Main Hall',
      capacity: 1500,
      duration: 30,
      tags: ['Digital Strategy', 'National Transformation', 'AI'],
      featured: false,
      registered: true,
    },
    {
      id: '25',
      time: '10:10 – 10:40',
      title: 'Panel 3: "Africa\'s Digital Economy — Fintech, AI & the Entrepreneurship Frontier"',
      speaker: 'Moderated by Kevin Ngalonde',
      role: 'Moderator',
      company: '',
      description:
        'A dynamic panel discussion on Africa\'s digital economy. Panelists: Maria Chinomwe (Econet Wireless), Dr Panashe Chiurunge, Dr Munyaradzi Gwatidzo (Astro Technology Group), Neil Padmore (Frampol).',
      category: 'panel',
      location: 'Main Hall',
      capacity: 1500,
      duration: 30,
      tags: ['Digital Economy', 'Fintech', 'AI', 'Entrepreneurship'],
      featured: true,
      registered: true,
    },
    {
      id: '26',
      time: '10:40 – 11:40',
      title: 'Tea Break, Exhibits & Networking',
      speaker: '',
      role: '',
      company: '',
      description: 'Morning refreshments, exhibition viewing, and networking.',
      category: 'break',
      location: 'Exhibition Hall / Networking Lounge',
      capacity: 2000,
      duration: 60,
      tags: ['Coffee', 'Exhibition', 'Networking'],
      featured: false,
      registered: true,
    },
    {
      id: '27',
      time: '11:40 – 12:10',
      title: 'Smart Devices & Digital Transformation in Africa',
      speaker: 'Duncan Asia',
      role: 'Samsung Senior Facilitator',
      company: 'Samsung Electronics',
      description:
        'A presentation on how smart devices are driving digital transformation across Africa, featuring insights from Samsung\'s technology ecosystem.',
      category: 'talk',
      location: 'Main Hall',
      capacity: 1500,
      duration: 30,
      tags: ['Smart Devices', 'Digital Transformation', 'Samsung'],
      featured: false,
      registered: true,
    },
    {
      id: '28',
      time: '12:10 – 12:40',
      title: 'Panel 4: "From Local to Global — Scaling African Innovation & Building Digital Enterprises"',
      speaker: 'Moderated by Rufaro Siwela',
      role: 'Moderator',
      company: '',
      description:
        'Exploring how African innovators can scale their solutions globally. Panelists: Duncan Asia (Samsung), Daisy Mapingire – Matyatya (First Mutual Holdings), Mellany Msengezi.',
      category: 'panel',
      location: 'Main Hall',
      capacity: 1500,
      duration: 30,
      tags: ['Scaling', 'Innovation', 'Digital Enterprises', 'Global'],
      featured: true,
      registered: true,
    },
    {
      id: '29',
      time: '13:00 – 14:00',
      title: 'Lunch Break',
      speaker: '',
      role: '',
      company: '',
      description: 'Lunch break with final exhibition viewing and networking.',
      category: 'lunch',
      location: 'Dining Hall',
      capacity: 2000,
      duration: 60,
      tags: ['Lunch', 'Networking'],
      featured: false,
      registered: true,
    },
    {
      id: '30',
      time: '14:00 – 15:00',
      title: 'Panel 5: "From Summit to Action — Building Africa\'s Regulatory Blueprint for a Thriving Digital Economy"',
      speaker: 'Moderated by Allen Saruchera',
      role: 'Moderator',
      company: '',
      description:
        'A high-level policy panel on building a regulatory framework for Africa\'s digital economy. Panelists: Dr Whisper Rukanda (MorniPac Consultants), Mr Freddy Ndhlovu (Computer Society of Zimbabwe President), Taurai Thagalani (ICT Supplier Association of Zimbabwe), Garai Wekwete (Samsung), Zivo Keith Chamba (POTRAZ).',
      category: 'panel',
      location: 'Main Hall',
      capacity: 1500,
      duration: 60,
      tags: ['Regulatory', 'Policy', 'Digital Economy', 'Action'],
      featured: true,
      registered: true,
    },
    {
      id: '31',
      time: '15:00 – 15:30',
      title: 'Summit Scribe Report — Key Insights, Resolutions & Actions Arising',
      speaker: 'Summit Scribe',
      role: '',
      company: '',
      description:
        'A comprehensive summary of all sessions, key themes, decisions, and recommended actions arising from the Evolve ICT Summit 2026.',
      category: 'talk',
      location: 'Main Hall',
      capacity: 1500,
      duration: 30,
      tags: ['Report', 'Resolutions', 'Key Insights', 'Action'],
      featured: false,
      registered: true,
    },
    {
      id: '32',
      time: '15:30 – 15:45',
      title: 'Closing Remarks & Vote of Thanks',
      speaker: '',
      role: '',
      company: '',
      description:
        'Closing remarks, vote of thanks, and final reflections on the Evolve ICT Summit 2026.',
      category: 'closing',
      location: 'Main Hall',
      capacity: 1500,
      duration: 15,
      tags: ['Closing', 'Vote of Thanks'],
      featured: true,
      registered: true,
    },
    {
      id: '33',
      time: '15:45 – 17:30',
      title: 'Exhibition & Closing Networking',
      speaker: '',
      role: '',
      company: '',
      description: 'Final exhibition viewing and closing networking reception.',
      category: 'exhibition',
      location: 'Exhibition Hall',
      capacity: 2000,
      duration: 105,
      tags: ['Exhibition', 'Networking', 'Closing'],
      featured: false,
      registered: true,
    },
  ]

  const activeSessions = activeDay === 1 ? day1Sessions : day2Sessions
  const filteredSessions =
    filterCategory === 'all'
      ? activeSessions
      : activeSessions.filter((session) => session.category === filterCategory)

  const toggleSession = (id: string) => {
    setExpandedSessions((prev) =>
      prev.includes(id) ? prev.filter((sessionId) => sessionId !== id) : [...prev, id],
    )
  }

  const getCategoryIcon = (category: Session['category']) => {
    switch (category) {
      case 'keynote':
        return <Mic className="w-4 h-4" />
      case 'panel':
        return <Users className="w-4 h-4" />
      case 'workshop':
        return <BookOpen className="w-4 h-4" />
      case 'talk':
        return <Video className="w-4 h-4" />
      case 'opening':
        return <Sparkles className="w-4 h-4" />
      case 'closing':
        return <Award className="w-4 h-4" />
      case 'registration':
        return <Users className="w-4 h-4" />
      case 'networking':
        return <Globe className="w-4 h-4" />
      case 'exhibition':
        return <Briefcase className="w-4 h-4" />
      case 'break':
        return <Coffee className="w-4 h-4" />
      case 'lunch':
        return <Coffee className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: Session['category']) => {
    switch (category) {
      case 'keynote':
        return 'bg-gradient-to-r from-blue-500 to-cyan-400'
      case 'panel':
        return 'bg-gradient-to-r from-purple-500 to-pink-400'
      case 'workshop':
        return 'bg-gradient-to-r from-amber-500 to-orange-400'
      case 'talk':
        return 'bg-gradient-to-r from-indigo-500 to-violet-400'
      case 'opening':
        return 'bg-gradient-to-r from-amber-500 to-yellow-400'
      case 'closing':
        return 'bg-gradient-to-r from-rose-500 to-red-400'
      case 'registration':
        return 'bg-gradient-to-r from-gray-500 to-slate-400'
      case 'networking':
        return 'bg-gradient-to-r from-emerald-500 to-teal-400'
      case 'exhibition':
        return 'bg-gradient-to-r from-red-500 to-rose-400'
      case 'break':
        return 'bg-gradient-to-r from-gray-500 to-slate-400'
      case 'lunch':
        return 'bg-gradient-to-r from-orange-500 to-amber-400'
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a]">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm font-medium text-white">Event Schedule</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Summit Schedule</h1>

          <div className="flex justify-center">
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Your guide to{' '}
              <span className="text-[#ffcc00] font-semibold">
                two days of innovation, learning, and networking
              </span>{' '}
              {`at Africa's premier ICT event`}
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Navigation */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Day Selection */}
            <div className="flex flex-col sm:flex-row gap-4">
              {days.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(day.day)}
                  className={`px-6 py-4 rounded-xl text-lg font-bold transition-all ${
                    activeDay === day.day
                      ? 'bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span>{day.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Filter Categories */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filter by:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setFilterCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        filterCategory === category.id
                          ? `${category.color} text-white`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Day Header */}
      <section className="py-8 px-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {days.find((d) => d.day === activeDay)?.label}
              </h2>
              <p className="text-gray-600 mt-2">{days.find((d) => d.day === activeDay)?.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:border-[#ffcc00]"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Schedule
              </Button>
              <Button className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black font-bold">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Timeline */}
      <section className="py-8 px-4">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {filteredSessions.map((session) => {
                const isExpanded = expandedSessions.includes(session.id)
                const Icon = categories.find((c) => c.id === session.category)?.icon || Calendar

                return (
                  <div
                    key={session.id}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 ${
                      session.category === 'keynote'
                        ? 'border-blue-500'
                        : session.category === 'panel'
                          ? 'border-purple-500'
                          : session.category === 'workshop'
                            ? 'border-amber-500'
                            : session.category === 'talk'
                              ? 'border-indigo-500'
                              : session.category === 'opening'
                                ? 'border-amber-400'
                                : session.category === 'closing'
                                  ? 'border-rose-500'
                                  : session.category === 'registration'
                                    ? 'border-gray-500'
                                    : session.category === 'networking'
                                      ? 'border-emerald-500'
                                      : session.category === 'exhibition'
                                        ? 'border-red-500'
                                        : session.category === 'lunch'
                                          ? 'border-orange-500'
                                          : 'border-gray-500'
                    }`}
                  >
                    {/* Session Header */}
                    <div
                      className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleSession(session.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        {/* Time & Category */}
                        <div className="flex-shrink-0 md:w-48">
                          <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-5 h-5 text-gray-600" />
                            <span className="font-bold text-gray-900">{session.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-8 h-8 rounded-lg ${getCategoryColor(session.category)} flex items-center justify-center`}
                            >
                              {getCategoryIcon(session.category)}
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                              {session.category.charAt(0).toUpperCase() + session.category.slice(1)}
                            </span>
                          </div>
                        </div>

                        {/* Session Info */}
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start gap-3">
                                {session.featured && (
                                  <Sparkles className="w-5 h-5 text-[#ffcc00] flex-shrink-0 mt-1" />
                                )}
                                <h3 className="text-xl font-bold text-gray-900">{session.title}</h3>
                              </div>

                              {session.speaker && (
                                <div className="flex items-center gap-3 mt-3">
                                  <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {session.speaker.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{session.speaker}</p>
                                    <p className="text-sm text-gray-600">
                                      {session.role}, {session.company}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-4">
                              <button className="text-gray-400 hover:text-[#ffcc00] transition-colors">
                                <Heart className="w-5 h-5" />
                              </button>
                              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5" />
                                ) : (
                                  <ChevronDown className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="border-t border-gray-100 px-6 pb-6 pt-4">
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Session Details */}
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2">Description</h4>
                              <p className="text-gray-600">{session.description}</p>
                            </div>

                            <div>
                              <h4 className="font-bold text-gray-900 mb-2">Tags</h4>
                              <div className="flex flex-wrap gap-2">
                                {session.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Session Logistics */}
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-bold text-gray-900 mb-3">Session Details</h4>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <MapPin className="w-5 h-5 text-gray-400" />
                                  <div>
                                    <p className="font-medium text-gray-900">{session.location}</p>
                                    <p className="text-sm text-gray-600">Venue Location</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <Users className="w-5 h-5 text-gray-400" />
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {session.capacity} capacity
                                    </p>
                                    <p className="text-sm text-gray-600">Spots available</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <Clock className="w-5 h-5 text-gray-400" />
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {formatDuration(session.duration)}
                                    </p>
                                    <p className="text-sm text-gray-600">Session duration</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                              {session.registered ? (
                                <div className="flex items-center gap-2 text-green-600">
                                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                  <span className="font-medium">
                                    You are registered for this session
                                  </span>
                                </div>
                              ) : session.capacity > 0 ? (
                                <Button className="w-full bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black font-bold">
                                  Register for Session
                                </Button>
                              ) : (
                                <div className="text-center py-2 bg-gray-50 rounded-lg">
                                  <p className="text-gray-500 font-medium">
                                    Session at full capacity
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Empty State */}
            {filteredSessions.length === 0 && (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No sessions found</h3>
                <p className="text-gray-500 mb-6">Try selecting a different day or filter</p>
                <Button
                  onClick={() => setFilterCategory('all')}
                  className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black font-bold"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Day Highlights */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Day {activeDay} Highlights
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Key sessions and must-attend events for today
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {activeSessions
              .filter((session) => session.featured)
              .slice(0, 3)
              .map((session) => (
                <div
                  key={session.id}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg ${getCategoryColor(session.category)} flex items-center justify-center`}
                    >
                      {getCategoryIcon(session.category)}
                    </div>
                    <div>
                      <span className="text-sm text-gray-300">{session.time}</span>
                      <p className="font-medium">{session.location}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{session.title}</h3>
                  {session.speaker && <p className="text-gray-300 mb-4">{session.speaker}</p>}
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10"
                    onClick={() => toggleSession(session.id)}
                  >
                    View Details
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Venue Map & Info */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#ffcc00] to-amber-500 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Venue Information</h2>
                  <p className="text-gray-600">Harare International Conference Centre</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Key Locations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mic className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Main Hall A</p>
                        <p className="text-sm text-gray-600">Keynotes & Plenary Sessions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Hall B</p>
                        <p className="text-sm text-gray-600">Panels & Workshops</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Exhibition Hall</p>
                        <p className="text-sm text-gray-600">100+ Tech Exhibitors</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Coffee className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium">Networking Lounge</p>
                        <p className="text-sm text-gray-600">Refreshments & Networking</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">Venue Services</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Free WiFi
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Charging Stations
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Accessibility
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      Parking
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden border border-gray-200">
              {/* Map Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-[#ffcc00] mx-auto mb-4 opacity-50" />
                  <p className="text-gray-400">Venue Map</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Interactive floor plan and location guide
                  </p>
                </div>
              </div>

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-gray-700">Main Sessions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded"></div>
                      <span className="text-gray-700">Breakout Rooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span className="text-gray-700">Exhibition Area</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                      <span className="text-gray-700">Networking Zones</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#170d43] via-[#1a1448] to-[#0f172a]">
        <div className="container-custom max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm font-medium text-white">Plan Your Experience</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Join Us?</h2>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {`            Register now to secure your spot and build your personalized schedule for Africa's premier ICT event.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black font-bold px-8 py-6 rounded-xl text-lg hover:shadow-lg hover:shadow-amber-500/25"
              asChild
            >
              <Link href="/register">
                Register for Summit
                <Calendar className="w-5 h-5 ml-2" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg"
              asChild
            >
              <Link href="/speakers">
                View All Speakers
                <Users className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
