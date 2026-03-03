// app/payment/success/page.tsx
import { Suspense } from 'react'
import PaymentSuccessContent from '../PaymentSuccessContext'


export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a] flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
            <div className="w-20 h-20 border-4 border-[#ffcc00] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-white mb-2">Loading...</h1>
            <p className="text-gray-300">Please wait...</p>
          </div>
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  )
}