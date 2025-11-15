'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from './TranslationProvider' // ADD THIS

function Career () {
  const { t } = useTranslation() // ADD THIS
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div ref={sectionRef} className=' min-h-screen bg-[#252525] flex flex-col items-center py-12 sm:py-16 md:py-20'>
      <div className={`w-full  h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh] relative  overflow-hidden  transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <img className='w-full h-full object-cover absolute inset-0' src="/image.png" alt="Career opportunities" />
        <div className='absolute inset-0 bg-gradient-to-t from-black/55 via-black/35 to-black/12'></div>
        <div className='relative z-10 w-full h-full flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 md:py-16'>
            
          <div className={`max-w-5xl w-full transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
              {t('career.title')} {/* UPDATED */}
              <span className="text-[#1DCD9F]">.</span>
            </h1>
            <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mt-6 sm:mt-8 md:mt-10 text-white mb-4 sm:mb-6 md:mb-8'>
              {t('career.subtitle')} {/* UPDATED */}
            </h2>
            <p className='text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 leading-relaxed max-w-3xl'>
              {t('career.description1')} {/* UPDATED */}
            </p>
            <p className='text-gray-300 text-xs sm:text-sm md:text-base mb-6 sm:mb-8 leading-relaxed max-w-3xl'>
              {t('career.description2')} {/* UPDATED */}
            </p>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
              <button className='px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-[#1DCD9F] text-white text-sm sm:text-base font-semibold rounded-lg md:rounded-xl hover:bg-[#18b88c] transition-all hover:scale-105 shadow-lg'>
                {t('career.applyNow')} {/* UPDATED */}
              </button>
              <button className='px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-white/15 backdrop-blur-sm border border-white/40 text-white text-sm sm:text-base font-semibold rounded-lg md:rounded-xl hover:bg-white/25 transition-all'>
                {t('career.viewPositions')} {/* UPDATED */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Career