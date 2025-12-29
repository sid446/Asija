"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { useAppSelector } from '@/lib/store/hooks';

interface Service {
  title: string;
  description: string;
  items: string[];
}

interface Industry {
  title: string;
  description: string;
}

interface Policy {
  title: string;
  content?: string;
  category: 'general' | 'employee';
  subCategory?: string;
}

const SearchBar: React.FC = () => {
  const { theme } = useTheme();
  
  // Get data from Redux store
  const services = useAppSelector((state) => state.services.services);
  const industries = useAppSelector((state) => state.industries.industries);
  const policies = useAppSelector((state) => state.policies.policies);
  
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<{
    type: string;
    title: string;
    description: string;
    href: string;
  }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter results based on query
  useEffect(() => {
    // Navigation items to search
    const navigationItems = [
      { title: 'Home', description: 'Welcome to Asija – Your trusted partner in audit, tax, and advisory services.', href: '/' },
      { title: 'About Us', description: 'Learn about our legacy, values, and the team driving excellence.', href: '/about' },
      { title: 'Services', description: 'Comprehensive audit, tax, and advisory solutions tailored to your business.', href: '/services' },
      { title: 'Industries', description: 'Industry-specific expertise to navigate complex regulatory and financial landscapes.', href: '/industry' },
      { title: 'Asija Global', description: 'Global reach with local expertise – serving clients worldwide.', href: '/global-services' },
      { title: 'Career', description: 'Join a team of passionate professionals. Explore opportunities with us.', href: '/career' },
      { title: 'Contact Us', description: 'Get in touch with our experts. We are here to help.', href: '/contact' },
      { title: 'Insights', description: 'Stay informed with our latest insights and industry updates.', href: '/insights' },
      { title: 'Gallery', description: 'Explore our company gallery and events.', href: '/gallery' },
      { title: 'Team', description: 'Meet the team driving excellence at Asija.', href: '/team' },
      { title: 'Alumni', description: 'Connect with our alumni network.', href: '/alumni' },
    ];

    if (!query.trim()) {
      setFilteredResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results: {
      type: string;
      title: string;
      description: string;
      href: string;
    }[] = [];

    // Search services
    services.forEach((service: any) => {
      if (service.title.toLowerCase().includes(lowerQuery) ||
          service.description.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'service',
          title: service.title,
          description: service.description,
          href: `/services?service=${encodeURIComponent(service.title)}`
        });
      }

      // Search service items
      service.items?.forEach((item: string) => {
        if (item.toLowerCase().includes(lowerQuery)) {
          results.push({
            type: 'service-item',
            title: item,
            description: `Part of ${service.title}`,
            href: `/services?service=${encodeURIComponent(service.title)}`
          });
        }
      });
    });

    // Search industries
    industries.forEach((industry: any) => {
      if (industry.title.toLowerCase().includes(lowerQuery) ||
          industry.description.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'industry',
          title: industry.title,
          description: industry.description,
          href: `/industry?section=${encodeURIComponent(industry.title)}`
        });
      }
    });

    // Search navigation items
    navigationItems.forEach(item => {
      if (item.title.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'navigation',
          title: item.title,
          description: item.description,
          href: item.href
        });
      }
    });

    // Search policies
    policies.forEach((policy: any) => {
      if (policy.title.toLowerCase().includes(lowerQuery) ||
          (policy.content && policy.content.toLowerCase().includes(lowerQuery)) ||
          (policy.subCategory && policy.subCategory.toLowerCase().includes(lowerQuery))) {
        results.push({
          type: 'policy',
          title: policy.title,
          description: policy.content ? policy.content.substring(0, 100) + '...' : `${policy.category} policy`,
          href: `/policies`
        });
      }
    });

    // Limit results to 10
    setFilteredResults(results.slice(0, 10));
  }, [query, services, industries, policies]);

  // Handle click outside and prevent body scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsSearchOpen(false);
        setQuery('');
      }
    };

    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  const handleIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Delay closing to allow for result clicks
    setTimeout(() => {
      setIsOpen(false);
      setIsSearchOpen(false);
      setQuery('');
    }, 200);
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setQuery('');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'service': return 'text-blue-400';
      case 'service-item': return 'text-green-400';
      case 'industry': return 'text-purple-400';
      case 'navigation': return 'text-orange-400';
      case 'policy': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'service': return '🔧';
      case 'service-item': return '📄';
      case 'industry': return '🏭';
      case 'navigation': return '🧭';
      case 'policy': return '📋';
      default: return '🔍';
    }
  };

  return (
    <>
      {/* Search Icon Button */}
      {!isSearchOpen && (
        <button
          onClick={handleIconClick}
          className={`p-2 rounded-lg transition-all duration-200 ${
            theme === 'light'
              ? 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              : 'hover:bg-slate-700 text-gray-400 hover:text-white'
          }`}
          aria-label="Open search"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      )}

      {/* Full-width Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            ref={searchRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-[60] bg-black/50 backdrop-blur-sm"
            style={{ height: 'calc(100vh - 4rem)' }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className={`w-full h-full ${theme === 'light' ? 'bg-white' : 'bg-slate-900'}`}>
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className={`p-2 rounded-full transition-colors ${
                    theme === 'light' ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-slate-700 text-gray-400'
                  }`}
                  aria-label="Close search"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Search Input */}
              <div className="px-4 pb-6">
                <div className="max-w-2xl mx-auto relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={handleInputFocus}
                    placeholder="Search services, industries, policies & pages..."
                    className={`w-full px-6 py-4 pl-14 pr-14 text-lg rounded-xl border-2 transition-all duration-200 ${
                      theme === 'light'
                        ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#009edb] focus:ring-2 focus:ring-[#009edb]/20'
                        : 'bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-[#009edb] focus:ring-2 focus:ring-[#009edb]/20'
                    }`}
                    autoFocus
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg
                      className={`w-6 h-6 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Search Results */}
              <div className="flex-1">
                <div className="w-full mx-auto h-full">
                  {query.trim() && filteredResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="h-full overflow-y-auto px-4"
                      onWheel={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                    >
                      <div className="grid gap-4 md:grid-cols-6 lg:grid-cols-6">
                        {filteredResults.map((result, index) => (
                          <Link
                            key={index}
                            href={result.href}
                            prefetch={false}
                            onClick={handleResultClick}
                            className={`block p-4 rounded-lg hover:bg-[#009edb]/10 transition-all duration-200 border ${
                              theme === 'light'
                                ? 'bg-white border-gray-200 hover:border-[#009edb]/30'
                                : 'bg-slate-800 border-slate-700 hover:border-[#009edb]/30'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-2xl">{getTypeIcon(result.type)}</span>
                              <div className="flex-1 min-w-0">
                                <div className={`font-semibold text-base truncate ${
                                  theme === 'light' ? 'text-gray-900' : 'text-white'
                                }`}>
                                  {result.title}
                                </div>
                                <div className={`text-sm mt-2 leading-relaxed line-clamp-2 ${
                                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                                }`}>
                                  {result.description}
                                </div>
                                <div className={`text-xs mt-2 font-medium ${getTypeColor(result.type)}`}>
                                  {result.type.replace('-', ' ').toUpperCase()}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {query.trim() && filteredResults.length === 0 && (
                    <div className="flex items-center justify-center h-full px-4">
                      <div className={`text-center ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        
                        <div className="text-xl font-medium mb-2">No results found</div>
                        <div className="text-lg">Try searching for services, industries, policies, or pages</div>
                      </div>
                    </div>
                  )}

                  {!query.trim() && (
                    <div className="flex items-center justify-center h-full px-4">
                      <div className={`text-center ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        
                        <div className="text-xl font-medium mb-2">Start your search</div>
                        <div className="text-lg">Search for services, industries, policies, and pages</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchBar;