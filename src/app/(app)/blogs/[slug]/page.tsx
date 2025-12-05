//@ts-nocheck
'use client'

import { Navbar } from '@/components/navbar'
import { Calendar, User, Clock, Tag, ArrowLeft, Share2, Bookmark, Eye } from 'lucide-react'
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
  category: string
  tags: Array<{ tag: string }>
  readTime: number
  publishedAt: string
  featured: boolean
  views: number
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
      element = <code key={Math.random()}>{element}</code>
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
          className={`mt-6 mb-4 ${level === 1 ? 'text-3xl' : level === 2 ? 'text-2xl' : 'text-xl'} font-bold`}
        >
          {node.children?.map(renderRichText)}
        </Tag>
      )

    case 'paragraph':
      return (
        <p key={Math.random()} className="mb-4 leading-relaxed">
          {node.children?.map(renderRichText)}
        </p>
      )

    case 'list':
      const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
      return (
        <ListTag
          key={Math.random()}
          className={`mb-4 ${node.listType === 'bullet' ? 'list-disc' : 'list-decimal'} ml-6`}
        >
          {node.children?.map(renderRichText)}
        </ListTag>
      )

    case 'list-item':
      return (
        <li key={Math.random()} className="mb-2">
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
          className="text-[#ffcc00] hover:text-[#ec7211] underline"
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

  useEffect(() => {
    if (params.slug) {
      fetchBlogPost(params.slug as string)
    }
  }, [params.slug])

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
        }
        setBlog(transformedBlog)

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

  const shareBlog = () => {
    if (navigator.share && blog) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      })
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffcc00]"></div>
          <span className="mt-4 text-gray-600">Loading blog post...</span>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 container-custom">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Blog Post Not Found</h2>
            <p className="text-gray-600 mb-6">
              {error || 'The requested blog post could not be found.'}
            </p>
            <Link href="/blogs">
              <Button className="bg-[#ffcc00] hover:bg-[#ec7211]">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Back Navigation */}
      <div className="pt-24 pb-6 px-4 bg-gray-50">
        <div className="container-custom">
          <Link href="/blogs">
            <Button variant="ghost" className="text-gray-600 hover:text-[#ffcc00]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Blogs
            </Button>
          </Link>
        </div>
      </div>

      {/* Blog Header */}
      <div className="relative py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-[#ffcc00] text-white text-sm font-medium rounded-full">
                <Tag className="w-4 h-4 mr-2" />
                {blog.category.replace(/-/g, ' ')}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{blog.title}</h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{blog.excerpt}</p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-gray-200">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-900">{blog.authorName}</p>
                    {blog.authorTitle && (
                      <p className="text-sm text-gray-500">{blog.authorTitle}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {blog.publishedAt}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {blog.readTime} min read
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    {blog.views} views
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <Button
                  onClick={shareBlog}
                  variant="outline"
                  className="border-gray-300 hover:border-[#ffcc00]"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="border-gray-300 hover:border-[#ffcc00]">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="py-8 px-4">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <div
                className="w-full h-96 bg-gray-200"
                style={{
                  backgroundImage: `url(${blog.featuredImage.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Blog Content */}
      <div className="py-12 px-4">
        <div className="container-custom max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">
            {blog.content?.root?.children?.map((node, index) => (
              <div key={index}>{renderRichText(node)}</div>
            ))}
          </article>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tagObj, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    #{tagObj.tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <div className="py-12 px-4 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <Link key={relatedBlog.id} href={`/blogs/${relatedBlog.slug}`} className="group">
                  <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gray-200" />
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#ffcc00] transition-colors">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {relatedBlog.publishedAt} • {relatedBlog.readTime} min read
                      </p>
                      <p className="text-gray-600 text-sm">
                        {relatedBlog.excerpt.substring(0, 100)}...
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="py-16 px-4 bg-gradient-to-r from-[#170d43] to-[#0f1419]">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Enjoyed This Article?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive more insightful content like this directly in
            your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent"
              />
              <Button className="bg-[#ffcc00] hover:bg-[#ec7211] text-white px-8">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
