'use client';
import React, { useState, useEffect } from 'react';

interface NavItem {
  id: string;
  label: string;
  sectionId: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', sectionId: 'hero' },
  { id: 'about', label: 'About', sectionId: 'about' },
  { id: 'insights', label: 'Insights', sectionId: 'insights' },
  { id: 'services', label: 'Services', sectionId: 'services' },
  { id: 'industries', label: 'Industries', sectionId: 'industries' },
  { id: 'career', label: 'Career', sectionId: 'career' },
  { id: 'contact', label: 'Contact', sectionId: 'contact' },
];

const HoverNavigation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

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

  // Mobile navigation
  if (isMobile) {
    return (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[90vw] max-w-[380px]">
        <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl px-1 py-2 shadow-xl border border-white/10">
          <div className="flex justify-center">
            {navItems.map((item, index) => {
              // Use abbreviated labels for mobile
              const mobileLabels: { [key: string]: string } = {
                'hero': 'Home',
                'about': 'About',
                'insights': 'Insights',
                'services': 'Ser.',
                'industries': 'Indus.',
                'career': 'jobs',
                'contact': 'Cont.'
              };

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.sectionId)}
                  className={`flex flex-col items-center justify-center px-2 py-2 mx-0.5 rounded-md transition-all duration-200 min-w-[38px] ${
                    activeSection === item.sectionId
                      ? 'text-[#009edb] scale-105 bg-[#009edb]/20 border border-[#009edb]'
                      : 'text-white/70 hover:text-white hover:scale-105 hover:bg-white/10 border border-transparent'
                  }`}
                  title={mobileLabels[item.id] || item.label} // Tooltip for accessibility
                >
                  {/* Section Icons */}
                  <div className="w-6 h-6 mb-0.5">
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
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {/* Navigation Bars */}
      <div className={`flex flex-col space-y-4 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-60 translate-x-2'
      }`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.sectionId)}
            className={`group relative flex items-center justify-end min-h-[32px] transition-all duration-300 ${
              isVisible ? 'hover:translate-x-[12px]' : ''
            }`}
            title={item.label}
          >
            {/* Label - Always visible when expanded */}
            <div className={`mr-3 px-3 py-1 bg-slate-900/90 backdrop-blur-sm text-white text-sm font-medium rounded-md transition-all duration-300 whitespace-nowrap ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none'
            }`}>
              {item.label}
            </div>

            {/* Active indicator - Vertical bar */}
            <div className={`w-1.5 h-8 rounded-full transition-all duration-300 shadow-sm ${
              activeSection === item.sectionId
                ? 'bg-[#009edb] scale-x-150 shadow-blue-500/50'
                : 'bg-white/70 group-hover:bg-white/90 shadow-white/20'
            }`} />
          </button>
        ))}
      </div>

      {/* Hover area indicator */}
      <div className={`absolute -left-6 top-0 bottom-0 w-12 transition-opacity duration-300 ${
        isVisible ? 'opacity-0' : 'opacity-100'
      }`} />
    </div>
  );
};

export default HoverNavigation;