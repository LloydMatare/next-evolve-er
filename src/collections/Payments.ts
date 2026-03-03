// collections/Payments.ts
import { CollectionConfig } from 'payload'

export const Payments: CollectionConfig = {
  slug: 'payments',
  labels: {
    singular: 'Payment',
    plural: 'Payments',
  },
  admin: {
    useAsTitle: 'order_id', // Changed from orderId to order_id
    defaultColumns: ['order_id', 'amount', 'status', 'paymentMethod', 'createdAt'], // Changed here too
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
      name: 'order_id', // Changed from orderId to order_id
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
      name: 'paymentMethod', // This will become payment_method in the DB
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
      name: 'status', // This will become status in the DB (already matches)
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
      name: 'pollUrl', // This will become poll_url in the DB
      type: 'text',
      label: 'Poll URL',
    },
    {
      name: 'instructions', // This will become instructions in the DB (jsonb works fine)
      type: 'json',
      label: 'Payment Instructions',
    },
    {
      name: 'paidAt', // This will become paid_at in the DB
      type: 'date',
      label: 'Paid At',
    },
  ],
  timestamps: true, // This creates created_at and updated_at (matches your DB)
}