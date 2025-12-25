import React from 'react'
import { InteractiveHoverButton } from './InteractiveHoverButton'
import { useRouter } from 'next/navigation'

function CTA() {
  const router = useRouter()

  return (
   <section className="py-8 sm:py-12 bg-[#05719b]">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 "style={{color:"white"}}>Ready to Transform Your Business?</h2>
          <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-12 max-w-3xl mx-auto " style={{color:"white"}}>
            Let's discuss how our expertise can help you achieve financial excellence and sustainable growth.
          </p>
          <div className="flex flex-row gap-4 sm:gap-6 justify-center items-center">
            <InteractiveHoverButton 
              text="Get Started Now" 
              className="bg-theme text-white border-[#009edb]"
              onClick={() => router.push('/contact')}
            />
             <InteractiveHoverButton 
                                  text="Home" 
                                  className="w-full bg-theme text-white border-[#009edb] w-auto sm:w-auto"
                                  onClick={() => router.push('/')}
                                />

          </div>
        </div>
      </section>
  )
}

export default CTA