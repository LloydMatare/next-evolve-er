import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import React from 'react'

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
