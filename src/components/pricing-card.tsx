import React from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

interface PricingCardProps {
  title: string
  price: string
  period: string
  features: string[]
  highlighted?: boolean
}

export function PricingCard({ title, price, period, features, highlighted }: PricingCardProps) {
  return (
    <div
      className={`relative rounded-sm p-8 transition-all duration-200 ${
        highlighted
          ? 'bg-[#232f3e] border-2 border-[#ff9900] shadow-lg'
          : 'bg-white border border-gray-200 hover:shadow-md'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[#ff9900] text-white px-4 py-1 rounded-sm text-xs font-bold uppercase tracking-wide">
            Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className={`text-xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-[#232f3e]'}`}>
          {title}
        </h3>
        <p className={`text-sm ${highlighted ? 'text-gray-400' : 'text-gray-600'}`}>{period}</p>
      </div>

      <div className="text-center mb-8">
        <span className={`text-5xl font-bold ${highlighted ? 'text-[#ff9900]' : 'text-[#232f3e]'}`}>
          ${price}
        </span>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check
              className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${highlighted ? 'text-[#ff9900]' : 'text-green-600'}`}
            />
            <span
              className={`text-sm ${highlighted ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button
        className={`w-full rounded-sm font-semibold ${
          highlighted
            ? 'bg-[#ff9900] hover:bg-[#ec7211] text-white'
            : 'bg-[#232f3e] hover:bg-[#161e2e] text-white'
        }`}
      >
        Buy Ticket
      </Button>
    </div>
  )
}
