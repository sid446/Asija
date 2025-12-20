import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import TeamAnimated from '@/components/TeamAnimated'
import React from 'react'
import Loader from '@/components/ui/Loader'
import Link from 'next/link'
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton'

function page() {
  return (
    <>
      <Loader pageName="Team" />
      <Navbar />
      <TeamAnimated/>

      {/* Navigation Section */}
      <section className="py-12 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <InteractiveHoverButton
                text="Home"
                className="px-6 py-3 bg-slate-700 border-slate-600 text-white"
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  )
}

export default page