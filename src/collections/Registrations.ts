//@ts-nocheck
import { CollectionConfig } from 'payload'

export const Registrations: CollectionConfig = {
  slug: 'registrations',
  labels: {
    singular: 'Registration',
    plural: 'Registrations',
  },
  admin: {
    useAsTitle: 'orderId', // Changed from 'email' to 'orderId'
    defaultColumns: ['orderId', 'type', 'status', 'amount', 'createdAt'],
    group: 'Registrations',
  },
  fields: [
    // Add email field at root level for admin useAsTitle
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Registration Type',
      required: true,
      options: [
        { label: 'Attendee', value: 'attendee' },
        { label: 'Sponsor', value: 'sponsor' },
        { label: 'Exhibitor', value: 'exhibitor' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Registration Status',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Paid', value: 'paid' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'orderId',
      type: 'text',
      label: 'Order ID',
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'amount',
      type: 'number',
      label: 'Amount (USD)',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'paymentMethod',
      type: 'select',
      label: 'Payment Method',
      options: [
        { label: 'Credit/Debit Card', value: 'card' },
        { label: 'Mobile Money', value: 'mobile' },
        { label: 'Bank Transfer', value: 'bank' },
        { label: 'Pending', value: 'pending' },
      ],
      defaultValue: 'pending',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'attendeeDetails',
      type: 'group',
      label: 'Attendee Details',
      admin: {
        condition: (data) => data.type === 'attendee',
      },
      fields: [
        {
          name: 'fullName',
          type: 'text',
          label: 'Full Name',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          required: true,
        },
        {
          name: 'organization',
          type: 'text',
          label: 'Organization',
          required: true,
        },
        {
          name: 'position',
          type: 'text',
          label: 'Position',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          label: 'Country',
          required: true,
        },
        {
          name: 'ticketType',
          type: 'select',
          label: 'Ticket Type',
          required: true,
          options: [
            { label: 'Early Bird 1', value: 'early-bird-1' },
            { label: 'Early Bird 2', value: 'early-bird-2' },
            { label: 'Regular', value: 'regular' },
          ],
        },
        {
          name: 'dietaryRestrictions',
          type: 'textarea',
          label: 'Dietary Restrictions',
        },
      ],
    },
    {
      name: 'sponsorDetails',
      type: 'group',
      label: 'Sponsor Details',
      admin: {
        condition: (data) => data.type === 'sponsor',
      },
      fields: [
        {
          name: 'companyName',
          type: 'text',
          label: 'Company Name',
          required: true,
        },
        {
          name: 'contactPerson',
          type: 'text',
          label: 'Contact Person',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          required: true,
        },
        {
          name: 'website',
          type: 'text',
          label: 'Website',
        },
        {
          name: 'sponsorshipTier',
          type: 'select',
          label: 'Sponsorship Tier',
          required: true,
          options: [
            { label: 'Platinum', value: 'platinum' },
            { label: 'Gold', value: 'gold' },
            { label: 'Silver', value: 'silver' },
            { label: 'Bronze', value: 'bronze' },
          ],
        },
        {
          name: 'companyDescription',
          type: 'textarea',
          label: 'Company Description',
          required: true,
        },
        {
          name: 'numberOfTeamMembers',
          type: 'number',
          label: 'Number of Team Members',
          required: true,
        },
        {
          name: 'teamMembers',
          type: 'textarea',
          label: 'Team Members Details',
          required: true,
        },
        {
          name: 'interestedInBooth',
          type: 'checkbox',
          label: 'Interested in Exhibition Booth',
        },
      ],
    },
    {
      name: 'exhibitorDetails',
      type: 'group',
      label: 'Exhibitor Details',
      admin: {
        condition: (data) => data.type === 'exhibitor',
      },
      fields: [
        {
          name: 'companyName',
          type: 'text',
          label: 'Company Name',
          required: true,
        },
        {
          name: 'contactPerson',
          type: 'text',
          label: 'Contact Person',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          required: true,
        },
        {
          name: 'website',
          type: 'text',
          label: 'Website',
        },
        {
          name: 'industry',
          type: 'text',
          label: 'Industry',
          required: true,
        },
        {
          name: 'productsServices',
          type: 'textarea',
          label: 'Products/Services',
          required: true,
        },
        {
          name: 'boothSize',
          type: 'select',
          label: 'Booth Size',
          required: true,
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
        },
        {
          name: 'boothNumber',
          type: 'text',
          label: 'Booth Number',
        },
        {
          name: 'numberOfTeamMembers',
          type: 'number',
          label: 'Number of Team Members',
          required: true,
        },
        {
          name: 'teamMembers',
          type: 'textarea',
          label: 'Team Members',
          required: true,
        },
        {
          name: 'specialRequirements',
          type: 'textarea',
          label: 'Special Requirements',
        },
      ],
    },
    {
      name: 'qrCode',
      type: 'upload',
      label: 'QR Code',
      relationTo: 'media',
      admin: {
        condition: (data) => data.status === 'approved',
      },
    },
    {
      name: 'paymentProof',
      type: 'upload',
      label: 'Payment Proof',
      relationTo: 'media',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Admin Notes',
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create') {
          // Generate order ID
          const orderId =
            'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase()
          data.orderId = orderId

          // Set default status
          if (!data.status) {
            data.status = 'pending'
          }

          // Set default payment method if not provided
          if (!data.paymentMethod) {
            data.paymentMethod = 'pending'
          }
        }
        return data
      },
    ],
  },
  access: {
    read: ({ req }) => {
      // Users can read their own registrations
      if (req.user) {
        return true
      }
      // Public read access for exhibitors with paid status
      return {
        or: [
          {
            status: {
              equals: 'approved',
            },
          },
          {
            and: [
              {
                type: {
                  equals: 'exhibitor',
                },
              },
              {
                status: {
                  equals: 'paid',
                },
              },
            ],
          },
        ],
      }
    },
    create: () => true, // Everyone can create registrations
    update: ({ req }) => {
      // Only admins can update
      return !!req.user
    },
    delete: ({ req }) => {
      // Only admins can delete
      return !!req.user
    },
  },
}
