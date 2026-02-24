import { CollectionConfig } from 'payload'

export const SpeakerApplications: CollectionConfig = {
  slug: 'speaker-applications',
  labels: {
    singular: 'Speaker Application',
    plural: 'Speaker Applications',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'organization', 'createdAt'],
    group: 'Events',
  },
  access: {
    read: () => false,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
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
      label: 'Designation / Title',
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
      name: 'session',
      type: 'group',
      label: 'Proposed Session',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Session Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Session Description',
        },
      ],
    },
  ],
  timestamps: true,
}
