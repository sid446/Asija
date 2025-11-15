'use client'
import React, { useEffect, useRef, useState } from 'react'

import { useTranslation } from './TranslationProvider'

function Career() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div ref={sectionRef} className='bg-[#252525] flex flex-col items-center'>
      <div className={`w-full min-h-[500px] h-[70vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] max-h-[900px] relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        
        {/* Optimized image with loading state */}
        <img 
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          src="image.png" 
          alt="Career opportunities"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse"></div>
        )}
        
        {/* Enhanced gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10'></div>
        
        {/* Content container with improved mobile spacing */}
        <div className='relative z-10 w-full h-full flex items-end sm:items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 pb-8 sm:pb-12 md:pb-16'>
          
          <div className={`max-w-5xl w-full transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Title with improved mobile sizing */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
              {t('career.title')}
              <span className="text-[#1DCD9F]">.</span>
            </h1>
            
            {/* Subtitle with better mobile readability */}
            <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold mt-4 sm:mt-6 md:mt-8 text-white mb-3 sm:mb-4 md:mb-6 transition-all duration-1000 delay-500'>
              {t('career.subtitle')}
            </h2>
            
            {/* Description with improved mobile line height */}
            <p className='text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed mb-2 sm:mb-3 max-w-3xl transition-all duration-1000 delay-600'>
              {t('career.description1')}
            </p>
            
            <p className='text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6 md:mb-8 max-w-3xl transition-all duration-1000 delay-700'>
              {t('career.description2')}
            </p>
            
            {/* Mobile-optimized button layout */}
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-1000 delay-800'>
              <button 
                className='w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 bg-[#1DCD9F] text-white text-base sm:text-lg font-semibold rounded-lg hover:bg-[#18b88c] transition-all hover:scale-105 active:scale-95 shadow-lg touch-manipulation'
                aria-label={t('career.applyNow')}
              >
                {t('career.applyNow')}
              </button>
              
              <button 
                className='w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white text-base sm:text-lg font-semibold rounded-lg hover:bg-white/25 transition-all active:scale-95 touch-manipulation'
                aria-label={t('career.viewPositions')}
              >
                {t('career.viewPositions')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Career