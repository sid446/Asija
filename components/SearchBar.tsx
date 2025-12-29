"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

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
  const [query, setQuery] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [filteredResults, setFilteredResults] = useState<{
    type: string;
    title: string;
    description: string;
    href: string;
  }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch services and industries
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [servicesRes, industriesRes, policiesRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/industries'),
          fetch('/api/admin/policies')
        ]);

        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData);
        }

        if (industriesRes.ok) {
          const industriesData = await industriesRes.json();
          setIndustries(industriesData.industries || []);
        }

        if (policiesRes.ok) {
          const policiesData = await policiesRes.json();
          setPolicies(policiesData);
        }
      } catch (error) {
        console.error('Failed to fetch search data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
    services.forEach(service => {
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
      service.items.forEach(item => {
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
    industries.forEach(industry => {
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
    policies.forEach(policy => {
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

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsSearchOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <div ref={searchRef} className="relative">
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

      {/* Search Input */}
      {isSearchOpen && (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Search services, industries, policies & pages..."
            className={`w-64 px-4 py-2 pl-10 pr-10 text-sm rounded-lg border transition-all duration-200 ${
              theme === 'light'
                ? 'bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#009edb] focus:ring-2 focus:ring-[#009edb]/20'
                : 'bg-slate-800/90 border-slate-600 text-white placeholder-gray-400 focus:border-[#009edb] focus:ring-2 focus:ring-[#009edb]/20'
            }`}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg
              className={`w-4 h-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setIsOpen(false);
              setQuery('');
            }}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
              theme === 'light' ? 'hover:bg-gray-200 text-gray-400' : 'hover:bg-slate-600 text-gray-500'
            }`}
            aria-label="Close search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {isLoading && (
            <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-[#009edb] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {isOpen && (query.trim() || filteredResults.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-2 w-full md:w-96 max-h-96 overflow-hidden rounded-lg shadow-xl border z-50 ${
              theme === 'light'
                ? 'bg-white border-gray-200'
                : 'bg-slate-800 border-slate-600'
            }`}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="max-h-96 overflow-y-auto">
              {filteredResults.length > 0 ? (
                <div className="py-2">
                  {filteredResults.map((result, index) => (
                    <Link
                      key={index}
                      href={result.href}
                      onClick={handleResultClick}
                      className={`block px-4 py-3 hover:bg-[#009edb]/10 transition-colors border-b last:border-b-0 ${
                        theme === 'light' ? 'border-gray-100' : 'border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{getTypeIcon(result.type)}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium text-sm truncate ${
                            theme === 'light' ? 'text-gray-900' : 'text-white'
                          }`}>
                            {result.title}
                          </div>
                          <div className={`text-xs mt-1 ${
                            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            {result.description}
                          </div>
                          <div className={`text-xs mt-1 ${getTypeColor(result.type)}`}>
                            {result.type.replace('-', ' ').toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : query.trim() ? (
                <div className="px-4 py-8 text-center">
                  <div className={`text-sm ${
                    theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    No results found for &quot;{query}&quot;
                  </div>
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <div className={`text-sm ${
                    theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    Start typing to search services, industries, policies &amp; pages...
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;