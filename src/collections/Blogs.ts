import { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  labels: {
    singular: 'Blog',
    plural: 'Blogs',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'status', 'publishedAt'],
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Blog Title',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly version of the title (e.g., digital-transformation-africa)',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt',
      required: true,
      admin: {
        description: 'Short summary of the blog post (2-3 sentences)',
      },
    },
    // Remove the old content field and use this simpler one:
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      label: 'Featured Image',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      label: 'Author',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'authorName',
      type: 'text',
      label: 'Author Name (display)',
      required: true,
      admin: {
        description: 'Name to display publicly (can be different from user account)',
      },
    },
    {
      name: 'authorTitle',
      type: 'text',
      label: 'Author Title',
      admin: {
        description: 'e.g., Senior Editor, Tech Writer, etc.',
      },
    },
    {
      name: 'authorBio',
      type: 'textarea',
      label: 'Author Bio',
      admin: {
        description: 'Brief biography of the author',
      },
    },
    {
      name: 'authorAvatar',
      type: 'upload',
      label: 'Author Avatar',
      relationTo: 'media',
      admin: {
        description: 'Profile picture of the author',
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      required: true,
      options: [
        { label: 'Technology Trends', value: 'technology-trends' },
        { label: 'Digital Transformation', value: 'digital-transformation' },
        { label: 'Industry Insights', value: 'industry-insights' },
        { label: 'Startup Ecosystem', value: 'startup-ecosystem' },
        { label: 'Cybersecurity', value: 'cybersecurity' },
        { label: 'AI & Machine Learning', value: 'ai-ml' },
        { label: 'Fintech', value: 'fintech' },
        { label: 'Event Updates', value: 'event-updates' },
        { label: 'Success Stories', value: 'success-stories' },
        { label: 'Policy & Regulation', value: 'policy-regulation' },
      ],
      defaultValue: 'technology-trends',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
        },
      ],
      admin: {
        description: 'Add relevant keywords for better discoverability',
      },
    },
    {
      name: 'readTime',
      type: 'number',
      label: 'Read Time (minutes)',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Estimated reading time in minutes',
      },
      defaultValue: 5,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      required: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published Date',
      admin: {
        position: 'sidebar',
        description: 'Date when the blog post will be/was published',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MMM dd, yyyy',
        },
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Post',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'trending',
      type: 'checkbox',
      label: 'Trending Post',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Mark as trending to highlight on the blog page',
      },
    },
    {
      name: 'likes',
      type: 'number',
      label: 'Likes',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'comments',
      type: 'number',
      label: 'Comments Count',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
      admin: {
        description: 'Title for SEO purposes (optional)',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
      admin: {
        description: 'Description for SEO purposes (optional)',
      },
    },
    {
      name: 'views',
      type: 'number',
      label: 'Views',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      defaultValue: 0,
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          // Set published date to current date if not provided and status is published
          if (data.status === 'published' && !data.publishedAt) {
            data.publishedAt = new Date().toISOString()
          }

          // Generate slug from title if not provided
          if (data.title && !data.slug) {
            data.slug = data.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          }

          // Set default author name if not provided
          if (!data.authorName) {
            data.authorName = 'Evolve Team'
          }
        }

        return data
      },
    ],
  },
  access: {
    read: ({ req }) => {
      // Public can only read published blogs
      if (req.user) {
        return true // Admins can read all
      }
      return {
        status: {
          equals: 'published',
        },
      }
    },
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
}
