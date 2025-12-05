'use client'

import { Navbar } from '@/components/navbar'
import { FileText, Calendar, User, ArrowRight, Clock, Tag, Loader2 } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import SubHero from '@/components/sub-hero'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

// Types
interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: any // Rich text contentred
  featuredImage: {
    url: string
    alt?: string
  }
  authorName: string
  authorTitle?: string
  category: string
  tags: Array<{ tag: string }>
  readTime: number
  status: string
  publishedAt: string
  featured: boolean
  views: number
  createdAt: string
  updatedAt: string
}

const categories = [
  { id: 'all', name: 'All Categories', color: 'bg-gray-100' },
  { id: 'technology-trends', name: 'Technology Trends', color: 'bg-blue-100' },
  { id: 'digital-transformation', name: 'Digital Transformation', color: 'bg-purple-100' },
  { id: 'industry-insights', name: 'Industry Insights', color: 'bg-amber-100' },
  { id: 'startup-ecosystem', name: 'Startup Ecosystem', color: 'bg-green-100' },
  { id: 'cybersecurity', name: 'Cybersecurity', color: 'bg-red-100' },
  { id: 'ai-ml', name: 'AI & ML', color: 'bg-indigo-100' },
  { id: 'fintech', name: 'Fintech', color: 'bg-emerald-100' },
  { id: 'event-updates', name: 'Event Updates', color: 'bg-cyan-100' },
  { id: 'success-stories', name: 'Success Stories', color: 'bg-pink-100' },
  { id: 'policy-regulation', name: 'Policy & Regulation', color: 'bg-gray-100' },
]

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  useEffect(() => {
    fetchBlogs()
  }, [selectedCategory, showFeaturedOnly])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      setError(null)

      // Build query parameters for Payload's API
      const params = new URLSearchParams()

      // Only show published blogs
      params.append('where[status][equals]', 'published')

      if (selectedCategory !== 'all') {
        params.append('where[category][equals]', selectedCategory)
      }

      if (showFeaturedOnly) {
        params.append('where[featured][equals]', 'true')
      }

      // Add sorting by published date (newest first)
      params.append('sort', '-publishedAt')
      params.append('limit', '12')

      // Fetch from Payload's built-in API
      const response = await fetch(`/api/blogs?${params}`)

      if (!response.ok) {
        throw new Error('Failed to fetch blog posts')
      }

      const data = await response.json()

      if (data.docs) {
        // Transform data to include proper image URLs
        const transformedBlogs = data.docs.map((blog: any) => ({
          ...blog,
          featuredImage: {
            url: blog.featuredImage?.url || '/placeholder.png',
            alt: blog.featuredImage?.alt || blog.title,
          },
          publishedAt: format(new Date(blog.publishedAt), 'MMMM dd, yyyy'),
        }))
        setBlogs(transformedBlogs)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err: any) {
      console.error('Error fetching blogs:', err)
      setError(err.message || 'Failed to load blog posts')
      // Fallback to sample data if API fails
      setBlogs(getSampleBlogs())
    } finally {
      setLoading(false)
    }
  }

  const getSampleBlogs = (): BlogPost[] => {
    // Fallback sample data
    return [
      {
        id: '1',
        title: 'Digital Transformation in Africa: The Road Ahead',
        slug: 'digital-transformation-africa-road-ahead',
        excerpt:
          "Exploring the key trends and opportunities in Africa's digital revolution and how businesses can leverage technology for growth.",
        content: {},
        featuredImage: { url: '/placeholder.png', alt: 'Digital Transformation' },
        authorName: 'Evolve Team',
        authorTitle: 'Tech Writers',
        category: 'digital-transformation',
        tags: [{ tag: 'Digital Transformation' }, { tag: 'Africa' }, { tag: 'Technology' }],
        readTime: 5,
        status: 'published',
        publishedAt: 'March 15, 2026',
        featured: true,
        views: 1245,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Why the 4th Industrial Revolution Matters for Zimbabwe',
        slug: '4th-industrial-revolution-zimbabwe',
        excerpt:
          "Understanding the impact of Industry 4.0 on Zimbabwe's economy and future growth prospects in the technology sector.",
        content: {},
        featuredImage: { url: '/placeholder.png', alt: 'Industry 4.0' },
        authorName: 'Tech Insights',
        authorTitle: 'Industry Analysts',
        category: 'industry-insights',
        tags: [{ tag: 'Industry 4.0' }, { tag: 'Zimbabwe' }, { tag: 'Future Tech' }],
        readTime: 7,
        status: 'published',
        publishedAt: 'February 28, 2026',
        featured: true,
        views: 987,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Preparing for Evolve ICT Summit 2026',
        slug: 'preparing-evolve-ict-summit-2026',
        excerpt:
          'What to expect and how to make the most of your summit experience, including networking tips and session planning.',
        content: {},
        featuredImage: { url: '/placeholder.png', alt: 'Summit Preparation' },
        authorName: 'Event Team',
        authorTitle: 'Event Organizers',
        category: 'event-updates',
        tags: [{ tag: 'Summit' }, { tag: 'Event' }, { tag: 'Networking' }],
        readTime: 4,
        status: 'published',
        publishedAt: 'January 20, 2026',
        featured: false,
        views: 654,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.name : categoryId
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="pt-32 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#ffcc00] mb-4" />
          <span className="text-[#ffcc00]">Loading blog posts...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#170d43] via-[#161e2e] to-[#0f1419]">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Blogs & Insights</h1>
          <p className="text-lg md:text-xl text-gray-300 ">
            Insights, news, and updates from the world of ICT
          </p>
          <SubHero />
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-gray-50 border-b">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? `${category.color.replace('100', '600')} text-white`
                      : `${category.color} text-gray-700 hover:opacity-80`
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center gap-3">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={showFeaturedOnly}
                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  />
                  <div
                    className={`block w-14 h-8 rounded-full ${showFeaturedOnly ? 'bg-[#ffcc00]' : 'bg-gray-300'}`}
                  ></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${showFeaturedOnly ? 'transform translate-x-6' : ''}`}
                  ></div>
                </div>
                <div className="ml-3 text-gray-700 text-xs font-medium">Show Featured Only</div>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="container-custom py-6">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
            <Button
              onClick={fetchBlogs}
              className="mt-2 bg-red-100 text-red-700 hover:bg-red-200"
              size="sm"
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Blog Posts Found</h3>
              <p className="text-gray-600 mb-6">
                {showFeaturedOnly
                  ? 'No featured blog posts available for the selected category.'
                  : 'No blog posts available for the selected category.'}
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => {
                    setSelectedCategory('all')
                    setShowFeaturedOnly(false)
                  }}
                  className="bg-[#ffcc00] hover:bg-[#ec7211]"
                >
                  Clear Filters
                </Button>
                <Button onClick={fetchBlogs} variant="outline">
                  Refresh
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden card-hover group"
                  >
                    {/* Featured Image */}
                    <div className="relative w-full h-48 overflow-hidden">
                      <div
                        className="w-full h-full bg-gray-200 group-hover:scale-110 transition-transform duration-300"
                        style={{
                          backgroundImage: `url(${blog.featuredImage.url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      {blog.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-[#ffcc00] text-white text-xs font-bold rounded-full">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      {/* Category Badge */}
                      <div className="mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <Tag className="w-3 h-3 mr-1" />
                          {getCategoryName(blog.category)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#ffcc00] transition-colors">
                        <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 leading-relaxed">{blog.excerpt}</p>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {blog.authorName}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {blog.publishedAt}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {blog.readTime} min read
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-400">{blog.views} views</span>
                        </div>
                      </div>

                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex flex-wrap gap-2">
                            {blog.tags.slice(0, 3).map((tagObj, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded"
                              >
                                #{tagObj.tag}
                              </span>
                            ))}
                            {blog.tags.length > 3 && (
                              <span className="px-2 py-1 text-gray-400 text-xs">
                                +{blog.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Read More Link */}
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="inline-flex items-center text-[#ffcc00] font-medium hover:text-[#ec7211] transition-colors"
                        >
                          Read Full Article
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More Button (if needed) */}
              {blogs.length >= 12 && (
                <div className="mt-12 text-center">
                  <Button
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-8 py-3"
                    variant="outline"
                  >
                    Load More Posts
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section for Newsletter */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#170d43] to-[#0f1419]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Updated with Our Latest Insights
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest blog posts, industry insights, and
            event updates directly in your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col md:flex-row my-2 gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent"
              />
              <Button className="bg-[#ffcc00] hover:bg-[#ec7211] text-white px-8">Subscribe</Button>
            </div>
            <p className="text-sm text-gray-300 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
