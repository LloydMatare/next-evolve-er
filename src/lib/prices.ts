// lib/prices.ts
export const PRICES = {
  ATTENDEE: {
    REGULAR: 250, // Standard rate
  },
  SPONSOR: {
    PLATINUM: 15000,
    GOLD: 10000,
    SILVER: 7500,
    BRONZE: 5000,
  },
  EXHIBITOR: {
    LARGE: 1000, // Exhibitors booth
  },
} as const
