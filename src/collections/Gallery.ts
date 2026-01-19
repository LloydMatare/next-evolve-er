import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'category', 'year', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Media Type',
      required: true,
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      admin: {
        position: 'sidebar',
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
        { label: 'Ceremony', value: 'Ceremony' },
        { label: 'Speeches', value: 'Speeches' },
        { label: 'Exhibition', value: 'Exhibition' },
        { label: 'Panels', value: 'Panels' },
        { label: 'Networking', value: 'Networking' },
        { label: 'Competition', value: 'Competition' },
        { label: 'Awards', value: 'Awards' },
        { label: 'Workshops', value: 'Workshops' },
        { label: 'Youth', value: 'Youth' },
        { label: 'Behind Scenes', value: 'Behind Scenes' },
        { label: 'Media', value: 'Media' },
        { label: 'Highlights', value: 'Highlights' },
      ],
    },
    {
      name: 'year',
      type: 'number',
      label: 'Year',
      required: true,
      min: 2020,
      max: 2030,
      admin: {
        step: 1,
      },
    },
    // Image-specific fields
    {
      name: 'image',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (data) => data.type === 'image',
        description: 'Upload the image file',
      },
    },
    // Video-specific fields
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
      required: true,
      admin: {
        condition: (data) => data.type === 'video',
        description: 'YouTube embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      label: 'Video Thumbnail',
      relationTo: 'media',
      admin: {
        condition: (data) => data.type === 'video',
        description: 'Custom thumbnail for the video (optional)',
      },
    },
    {
      name: 'views',
      type: 'number',
      label: 'Views',
      defaultValue: 0,
      admin: {
        condition: (data) => data.type === 'video',
        description: 'Number of views for the video',
      },
    },
    // Common engagement fields
    {
      name: 'likes',
      type: 'number',
      label: 'Likes',
      defaultValue: 0,
      admin: {
        description: 'Initial number of likes',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured',
      defaultValue: false,
      admin: {
        description: 'Mark as featured to highlight in the gallery',
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
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first',
      },
    },
  ],
}
