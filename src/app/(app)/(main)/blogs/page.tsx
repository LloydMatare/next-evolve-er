'use client'

import {
  FileText,
  Calendar,
  User,
  ArrowRight,
  Clock,
  Tag,
  Loader2,
  Search,
  Filter,
  TrendingUp,
  Sparkles,
  BookOpen,
  ChevronRight,
  Eye,
  Heart,
  Share2,
  Bookmark,
} from 'lucide-react'
import React, { useState, useEffect } from 'react'
import SubHero from '@/components/sub-hero'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import Image from 'next/image'

// Types
interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: any
  featuredImage: {
    url: string
    alt?: string
  }
  authorName: string
  authorTitle?: string
  authorAvatar?: string
  category: string
  tags: Array<{ tag: string }>
  readTime: number
  status: string
  publishedAt: string
  featured: boolean
  trending: boolean
  views: number
  likes: number
  comments: number
  createdAt: string
  updatedAt: string
}

const categories = [
  {
    id: 'all',
    name: 'All Categories',
    color: 'bg-gradient-to-r from-gray-600 to-gray-700',
    icon: '📚',
  },
  {
    id: 'technology-trends',
    name: 'Technology Trends',
    color: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    icon: '🚀',
  },
  {
    id: 'digital-transformation',
    name: 'Digital Transformation',
    color: 'bg-gradient-to-r from-purple-600 to-pink-500',
    icon: '🔄',
  },
  {
    id: 'industry-insights',
    name: 'Industry Insights',
    color: 'bg-gradient-to-r from-amber-500 to-orange-400',
    icon: '💼',
  },
  {
    id: 'startup-ecosystem',
    name: 'Startup Ecosystem',
    color: 'bg-gradient-to-r from-green-500 to-emerald-400',
    icon: '🚀',
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    color: 'bg-gradient-to-r from-red-500 to-rose-400',
    icon: '🔒',
  },
  {
    id: 'ai-ml',
    name: 'AI & ML',
    color: 'bg-gradient-to-r from-indigo-500 to-purple-400',
    icon: '🤖',
  },
  {
    id: 'fintech',
    name: 'Fintech',
    color: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    icon: '💳',
  },
  {
    id: 'event-updates',
    name: 'Event Updates',
    color: 'bg-gradient-to-r from-cyan-500 to-sky-400',
    icon: '🎪',
  },
  {
    id: 'success-stories',
    name: 'Success Stories',
    color: 'bg-gradient-to-r from-pink-500 to-rose-400',
    icon: '🌟',
  },
  {
    id: 'policy-regulation',
    name: 'Policy & Regulation',
    color: 'bg-gradient-to-r from-gray-500 to-slate-400',
    icon: '⚖️',
  },
]

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [likedPosts, setLikedPosts] = useState<string[]>([])

  useEffect(() => {
    fetchBlogs()
  }, [selectedCategory, showFeaturedOnly, sortBy])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      setError(null)

      // Build query parameters
      const params = new URLSearchParams()
      params.append('where[status][equals]', 'published')

      if (selectedCategory !== 'all') {
        params.append('where[category][equals]', selectedCategory)
      }

      if (showFeaturedOnly) {
        params.append('where[featured][equals]', 'true')
      }

      // Add sorting
      switch (sortBy) {
        case 'newest':
          params.append('sort', '-publishedAt')
          break
        case 'popular':
          params.append('sort', '-views')
          break
        case 'trending':
          params.append('where[trending][equals]', 'true')
          params.append('sort', '-views')
          break
      }

      params.append('limit', '12')

      const response = await fetch(`/api/blogs?${params}`)

      if (!response.ok) {
        throw new Error('Failed to fetch blog posts')
      }

      const data = await response.json()

      if (data.docs) {
        const transformedBlogs = data.docs.map((blog: any) => {
          let imageUrl = '/placeholder.png'
          
          if (typeof blog.featuredImage === 'object' && blog.featuredImage?.url) {
            imageUrl = blog.featuredImage.url.startsWith('http') 
              ? blog.featuredImage.url 
              : `${window.location.origin}${blog.featuredImage.url}`
          }
          
          return {
            ...blog,
            featuredImage: {
              url: imageUrl,
              alt: typeof blog.featuredImage === 'object' && blog.featuredImage?.alt 
                ? blog.featuredImage.alt 
                : blog.title,
            },
            publishedAt: format(new Date(blog.publishedAt), 'MMMM dd, yyyy'),
            likes: blog.likes || Math.floor(Math.random() * 500),
            comments: blog.comments || Math.floor(Math.random() * 50),
            trending: Math.random() > 0.7,
          }
        })
        setBlogs(transformedBlogs)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err: any) {
      console.error('Error fetching blogs:', err)
      setError(err.message || 'Failed to load blog posts')
      setBlogs(getSampleBlogs())
    } finally {
      setLoading(false)
    }
  }

  const getSampleBlogs = (): BlogPost[] => {
    return [
      {
        id: '1',
        title: 'Digital Transformation in Africa: The Road Ahead',
        slug: 'digital-transformation-africa-road-ahead',
        excerpt:
          "Exploring the key trends and opportunities in Africa's digital revolution and how businesses can leverage technology for growth.",
        content: {},
        featuredImage: { url: '/placeholder.png', alt: 'Digital Transformation' },
        authorName: 'Dr. Sarah Chen',
        authorTitle: 'Tech Innovation Lead',
        authorAvatar: '/placeholder.png',
        category: 'digital-transformation',
        tags: [{ tag: 'Digital Transformation' }, { tag: 'Africa' }, { tag: 'Technology' }],
        readTime: 8,
        status: 'published',
        publishedAt: 'March 15, 2026',
        featured: true,
        trending: true,
        views: 1245,
        likes: 289,
        comments: 42,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'AI Revolution: How Machine Learning is Transforming African Industries',
        slug: 'ai-revolution-african-industries',
        excerpt:
          'A comprehensive look at AI applications across healthcare, agriculture, and finance sectors in Africa.',
        content: {},
        featuredImage: { url: '/placeholder.png', alt: 'AI Revolution' },
        authorName: 'Prof. James Okafor',
        authorTitle: 'AI Researcher',
        authorAvatar: '/placeholder.png',
        category: 'ai-ml',
        tags: [{ tag: 'AI' }, { tag: 'Machine Learning' }, { tag: 'Innovation' }],
        readTime: 12,
        status: 'published',
        publishedAt: 'February 28, 2026',
        featured: true,
        trending: true,
        views: 3456,
        likes: 512,
        comments: 67,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Preparing for Evolve ICT Summit 2026: Complete Guide',
        slug: 'preparing-evolve-ict-summit-2026',
        excerpt:
          'What to expect and how to make the most of your summit experience, including networking tips and session planning.',
        content: {},
        featuredImage: { url: '/placeholder.png', alt: 'Summit Preparation' },
        authorName: 'Event Team',
        authorTitle: 'Event Organizers',
        authorAvatar: '/placeholder.png',
        category: 'event-updates',
        tags: [{ tag: 'Summit' }, { tag: 'Event' }, { tag: 'Networking' }],
        readTime: 6,
        status: 'published',
        publishedAt: 'January 20, 2026',
        featured: false,
        trending: true,
        views: 987,
        likes: 156,
        comments: 23,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Cybersecurity Landscape in Emerging Markets',
        slug: 'cybersecurity-emerging-markets',
        excerpt:
          'Understanding the unique cybersecurity challenges and solutions for African businesses in the digital age.',
        content: {},
        featuredImage: { url: '/placeholder.png', alt: 'Cybersecurity' },
        authorName: 'Maria Rodriguez',
        authorTitle: 'Security Expert',
        authorAvatar: '/placeholder.png',
        category: 'cybersecurity',
        tags: [{ tag: 'Security' }, { tag: 'Privacy' }, { tag: 'Technology' }],
        readTime: 10,
        status: 'published',
        publishedAt: 'December 10, 2025',
        featured: true,
        trending: false,
        views: 2341,
        likes: 321,
        comments: 45,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Fintech Revolution: Mobile Money to Blockchain',
        slug: 'fintech-revolution-africa',
        excerpt:
          'How financial technology is reshaping banking and payments across the African continent.',
        content: {},
        featuredImage: { url: '/placeholder.png', alt: 'Fintech' },
        authorName: 'David Kariuki',
        authorTitle: 'Fintech Analyst',
        authorAvatar: '/placeholder.png',
        category: 'fintech',
        tags: [{ tag: 'Fintech' }, { tag: 'Blockchain' }, { tag: 'Banking' }],
        readTime: 9,
        status: 'published',
        publishedAt: 'November 15, 2025',
        featured: false,
        trending: true,
        views: 1890,
        likes: 267,
        comments: 34,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '6',
        title: 'Sustainable Tech: Green Computing in Africa',
        slug: 'sustainable-tech-green-computing',
        excerpt:
          'Exploring environmentally friendly technology solutions and their impact on African development.',
        content: {},
        featuredImage: { url: '/placeholder.png', alt: 'Green Tech' },
        authorName: 'Environmental Tech Group',
        authorTitle: 'Sustainability Experts',
        authorAvatar: '/placeholder.png',
        category: 'technology-trends',
        tags: [{ tag: 'Sustainability' }, { tag: 'Green Tech' }, { tag: 'Environment' }],
        readTime: 7,
        status: 'published',
        publishedAt: 'October 5, 2025',
        featured: false,
        trending: false,
        views: 1123,
        likes: 189,
        comments: 28,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  }

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId],
    )
  }

  const getCategoryByName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId) || categories[0]
  }

  const filteredBlogs = blogs.filter((blog) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.tags.some((tag) => tag.tag.toLowerCase().includes(query))
      )
    }
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-white">
        <div className="pt-32 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#ffcc00]/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#ffcc00] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <span className="mt-6 text-lg text-gray-600 font-medium">Loading insights...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f1419]">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm font-medium text-white">Knowledge Hub</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Insights & Analysis</h1>

          <div className="flex justify-center">
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Expert perspectives on{' '}
              <span className="text-[#ffcc00] font-semibold">
                digital transformation, innovation, and technology trends
              </span>{' '}
              {`shaping Africa's future`}
            </p>
          </div>

          <SubHero />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 px-4 bg-gradient-to-r from-[#170d43] to-[#2a1b69]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Articles', value: '156+', icon: '📝' },
              { label: 'Monthly Readers', value: '50K+', icon: '👥' },
              { label: 'Expert Authors', value: '42', icon: '✍️' },
              { label: 'Avg. Read Time', value: '8 min', icon: '⏱️' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search insights, topics, or authors..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffcc00]/50 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#ffcc00]/50 focus:border-transparent"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#ffcc00]/50 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="trending">Trending Now</option>
                </select>
                <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded" />
                      <div className="w-2 h-2 bg-gray-400 rounded" />
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded" />
                      <div className="w-2 h-2 bg-gray-400 rounded" />
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="w-8 h-1.5 bg-gray-400 rounded" />
                    <div className="w-8 h-1.5 bg-gray-400 rounded" />
                    <div className="w-8 h-1.5 bg-gray-400 rounded" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Category Filters */}
          <div className="mt-6 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? `${category.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="container-custom py-8">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">Unable to Load Content</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={fetchBlogs} className="bg-red-100 text-red-700 hover:bg-red-200">
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Section */}
      {blogs.filter((b) => b.featured).length > 0 && (
        <section className="py-12 px-4">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-400 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Featured Insights</h2>
                  <p className="text-gray-600">Top curated content from our experts</p>
                </div>
              </div>
              <Button variant="ghost" className="text-[#ffcc00] hover:text-amber-600">
                View All Featured
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {blogs
                .filter((b) => b.featured)
                .slice(0, 2)
                .map((blog) => {
                  const category = getCategoryByName(blog.category)
                  return (
                    <div
                      key={blog.id}
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800"
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/90 to-transparent" />

                      <div className="relative p-8">
                        {/* Category & Featured Badge */}
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className={`px-3 py-1 ${category.color} text-white text-sm font-medium rounded-full`}
                          >
                            {category.name}
                          </span>
                          {blog.trending && (
                            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-400 text-white text-sm font-medium rounded-full flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Trending
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          <Link
                            href={`/blogs/${blog.slug}`}
                            className="hover:text-[#ffcc00] transition-colors"
                          >
                            {blog.title}
                          </Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-300 mb-6 line-clamp-2">{blog.excerpt}</p>

                        {/* Author & Meta */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-700" />
                            <div>
                              <div className="text-white font-medium">{blog.authorName}</div>
                              <div className="text-sm text-gray-400">
                                {blog.publishedAt} • {blog.readTime} min read
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#ffcc00] transition-colors" />
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container-custom">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Insights Found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchQuery
                  ? `No results found for "${searchQuery}". Try different keywords.`
                  : 'No blog posts available for the selected filters.'}
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSearchQuery('')
                    setShowFeaturedOnly(false)
                  }}
                  className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white"
                >
                  Clear Filters
                </Button>
                <Button onClick={fetchBlogs} variant="outline">
                  Refresh Content
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Grid/List View */}
              <div
                className={
                  viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-8'
                }
              >
                {filteredBlogs.map((blog) => {
                  const category = getCategoryByName(blog.category)
                  return viewMode === 'grid' ? (
                    // Grid View Card
                    <article
                      key={blog.id}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={blog.featuredImage.url}
                          alt={blog.featuredImage.alt || blog.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span
                            className={`px-3 py-1 ${category.color} text-white text-xs font-medium rounded-full`}
                          >
                            {category.name}
                          </span>
                        </div>
                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button
                            onClick={() => toggleLike(blog.id)}
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                          >
                            <Heart
                              className={`w-4 h-4 ${likedPosts.includes(blog.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                            />
                          </button>
                          <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                            <Bookmark className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>

                      <div className="p-6">
                        {/* Meta Info */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200" />
                            <span className="text-sm font-medium text-gray-700">
                              {blog.authorName}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {blog.readTime}m
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#ffcc00] transition-colors">
                          <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Eye className="w-4 h-4" />
                              <span>{blog.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Heart className="w-4 h-4" />
                              <span>{blog.likes + (likedPosts.includes(blog.id) ? 1 : 0)}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <span>💬</span>
                              <span>{blog.comments}</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">{blog.publishedAt}</div>
                        </div>
                      </div>
                    </article>
                  ) : (
                    // List View Card
                    <article
                      key={blog.id}
                      className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex gap-6">
                        {/* Image */}
                        <div className="flex-shrink-0 w-48 h-48 rounded-xl overflow-hidden relative">
                          <Image
                            src={blog.featuredImage.url}
                            alt={blog.featuredImage.alt || blog.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          {/* Category & Featured */}
                          <div className="flex items-center gap-3 mb-3">
                            <span
                              className={`px-3 py-1 ${category.color} text-white text-sm font-medium rounded-full`}
                            >
                              {category.name}
                            </span>
                            {blog.featured && (
                              <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-400 text-white text-sm font-medium rounded-full">
                                Featured
                              </span>
                            )}
                            {blog.trending && (
                              <span className="px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-400 text-white text-sm font-medium rounded-full flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                Trending
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#ffcc00] transition-colors">
                            <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                          </h3>

                          {/* Excerpt */}
                          <p className="text-gray-600 mb-4">{blog.excerpt}</p>

                          {/* Meta Info */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200" />
                                <div>
                                  <div className="font-medium text-gray-900">{blog.authorName}</div>
                                  <div className="text-sm text-gray-500">{blog.authorTitle}</div>
                                </div>
                              </div>
                              <div className="text-sm text-gray-500 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {blog.publishedAt}
                                <span className="mx-2">•</span>
                                <Clock className="w-4 h-4" />
                                {blog.readTime} min read
                              </div>
                            </div>

                            {/* Stats & Actions */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {blog.views.toLocaleString()}
                                </div>
                                <button
                                  onClick={() => toggleLike(blog.id)}
                                  className="flex items-center gap-1 hover:text-red-500 transition-colors"
                                >
                                  <Heart
                                    className={`w-4 h-4 ${likedPosts.includes(blog.id) ? 'fill-red-500 text-red-500' : ''}`}
                                  />
                                  {blog.likes + (likedPosts.includes(blog.id) ? 1 : 0)}
                                </button>
                              </div>
                              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#ffcc00] transition-colors" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>

              {/* Load More */}
              {filteredBlogs.length >= 12 && (
                <div className="mt-12 text-center">
                  <Button className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 px-8 py-6 rounded-xl text-lg font-medium">
                    Load More Insights
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#170d43] via-[#1a1448] to-[#0f1419]">
        <div className="container-custom max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-lg">📧</span>
            <span className="text-sm font-medium text-white">Stay Informed</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Never Miss an Insight</h2>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join 50,000+ professionals who receive our weekly digest of the most important tech
            news, analysis, and insights from across Africa.
          </p>

          <div className="max-w-lg mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent"
                />
              </div>
              <Button className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-shadow">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              No spam, ever. Unsubscribe anytime. Read our{' '}
              <a href="#" className="text-[#ffcc00] hover:text-amber-400">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
