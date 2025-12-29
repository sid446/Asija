'use client';
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { useTheme } from '@/components/ThemeProvider';

interface NavItem {
  id: string;
  label: string;
  sectionId: string;
}

const HoverNavigation: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { content: heroContent } = useAppSelector((state) => state.hero);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Dynamic nav items based on hero content settings
  const navItems: NavItem[] = [
    { id: 'hero', label: 'Home', sectionId: 'hero' },
    { id: 'about', label: 'About', sectionId: 'about' },
    ...(heroContent?.showInsights ? [{ id: 'insights', label: 'Insights', sectionId: 'insights' }] : []),
    { id: 'services', label: 'Services', sectionId: 'services' },
    { id: 'industries', label: 'Industries', sectionId: 'industries' },
    { id: 'career', label: 'Career', sectionId: 'career' },
    { id: 'contact', label: 'Contact', sectionId: 'contact' },
    { id: 'footer', label: 'End', sectionId: 'footer' },
  ];

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.sectionId);
      const scrollPosition = window.scrollY + 200; // Increased offset to better detect footer

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          console.log(`Section ${sections[i]}: offsetTop=${section.offsetTop}, scrollPosition=${scrollPosition}`);
          if (section.offsetTop <= scrollPosition) {
            console.log(`Setting activeSection to ${sections[i]}`);
            setActiveSection(sections[i]);
            break;
          }
        } else {
          console.log(`Section ${sections[i]} not found`);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Recheck after a short delay to ensure all elements are loaded
    setTimeout(() => {
      handleScroll();
    }, 1000);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation with arrow keys
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const currentIndex = navItems.findIndex(item => item.sectionId === activeSection);

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % navItems.length;
        const nextSection = navItems[nextIndex].sectionId;
        scrollToSection(nextSection);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const prevIndex = currentIndex === 0 ? navItems.length - 1 : currentIndex - 1;
        const prevSection = navItems[prevIndex].sectionId;
        console.log('ArrowUp: currentSection =', activeSection, 'currentIndex =', currentIndex, 'prevSection =', prevSection);
        scrollToSection(prevSection);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 50; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Mobile navigation - always visible bottom bar
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-white/10 z-50 px-2 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.filter(item => item.id !== 'footer').map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.sectionId)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[50px] ${
                activeSection === item.sectionId
                  ? 'text-[#009edb] bg-[#009edb]/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              title={item.label}
            >
              {/* Section Icons */}
              <div className="w-5 h-5 mb-1">
                {item.id === 'hero' && (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-5.5 5.5a1 1 0 001.414 1.414L9 5.414V17a1 1 0 102 0V5.414l3.793 3.793a1 1 0 001.414-1.414l-5.5-5.5z"/>
                  </svg>
                )}
                {item.id === 'about' && (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                )}
                {item.id === 'insights' && (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"/>
                  </svg>
                )}
                {item.id === 'services' && (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                )}
                {item.id === 'industries' && (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                  </svg>
                )}
                {item.id === 'career' && (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )}
                {item.id === 'contact' && (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                )}
                {item.id === 'footer' && (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                )}
              </div>
              <span className="text-[8px] font-medium leading-tight text-center" style={{ color:'#009edb' }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed  flex  right-0 p-2 top-1/2 transform -translate-y-1/2 rounded-l-3xl z-50">
      {/* Navigation Dots */}
      <div className="flex flex-col  items-center  transition-all duration-300 opacity-100 translate-x-0">
        {navItems.map((item, index) => (
          <div key={item.id} className="relative flex flex-col items-center h-16">
            <button
              onClick={() => scrollToSection(item.sectionId)}
              className="group relative flex items-center justify-center transition-all duration-300 hover:scale-105"
              title={item.label}
            >
              {/* Text Label - Left side */}
              <div 
                className={`w-16 text-right mr-2 transition-all duration-300 ${
                  activeSection === item.sectionId
                    ? 'text-md font-semibold scale-110'
                    : 'text-sm font-medium group-hover:scale-105'
                }`}
                style={{ color: isLight ? '#021046' : 'white' }}
              >
                {item.label}
              </div>
              
              {/* Radio Dot with Outer Ring */}
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full">
                {/* Outer Ring - Always visible, changes color */}
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  activeSection === item.sectionId
                    ? 'border-[#009edb] shadow-blue-500/50 scale-125'
                    : isLight 
                      ? 'border-[#021046]/70 group-hover:border-[#021046]' 
                      : 'border-white/70 group-hover:border-white/90'
                }`} />
                
                {/* Inner Circle - Only visible when active */}
                <div className={`absolute w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeSection === item.sectionId
                    ? 'bg-[#009edb] scale-125 shadow-blue-500/50'
                    : 'bg-transparent'
                }`} />
              </div>
            </button>

            {/* Base Vertical Line - Only for non-footer items */}
            {item.id !== 'footer' && (
              <div className={`absolute top-8.5 right-6 w-0.5 h-10 ${isLight ? 'bg-[#021046]/40' : 'bg-white/40'}`} />
            )}
            
            {/* Animated Blue Line - Only for non-footer items */}
            {item.id !== 'footer' && (
              <div className={`absolute top-8.5 right-[23.6px] w-[2.5px] transition-all duration-1000 ease-in ${
                activeSection === item.sectionId
                  ? 'h-10 bg-[#009edb] shadow-blue-500/30'
                  : 'h-0 bg-[#009edb]'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoverNavigation;