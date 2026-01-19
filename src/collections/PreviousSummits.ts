import { CollectionConfig } from 'payload'

export const PreviousSummits: CollectionConfig = {
  slug: 'previous-summits',
  labels: {
    singular: 'Previous Summit',
    plural: 'Previous Summits',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'status'],
    group: 'Events',
  },
  fields: [
    {
      name: 'year',
      type: 'text',
      label: 'Summit Year',
      required: true,
      unique: true,
      admin: {
        description: 'e.g., 2025, 2024',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Summit Title',
      required: true,
      admin: {
        description: 'e.g., Summit 2025',
      },
    },
    {
      name: 'theme',
      type: 'text',
      label: 'Theme',
      required: true,
      admin: {
        description: 'Main theme of the summit',
      },
    },
    // Stats Section
    {
      name: 'stats',
      type: 'group',
      label: 'Summit Statistics',
      fields: [
        {
          name: 'delegates',
          type: 'text',
          label: 'Delegates',
          required: true,
          admin: {
            description: 'e.g., 1,500+',
          },
        },
        {
          name: 'speakers',
          type: 'text',
          label: 'Speakers',
          required: true,
          admin: {
            description: 'e.g., 50+',
          },
        },
        {
          name: 'exhibitors',
          type: 'text',
          label: 'Exhibitors',
          required: true,
          admin: {
            description: 'e.g., 80+',
          },
        },
        {
          name: 'startups',
          type: 'text',
          label: 'Startups',
          required: true,
          admin: {
            description: 'e.g., 30+',
          },
        },
        {
          name: 'countries',
          type: 'text',
          label: 'Countries',
          required: true,
          admin: {
            description: 'e.g., 25+',
          },
        },
        {
          name: 'partnerships',
          type: 'text',
          label: 'Partnerships',
          required: true,
          admin: {
            description: 'e.g., 40+',
          },
        },
        {
          name: 'days',
          type: 'text',
          label: 'Days',
          admin: {
            description: 'Number of days, e.g., 2',
          },
        },
      ],
    },
    // Highlights
    {
      name: 'highlights',
      type: 'array',
      label: 'Event Highlights',
      required: true,
      fields: [
        {
          name: 'highlight',
          type: 'text',
          label: 'Highlight',
          required: true,
        },
      ],
      admin: {
        description: 'Key highlights and memorable moments from the summit',
      },
    },
    // Themes
    {
      name: 'themes',
      type: 'array',
      label: 'Key Themes',
      required: true,
      fields: [
        {
          name: 'theme',
          type: 'text',
          label: 'Theme',
          required: true,
        },
      ],
      admin: {
        description: 'Focus areas and topics covered',
      },
    },
    // Color scheme
    {
      name: 'color',
      type: 'select',
      label: 'Gradient Color Scheme',
      required: true,
      options: [
        { label: 'Blue to Cyan', value: 'from-blue-500 to-cyan-400' },
        { label: 'Purple to Pink', value: 'from-purple-500 to-pink-400' },
        { label: 'Green to Teal', value: 'from-green-500 to-teal-400' },
        { label: 'Orange to Red', value: 'from-orange-500 to-red-400' },
        { label: 'Indigo to Purple', value: 'from-indigo-500 to-purple-400' },
      ],
      defaultValue: 'from-blue-500 to-cyan-400',
    },
    {
      name: 'gradient',
      type: 'select',
      label: 'Full Gradient',
      required: true,
      options: [
        {
          label: 'Blue Gradient',
          value: 'bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500',
        },
        {
          label: 'Purple Gradient',
          value: 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500',
        },
        {
          label: 'Green Gradient',
          value: 'bg-gradient-to-br from-green-500 via-green-600 to-teal-500',
        },
        {
          label: 'Orange Gradient',
          value: 'bg-gradient-to-br from-orange-500 via-orange-600 to-red-500',
        },
        {
          label: 'Indigo Gradient',
          value: 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-500',
        },
      ],
      defaultValue: 'bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500',
    },
    // Media Section - Images
    {
      name: 'images',
      type: 'array',
      label: 'Photo Gallery',
      fields: [
        {
          name: 'image',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'category',
          type: 'select',
          label: 'Category',
          required: true,
          options: [
            { label: 'Ceremony', value: 'Ceremony' },
            { label: 'Speeches', value: 'Speeches' },
            { label: 'Exhibition', value: 'Exhibition' },
            { label: 'Panels', value: 'Panels' },
            { label: 'Networking', value: 'Networking' },
            { label: 'Competition', value: 'Competition' },
            { label: 'Awards', value: 'Awards' },
            { label: 'Workshops', value: 'Workshops' },
          ],
        },
        {
          name: 'likes',
          type: 'number',
          label: 'Initial Likes',
          defaultValue: 0,
          admin: {
            description: 'Starting number of likes (for display purposes)',
          },
        },
      ],
      admin: {
        description: 'Images from the summit',
      },
    },
    // Media Section - Videos
    {
      name: 'videos',
      type: 'array',
      label: 'Video Gallery',
      fields: [
        {
          name: 'thumbnail',
          type: 'upload',
          label: 'Thumbnail',
          relationTo: 'media',
        },
        {
          name: 'videoUrl',
          type: 'text',
          label: 'Video URL',
          required: true,
          admin: {
            description: 'YouTube embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'category',
          type: 'select',
          label: 'Category',
          required: true,
          options: [
            { label: 'Highlights', value: 'Highlights' },
            { label: 'Speeches', value: 'Speeches' },
            { label: 'Panels', value: 'Panels' },
            { label: 'Exhibition', value: 'Exhibition' },
            { label: 'Competition', value: 'Competition' },
            { label: 'Interviews', value: 'Interviews' },
          ],
        },
        {
          name: 'likes',
          type: 'number',
          label: 'Initial Likes',
          defaultValue: 0,
          admin: {
            description: 'Starting number of likes (for display purposes)',
          },
        },
      ],
      admin: {
        description: 'Videos from the summit',
      },
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
      defaultValue: 'published',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      admin: {
        position: 'sidebar',
        description: 'Higher numbers appear first (most recent)',
      },
      defaultValue: 0,
    },
  ],
  timestamps: true,
  access: {
    read: ({ req }) => {
      // Public can only read published summits
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
