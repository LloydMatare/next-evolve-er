import type { CollectionConfig } from 'payload'

export const SchoolSummit: CollectionConfig = {
  slug: 'school-summit',
  labels: {
    singular: 'School Summit Content',
    plural: 'School Summit Contents',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'section', 'status'],
    group: 'Events',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'section',
      type: 'select',
      label: 'Section',
      required: true,
      options: [
        { label: 'Objectives', value: 'objectives' },
        { label: 'Sub-Themes', value: 'sub-themes' },
        { label: 'Target Audience', value: 'target-audience' },
        { label: 'Why Attend', value: 'why-attend' },
        { label: 'Programme Highlights', value: 'programme-highlights' },
        { label: 'Expected Outcomes', value: 'expected-outcomes' },
        { label: 'Featured Cards', value: 'featured-cards' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
    },
    // For objectives section
    {
      name: 'objectiveIcon',
      type: 'select',
      label: 'Objective Icon',
      admin: {
        condition: (data) => data.section === 'objectives',
      },
      options: [
        { label: 'Cpu', value: 'cpu' },
        { label: 'Briefcase', value: 'briefcase' },
        { label: 'Lightbulb', value: 'lightbulb' },
        { label: 'HeartHandshake', value: 'heart-handshake' },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      label: 'Skills (for Objectives)',
      admin: {
        condition: (data) => data.section === 'objectives',
      },
      fields: [
        {
          name: 'skill',
          type: 'text',
          label: 'Skill',
          required: true,
        },
      ],
    },
    // For featured cards
    {
      name: 'cardImage',
      type: 'upload',
      label: 'Card Image',
      relationTo: 'media',
      admin: {
        condition: (data) => data.section === 'featured-cards',
      },
    },
    {
      name: 'cardVideo',
      type: 'text',
      label: 'Card Video URL',
      admin: {
        condition: (data) => data.section === 'featured-cards',
        description: 'YouTube embed URL or video URL',
      },
    },
    {
      name: 'videoType',
      type: 'select',
      label: 'Video Type',
      admin: {
        condition: (data) => data.section === 'featured-cards' && data.cardVideo,
      },
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Direct URL', value: 'direct' },
      ],
    },
    {
      name: 'cardLink',
      type: 'text',
      label: 'Card Link',
      admin: {
        condition: (data) => data.section === 'featured-cards',
        description: 'URL to link to when card is clicked',
      },
    },
    // Common fields
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
  ],
}
