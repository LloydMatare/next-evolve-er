import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { ContactForm } from '@/components/contact-form'

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      details: ['info@evolveictsummit.com', 'support@evolveictsummit.com'],
      description: 'Send us an email anytime',
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Mon-Fri from 9am to 6pm',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Location',
      details: ['123 Tech Street', 'San Francisco, CA 94107'],
      description: 'Visit our headquarters',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM'],
      description: 'Pacific Standard Time',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white pt-24 pb-16">
      <Navbar />
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-[#ffcc00]">Contact</span> Us
        </h1>
        <p className="text-md md:text-lg text-gray-300 mx-auto">
          {` Have questions about EVOLVE ICT SUMMIT 2026? We're here to help! `}
          {` Reach out to our team for any inquiries about the summit, partnerships, or ticket information.`}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="">
            <ContactForm />

            {/* FAQ Section */}
            <Card className="bg-white/5 backdrop-blur-sm border-gray-700 mt-16">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-[#ffcc00]">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="border-b border-gray-700 pb-4">
                    <h3 className="font-semibold mb-2">When will tickets be available?</h3>
                    <p className="text-gray-300 text-sm">
                      Early bird tickets will be available starting March 1, 2026. Sign up for our
                      newsletter to get notified.
                    </p>
                  </div>
                  <div className="border-b border-gray-700 pb-4">
                    <h3 className="font-semibold mb-2">Can I sponsor the event?</h3>
                    <p className="text-gray-300 text-sm">
                      Yes! We offer various sponsorship packages. Contact our partnerships team at
                      partnerships@evolveictsummit.com
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Is the venue accessible?</h3>
                    <p className="text-gray-300 text-sm">
                      Absolutely. Our venue is fully accessible. Please let us know if you require
                      any special accommodations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-gray-700">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-[#ffcc00]">Get in Touch</h2>
                <p className="text-gray-300 mb-8">
                  {`We're excited to hear from you! Whether you're interested in attending, `}
                  {`sponsoring, or speaking at EVOLVE ICT SUMMIT 2026, our team is ready to assist you.`}
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-white/5"
                    >
                      <div className="p-3 bg-[#ffcc00]/20 rounded-lg">
                        <div className="text-[#ffcc00]">{item.icon}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <div className="space-y-1">
                          {item.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-300">
                              {detail}
                            </p>
                          ))}
                        </div>
                        <p className="text-sm text-gray-400 mt-2">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="mt-8 bg-white/5 backdrop-blur-sm border-gray-700">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#ffcc00]">Find Us Here</h2>
            <div className="bg-gray-800/50 rounded-lg h-64 flex items-center justify-center border border-gray-700">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-[#ffcc00] mx-auto mb-4" />
                <p className="text-gray-300">Conference Center Location Map</p>
                <p className="text-sm text-gray-400 mt-2">
                  123 Tech Street, San Francisco, CA 94107
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
