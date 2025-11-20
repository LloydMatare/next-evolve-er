import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FileText, Calendar, User } from 'lucide-react'
import React from 'react'

export default function BlogsPage() {
  const placeholderBlogs = [
    {
      title: 'Digital Transformation in Africa: The Road Ahead',
      excerpt: 'Exploring the key trends and opportunities in Africa\'s digital revolution...',
      date: 'March 15, 2026',
      author: 'Evolve Team',
    },
    {
      title: 'Why the 4th Industrial Revolution Matters for Zimbabwe',
      excerpt: 'Understanding the impact of Industry 4.0 on Zimbabwe\'s economy and future...',
      date: 'February 28, 2026',
      author: 'Tech Insights',
    },
    {
      title: 'Preparing for Evolve ICT Summit 2026',
      excerpt: 'What to expect and how to make the most of your summit experience...',
      date: 'January 20, 2026',
      author: 'Event Team',
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#232f3e] via-[#161e2e] to-[#0f1419]">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Blogs & Insights</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Insights, news, and updates from the world of ICT
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {placeholderBlogs.map((blog, index) => (
              <article
                key={index}
                className="bg-white border border-gray-200 rounded-sm overflow-hidden card-hover"
              >
                <div className="w-full h-48 bg-[#f3f3f3] flex items-center justify-center">
                  <FileText className="w-16 h-16 text-[#ff9900]/30" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#232f3e] mb-3 leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{blog.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {blog.date}
                    </span>
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {blog.author}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Coming Soon Message */}
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto bg-[#f3f3f3] border border-gray-200 rounded-sm p-8">
              <h3 className="text-2xl font-bold text-[#232f3e] mb-4">More Articles Coming Soon</h3>
              <p className="text-gray-600 leading-relaxed">
                We&apos;re working on bringing you more insightful content about digital
                transformation, technology trends, and ICT developments in Africa. Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
