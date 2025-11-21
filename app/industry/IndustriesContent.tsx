'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Values from '@/components/Values'; // Import Values component
import WhyChooseUs from '@/components/ui/WhyChooseUs';
import CTA from '@/components/ui/CTA';

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

const industries = [
  {
    title: "Banking and Financial Institutions",
    description: "End-to-end audit, tax planning, and compliance for banks, NBFCs, and fintech startups.",
    details: "Our Banking & Finance services cover statutory audits, concurrent audits, and stock audits for major nationalized and private banks. We specialize in NPA management, credit monitoring, and regulatory compliance with RBI norms. For fintech startups, we offer valuation services, funding advisory, and structuring of cross-border transactions.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Education",
    description: "Financial advisory for schools, universities, and edtech platforms with grant compliance.",
    details: "We assist educational institutions in managing their finances efficiently, ensuring compliance with UGC, AICTE, and other regulatory bodies. Our services include internal audits, fee structuring, grant utilization audits, and tax exemptions for non-profit educational trusts. For EdTech companies, we provide valuation, due diligence, and investor reporting services.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Hospitality and Healthcare",
    description: "Hospital accounting, medical billing, and regulatory compliance under NABH & HIPAA.",
    details: "Our healthcare financial services are tailored for hospitals, clinics, and pharmaceutical companies. We handle revenue cycle management, cost audits, and tax planning. We ensure compliance with NABH financial standards and provide advisory on mergers and acquisitions in the healthcare sector.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Infrastructure",
    description: "Project finance, PPP models, and cost audits for roads, metro, and smart cities.",
    details: "We support infrastructure developers with project feasibility studies, financial modeling, and debt syndication. Our expertise covers PPP (Public-Private Partnership) models, cost audits, and compliance with RERA and other real estate regulations. We also provide advisory on tax incentives for infrastructure projects.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Media and Entertainment",
    description: "Financial management, royalty audits, and tax incentives for production houses and media agencies.",
    details: "We provide specialized financial services for the media and entertainment industry, including production accounting, royalty audits, and tax credit optimization. We help production houses and agencies manage their budgets, ensure compliance with industry regulations, and maximize profitability.",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop",
  },
  {
    title: "Realty Sector",
    description: "RERA compliance, project funding, and valuation for developers and REITs.",
    details: "From residential to commercial real estate, we offer comprehensive financial solutions including RERA registration and compliance, GST impact analysis, and project funding assistance. We also specialize in valuation services for REITs (Real Estate Investment Trusts) and joint venture structuring.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Retail, White Goods & Consumer Electronics",
    description: "Inventory management, GST compliance, and supply chain finance for retail chains and consumer brands.",
    details: "We help retail and consumer electronics businesses optimize their inventory management, ensure GST compliance, and improve supply chain finance. Our services include internal audits, risk assessment, and financial planning to support growth and expansion in a competitive market.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Telecom",
    description: "Revenue assurance, spectrum usage audits, and regulatory compliance for telecom operators.",
    details: "Our telecom services focus on revenue assurance, spectrum usage audits, and compliance with TRAI regulations. We assist telecom operators in managing their financial operations, optimizing costs, and navigating the complex regulatory landscape of the telecommunications industry.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Textiles",
    description: "Cost audits, export incentives, and financial restructuring for textile manufacturers.",
    details: "We provide specialized financial services for the textile industry, including cost audits, management of export incentives, and financial restructuring. We help textile manufacturers improve their operational efficiency, manage risks, and ensure compliance with government regulations.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop",
  },
  {
    title: "Trading",
    description: "Trade finance, forex management, and customs compliance for import-export businesses.",
    details: "Our services for trading businesses include trade finance advisory, forex management, and customs compliance. We help importers and exporters navigate international trade regulations, manage currency risks, and optimize their working capital.",
    image: "https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?q=80&w=2071&auto=format&fit=crop",
  },
];

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

const HeroSection = ({ isActive }: { isActive: boolean }) => (
  <div 
    className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-out z-20 ${
      isActive 
        ? 'translate-y-0' 
        : '-translate-y-full'
    }`}
  >
    <div 
      className="relative w-full h-full bg-cover bg-center"
      style={{ backgroundImage: "url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop)" }}
    >
      <div className="absolute inset-0  bg-black/50" />
      <div className="absolute  text-left  top-[70%] sm:top-[70%] left-1/2 sm:left-[25%] transform -translate-x-1/2 -translate-y-1/2 px-4 w-full sm:w-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Industries We Serve<span className='text-[#2BC99C] text-4xl sm:text-5xl md:text-6xl lg:text-7xl'> .</span>
        </h1>
        <p className="text-lg sm:text-lg md:text-xl lg:text-2xl border-l-4  border-[#2BC99C] pl-3 sm:pl-4 text-gray-200 max-w-2xl leading-relaxed  drop-shadow-md">
          Deep expertise across sectors. One trusted partner for all your financial needs.
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

  return (
    <>
      <div className="relative w-full h-dvh bg-black text-white overflow-hidden touch-none">
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
                    {page.leftBgImage && <div className="absolute inset-0 bg-black/40" />}
                    
                    {page.leftContent && (
                      <div className={`relative z-10 flex flex-col items-center justify-center h-full px-8 text-center pointer-events-auto transition-all duration-1000 pt-24 ${isExpandedLeft ? 'max-w-4xl mx-auto' : 'max-w-md mx-auto'}`}>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                          {page.leftContent.heading}
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8">
                          {page.leftContent.description}
                        </p>
                        
                        {isExpandedLeft && page.leftContent.details && (
                           <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                             <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-8">
                               {page.leftContent.details}
                             </p>
                             <button
                               onClick={() => setExpandedSection(null)}
                               className="px-8 py-3 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300"
                             >
                               Show Less
                             </button>
                           </div>
                        )}

                        {!isExpandedLeft && page.leftContent.details && (
                          <button
                            onClick={() => setExpandedSection('left')}
                            className="px-8 py-3 border-2 border-[#2BC99C] text-[#2BC99C] font-semibold rounded-full hover:bg-[#2BC99C] hover:text-white transition-all duration-300"
                          >
                            Read More
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Right Half (Desktop) / Bottom Half (Mobile) */}
                <motion.div
                  className={`absolute ${isMobile ? 'bottom-0 left-0 w-full' : 'inset-y-0 right-0'} bg-theme ${isMobile ? 'border-t-4' : 'border-l-4'} border-[#1DCD9F] overflow-hidden`}
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
                    {page.rightBgImage && <div className="absolute inset-0 bg-black/40" />}
                    
                    {page.rightContent && (
                      <div className={`relative z-10 flex flex-col items-center justify-center h-full px-8 text-center pointer-events-auto transition-all duration-1000 ${isExpandedRight ? 'max-w-4xl mx-auto' : 'max-w-md mx-auto'} ${isMobile ? 'pb-24' : 'pt-24'}`}>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                          {page.rightContent.heading}
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8">
                          {page.rightContent.description}
                        </p>

                        {isExpandedRight && page.rightContent.details && (
                           <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                             <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-8">
                               {page.rightContent.details}
                             </p>
                             <button
                               onClick={() => setExpandedSection(null)}
                               className="px-8 py-3 border-2 border-white/50 text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300"
                             >
                               Show Less
                             </button>
                           </div>
                        )}

                        {!isExpandedRight && page.rightContent.details && (
                          <button
                            onClick={() => setExpandedSection('right')}
                            className="px-8 py-3 border-2 border-[#2BC99C] text-[#2BC99C] font-semibold rounded-full hover:bg-[#2BC99C] hover:text-white transition-all duration-300"
                          >
                            Read More
                          </button>
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
                className="flex gap-2 overflow-x-auto max-w-[95vw] p-3 pointer-events-auto [&::-webkit-scrollbar]:hidden bg-black/40 backdrop-blur-lg rounded-xl border border-white/10" 
                style={{ scrollbarWidth: 'none' }}
              >
                {industries.map((industry, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium transition-all duration-300 rounded-md border backdrop-blur-sm whitespace-nowrap shrink-0 ${
                      currentPage === i 
                        ? 'bg-[#1DCD9F] text-black border-[#1DCD9F] shadow-lg shadow-[#1DCD9F]/20 scale-105' 
                        : 'bg-black/30 text-white/60 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30'
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
            className={`absolute inset-0 w-full  bg-[#2a2a2a] overflow-y-auto transition-transform duration-1000 ease-in-out z-30 outline-none pointer-events-auto touch-pan-y [&::-webkit-scrollbar]:hidden ${
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
             <div className="flex flex-col">
                
                <WhyChooseUs    />
                <CTA/>
                <Footer />
             </div>
          </div>

        
          
        </div>
      </div>
    </>
  );
}
