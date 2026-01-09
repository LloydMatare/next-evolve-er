//@ts-nocheck
'use client'

import {
  Calendar,
  User,
  Clock,
  Tag,
  ArrowLeft,
  Share2,
  Bookmark,
  Eye,
  Heart,
  MessageCircle,
  Printer,
  Copy,
  Check,
  TrendingUp,
  ArrowRight,
  Twitter,
  Linkedin,
  Facebook,
  BookOpen,
  Sparkles,
  Target,
} from 'lucide-react'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'

// Define the RichText type
type RichTextNode = {
  children?: RichTextNode[]
  type?: string
  text?: string
  url?: string
  [key: string]: any
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: {
    root: {
      children: RichTextNode[]
      type: 'root'
    }
  }
  featuredImage: {
    url: string
    alt?: string
  }
  authorName: string
  authorTitle?: string
  authorBio?: string
  authorAvatar?: string
  category: string
  tags: Array<{ tag: string }>
  readTime: number
  publishedAt: string
  featured: boolean
  trending: boolean
  views: number
  likes: number
  comments: number
  metaTitle?: string
  metaDescription?: string
}

// Helper function to render rich text content
const renderRichText = (node: RichTextNode): React.ReactNode => {
  if (!node) return null

  // Handle text nodes
  if (node.text !== undefined) {
    let element: React.ReactNode = node.text

    // Apply text formatting
    if (node.bold) {
      element = <strong key={Math.random()}>{element}</strong>
    }
    if (node.italic) {
      element = <em key={Math.random()}>{element}</em>
    }
    if (node.underline) {
      element = <u key={Math.random()}>{element}</u>
    }
    if (node.strikethrough) {
      element = <s key={Math.random()}>{element}</s>
    }
    if (node.code) {
      element = (
        <code key={Math.random()} className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
          {element}
        </code>
      )
    }

    return element
  }

  // Handle different element types
  switch (node.type) {
    case 'heading':
      const level = node.level || 1
      const Tag = `h${level}` as keyof JSX.IntrinsicElements
      return (
        <Tag
          key={Math.random()}
          className={`mt-8 mb-4 scroll-mt-20 ${level === 1 ? 'text-4xl' : level === 2 ? 'text-3xl' : level === 3 ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 leading-tight`}
        >
          {node.children?.map(renderRichText)}
        </Tag>
      )

    case 'paragraph':
      return (
        <p key={Math.random()} className="mb-6 text-gray-700 leading-relaxed text-lg">
          {node.children?.map(renderRichText)}
        </p>
      )

    case 'blockquote':
      return (
        <blockquote
          key={Math.random()}
          className="my-8 pl-6 border-l-4 border-[#ffcc00] italic text-gray-600 text-xl"
        >
          {node.children?.map(renderRichText)}
        </blockquote>
      )

    case 'list':
      const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
      return (
        <ListTag
          key={Math.random()}
          className={`my-6 ${node.listType === 'bullet' ? 'list-disc' : 'list-decimal'} ml-8 space-y-2`}
        >
          {node.children?.map(renderRichText)}
        </ListTag>
      )

    case 'list-item':
      return (
        <li key={Math.random()} className="text-gray-700 leading-relaxed">
          {node.children?.map(renderRichText)}
        </li>
      )

    case 'link':
      return (
        <a
          key={Math.random()}
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#ffcc00] hover:text-amber-600 underline font-medium"
        >
          {node.children?.map(renderRichText)}
        </a>
      )

    default:
      // Recursively render children for other node types
      if (node.children) {
        return <div key={Math.random()}>{node.children.map(renderRichText)}</div>
      }
      return null
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([])
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [readingTime, setReadingTime] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (params.slug) {
      fetchBlogPost(params.slug as string)
    }
  }, [params.slug])

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const windowScroll = window.pageYOffset
      setProgress((windowScroll / totalHeight) * 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fetchBlogPost = async (slug: string) => {
    try {
      setLoading(true)
      setError(null)

      // First, try to fetch the specific blog post
      const response = await fetch(`/api/blogs?where[slug][equals]=${slug}&limit=1`)

      if (!response.ok) {
        throw new Error('Failed to fetch blog post')
      }

      const data = await response.json()

      if (data.docs && data.docs.length > 0) {
        const blogData = data.docs[0]
        const transformedBlog: BlogPost = {
          ...blogData,
          featuredImage: {
            url: blogData.featuredImage?.url || '/placeholder.png',
            alt: blogData.featuredImage?.alt || blogData.title,
          },
          publishedAt: format(new Date(blogData.publishedAt), 'MMMM dd, yyyy'),
          likes: blogData.likes || Math.floor(Math.random() * 500),
          comments: blogData.comments || Math.floor(Math.random() * 50),
          trending: Math.random() > 0.7,
        }
        setBlog(transformedBlog)
        calculateReadingTime(transformedBlog.content)

        // Fetch related blogs (same category)
        if (blogData.category) {
          fetchRelatedBlogs(blogData.category, blogData.id)
        }
      } else {
        throw new Error('Blog post not found')
      }
    } catch (err: any) {
      console.error('Error fetching blog post:', err)
      setError(err.message || 'Failed to load blog post')
    } finally {
      setLoading(false)
    }
  }

  const calculateReadingTime = (content: any) => {
    const wordsPerMinute = 200
    let wordCount = 0

    const countWords = (node: any) => {
      if (node.text) {
        wordCount += node.text.split(' ').length
      }
      if (node.children) {
        node.children.forEach(countWords)
      }
    }

    if (content?.root?.children) {
      content.root.children.forEach(countWords)
      setReadingTime(Math.ceil(wordCount / wordsPerMinute))
    }
  }

  const fetchRelatedBlogs = async (category: string, currentId: string) => {
    try {
      const response = await fetch(
        `/api/blogs?where[category][equals]=${category}&where[id][not_equals]=${currentId}&limit=3&sort=-publishedAt&where[status][equals]=published`,
      )

      if (response.ok) {
        const data = await response.json()
        if (data.docs) {
          const transformedBlogs = data.docs.map((blog: any) => ({
            ...blog,
            featuredImage: {
              url: blog.featuredImage?.url || '/placeholder.png',
              alt: blog.featuredImage?.alt || blog.title,
            },
            publishedAt: format(new Date(blog.publishedAt), 'MMMM dd, yyyy'),
          }))
          setRelatedBlogs(transformedBlogs)
        }
      }
    } catch (error) {
      console.error('Error fetching related blogs:', error)
    }
  }

  const shareBlog = (platform?: string) => {
    if (!blog) return

    const shareUrl = window.location.href
    const shareText = blog.title
    const shareDescription = blog.excerpt

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          '_blank',
        )
        break
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          '_blank',
        )
        break
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          '_blank',
        )
        break
      default:
        if (navigator.share) {
          navigator.share({
            title: shareText,
            text: shareDescription,
            url: shareUrl,
          })
        } else {
          navigator.clipboard.writeText(shareUrl)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }
    }
  }

  const printArticle = () => {
    window.print()
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'technology-trends': 'from-blue-500 to-cyan-400',
      'digital-transformation': 'from-purple-600 to-pink-500',
      'industry-insights': 'from-amber-500 to-orange-400',
      'startup-ecosystem': 'from-green-500 to-emerald-400',
      cybersecurity: 'from-red-500 to-rose-400',
      'ai-ml': 'from-indigo-500 to-purple-400',
      fintech: 'from-emerald-500 to-teal-400',
      'event-updates': 'from-cyan-500 to-sky-400',
      'success-stories': 'from-pink-500 to-rose-400',
      'policy-regulation': 'from-gray-500 to-slate-400',
    }
    return colors[category] || 'from-gray-600 to-gray-700'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="pt-32 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#ffcc00]/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-[#ffcc00] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <span className="mt-6 text-lg text-gray-600 font-medium">Loading article...</span>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-800 to-blue-950">
        <div className="pt-32 container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center">
              <span className="text-4xl">😔</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-300 mb-4">Article Not Found</h2>
            <p className="text-lg text-gray-200 mb-8">
              {error ||
                'The requested article could not be found. It may have been moved or deleted.'}
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/blogs">
                <Button className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white px-8">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Insights
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => fetchBlogPost(params.slug as string)}
                className="text-black"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#ffcc00] to-amber-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Back Navigation */}
      <div className="sticky top-0 z-40 pt-6 pb-6 px-4 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link href="/blogs">
              <Button variant="ghost" className="text-gray-600 hover:text-[#ffcc00] group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Insights
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 hidden md:inline">Share this article:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => shareBlog('twitter')}
                  className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 flex items-center justify-center transition-colors"
                  title="Share on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => shareBlog('linkedin')}
                  className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center justify-center transition-colors"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button
                  onClick={() => shareBlog('facebook')}
                  className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <button
                  onClick={() => shareBlog()}
                  className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  title="Copy link"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Hero */}
      <div className="relative pt-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-transparent" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Category & Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(blog.category)} text-white text-sm font-medium rounded-full`}
              >
                {blog.category.replace(/-/g, ' ')}
              </span>
              {blog.featured && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-400 text-white text-xs font-medium rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </span>
              )}
              {blog.trending && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-400 text-white text-xs font-medium rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Trending Now
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">{blog.excerpt}</p>

            {/* Author & Meta Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 border-y border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white text-xl font-bold">
                  {blog.authorAvatar ? (
                    <div className="w-full h-full rounded-full bg-gray-300" />
                  ) : (
                    blog.authorName?.charAt(0)
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">{blog.authorName}</h3>
                    {blog.authorTitle && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{blog.authorTitle}</span>
                      </>
                    )}
                  </div>
                  {blog.authorBio && <p className="text-gray-500 text-sm mt-1">{blog.authorBio}</p>}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">{blog.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{readingTime || blog.readTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    <span className="font-medium">{blog.views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="py-8 px-4">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="w-full h-[500px] bg-gradient-to-br from-gray-800 to-gray-900"
                style={{
                  backgroundImage: `url(${blog.featuredImage.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-8">
                <p className="text-white/90 text-sm font-medium">
                  {blog.featuredImage.alt || 'Featured image for the article'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="py-12 px-4">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <article className="lg:flex-1 max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                {blog.content?.root?.children?.map((node, index) => (
                  <div key={index} className="mb-8">
                    {renderRichText(node)}
                  </div>
                ))}
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Article Tags
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {blog.tags.map((tagObj, index) => (
                      <Link
                        key={index}
                        href={`/blogs?search=${encodeURIComponent(tagObj.tag)}`}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors"
                      >
                        #{tagObj.tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Engagement Bar */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => setLiked(!liked)}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span className="font-medium">{blog.likes + (liked ? 1 : 0)}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">{blog.comments}</span>
                    </button>
                    <button
                      onClick={() => setBookmarked(!bookmarked)}
                      className={`flex items-center gap-2 transition-colors ${bookmarked ? 'text-[#ffcc00]' : 'text-gray-600 hover:text-[#ffcc00]'}`}
                    >
                      <Bookmark className="w-5 h-5" />
                      <span className="font-medium">Save</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={printArticle}
                      variant="outline"
                      className="border-gray-300 hover:border-[#ffcc00]"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print
                    </Button>
                    <Button
                      onClick={() => shareBlog()}
                      className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Article
                    </Button>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-80 space-y-8">
              {/* Reading Progress */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Reading Progress
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#ffcc00] to-amber-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {readingTime || blog.readTime}
                      </div>
                      <div className="text-sm text-gray-500">Minutes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {blog.views.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Views</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">In This Article</h3>
                <nav className="space-y-2">
                  {blog.content?.root?.children
                    ?.filter((node: any) => node.type === 'heading' && node.level === 2)
                    .map((heading: any, index: number) => (
                      <a
                        key={index}
                        href={`#${heading.children?.[0]?.text?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        className="block py-2 text-gray-600 hover:text-[#ffcc00] transition-colors border-l-2 border-transparent hover:border-[#ffcc00] pl-3"
                      >
                        {heading.children?.[0]?.text}
                      </a>
                    ))}
                </nav>
              </div>

              {/* Share Widget */}
              <div className="bg-gradient-to-br from-[#170d43] to-[#2a1b69] rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Share This Insight</h3>
                <p className="text-gray-300 mb-6 text-sm">
                  Help others discover this valuable content by sharing it across your networks.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { platform: 'Twitter', icon: Twitter, color: 'bg-blue-500 hover:bg-blue-600' },
                    {
                      platform: 'LinkedIn',
                      icon: Linkedin,
                      color: 'bg-blue-700 hover:bg-blue-800',
                    },
                    {
                      platform: 'Facebook',
                      icon: Facebook,
                      color: 'bg-blue-600 hover:bg-blue-700',
                    },
                    { platform: 'Copy Link', icon: Copy, color: 'bg-gray-700 hover:bg-gray-800' },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.platform}
                        onClick={() =>
                          shareBlog(item.platform.toLowerCase().replace(' copy link', ''))
                        }
                        className={`${item.color} rounded-xl p-3 flex flex-col items-center justify-center transition-colors`}
                      >
                        <Icon className="w-5 h-5 mb-1" />
                        <span className="text-xs font-medium">{item.platform}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Author Bio */}
      <div className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">About the Author</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white text-2xl font-bold">
                  {blog.authorAvatar ? (
                    <div className="w-full h-full rounded-full bg-gray-300" />
                  ) : (
                    blog.authorName?.charAt(0)
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{blog.authorName}</h4>
                {blog.authorTitle && (
                  <p className="text-[#ffcc00] font-medium mb-3">{blog.authorTitle}</p>
                )}
                {blog.authorBio ? (
                  <p className="text-gray-600 mb-4">{blog.authorBio}</p>
                ) : (
                  <p className="text-gray-600 mb-4">
                    {blog.authorName} is a contributor to the Evolve ICT Summit Insights platform,
                    sharing expertise and analysis on technology trends and digital transformation
                    in Africa.
                  </p>
                )}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">Follow author:</span>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <div className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#ffcc00] to-amber-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Continue Reading</h2>
                  <p className="text-gray-600">More insights on this topic</p>
                </div>
              </div>
              <Link href="/blogs">
                <Button variant="ghost" className="text-gray-600 hover:text-[#ffcc00]">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <Link key={relatedBlog.id} href={`/blogs/${relatedBlog.slug}`} className="group">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                    <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900" />
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          {relatedBlog.category.replace(/-/g, ' ')}
                        </span>
                        <span className="text-sm text-gray-500">{relatedBlog.publishedAt}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#ffcc00] transition-colors">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{relatedBlog.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {relatedBlog.readTime} min read
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#ffcc00] transition-colors" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="py-20 px-4 bg-gradient-to-br from-[#170d43] via-[#1a1448] to-[#0f1419]">
        <div className="container-custom max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#ffcc00]" />
            <span className="text-sm font-medium text-white">Stay Updated</span>
          </div>

          <h2 className="text-4xl font-bold text-white mb-6">Get More Insights Like This</h2>

          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who receive our weekly digest of the most important tech
            analysis, trends, and insights from across Africa.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent"
                />
              </div>
              <Button className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-shadow">
                Subscribe Now
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
      </div>
    </div>
  )
}
