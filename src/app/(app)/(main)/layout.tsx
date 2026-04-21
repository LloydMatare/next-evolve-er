import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import React from 'react'

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell relative z-0">
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
