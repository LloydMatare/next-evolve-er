//@ts-nocheck
import React from 'react'
import {
  Rocket,
  Globe,
  Users,
  Target,
  Cpu,
  Briefcase,
  Lightbulb,
  HeartHandshake,
  Calendar,
  MapPin,
  ArrowRight,
  ChevronRight,
  Award,
  BookOpen,
  Code,
  Shield,
  Cloud,
  Bot,
  Database,
  Smartphone,
  Network,
} from 'lucide-react'
import Link from 'next/link'

const ICON_MAP: Record<string, React.ReactNode> = {
  cpu: <Cpu className="w-6 h-6" />,
  briefcase: <Briefcase className="w-6 h-6" />,
  lightbulb: <Lightbulb className="w-6 h-6" />,
  'heart-handshake': <HeartHandshake className="w-6 h-6" />,
}

async function SchoolSummit() {
  // Fetch data from the API
  let fetchedData: any = null
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const response = await fetch(`${apiUrl}/api/school-summit`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    if (response.ok) {
      const result = await response.json()
      fetchedData = result.data
    }
  } catch (error) {
    console.error('Failed to fetch school summit data:', error)
  }

  // Fallback to default data if fetch fails
  const defaultObjectives = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'Digital Skills for the Future',
      skills: [
        'Artificial Intelligence & Machine Learning',
        'Data Science & Big Data',
        'Cybersecurity & Digital Trust',
        'Cloud Computing & DevOps',
        'Robotics, IoT & Automation',
        'Software & Mobile App Development',
      ],
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Career Readiness',
      skills: [
        'Career pathway guidance',
        'Certification roadmap sessions',
        'Internship opportunities',
        'Personal branding',
        'Portfolio development',
      ],
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Innovation & Entrepreneurship',
      skills: [
        'Tech-driven solutions',
        'Startup creation',
        'Innovation showcases',
        'Hackathons',
        'Learn from founders',
      ],
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      title: 'Mentorship & Ecosystem',
      skills: [
        'Connect with industry leaders',
        'University partnerships',
        'Innovation hubs',
        'Employer networking',
      ],
    },
  ]

  const objectives = fetchedData?.objectives?.length
    ? fetchedData.objectives.map((obj: any) => ({
        icon: ICON_MAP[obj.objectiveIcon] || <Cpu className="w-6 h-6" />,
        title: obj.title,
        skills: obj.skills?.map((s: any) => s.skill) || [],
      }))
    : defaultObjectives

  const subThemes = fetchedData?.subThemes?.length
    ? fetchedData.subThemes.map((item: any) => item.title)
    : [
        'Digital Skills for the Future of Work',
        'Youth Innovation & Entrepreneurship',
        'Women in Technology & Inclusive Growth',
        'AI and Emerging Technologies in Africa',
        'Building Local Solutions for Local Challenges',
      ]

  const targetAudience = fetchedData?.targetAudience?.length
    ? fetchedData.targetAudience.map((item: any) => item.title)
    : [
        'University and college students',
        'TVET and polytechnic students',
        'Young innovators and startup founders',
        'Educators and academic institutions',
        'Youth development organisations',
      ]

  const whyAttend = fetchedData?.whyAttend?.length
    ? fetchedData.whyAttend.map((item: any) => item.title)
    : [
        'Gain exposure to real-world technology applications',
        'Learn directly from industry leaders and innovators',
        'Discover scholarships, internships, and career pathways',
        'Build networks for academic and professional growth',
        'Showcase ideas to potential partners and mentors',
      ]

  const programmeHighlights = fetchedData?.programmeHighlights?.length
    ? fetchedData.programmeHighlights.map((item: any) => item.title)
    : [
        'Inspirational keynote sessions from African digital leaders',
        'Career guidance panels with industry experts',
        'Hands-on workshops and technical masterclasses',
        'Student innovation showcase and project demonstrations',
        'Mentorship clinics and networking sessions',
        'Exhibitions by universities, tech companies, and training providers',
      ]

  const expectedOutcomes = fetchedData?.expectedOutcomes?.length
    ? fetchedData.expectedOutcomes.map((item: any) => item.title)
    : [
        'Increased awareness of digital career opportunities among students',
        'Strengthened collaboration between academia and industry',
        'Youth-led innovations addressing real community needs',
        'Enhanced employability and entrepreneurial readiness',
        'A growing pipeline of skilled digital talent in Africa',
      ]

  const featuredCards = fetchedData?.featuredCards || []

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a] w-full text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-block bg-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-purple-400/30">
              EVOLVE ICT SUMMIT 2026
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Evolve Student Summit 2026</h1>
            <p className="text-2xl lg:text-3xl text-purple-100 mb-4 font-light mb-4">
              Shaping Africa's Digital Leap
            </p>
            <div className="flex flex-wrap mt-4 justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4" />
                <span>Coming 2026</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4" />
                <span>Location TBA</span>
              </div>
            </div>
            <p className="text-sm md:text-xl text-center text-purple-100">
              A youth-focused platform empowering students with skills, exposure, and networks to
              actively participate in Africa's digital transformation.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
              >
                Register Interest <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold transition-all border border-white/30 flex items-center gap-2"
              >
                Become a Partner <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Overview</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                The Evolve Student Summit 2026 is a youth-focused platform under the Evolve ICT
                Summit ecosystem, designed to empower students with the skills, exposure, and
                networks needed to actively participate in Africa's digital transformation.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Under the theme{' '}
                <span className="font-semibold text-purple-600">
                  "Shaping Africa's Digital Leap,"
                </span>{' '}
                the summit positions students not just as future participants, but as present-day
                contributors to innovation, problem-solving, and technology-driven development
                across the continent.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl border border-purple-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Theme Focus</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Rocket className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Youth as drivers of digital transformation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    African-built solutions for African challenges
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Innovation as a tool for inclusive growth</span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Skills development for the future of work</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Purpose */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To cultivate a generation of digitally empowered African youth capable of shaping
                sustainable, inclusive, and innovation-driven economies.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Rocket className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Purpose</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  Equip students with relevant digital and future-ready skills
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  Bridge the gap between education and industry
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  Inspire innovation and entrepreneurship among youth
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  Provide mentorship and exposure to real-world ICT applications
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  Encourage students to contribute to Africa's digital economy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Objectives */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Core Objectives</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering students with comprehensive skills and opportunities
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center">
                    {objective.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{objective.title}</h3>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {objective.skills.map((skill, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2"></div>
                      <span className="text-sm">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cards with Images & Videos */}
      {featuredCards.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Featured Content
              </h2>
              <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCards.map((card: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Image Card */}
                  {card.cardImage && (
                    <a
                      href={card.cardLink || '#'}
                      className="block relative overflow-hidden bg-gray-200 h-48"
                    >
                      <img
                        src={
                          typeof card.cardImage === 'string'
                            ? card.cardImage
                            : (card.cardImage as any)?.url || '/api/placeholder/400/300'
                        }
                        alt={card.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </a>
                  )}
                  {/* Video Card */}
                  {card.cardVideo && !card.cardImage && (
                    <div className="relative bg-black h-48 flex items-center justify-center">
                      {card.videoType === 'youtube' ? (
                        <iframe
                          className="w-full h-full"
                          src={card.cardVideo}
                          title={card.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          className="w-full h-full object-cover"
                          controls
                          poster={(card.thumbnail as any)?.url || '/api/placeholder/400/300'}
                        >
                          <source src={card.cardVideo} />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                    {card.cardLink && (
                      <a
                        href={card.cardLink}
                        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
                      >
                        Learn More <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Programme Highlights */}
      <section className="py-20 bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a] w-full text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Programme Highlights</h2>
            <div className="w-24 h-1 bg-purple-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmeHighlights.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <p className="text-white/90">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-Themes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Key Sub-Themes</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subThemes.map((theme, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-800 font-medium">{theme}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience & Why Attend */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Users className="w-8 h-8 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900">Target Audience</h3>
              </div>
              <div className="space-y-4">
                {targetAudience.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-xl shadow-sm flex items-start gap-3"
                  >
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Award className="w-8 h-8 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900">Why Students Should Attend</h3>
              </div>
              <div className="space-y-4">
                {whyAttend.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-xl shadow-sm flex items-start gap-3"
                  >
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expected Outcomes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Expected Outcomes</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expectedOutcomes.map((outcome, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a] w-full text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Join the Movement</h2>
          <p className="text-xl text-purple-100 mb-10">
            Be part of shaping Africa's digital future. Register your interest today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-purple-900 hover:bg-purple-50 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105">
              Register as Student
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 border border-white/30">
              Partner with Us
            </button>
            <button className="bg-transparent hover:bg-white/10 text-white px-8 py-3 rounded-full font-semibold transition-all border border-white/30">
              Become a Mentor
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 mb-4">© 2026 Evolve ICT Summit. All rights reserved.</p>
            <p className="text-gray-500 text-sm">
              Part of the Evolve ICT Summit ecosystem - Shaping Africa's Digital Leap
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SchoolSummit
