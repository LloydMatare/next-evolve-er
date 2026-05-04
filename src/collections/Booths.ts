//@ts-nocheck
import { CollectionConfig } from 'payload'

export const Booths: CollectionConfig = {
  slug: 'booths',
  labels: {
    singular: 'Booth',
    plural: 'Booths',
  },
  admin: {
    useAsTitle: 'boothNumber',
    defaultColumns: ['boothNumber', 'status', 'size', 'tier', 'price'],
    group: 'Exhibition',
  },
  fields: [
    {
      name: 'boothNumber',
      type: 'text',
      label: 'Booth Number',
      required: true,
      unique: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      required: true,
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Reserved', value: 'reserved' },
        { label: 'Occupied', value: 'occupied' },
        { label: 'Maintenance', value: 'maintenance' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'size',
      type: 'select',
      label: 'Booth Size',
      required: true,
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'price',
      type: 'number',
      label: 'Price (USD)',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tier',
      type: 'select',
      label: 'Tier',
      required: true,
      defaultValue: 'standard',
      options: [
        { label: 'Premium', value: 'premium' },
        { label: 'Standard', value: 'standard' },
        { label: 'Economy', value: 'economy' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'dimensions',
      type: 'group',
      label: 'Dimensions (meters)',
      fields: [
        {
          name: 'width',
          type: 'number',
          label: 'Width (m)',
          required: true,
          defaultValue: 3,
        },
        {
          name: 'depth',
          type: 'number',
          label: 'Depth (m)',
          required: true,
          defaultValue: 3,
        },
      ],
    },
    {
      name: 'position',
      type: 'group',
      label: 'Floor Plan Position',
      admin: {
        description: 'Position and size on the floor plan image',
      },
      fields: [
        {
          name: 'x',
          type: 'number',
          label: 'X Position',
          required: true,
          defaultValue: 0,
        },
        {
          name: 'y',
          type: 'number',
          label: 'Y Position',
          required: true,
          defaultValue: 0,
        },
        {
          name: 'width',
          type: 'number',
          label: 'Display Width',
          required: true,
          defaultValue: 120,
        },
        {
          name: 'height',
          type: 'number',
          label: 'Display Height',
          required: true,
          defaultValue: 80,
        },
      ],
    },
    {
      name: 'amenities',
      type: 'group',
      label: 'Amenities',
      fields: [
        {
          name: 'power',
          type: 'checkbox',
          label: 'Power Supply',
          defaultValue: true,
        },
        {
          name: 'wifi',
          type: 'checkbox',
          label: 'WiFi Access',
          defaultValue: true,
        },
        {
          name: 'display',
          type: 'checkbox',
          label: 'Display Screen',
          defaultValue: false,
        },
        {
          name: 'furniture',
          type: 'checkbox',
          label: 'Furniture Included',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
      admin: {
        description: 'e.g., Technology, Healthcare, Finance',
      },
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company Name',
      admin: {
        description: 'Name of the company occupying this booth',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Company Logo',
      relationTo: 'media',
      admin: {
        description: 'Upload the company logo',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Company Description',
    },
    {
      name: 'website',
      type: 'text',
      label: 'Company Website',
      admin: {
        description: 'e.g., https://example.com',
      },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      label: 'Assigned To',
      relationTo: 'registrations',
      admin: {
        position: 'sidebar',
        description: 'Link to the exhibitor registration',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Admin Notes',
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
