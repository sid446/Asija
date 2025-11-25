import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import TeamAnimated from '@/components/TeamAnimated'
import React from 'react'
import Loader from '@/components/ui/Loader'

function page() {
  return (
    <>
      <Loader pageName="Team" />
      <Navbar />
      <TeamAnimated/>
      <Footer/>
    </> 
  )
}

export default page