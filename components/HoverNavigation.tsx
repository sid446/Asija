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
                'services': 'Services',
                'industries': 'Industries',
                'career': 'Career',
                'contact': 'Contact'
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
                >
                  <span className="text-[12px] font-medium leading-tight text-center">
                    {mobileLabels[item.id] || item.label}
                  </span>
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