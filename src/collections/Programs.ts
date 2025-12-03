import { CollectionConfig } from 'payload'

export const Programs: CollectionConfig = {
  slug: 'programs',
  labels: {
    singular: 'Program',
    plural: 'Programs',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'day', 'time', 'type', 'track', 'featured'],
    group: 'Events',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Session Title',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
    },
    {
      name: 'day',
      type: 'select',
      label: 'Day',
      required: true,
      options: [
        { label: 'Day 1 - June 11, 2026', value: 'day-1' },
        { label: 'Day 2 - June 12, 2026', value: 'day-2' },
      ],
      defaultValue: 'day-1',
    },
    {
      name: 'date',
      type: 'date',
      label: 'Date',
      admin: {
        description: 'Specific date of the session',
      },
    },
    {
      name: 'startTime',
      type: 'text',
      label: 'Start Time (HH:MM)',
      required: true,
    },
    {
      name: 'endTime',
      type: 'text',
      label: 'End Time (HH:MM)',
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duration',
      required: true,
      admin: {
        description: 'e.g., 1h, 30m, 1.5h',
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Session Type',
      required: true,
      options: [
        { label: 'Keynote', value: 'keynote' },
        { label: 'Panel Discussion', value: 'panel' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Expert Talk', value: 'talk' },
        { label: 'Networking', value: 'networking' },
        { label: 'Registration', value: 'registration' },
        { label: 'Opening', value: 'opening' },
        { label: 'Closing', value: 'closing' },
        { label: 'Lunch', value: 'lunch' },
        { label: 'Break', value: 'break' },
      ],
    },
    {
      name: 'track',
      type: 'select',
      label: 'Track',
      options: [
        { label: 'Main Stage', value: 'main' },
        { label: 'AI Track', value: 'ai' },
        { label: 'Security Track', value: 'security' },
        { label: 'Cloud Track', value: 'cloud' },
        { label: 'Fintech Track', value: 'fintech' },
        { label: 'Entrepreneurship Track', value: 'entrepreneurship' },
        { label: 'Social Event', value: 'social' },
      ],
    },
    {
      name: 'speaker',
      type: 'relationship',
      label: 'Speaker',
      relationTo: 'speakers', // You'll need to create a Speakers collection
      hasMany: false,
      admin: {
        condition: (data) =>
          data.type !== 'break' && data.type !== 'lunch' && data.type !== 'registration',
      },
    },
    {
      name: 'speakerName',
      type: 'text',
      label: 'Speaker Name (if not in system)',
      admin: {
        condition: (data) =>
          data.type !== 'break' && data.type !== 'lunch' && data.type !== 'registration',
      },
    },
    {
      name: 'speakerTitle',
      type: 'text',
      label: 'Speaker Title/Organization',
      admin: {
        condition: (data) =>
          data.type !== 'break' && data.type !== 'lunch' && data.type !== 'registration',
      },
    },
    {
      name: 'venue',
      type: 'select',
      label: 'Venue',
      required: true,
      options: [
        { label: 'Main Auditorium', value: 'main-auditorium' },
        { label: 'Conference Room A', value: 'room-a' },
        { label: 'Conference Room B', value: 'room-b' },
        { label: 'Conference Room C', value: 'room-c' },
        { label: 'Exhibition Hall', value: 'exhibition-hall' },
        { label: 'Dining Hall', value: 'dining-hall' },
        { label: 'Networking Lounge', value: 'networking-lounge' },
        { label: 'Grand Ballroom', value: 'grand-ballroom' },
        { label: 'Main Lobby', value: 'main-lobby' },
      ],
    },
    {
      name: 'capacity',
      type: 'text',
      label: 'Capacity',
      admin: {
        description: 'e.g., All attendees, 500 attendees, Invitation only',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Session',
      defaultValue: false,
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color Theme',
      options: [
        { label: 'Blue', value: 'bg-blue-50 border-blue-200' },
        { label: 'Purple', value: 'bg-purple-50 border-purple-200' },
        { label: 'Amber', value: 'bg-amber-50 border-amber-200' },
        { label: 'Green', value: 'bg-green-50 border-green-200' },
        { label: 'Red', value: 'bg-red-50 border-red-200' },
        { label: 'Indigo', value: 'bg-indigo-50 border-indigo-200' },
        { label: 'Yellow', value: 'bg-yellow-50 border-yellow-200' },
        { label: 'Gray', value: 'bg-gray-50 border-gray-200' },
        { label: 'Cyan', value: 'bg-cyan-50 border-cyan-200' },
      ],
      defaultValue: 'bg-gray-50 border-gray-200',
    },
    {
      name: 'registrationLink',
      type: 'text',
      label: 'Registration Link',
      admin: {
        description: 'Link for session registration (optional)',
      },
    },
    {
      name: 'materials',
      type: 'array',
      label: 'Session Materials',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Material Title',
        },
        {
          name: 'file',
          type: 'upload',
          label: 'File',
          relationTo: 'media',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal Notes',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first',
      },
      defaultValue: 0,
    },
  ],
  timestamps: true,
  access: {
    read: () => true, // Public access
    create: ({ req }) => !!req.user, // Only admins can create
    update: ({ req }) => !!req.user, // Only admins can update
    delete: ({ req }) => !!req.user, // Only admins can delete
  },
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          // Format time for display
          if (data.startTime && data.endTime) {
            data.time = `${data.startTime} - ${data.endTime}`
          }

          // Generate display order if not provided
          if (!data.order) {
            data.order = 0
          }
        }
        return data
      },
    ],
  },
}
