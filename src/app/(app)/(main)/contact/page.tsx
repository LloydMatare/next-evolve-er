import { Card, CardContent } from '@/components/ui/card'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Users,
  Globe,
  Sparkles,
  ChevronRight,
  Send,
  Map,
  Headphones,
  Lightbulb,
  Shield,
  Rocket,
} from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Address',
      details: ['info@evolveictsummit.com', 'support@evolveictsummit.com'],
      description: 'For general inquiries and support',
      color: 'from-blue-500 to-cyan-400',
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-400',
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone Numbers',
      details: ['+263 242 123 456', '+263 242 987 654'],
      description: 'Available Mon-Fri, 9am to 6pm CAT',
      color: 'from-emerald-500 to-teal-400',
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-400',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Our Location',
      details: ['313 Samora Machel Ave, Eastlea', 'Harare, Zimbabwe'],
      description: 'Headquarters and main office',
      color: 'from-amber-500 to-orange-400',
      gradient: 'bg-gradient-to-br from-amber-500 to-orange-400',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM'],
      description: 'Central Africa Time (CAT)',
      color: 'from-purple-500 to-pink-400',
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-400',
    },
  ]

  const departments = [
    {
      name: 'Partnerships & Sponsorship',
      email: 'info@evolveictsummit.com',
      description: 'Collaboration opportunities and sponsor packages',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    },
    {
      name: 'Media & Press',
      email: 'info@evolveictsummit.com',
      description: 'Press inquiries, media partnerships, and coverage',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-purple-500 to-pink-400',
    },
    {
      name: 'Speaker & Program',
      email: 'info@evolveictsummit.com',
      description: 'Speaking opportunities and agenda questions',
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-amber-500 to-orange-400',
    },
    {
      name: 'Registration & Tickets',
      email: 'info@evolveictsummit.com',
      description: 'Ticket inquiries and registration support',
      icon: <Shield className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    },
    {
      name: 'Technical Support',
      email: 'info@evolveictsummit.com',
      description: 'Website issues and technical assistance',
      icon: <Headphones className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-red-500 to-rose-400',
    },
    {
      name: 'Startup & Innovation',
      email: 'info@evolveictsummit.com',
      description: 'Startup participation and innovation showcase',
      icon: <Rocket className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-indigo-500 to-purple-400',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a]">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ffcc00]/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <MessageSquare className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm font-medium text-white">Get in Touch</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {`Let's`} <span className="text-[#ffcc00]">Connect</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 text-center mb-8">
            Have questions about{' '}
            <span className="text-[#ffcc00] font-semibold">Evolve ICT Summit 2026</span>? Our team
            is here to help you every step of the way.
          </p>
        </div>
      </div>

      {/* Contact Information Grid */}
      <div className="py-16 px-4">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${item.gradient}`}>
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <div className="space-y-1 mb-3">
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-300 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 opacity-10">
                  <div className={`w-16 h-16 rounded-full ${item.gradient}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 text-white!">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-8 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#ffcc00] to-amber-500 rounded-xl flex items-center justify-center">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
                        <p className="text-gray-400">{`We'll respond within 24 hours`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <ContactForm />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Departments & FAQ */}
            <div className="space-y-8">
              {/* Departments */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Contact by Department</h3>
                  </div>
                  <div className="space-y-4">
                    {departments.slice(0, 3).map((dept, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${dept.color}`}>{dept.icon}</div>
                            <span className="font-medium text-sm">{dept.name}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#ffcc00] transition-colors" />
                        </div>
                        <p className="text-xs text-gray-400 mb-1">{dept.description}</p>
                        <a
                          href={`mailto:${dept.email}`}
                          className="text-[#ffcc00] hover:text-amber-400 text-sm font-medium transition-colors"
                        >
                          {dept.email}
                        </a>
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      className="w-full text-gray-400 hover:text-white hover:bg-white/10 mt-4"
                      asChild
                    >
                      <Link href="/contact/departments">
                        View All Departments
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              {/* <Card className="bg-gradient-to-br from-[#170d43] to-[#2a1b69] border-0 rounded-2xl text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#ffcc00] to-amber-500 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Quick Help</h3>
                  </div>
                  <div className="space-y-4">
                    <a
                      href="/faq"
                      className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
                    >
                      <span className="font-medium">FAQs & Help Center</span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#ffcc00] transition-colors" />
                    </a>
                    <a
                      href="/registration"
                      className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
                    >
                      <span className="font-medium">Registration Guide</span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#ffcc00] transition-colors" />
                    </a>
                    <a
                      href="/sponsors"
                      className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
                    >
                      <span className="font-medium">Sponsorship Info</span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#ffcc00] transition-colors" />
                    </a>
                    <a
                      href="/schedule"
                      className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
                    >
                      <span className="font-medium">Event Schedule</span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#ffcc00] transition-colors" />
                    </a>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4 bg-gradient-to-b from-transparent to-white/5">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Lightbulb className="w-4 h-4 text-[#ffcc00]" />
              <span className="text-sm font-medium text-white">Common Question.</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-300 text-center">
              Quick answers to the questions we get asked the most
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                {
                  q: 'When will tickets be available for purchase?',
                  a: 'Early bird tickets will be available starting March 1, 2026. Sign up for our newsletter to get notified about ticket releases and exclusive discounts.',
                },
                {
                  q: 'Can I sponsor or partner with the summit?',
                  a: 'Absolutely! We offer various sponsorship and partnership packages. Contact our partnerships team at partnerships@evolveictsummit.com for customized opportunities.',
                },
                {
                  q: 'Is the venue accessible for people with disabilities?',
                  a: 'Yes, the Harare International Conference Centre is fully accessible with wheelchair ramps, accessible restrooms, and dedicated seating areas.',
                },
              ].map((faq, index) => (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl"
                >
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3 text-[#ffcc00]">{faq.q}</h3>
                    <p className="text-gray-300">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="space-y-6">
              {[
                {
                  q: 'What COVID-19 safety measures are in place?',
                  a: 'We follow all local health guidelines and will have sanitation stations, optional mask requirements, and social distancing measures as needed.',
                },
                {
                  q: "Can I get a refund if I can't attend?",
                  a: 'Refunds are available up to 30 days before the event. After that, tickets are transferable to another person with prior notification.',
                },
                {
                  q: 'Will there be virtual attendance options?',
                  a: 'Yes! We offer hybrid attendance options including virtual passes for those who cannot attend in person.',
                },
              ].map((faq, index) => (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl"
                >
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3 text-[#ffcc00]">{faq.q}</h3>
                    <p className="text-gray-300">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white  text-lg font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-shadow"
              asChild
            >
              <Link href="/faq">
                View All FAQs
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Location Map */}
      <div className="py-16 px-4">
        <div className="container-custom">
          <Card className="bg-gradient-to-br from-[#170d43] to-[#2a1b69] border-0 rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <div className="p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-[#ffcc00] to-amber-500 rounded-xl flex items-center justify-center">
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold">Find Us Here</h2>
                        <p className="text-gray-300">Visit our headquarters and main venue</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-[#ffcc00]">Headquarters</h3>
                        <p className="text-gray-300">
                          313 Samora Machel Ave, Eastlea
                          <br />
                          Harare, Zimbabwe
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold text-lg mb-2 text-[#ffcc00]">Summit Venue</h3>
                        <p className="text-gray-300">
                          Harare International Conference Centre (HICC)
                          <br />
                          Harare Gardens, Harare
                        </p>
                      </div>

                      <div className="flex items-center gap-4 pt-6 border-t border-white/20">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Globe className="w-4 h-4" />
                          <span>GPS: -17.8283° S, 31.0499° E</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Clock className="w-4 h-4" />
                          <span>30 min from airport</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-96 rounded-2xl overflow-hidden border border-white/20">
                    {/* Map Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <Map className="h-16 w-16 text-[#ffcc00] mx-auto mb-4 opacity-50" />
                        <p className="text-gray-400">Interactive Map</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Location details and directions
                        </p>
                      </div>
                    </div>

                    {/* Map Pin */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#ffcc00] to-amber-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-amber-500/50">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4">
        <div className="container-custom max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm font-medium text-white">Ready to Connect?</span>
          </div>

          <h2 className="text-4xl md:text-5xl text-center font-bold text-white mb-6">
            {` Let's Build Something `}
            <span className="text-[#ffcc00]">Amazing</span> Together
          </h2>

          <p className="text-xl text-gray-300 mb-8 text-center">
            {`            Whether you're looking to attend, speak, sponsor, or partner, we're excited to
            collaborate with you on Africa's premier ICT event.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-shadow"
              asChild
            >
              <Link href="/register">
                Register for Summit 2026
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="border-white/30 text-black hover:bg-white/10 font-semibold"
            >
              <Link href="/partnerships">Explore Partnerships</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
