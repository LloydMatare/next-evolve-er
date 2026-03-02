// collections/Payments.ts
import { CollectionConfig } from 'payload'

export const Payments: CollectionConfig = {
  slug: 'payments',
  labels: {
    singular: 'Payment',
    plural: 'Payments',
  },
  admin: {
    useAsTitle: 'orderId',
    defaultColumns: ['orderId', 'amount', 'status', 'paymentMethod', 'createdAt'],
    group: 'Registrations',
  },
  fields: [
    {
      name: 'registration',
      type: 'relationship',
      relationTo: 'registrations',
      required: true,
    },
    {
      name: 'orderId',
      type: 'text',
      label: 'Order ID',
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      label: 'Amount (USD)',
      required: true,
    },
    {
      name: 'currency',
      type: 'text',
      label: 'Currency',
      defaultValue: 'USD',
      required: true,
    },
    {
      name: 'paymentMethod',
      type: 'select',
      label: 'Payment Method',
      required: true,
      options: [
        { label: 'Paynow', value: 'paynow' },
        { label: 'Credit/Debit Card', value: 'card' },
        { label: 'Mobile Money', value: 'mobile' },
        { label: 'Bank Transfer', value: 'bank' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Payment Status',
      required: true,
      options: [
        { label: 'Initiated', value: 'initiated' },
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'pollUrl',
      type: 'text',
      label: 'Poll URL',
    },
    {
      name: 'instructions',
      type: 'json',
      label: 'Payment Instructions',
    },
    {
      name: 'paidAt',
      type: 'date',
      label: 'Paid At',
    },
  ],
  timestamps: true,
}
