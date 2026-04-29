import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      label: 'Role',
      required: true,
      options: [
        { label: 'Summit Director', value: 'Summit Director' },
        { label: 'Program Coordinator', value: 'Program Coordinator' },
        { label: 'Logistics Manager', value: 'Logistics Manager' },
        { label: 'Marketing Lead', value: 'Marketing Lead' },
        { label: 'Technical Director', value: 'Technical Director' },
        { label: 'Partnerships Manager', value: 'Partnerships Manager' },
      ],
    },
  ],
}
