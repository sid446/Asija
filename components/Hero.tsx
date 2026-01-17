'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { InteractiveHoverButton } from './ui/InteractiveHoverButton';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';

type HeroContent = {
  tagline: string;
  title: string;
  description: string;
  learnMore: string;
  contactUs: string;
  videoPoster: string;
  videoWebm: string;
  videoMp4: string;
};

type Section = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  videoWebm?: string;
  videoMp4?: string;
  logo: string;
};

const sections: Section[] = [
  {
    id: '1985',
    title: '1986',
    subtitle: ' Founded',
    image: '/1985.png',
    videoWebm: 'https://res.cloudinary.com/db2qa9dzs/video/upload/v1766915919/foundation_ilkgwp.webm',
    videoMp4: 'https://res.cloudinary.com/db2qa9dzs/video/upload/v1766915919/foundation_ilkgwp.mp4',
    logo: '/calender.png' // Update with your actual logo path
  },
  {
    id: 'growth',
    title: '40 Years',
    subtitle: 'of Growth',
    image: '/forty1.png', // Update with your actual image path
    videoWebm: 'https://res.cloudinary.com/db2qa9dzs/video/upload/v1766917157/forty1_gk6qyr.webm',
    videoMp4: 'https://res.cloudinary.com/db2qa9dzs/video/upload/v1766917157/forty1_gk6qyr.mp4',
    logo: '/forty.png' // Update with your actual logo path
  },
  {
    id: 'partner',
    title: ' Led by 12+',
    subtitle: 'CA/CPA/CMA',
    image: '/partner1.png', // Update with your actual image path
    videoWebm: 'https://res.cloudinary.com/db2qa9dzs/video/upload/v1766915757/partner1_stqu2o.webm',
    videoMp4: 'https://res.cloudinary.com/db2qa9dzs/video/upload/v1766915757/partner1_stqu2o.mp4',
    logo: '/partner.png' // Update with your actual logo path
  },
  {
    id: 'india',
    title: ' 120+ ',
    subtitle: 'team size',
    image: '/in.png', // Update with your actual image path
    videoWebm: 'https://res.cloudinary.com/db2qa9dzs/video/upload/v1766916673/india_sygy0i.webm',
    videoMp4: 'https://res.cloudinary.com/db2qa9dzs/video/upload/v1766916673/india_sygy0i.mp4',
    logo: '/in.png' // Update with your actual logo path
  }
];

function Hero() {
  const router = useRouter();
  const { content, loading, error } = useAppSelector((state) => state.hero);
  const { theme } = useTheme();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, 'loading' | 'loaded'>>({});
  const [isMobile, setIsMobile] = useState(false);

  // Hero content is now loaded globally by DataInitializer

  // Detect mobile device - PC will use hover, mobile will use tap
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSectionHover = (sectionId: string) => {
    if (isMobile) {
      // Mobile: Tap behavior - change video on each tap
      setActiveSection(sectionId);
    } else {
      // Desktop/PC: Hover behavior - change video on hover
      setActiveSection(sectionId);
    }
  };

  // Handle section click for PC redirects
  const handleSectionClick = (sectionId: string) => {
    if (!isMobile) {
      // PC: Click redirects to appropriate page without changing video
      switch (sectionId) {
        case '1985':
          router.push('/about');
          break;
        case 'growth':
          router.push('/about#ourjourney');
          break;
        case 'partner':
          router.push('/team');
          break;
        case 'india':
          router.push('/team');
          break;
        default:
          router.push('/about');
      }
    }
  };
  // Get dynamic button content based on active section (mobile only)
  const getDynamicButtonContent = () => {
    if (!isMobile || !activeSection) {
      return {
        text: content.learnMore,
        redirect: '/about'
      };
    }

    switch (activeSection) {
      case '1985':
        return {
          text: 'About Foundation',
          redirect: '/about'
        };
      case 'growth':
        return {
          text: 'Our Journey',
          redirect: '/about#ourjourney'
        };
      case 'partner':
        return {
          text: 'Our Team',
          redirect: '/team'
        };
      case 'india':
        return {
          text: 'Our Locations',
          redirect: '/locations'
        };
      default:
        return {
          text: content.learnMore,
          redirect: '/about'
        };
    }
  };
  if (loading || !content) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen sm:h-[90vh] overflow-hidden border-b-4 border-[#009edb] z-10 bg-slate-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    console.error('Failed to load hero content:', error);
    return null;
  }
  
  return (
    <div className="fixed top-0 left-0 w-screen h-screen   overflow-hidden border-b-4 border-[#009edb] z-10">
      {/* Video Background */}
      {/* {!videoLoaded && !activeSection && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950">
          <div className="text-white text-sm sm:text-lg">Loading video...</div>
        </div>
      )} */}
      <Image 
        className='absolute inset-0 w-full h-full object-cover' 
        src={theme === 'light' ? "/bg2.jpg" : "/bg1.jpg"} 
        alt="Hero background"
        fill
        priority
      />
     
      {/* <video
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${activeSection ? 'opacity-0' : 'opacity-100'}`}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster={content.videoPoster}
        onCanPlay={() => setVideoLoaded(true)}
      >
        <source src={content.videoWebm} type="video/webm" />
        <source src={content.videoMp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      {/* Hovered Section Video */}
      {activeSection && (() => {
        const section = sections.find(s => s.id === activeSection);
        const isVideoLoaded = loadedVideos.has(activeSection);
        const imageState = imageLoadingStates[activeSection] || 'loading';
        
        return section ? (
          <div className="absolute inset-0 z-20 group">
            {/* Progressive Image Loading */}
            {!isVideoLoaded && section.image && (
              <div className="absolute inset-0">
                <Image
                  src={section.image}
                  alt={section.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    imageState === 'loaded' 
                      ? 'filter-none opacity-100 scale-100' 
                      : 'filter blur-sm opacity-60 scale-105'
                  }`}
                  style={{
                    filter: imageState === 'loading' ? 'blur(10px) brightness(0.8)' : 'none'
                  }}
                  fill
                />
                {imageState === 'loading' && (
                  <div className="absolute inset-0 bg-slate-950/20 animate-pulse" />
                )}
              </div>
            )}
            
            {/* Video */}
            <video
              key={section.id} // Add key to force re-mount when section changes
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 blur-lg ${isVideoLoaded ? 'opacity-100 group-hover:blur-lg' : 'opacity-0'}`}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onLoadStart={() => {
                // Reset loaded state when new video starts loading
                setLoadedVideos(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(activeSection);
                  return newSet;
                });
              }}
              onCanPlay={() => {
                setLoadedVideos(prev => new Set([...prev, activeSection]));
              }}
            >
              <source src={section.videoWebm} type="video/webm" />
              <source src={section.videoMp4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Blur Overlay on Hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ) : null;
      })()}

      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-30 flex h-full items-center justify-center md:justify-start px-4 sm:px-6 md:px-10 lg:px-16 pt-16 sm:pt-20">
        <div className="w-full max-w-2xl space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-center md:text-left">
          <p className="font-bold text-xs mb-8 sm:mb-2 sm:text-sm md:text-base tracking-widest uppercase" style={{ color: '#009edb' }}>
            {content.tagline}
          </p>
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight px-2 sm:px-0" style={{color:"white"}}>
            {content.title}
          </h1>
          <div className="border-0 md:border-l-4 pl-0 md:pl-4 mx-auto md:mx-0 max-w-sm sm:max-w-md md:max-w-lg px-4 sm:px-0" style={{ borderColor: '#009edb' }}>
            <p className="text-xs sm:text-base md:text-base lg:text-lg leading-relaxed" style={{color:"#e1ebef"}}>
              {content.description}
            </p>
          </div>

          {/* Interactive Sections */}
          <div
            className="flex flex-row gap-2 sm:gap-6 md:gap-8 mt-8 sm:mt-10 justify-center md:justify-start overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {sections.map((section) => (
              <div
                key={section.id}
                className="flex-shrink-0 cursor-pointer group min-w-0 relative"
                onMouseEnter={!isMobile ? () => handleSectionHover(section.id) : undefined} // PC: Hover to activate
                onMouseLeave={!isMobile ? () => setActiveSection(null) : undefined} // PC: Hover out to deactivate
                onClick={!isMobile ? () => handleSectionClick(section.id) : () => handleSectionHover(section.id)} // PC: Click to redirect, Mobile: Tap to activate
              >
                

                <div className="relative flex flex-col items-center md:items-start min-w-[80px] sm:min-w-[100px] z-20">
                  {/* Logo */}
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-3 flex items-center justify-center transition-all duration-500 ${
                    activeSection === section.id 
                      ? 'opacity-100' 
                      : 'opacity-60 group-hover:opacity-80'
                  }`}>
                    <Image 
                      src={section.logo} 
                      alt={section.title}
                      width={48}
                      height={48}
                      className={`w-full h-full object-contain transition-all duration-500 ${
                        activeSection === section.id ? 'brightness-0 invert' : 'brightness-0 invert opacity-70'
                      }`}
                    />
                  </div>
                  
                  {/* Divider Line */}
                  <div className={`h-px w-12 sm:w-16 my-1 sm:my-2 transition-all duration-500 ${
                    activeSection === section.id 
                      ? 'w-16 sm:w-20 bg-[#009edb]' 
                      : 'bg-white/30 group-hover:bg-white/50'
                  }`} />
                  
                  {/* Title */}
                  <div className={`font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-500 text-center md:text-left ` }style={{color:"white"}}>
                    {section.title}
                  </div>
                  
                  {/* Subtitle */}
                  <div className={`text-xs w-20 uppercase tracking-tight mt-0.5 sm:mt-1 transition-all duration-500 text-center md:text-left `} style={{color:"white"}}>
                    {section.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 mt-6 sm:mt-6 justify-center items-center md:justify-start px-4 sm:px-0">
            <InteractiveHoverButton 
              text={isMobile ? getDynamicButtonContent().text : content.learnMore}
              className="w-full sm:w-auto px-6 sm:px-6 py-3 sm:py-3 bg-transparent text-zinc-100 border-2 border-[#009edb] rounded-full hover:bg-[#009edb] transition-colors duration-300 text-sm sm:text-base font-medium" 
              onClick={() => router.push(isMobile ? getDynamicButtonContent().redirect : '/about')}
            />
            <InteractiveHoverButton 
              text={content.contactUs}
              className="w-full sm:w-auto px-6 sm:px-6 py-3 sm:py-3 bg-slate-950 text-[#009edb] border-2 border-[#009edb] rounded-full hover:bg-[#009edb] hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium"
              onClick={() => router.push('/contact')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;