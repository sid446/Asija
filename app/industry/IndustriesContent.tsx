'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Values from '@/components/Values'; // Import Values component
import RelatedIndustries from '@/components/ui/RelatedIndustries';
import CTA from '@/components/ui/CTA';
import Loader from '@/components/ui/Loader';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';

interface PageContent {
  heading: string;
  description: string;
  details?: string;
}

interface Page {
  leftBgImage: string | null;
  rightBgImage: string | null;
  leftContent: PageContent | null;
  rightContent: PageContent | null;
}

interface Industry {
  _id: string;
  title: string;
  description: string;
  details: string;
  image: string;
}

const HeroSection = ({ isActive }: { isActive: boolean }) => (
  <div 
    className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-out z-20 ${
      isActive 
        ? 'translate-y-0' 
        : '-translate-y-full'
    }`}
  >
    <div className="relative w-full h-full">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="https://res.cloudinary.com/db2qa9dzs/video/upload/so_0,w_1280,q_auto,f_jpg/v1764130459/vid1_yd3gmn.jpg"
      >
        <source
          src="https://res.cloudinary.com/db2qa9dzs/video/upload/f_webm,q_auto:eco,vc_auto,w_1920/v1764130459/vid1_yd3gmn.webm"
          type="video/webm"
        />
        <source
          src="https://res.cloudinary.com/db2qa9dzs/video/upload/f_mp4,q_auto:eco,vc_auto,w_1920/v1764130459/vid1_yd3gmn.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-slate-950/50" />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
      <div className="absolute text-left top-[70%] sm:top-[75%] left-1/2 sm:left-[33%] transform -translate-x-1/2 -translate-y-1/2 px-4 w-full sm:w-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold  mb-10 drop-shadow-lg" style={{color:"white"}}>
          Industries We Serve<span className='text-[#009edb] text-4xl sm:text-5xl md:text-6xl lg:text-7xl'> .</span>
        </h1>
        <p className="text-md sm:text-md md:text-lg lg:text-xl border-l-4 border-[#009edb] pl-3 sm:pl-4 w-full sm:4xl leading-relaxed drop-shadow-md" style={{color:"white"}}>
          Deep expertise across sectors. From banking and infrastructure to healthcare and retail, we are your one trusted partner for comprehensive financial solutions, regulatory compliance, and strategic growth.
        </p>
      </div>
    </div>
  </div>
);

export default function IndustriesContent() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section');
  const [currentPage, setCurrentPage] = useState(-1); // Start at -1 for Hero
  const [expandedSection, setExpandedSection] = useState<'left' | 'right' | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await fetch('/api/industries');
        const data = await res.json();
        if (data.industries) {
          setIndustries(data.industries);
        }
      } catch (error) {
        console.error('Failed to fetch industries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  // Construct pages array
  const pages: Page[] = [
    // Industry Slides
    ...industries.map((industry, i) => {
      const isEven = i % 2 === 0;
      return {
        leftBgImage: isEven ? industry.image : null,
        rightBgImage: isEven ? null : industry.image,
        // Text on the opposite side of the image
        leftContent: isEven ? null : { heading: industry.title, description: industry.description, details: industry.details },
        rightContent: isEven ? { heading: industry.title, description: industry.description, details: industry.details } : null,
      };
    }),
    // Final Slide
    {
      leftBgImage: null,
      rightBgImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
      leftContent: {
        heading: "Your Industry. Our Expertise.",
        description: "From banking to real estate — we speak your language and solve your challenges.",
      },
      rightContent: null,
    },
  ];

  const numOfPages = pages.length;
  const animTime = 1100;
  const scrolling = useRef(false);
  const touchStart = useRef<number | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (section) {
      const index = industries.findIndex(ind => ind.title === section);
      if (index !== -1) {
        setCurrentPage(index);
      }
    }
  }, [section]);

  useEffect(() => {
    if (scrollIndicatorRef.current && currentPage >= 0 && currentPage < industries.length) {
      const container = scrollIndicatorRef.current;
      const activeBtn = container.children[currentPage] as HTMLElement;
      
      if (activeBtn) {
        const containerRect = container.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        const currentScroll = container.scrollLeft;
        const relativeLeft = btnRect.left - containerRect.left;
        const targetRelativeLeft = (containerRect.width / 2) - (btnRect.width / 2);
        
        container.scrollTo({
          left: currentScroll + (relativeLeft - targetRelativeLeft),
          behavior: 'smooth'
        });
      }
    }
  }, [currentPage]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setExpandedSection(null);
  }, [currentPage]);

  const navigateUp = () => {
    if (showFooter) {
      setShowFooter(false);
    } else if (currentPage > -1) {
      setCurrentPage(p => p - 1);
    }
  };

  const navigateDown = () => {
    if (currentPage < numOfPages - 1) {
      setCurrentPage(p => p + 1);
    } else if (currentPage === numOfPages - 1 && !showFooter) {
      setShowFooter(true);
    }
  };

  const handleWheel = (e: WheelEvent) => {
    if (scrolling.current) return;

    if (showFooter) {
      // If footer is shown, we don't want global wheel listener to do anything
      // except maybe close it if we are at the top?
      // But we handle that in the div's onWheel.
      // So here we just return.
      return;
    }

    scrolling.current = true;
    e.deltaY > 0 ? navigateDown() : navigateUp();
    setTimeout(() => (scrolling.current = false), animTime);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (scrolling.current) return;
    if (e.key === 'ArrowUp') {
      scrolling.current = true;
      navigateUp();
      setTimeout(() => (scrolling.current = false), animTime);
    } else if (e.key === 'ArrowDown' || e.key === ' ') {
      scrolling.current = true;
      navigateDown();
      setTimeout(() => (scrolling.current = false), animTime);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart.current === null) return;
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart.current - touchEnd;

    if (showFooter) return; // Handled by div

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        navigateDown();
      } else {
        navigateUp();
      }
    }
    touchStart.current = null;
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentPage]);

  if (loading) {
    return <Loader pageName="Industries" />;
  }

  return (
    <>
      <Loader pageName="Industries" />
      <div className="relative w-full h-dvh bg-slate-950 text-white overflow-hidden touch-none">
        <Navbar />

        {/* Full-Screen Scroll Adventure */}
        <div className="relative w-full h-full">
          <HeroSection isActive={currentPage === -1 && !showFooter} />
          
          {pages.map((page, i) => {
            const idx = i;
            const isActive = currentPage === idx && !showFooter;
            
            let leftTrans = '';
            let rightTrans = '';
            
            if (isMobile) {
               if (idx === 0) {
                 if (currentPage === -1) {
                   leftTrans = 'translateY(100%)';
                   rightTrans = 'translateY(100%)';
                 } else if (isActive) {
                   leftTrans = 'translate(0,0)';
                   rightTrans = 'translate(0,0)';
                 } else if (showFooter) {
                    leftTrans = 'translateY(-100%)';
                    rightTrans = 'translateY(-100%)';
                 } else {
                   leftTrans = 'translateX(-100%)';
                   rightTrans = 'translateX(100%)';
                 }
               } else {
                 if (isActive) {
                   leftTrans = 'translate(0,0)';
                   rightTrans = 'translate(0,0)';
                 } else if (showFooter) {
                   leftTrans = 'translateY(-100%)';
                   rightTrans = 'translateY(-100%)';
                 } else if (currentPage > idx) {
                   leftTrans = 'translateX(-100%)';
                   rightTrans = 'translateX(100%)';
                 } else {
                   leftTrans = 'translateX(100%)';
                   rightTrans = 'translateX(-100%)';
                 }
               }
            } else {
               const upOff = 'translateY(-100%)';
               const downOff = 'translateY(100%)';
               
               if (isActive) {
                 leftTrans = 'translateY(0)';
                 rightTrans = 'translateY(0)';
               } else if (showFooter) {
                 leftTrans = upOff;
                 rightTrans = upOff;
               } else if (currentPage > idx) {
                 leftTrans = upOff;
                 rightTrans = downOff;
               } else {
                 leftTrans = downOff;
                 rightTrans = upOff;
               }
            }

            // Determine widths/heights based on expanded state
            const isExpandedLeft = isActive && expandedSection === 'left';
            const isExpandedRight = isActive && expandedSection === 'right';
            
            return (
              <div key={idx} className="absolute inset-0 pointer-events-none">
                {/* Left Half (Desktop) / Top Half (Mobile) */}
                <motion.div
                  className={`absolute ${isMobile ? 'top-0 left-0 w-full border-b' : 'inset-y-0 left-0 border-r'} bg-theme border-white/10 overflow-hidden`}
                  initial={false}
                  animate={{
                    width: isMobile ? '100%' : (isExpandedLeft ? '100%' : isExpandedRight ? '0%' : '50%'),
                    height: isMobile ? (isExpandedLeft ? '100%' : isExpandedRight ? '0%' : '50%') : '100%',
                    transform: leftTrans
                  }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="relative w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: page.leftBgImage ? `url(${page.leftBgImage})` : 'none' }}
                  >
                    {page.leftBgImage && <div className="absolute inset-0 bg-slate-950/40" />}
                    
                    {page.leftContent && (
                      <div className={`relative z-10 flex flex-col items-center justify-center h-full px-8 text-center pointer-events-auto transition-all duration-1000 pt-24 ${isExpandedLeft ? 'max-w-4xl mx-auto' : 'max-w-md mx-auto'}`}>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
                          {page.leftContent.heading}
                        </h2>
                        <p className="text-md sm:text-lg text-gray-300 leading-relaxed mb-4">
                          {page.leftContent.description}
                        </p>
                        
                        {isExpandedLeft && page.leftContent.details && (
                           <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                             <p className="text-md sm:text-lg text-gray-200 leading-relaxed mb-8">
                               {page.leftContent.details}
                             </p>
                             <InteractiveHoverButton
                               onClick={() => setExpandedSection(null)}
                               text="Show Less"
                               className="border-2 border-white/50 text-white hover:bg-white hover:text-black"
                             />
                           </div>
                        )}

                        {!isExpandedLeft && page.leftContent.details && (
                          <InteractiveHoverButton
                            onClick={() => setExpandedSection('left')}
                            text="Read More"
                            className="border-2 border-[#009edb] text-[#009edb] hover:bg-[#009edb] hover:text-white"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Right Half (Desktop) / Bottom Half (Mobile) */}
                <motion.div
                  className={`absolute ${isMobile ? 'bottom-0 left-0 w-full' : 'inset-y-0 right-0'} bg-theme ${isMobile ? 'border-t-4' : 'border-l-4'} border-[#009edb] overflow-hidden`}
                  initial={false}
                  animate={{
                    width: isMobile ? '100%' : (isExpandedRight ? '100%' : isExpandedLeft ? '0%' : '50%'),
                    height: isMobile ? (isExpandedRight ? '100%' : isExpandedLeft ? '0%' : '50%') : '100%',
                    transform: rightTrans
                  }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="relative w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: page.rightBgImage ? `url(${page.rightBgImage})` : 'none' }}
                  >
                    {page.rightBgImage && <div className="absolute inset-0 bg-slate-950/40" />}
                    
                    {page.rightContent && (
                      <div className={`relative z-10 flex flex-col items-center justify-center h-full px-8 text-center pointer-events-auto transition-all duration-1000 ${isExpandedRight ? 'max-w-4xl mx-auto' : 'max-w-md mx-auto'} ${isMobile ? (isExpandedRight ? 'pt-24 pb-24' : 'pb-24') : 'pt-24'}`}>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                          {page.rightContent.heading}
                        </h2>
                        <p className="text-sm sm:text-lg text-gray-300 leading-relaxed mb-4">
                          {page.rightContent.description}
                        </p>

                        {isExpandedRight && page.rightContent.details && (
                           <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                             <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-8">
                               {page.rightContent.details}
                             </p>
                             <InteractiveHoverButton
                               onClick={() => setExpandedSection(null)}
                               text="Show Less"
                               className="border-2 border-white/50 text-white hover:bg-white hover:text-black"
                             />
                           </div>
                        )}

                        {!isExpandedRight && page.rightContent.details && (
                          <InteractiveHoverButton
                            onClick={() => setExpandedSection('right')}
                            text="Read More"
                            className="border-2 border-[#009edb] text-[#009edb] hover:bg-[#009edb] hover:text-white"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}



          {/* Scroll Indicator */}
          {currentPage >= 0 && currentPage < numOfPages - 1 && (
            <div className="fixed bottom-4 md:bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
              <div 
                ref={scrollIndicatorRef}
                className="flex gap-2 overflow-x-auto max-w-[95vw] p-3 pointer-events-auto [&::-webkit-scrollbar]:hidden bg-slate-950/40 backdrop-blur-lg rounded-xl border border-white/10" 
                style={{ scrollbarWidth: 'none' }}
              >
                {industries.map((industry, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium transition-all duration-300 rounded-md border backdrop-blur-sm whitespace-nowrap shrink-0 ${
                      currentPage === i 
                        ? 'bg-[#009edb] text-black border-[#009edb] shadow-lg shadow-[#009edb]/20 scale-105' 
                        : 'bg-slate-950/30 text-white/60 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30'
                    }`}
                    aria-label={`Go to ${industry.title}`}
                  >
                    {industry.title}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* Footer Section */}
          <div 
            ref={footerRef}
            tabIndex={0} // Make focusable for keyboard scrolling
            className={`absolute inset-0 w-full  bg-slate-950 overflow-y-auto transition-transform duration-1000 ease-in-out z-30 outline-none pointer-events-auto touch-pan-y [&::-webkit-scrollbar]:hidden ${
              showFooter ? 'translate-y-0' : 'translate-y-full'
            }`}
            style={{ overscrollBehavior: 'contain', scrollbarWidth: 'none' }}
            onWheel={(e) => {
                e.stopPropagation();
                // Logic to close footer when scrolling up at the top
                if (footerRef.current && e.deltaY < 0 && footerRef.current.scrollTop <= 0) {
                    setShowFooter(false);
                }
            }}
            onTouchStart={(e) => {
                touchStart.current = e.touches[0].clientY;
            }}
            onTouchEnd={(e) => {
                e.stopPropagation();
                if (touchStart.current === null) return;
                const touchEnd = e.changedTouches[0].clientY;
                const diff = touchStart.current - touchEnd;
                // Logic to close footer when swiping down at the top
                if (footerRef.current && diff < 0 && footerRef.current.scrollTop <= 0 && Math.abs(diff) > 50) {
                    setShowFooter(false);
                }
                touchStart.current = null;
            }}
          >
             <div className="flex flex-col pt-40">
                
                <RelatedIndustries    />
                <CTA/>
                <Footer />
             </div>
          </div>

        
          
        </div>
      </div>
    </>
  );
}
