"use client";
import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation, LanguageSwitcher } from './TranslationProvider';
import Link from 'next/link';

type MenuItem = {
  label: string;
  translationKey?: string;
  href?: string;
  subs?: (string | { title: string; items: string[]; insights: boolean } | { label: string; href: string })[];
  overview?: string;
  isIcon?: boolean;
  icon?: React.ReactNode;
};

const leftMenu: MenuItem[] = [
  { 
    label: 'Home', 
    translationKey: 'navbar.home',
    href: '/',
    subs: [], 
    overview: 'navbar.overview.home'
  },
  { 
    label: 'About Us',
    translationKey: 'navbar.aboutUs',
    subs: [
      'Who We Are',
      { label: 'Our Team / Strength', href: '/team' },
      'Our Purpose and Values',
      'Alumni',
      'Life at Asija - (year wise)',
    ], 
    overview: 'navbar.overview.aboutUs'
  },
  { 
    label: 'Services',
    translationKey: 'navbar.services',
    subs: [
      { 
        title: 'Audit and Assurance', 
        items: [
          'Statutory Audit', 
          'Internal Audit', 
          'Procurement Audit', 
          'Special Audit', 
          'Fund Audit', 
          'Externally Funded Project Audit', 
          'Management Audit'
        ], 
        insights: true 
      },
      { 
        title: 'Direct Tax', 
        items: [
          'Income Tax Services', 
          'Benami Transaction'
        ], 
        insights: true 
      },
      { 
        title: 'Corporate Law Services', 
        items: [
          'Companies Act 2013', 
          'Limited Liability Partnership Act 2008', 
          'Partnership Act 1932', 
          'NGO Registration & Consultancy', 
          'Foreign Contribution Regulation Act 2010', 
          'Assurance Services'
        ], 
        insights: true 
      },
      { 
        title: 'Consultancy', 
        items: [
          'Process Re-Engineering', 
          'Business Advisory', 
          'Start-up Consultancy', 
          'MIS System Designing'
        ], 
        insights: true 
      },
      { 
        title: 'Indirect Tax', 
        items: [
          'Goods and Service Tax', 
          'Custom', 
          'Professional Tax'
        ], 
        insights: true 
      },
      { 
        title: 'Risk Advisory Services', 
        items: [], 
        insights: true 
      },
    ], 
    overview: 'navbar.overview.services'
  },
  { 
    label: 'Industries',
    translationKey: 'navbar.industries',
    subs: [
      'Banking and Financial Institutions',
      'Education',
      'Hospitality and Healthcare',
      'Infrastructure',
      'Media and Entertainment',
      'Realty Sector',
      'Retail, White Goods & Consumer Electronics',
      'Telecom',
      'Textiles',
      'Trading',
    ], 
    overview: 'navbar.overview.industries'
  },
  { 
    label: 'Asija Global Services',
    translationKey: 'navbar.asijaGlobal',
    subs: [], 
    overview: 'navbar.overview.asijaGlobal'
  },
  { 
    label: 'Career',
    translationKey: 'navbar.career',
    subs: ['Apply Form', 'Current Openings'], 
    overview: 'navbar.overview.career'
  },
];

const rightMenu: MenuItem[] = [
  { 
    label: 'Contact Us',
    translationKey: 'navbar.contactUs',
    subs: [
      'Office Locations',
      'Contact No.',
      'Emails',
      'Enquiry Form / Consult Us'
    ], 
    overview: 'navbar.overview.contactUs'
  },
];

/* --------------------------------------------------------------- */
/*  ICON COMPONENTS                                                */
/* --------------------------------------------------------------- */
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.946-.2-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.44-.645 1.44-1.44-.645-1.44-1.44-1.44z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.368-.027-3.127-1.904-3.127-1.907 0-2.2 1.489-2.2 3.027v5.704h-3v-11h2.879v1.51h.041c.4-.757 1.377-1.555 2.834-1.555 3.033 0 3.596 1.997 3.596 4.595v5.45z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

/* --------------------------------------------------------------- */
/*  NAV ITEM                                                       */
/* --------------------------------------------------------------- */
type NavItemProps = {
  label: string;
  isIcon?: boolean;
  icon?: React.ReactNode;
  isActive?: boolean;
  hasDropdown?: boolean;
  href?: string;
};

const NavItem = ({ label, isIcon, icon, isActive, hasDropdown, href }: NavItemProps) => {
  if (isIcon) {
    return (
      <div className="w-8 h-8 text-white/70 hover:text-[#1DCD9F] transition-all hover:scale-110 cursor-pointer">
        {icon}
      </div>
    );
  }

  if (href) {
    return (
      <Link href={href} className="relative px-4 py-6 text-white/90 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5 group">
        {label}
        {hasDropdown && (
          <motion.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon />
          </motion.div>
        )}
        {isActive && (
          <motion.div
            className="absolute h-1 bg-linear-to-r from-[#1DCD9F] to-[#0EA578] rounded-full left-4 right-4"
            style={{ bottom: -2 }}
            layoutId="nav-underline"
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </Link>
    );
  }

  return (
    <button className="relative px-4 py-6 text-white/90 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5 group">
      {label}
      {hasDropdown && (
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDownIcon />
        </motion.div>
      )}
      {isActive && (
        <motion.div
          className="absolute h-1 bg-linear-to-r from-[#1DCD9F] to-[#0EA578] rounded-full left-4 right-4"
          style={{ bottom: -2 }}
          layoutId="nav-underline"
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
};

/* --------------------------------------------------------------- */
/*  MAIN NAVBAR                                                    */
/* --------------------------------------------------------------- */
export default function Navbar() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileOpenItem, setMobileOpenItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allMenu = [...leftMenu, ...rightMenu];
  const findMenuItem = (label: string) => allMenu.find(item => item.label === label);

  const renderSubItems = (subs: MenuItem['subs']) => {
    if (!subs || subs.length === 0) return <p className="text-white/50 italic text-sm">No subitems available.</p>;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {subs.map((sub, index) => {
          if (typeof sub === 'string') {
            return (
              <div key={index} className="group">
                <button className="text-left text-white/90 group-hover:text-[#1DCD9F] text-base font-medium transition-all flex items-center gap-2 py-1 hover:translate-x-1">
                  <span className="w-1.5 h-1.5 bg-[#1DCD9F] rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                  {sub}
                </button>
              </div>
            );
          } else if ('href' in sub) {
            return (
              <div key={index} className="group">
                <Link 
                  href={sub.href}
                  className="text-left text-white/90 group-hover:text-[#1DCD9F] text-base font-medium transition-all flex items-center gap-2 py-1 hover:translate-x-1"
                >
                  <span className="w-1.5 h-1.5 bg-[#1DCD9F] rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                  {sub.label}
                </Link>
              </div>
            );
          } else {
            return (
              <div key={(sub as any).title} className="space-y-3">
                <h4 className="text-[#1DCD9F] font-semibold text-base mb-1">{(sub as any).title}</h4>
                <ul className="space-y-2">
                  {(sub as any).items.map((item: string, idx: number) => (
                    <li key={idx}>
                      <button className="text-left text-white/70 hover:text-white text-sm transition-all hover:translate-x-1 inline-block py-0.5">
                        {item}
                      </button>
                    </li>
                  ))}
                  {(sub as any).insights && (
                    <li className="pt-1">
                      <button className="text-left text-[#1DCD9F] text-sm font-medium hover:underline inline-flex items-center gap-1 group">
                        View Insights
                        <ArrowRightIcon />
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            );
          }
        })}
      </div>
    );
  };

  const renderMobileSubItems = (subs: MenuItem['subs']) => {
    if (!subs || subs.length === 0) return null;

    return (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pl-6 pr-4 py-3 space-y-3 bg-white/8 rounded-lg mt-2">
          {subs.map((sub, index) => {
            if (typeof sub === 'string') {
              return (
                <button
                  key={index}
                  style={{
                    color: theme === 'light' ? '#6b7280' : '#ffffff',
                  }}
                  className="text-left text-sm transition-all block py-1 hover:translate-x-1"
                >
                  {sub}
                </button>
              );
            } else if ('href' in sub) {
              return (
                <Link
                  key={index}
                  href={sub.href}
                  style={{
                    color: theme === 'light' ? '#6b7280' : '#ffffff',
                  }}
                  className="text-left text-sm transition-all block py-1 hover:translate-x-1"
                >
                  {sub.label}
                </Link>
              );
            } else {
              return (
                <div key={(sub as any).title} className="space-y-2">
                  <h5 className="text-[#1DCD9F] font-semibold text-sm">{(sub as any).title}</h5>
                  <ul className="space-y-1.5 pl-3">
                    {(sub as any).items.map((item: string, idx: number) => (
                      <li key={idx}>
                        <button 
                          style={{
                            color: theme === 'light' ? '#6b7280' : '#ffffff',
                          }}
                          className="text-left text-xs transition-all hover:translate-x-1 inline-block"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'h-16 bg-[#2a2a2a]/95 backdrop-blur-lg shadow-lg shadow-black/20' 
            : 'h-20 bg-[#2a2a2a]'
        }`}
      >
        <div className="h-full flex justify-between items-center px-4 md:px-20 w-full mx-auto">
          {/* LEFT SIDE */}
          <div className="flex gap-8 lg:gap-10 items-center">
            
            <motion.div className="flex items-center gap-2.5 md:gap-3 cursor-pointer">
            <Link href="/">
            <motion.img
              src="/logo.png"
              alt="Asija Logo"
              className={`transition-all duration-300 ${scrolled ? 'w-12 md:w-13' : 'w-9 md:w-11'}`}
            />
            </Link>
            
            {/* TEXT: Hidden on scroll with smooth collapse */}
            <Link href="/">
            <motion.div
              className="text-left leading-tight overflow-hidden whitespace-nowrap"
              initial={false}
              animate={{ 
                opacity: scrolled ? 0 : 1,
                width: scrolled ? 0 : 'auto',
                marginLeft: scrolled ? 0 : undefined
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="font-extrabold text-white text-xs md:text-sm tracking-tight">
                ASIJA & ASSOCIATES LLP
              </div>
              <div className="text-[10px] md:text-xs font-medium text-theme-green tracking-wide">
                {t('common.charteredAccountants')}
              </div>
            </motion.div>
            </Link>
          </motion.div>

            {/* Desktop Navigation - Left */}
            <nav className="hidden lg:flex gap-1 relative">
              {leftMenu.map((item) => (
                <motion.div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.subs && item.subs.length > 0 ? setHoveredItem(item.label) : null}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <NavItem 
                    label={item.translationKey ? t(item.translationKey) : item.label}
                    isActive={hoveredItem === item.label}
                    hasDropdown={item.subs && item.subs.length > 0}
                    href={item.href}
                  />
                </motion.div>
              ))}
            </nav>
          </div>

          {/* RIGHT SIDE – Desktop */}
          <nav className="hidden md:flex gap-4 items-center">
            {rightMenu.map((item) => (
              <motion.div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.subs && item.subs.length > 0 ? setHoveredItem(item.label) : null}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <NavItem 
                  label={item.translationKey ? t(item.translationKey) : item.label}
                  isIcon={item.isIcon}
                  icon={item.icon}
                  isActive={hoveredItem === item.label}
                  hasDropdown={item.subs && item.subs.length > 0}
                />
              </motion.div>
            ))}
            <div className='w-0.5 h-6 bg-zinc-500 mr-4' ></div>

            {/* Theme Toggle (moved from ThemeProvider) */}
            <ThemeToggle />

            {/* Language Switcher */}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/15 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Bottom border gradient */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#1DCD9F]/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>

      {/* Desktop Mega Menu Dropdown */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            className="fixed left-0 right-0 bg-[#2a2a2a]/98 backdrop-blur-xl shadow-2xl z-50 border-t border-white/5"
            style={{ top: scrolled ? '4rem' : '5rem' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onMouseEnter={() => setHoveredItem(hoveredItem)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
                {/* Submenu Columns */}
                <div>
                  <h3 className="text-[#1DCD9F] font-semibold text-xl mb-6 tracking-wide flex items-center gap-2">
                    {(() => {
                      const menuItem = findMenuItem(hoveredItem);
                      return menuItem?.translationKey ? t(menuItem.translationKey) : hoveredItem;
                    })()}
                  </h3>
                  {renderSubItems(findMenuItem(hoveredItem)?.subs)}
                </div>

                {/* Overview Panel */}
                <div className="bg-linear-to-b from-white/5 to-white/3 backdrop-blur-sm p-6 rounded-2xl border border-white/10 h-fit">
                  <h4 className="text-white font-semibold text-lg mb-3">Overview</h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {findMenuItem(hoveredItem)?.overview ? t(findMenuItem(hoveredItem)?.overview || '') : t('common.exploreInsights')}
                  </p>
                  <button className="mt-5 text-[#1DCD9F] text-sm font-medium hover:underline inline-flex items-center gap-1 group">
                    {t('common.learnMore')}
                    <motion.div
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <ArrowRightIcon />
                    </motion.div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                backgroundColor: theme === 'light' ? '#ffffff' : '#252525',
              }}
              className="fixed top-0 right-0 bottom-0 w-80 z-50 md:hidden shadow-2xl overflow-y-auto"
            >
              <div className="flex flex-col h-full p-6">
                {/* Close Button + Top Controls */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <ThemeToggle />
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ color: theme === 'light' ? '#1f2937' : '#ffffff' }}
                    className="p-2 hover:bg-white/15 rounded-lg transition-colors"
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="flex flex-col gap-3 flex-1">
                  {leftMenu.map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <button
                        onClick={() => {
                          if (item.subs && item.subs.length > 0) {
                            setMobileOpenItem(mobileOpenItem === item.label ? null : item.label);
                          } else {
                            setMobileMenuOpen(false);
                          }
                        }}
                        style={{
                          color: theme === 'light' ? '#1f2937' : '#ffffff',
                          backgroundColor: theme === 'light' ? 'transparent' : 'transparent',
                        }}
                        className="text-left font-medium text-base py-3 px-4 hover:bg-white/8 rounded-lg transition-all border-l-2 border-transparent hover:border-[#1DCD9F] w-full flex items-center justify-between"
                      >
                        {item.translationKey ? t(item.translationKey) : item.label}
                        {item.subs && item.subs.length > 0 && (
                          <motion.div
                            animate={{ rotate: mobileOpenItem === item.label ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDownIcon />
                          </motion.div>
                        )}
                      </button>
                      <AnimatePresence>
                        {mobileOpenItem === item.label && renderMobileSubItems(item.subs)}
                      </AnimatePresence>
                    </motion.div>
                  ))}

                  <div className="h-px bg-linear-to-r from-white/20 to-transparent my-2" />

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: leftMenu.length * 0.05 }}
                  >
                    <button
                      onClick={() => {
                        const contactItem = rightMenu[0];
                        if (contactItem.subs && contactItem.subs.length > 0) {
                          setMobileOpenItem(mobileOpenItem === contactItem.label ? null : contactItem.label);
                        } else {
                          setMobileMenuOpen(false);
                        }
                      }}
                      style={{
                        color: theme === 'light' ? '#1f2937' : '#ffffff',
                      }}
                      className="text-left font-medium text-base py-3 px-4 hover:bg-white/8 rounded-lg transition-all border-l-2 border-transparent hover:border-[#1DCD9F] w-full flex items-center justify-between"
                    >
                      {rightMenu[0].translationKey ? t(rightMenu[0].translationKey) : 'Contact Us'}
                      {rightMenu[0].subs && rightMenu[0].subs.length > 0 && (
                        <motion.div
                          animate={{ rotate: mobileOpenItem === 'Contact Us' ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDownIcon />
                        </motion.div>
                      )}
                    </button>
                    <AnimatePresence>
                      {mobileOpenItem === 'Contact Us' && renderMobileSubItems(rightMenu[0].subs)}
                    </AnimatePresence>
                  </motion.div>

                  {/* Social Icons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (leftMenu.length + 1) * 0.05 }}
                    className="flex gap-6 mt-auto pt-8"
                  >
                    <button 
                      style={{
                        backgroundColor: theme === 'light' ? '#f3f4f6' : 'rgba(255,255,255,0.08)',
                        color: theme === 'light' ? '#1f2937' : '#ffffff',
                      }}
                      className="w-12 h-12 flex items-center justify-center rounded-lg transition-all hover:scale-110"
                    >
                      <InstagramIcon />
                    </button>
                    <button 
                      style={{
                        backgroundColor: theme === 'light' ? '#f3f4f6' : 'rgba(255,255,255,0.08)',
                        color: theme === 'light' ? '#1f2937' : '#ffffff',
                      }}
                      className="w-12 h-12 flex items-center justify-center rounded-lg transition-all hover:scale-110"
                    >
                      <LinkedInIcon />
                    </button>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
        color: theme === 'light' ? '#1f2937' : '#ffffff',
        borderColor: theme === 'light' ? '#e5e7eb' : '#374151',
      }}
      className="p-2 rounded-md shadow-sm border transition-all duration-200"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}