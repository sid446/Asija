// components/AboutCard.tsx

import React from 'react';
import { useInView } from 'react-intersection-observer';

type AboutCardProps = {
  image: string;
  title: string;
  description: string;
  buttonContent?: string;
  isMobile?: boolean;
  index?: number; // For stagger
};

const AboutCard = ({
  image,
  title,
  description,
  buttonContent = 'Learn More',
  isMobile,
  index = 0,
}: AboutCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '100px', // Start loading early
  });

  // Stagger delay: 100ms per card
  const delay = index * 100;

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: inView ? `${delay}ms` : '0ms',
      }}
      className={`
        transform transition-all duration-700 ease-out
        ${inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        group w-full bg-[#222222] border-t-4 border-[#1DCD9F] shadow-lg overflow-hidden 
        hover:shadow-xl hover:-translate-y-1
        ${isMobile ? 'h-auto' : ''}
      `}
    >
      {/* Image - Lazy + Optimized */}
      <div className={`relative ${isMobile ? 'h-28' : 'h-36 sm:h-40 md:h-44'} overflow-hidden`}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          // Prevent layout shift
          style={{ contentVisibility: 'auto', containIntrinsicSize: '300px 200px' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className={`p-3 ${isMobile ? 'sm:p-4' : 'sm:p-5 md:p-6'} space-y-2 sm:space-y-3`}>
        <h2
          className={`
            font-bold text-gray-300 group-hover:text-[#1DCD9F] transition-colors duration-300 line-clamp-2
            ${isMobile ? 'text-sm sm:text-base' : 'text-base sm:text-lg md:text-xl'}
          `}
        >
          {title}
        </h2>
        <p
          className={`
            leading-relaxed text-gray-400 line-clamp-3
            ${isMobile ? 'text-xs sm:text-xs' : 'text-xs sm:text-sm'}
          `}
        >
          {description}
        </p>

        {/* Button */}
        <button
          className={`
            relative inline-flex items-center justify-center gap-1.5 
            px-1 sm:px-3 py-1.5 text-xs font-medium text-white bg-[#1DCD9F] rounded-full 
            overflow-hidden transition-all duration-300 group-hover:bg-[#86dec6] 
            group-hover:text-black focus:outline-none focus:ring-2 focus:ring-[#1DCD9F] 
            focus:ring-offset-2 focus:ring-offset-[#222222] min-h-[32px]
            ${isMobile ? 'w-full text-[10px]' : 'w-auto sm:w-auto'}
          `}
        >
          <span className="relative z-10">{buttonContent}</span>
          <svg
            className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
        </button>
      </div>
    </div>
  );
};

export default AboutCard;