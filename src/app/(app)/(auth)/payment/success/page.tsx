import { Suspense } from 'react'
import PaymentSuccessContent from '../PaymentSuccessContext'

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#0a051f] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 sm:p-10 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
          <div className="relative space-y-6">
            <div className="mx-auto w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20" />
              <div className="absolute inset-0 rounded-full border-4 border-t-emerald-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-400/10 to-emerald-600/10" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Loading...</h1>
              <p className="text-white/60">Please wait</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a051f] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      <Suspense fallback={<LoadingFallback />}>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  )
}
