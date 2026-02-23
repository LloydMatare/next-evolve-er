//@ts-nocheck
import { CollectionConfig } from 'payload'

export const Speakers: CollectionConfig = {
  slug: 'speakers',
  labels: {
    singular: 'Speaker',
    plural: 'Speakers',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'organization', 'designation', 'featured'],
    group: 'Events',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      label: 'Photo',
      relationTo: 'media',
    },
    {
      name: 'organization',
      type: 'text',
      label: 'Organization',
      required: true,
    },
    {
      name: 'designation',
      type: 'text',
      label: 'Designation/Title',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biography',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Speaker Category',
      options: [
        { label: 'Keynote Speaker', value: 'keynote' },
        { label: 'Panelist', value: 'panelist' },
        { label: 'Workshop Leader', value: 'workshop' },
        { label: 'Moderator', value: 'moderator' },
      ],
      defaultValue: 'panelist',
    },
    {
      name: 'expertise',
      type: 'array',
      label: 'Areas of Expertise',
      fields: [
        {
          name: 'topic',
          type: 'text',
          label: 'Topic',
        },
      ],
    },
    {
      name: 'linkedin',
      type: 'text',
      label: 'LinkedIn Profile',
    },
    {
      name: 'twitter',
      type: 'text',
      label: 'Twitter Handle',
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Speaker',
      defaultValue: false,
    },
    {
      name: 'session',
      type: 'group',
      label: 'Session Information',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Session Title',
        },
        {
          name: 'time',
          type: 'text',
          label: 'Session Time',
          placeholder: 'e.g., Day 1 • 09:30 AM',
        },
        {
          name: 'location',
          type: 'text',
          label: 'Session Location',
          placeholder: 'e.g., Main Hall A',
        },
      ],
    },
    {
      name: 'sessions',
      type: 'relationship',
      label: 'Assigned Sessions',
      relationTo: 'programs',
      hasMany: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      admin: {
        position: 'sidebar',
      },
      defaultValue: 0,
    },
  ],
  timestamps: true,
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
}
