import React from 'react'

function CTA() {
  return (
   <section className="py-8 sm:py-12 bg-[#265B4D]">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">Ready to Transform Your Business?</h2>
          <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-12 max-w-3xl mx-auto text-gray-300">
            Let's discuss how our expertise can help you achieve financial excellence and sustainable growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#1DCD9F] hover:bg-[#19b892] text-black font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all transform hover:scale-105 shadow-2xl">
              Get Started Now
              <svg className="w-4 sm:w-6 h-4 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="tel:+911234567890" className="inline-flex items-center justify-center gap-2 sm:gap-3 border-2 border-[#1DCD9F] text-[#1DCD9F] hover:bg-[#1DCD9F] hover:text-black font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all">
              Call Us Today
            </a>
          </div>
        </div>
      </section>
  )
}

export default CTA