"use client";
import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from './TranslationProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import { LogIn } from 'lucide-react';
import { InteractiveHoverButton } from './ui/InteractiveHoverButton';
import { useAppSelector } from '@/lib/store/hooks';

type MenuItem = {
  label: string;
  href?: string;
  subs?: (string | { title: string; items: (string | { label: string; href: string })[]; insights?: boolean; href?: string } | { label: string; href: string })[];
  overview?: string;
  isIcon?: boolean;
  icon?: React.ReactNode;
};

const leftMenu: MenuItem[] = [
  { 
    label: 'Home', 
    href: '/',
    subs: [], 
    overview: 'Welcome to Asija – Your trusted partner in audit, tax, and advisory services.'
  },
  { 
    label: 'About Us',
    href: '/about',
    subs: [
      { label: 'Who We Are', href: '/about' },
      { label: 'Life at Asija - (year wise)', href: '/about#ourjourney' },
      { label: 'Our Purpose and Values', href: '/about#values' },
      { label: 'Our Team / Strength', href: '/team' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Alumni', href: '/alumni' },
    ], 
    overview: 'Learn about our legacy, values, and the team driving excellence.'
  },
  { 
    label: 'Services',
    href: '/services',
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
        insights: true,
        href: '/services?service=Audit and Assurance'
      },
      { 
        title: 'Direct Tax', 
        items: [
          'Income Tax Services', 
          'Benami Transaction'
        ], 
        insights: true,
        href: '/services?service=Direct Tax'
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
        insights: true,
        href: '/services?service=Corporate Law Services'
      },
      { 
        title: 'Consultancy', 
        items: [
          'Process Re-Engineering', 
          'Business Advisory', 
          'Start-up Consultancy', 
          'MIS System Designing'
        ], 
        insights: true,
        href: '/services?service=Consultancy'
      },
      { 
        title: 'Indirect Tax', 
        items: [
          'Goods and Service Tax', 
          'Custom', 
          'Professional Tax'
        ], 
        insights: true,
        href: '/services?service=Indirect Tax'
      },
      { 
        title: 'Risk Advisory Services', 
        items: [], 
        insights: true,
        href: '/services?service=Risk Advisory Services'
      },
    ], 
    overview: 'Comprehensive audit, tax, and advisory solutions tailored to your business.'
  },
  { 
    label: 'Industries',
    href: '/industry',
    subs: [
      { label: 'Banking and Financial Institutions', href: '/industry?section=Banking and Financial Institutions' },
      { label: 'Education', href: '/industry?section=Education' },
      { label: 'Hospitality and Healthcare', href: '/industry?section=Hospitality and Healthcare' },
      { label: 'Infrastructure', href: '/industry?section=Infrastructure' },
      { label: 'Media and Entertainment', href: '/industry?section=Media and Entertainment' },
      { label: 'Realty Sector', href: '/industry?section=Realty Sector' },
      { label: 'Retail, White Goods & Consumer Electronics', href: '/industry?section=Retail, White Goods & Consumer Electronics' },
      { label: 'Telecom', href: '/industry?section=Telecom' },
      { label: 'Textiles', href: '/industry?section=Textiles' },
      { label: 'Trading', href: '/industry?section=Trading' },
    ], 
    overview: 'Industry-specific expertise to navigate complex regulatory and financial landscapes.'
  },
  { 
    label: 'Asija Global',
    href: '/global-services',
    subs: [
      { label: 'UAE', href: '/global-services/uae' },
      { label: 'UK', href: '/global-services/uk' },
      { label: 'Australia', href: '/global-services/australia' },
      { label: 'Canada', href: '/global-services/canada' },
      { label: 'USA', href: '/global-services/usa' },
    ], 
    overview: 'Global reach with local expertise – serving clients worldwide.'
  },
  { 
    label: 'Career',
    href: '/career',
    subs: [
      { label: 'Apply Form', href: '/apply-form' },
      { label: 'Current Openings', href: '/career' }
    ], 
    overview: 'Join a team of passionate professionals. Explore opportunities with us.'
  },
];

const rightMenu: MenuItem[] = [
  { 
    label: 'Contact Us',
    href: '/contact',
    subs: [
      { label: 'Office Locations', href: '/locations' },
      { label: 'Enquiry Form / Consult Us', href: '/contact' }
    ], 
    overview: 'Get in touch with our experts. We are here to help.'
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

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
      <div className="w-8 h-8 text-white/70 hover:text-[#009edb] transition-all hover:scale-110 cursor-pointer">
        {icon}
      </div>
    );
  }

  if (href) {
    return (
      <Link href={href} scroll={false} className="relative px-1.5 2xl:px-4 py-6 text-white/90 hover:text-white text-sm font-bold transition-colors flex items-center gap-1 group whitespace-nowrap">
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
            className="absolute h-1 bg-linear-to-r from-[#009edb] to-[#0077a3] rounded-full left-4 right-4"
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
    <button className="relative px-1.5 2xl:px-4 py-6 text-white/90 hover:text-white text-sm font-bold transition-colors flex items-center gap-1 group whitespace-nowrap">
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
          className="absolute h-1 bg-linear-to-r from-[#009edb] to-[#0077a3] rounded-full left-4 right-4"
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
  const router = useRouter();
  const { theme } = useTheme();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileOpenItem, setMobileOpenItem] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(leftMenu);
  const { industries } = useAppSelector((state) => state.industries);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await fetch('/api/regions');
        if (res.ok) {
          const regions = await res.json();
          
          const saarcCountries = ['Afghanistan', 'Bangladesh', 'Bhutan', 'India', 'Maldives', 'Nepal', 'Pakistan', 'Sri Lanka'];
          const saarcSubs: any[] = [];
          const otherSubs: any[] = [];

          regions.forEach((r: any) => {
             if (saarcCountries.includes(r.name)) {
                saarcSubs.push({ label: r.name, href: `/global-services/${r.slug}` });
             } else {
                otherSubs.push({ label: r.name, href: `/global-services/${r.slug}` });
             }
          });

          const finalSubs = [...otherSubs];
          if (saarcSubs.length > 0) {
             finalSubs.push({
                title: 'SAARC',
                items: saarcSubs,
                href: '/global-services',
                insights: false
             });
          }

          setMenuItems(prev => prev.map(item => {
            if (item.label === 'Asija Global') {
              return { ...item, subs: finalSubs };
            }
            return item;
          }));
        }
      } catch (error) {
        console.error('Failed to fetch regions', error);
      }
    };

    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const services = await res.json();
          const serviceSubs = services.map((service: any) => ({
            title: service.title,
            items: service.items,
            insights: service.insights,
            href: `/services?service=${encodeURIComponent(service.title)}`
          }));

          setMenuItems(prev => prev.map(item => {
            if (item.label === 'Services') {
              return { ...item, subs: serviceSubs };
            }
            return item;
          }));
        }
      } catch (error) {
        console.error('Failed to fetch services', error);
      }
    };

    fetchRegions();
    fetchServices();
  }, []);

  useEffect(() => {
    if (industries.length > 0) {
      const industrySubs = industries.map((industry: any) => ({
        label: industry.title,
        href: `/industry?section=${encodeURIComponent(industry.title)}`
      }));

      setMenuItems(prev => prev.map(item => {
        if (item.label === 'Industries') {
          return { ...item, subs: industrySubs };
        }
        return item;
      }));
    }
  }, [industries]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allMenu = [...menuItems, ...rightMenu];
  const findMenuItem = (label: string) => allMenu.find(item => item.label === label);

  const renderSubItems = (subs: MenuItem['subs']) => {
    if (!subs || subs.length === 0) return <p className={`${(theme === 'light' && scrolled) ? 'text-gray-400' : 'text-white/50'} italic text-sm`}>No subitems available.</p>;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {subs.map((sub, index) => {
          if (typeof sub === 'string') {
            return (
              <div key={index} className="group">
                <button className={`text-left ${(theme === 'light' && scrolled) ? 'text-gray-700' : 'text-white'} group-hover:text-[#009edb] text-base font-bold transition-all flex items-center gap-2 py-1 hover:translate-x-1`}>
                  <span className="w-1.5 h-1.5 bg-[#009edb] rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                  {sub}
                </button>
              </div>
            );
          } else if ('title' in sub) {
            // This is a service item with title and items array
            return (
              <div key={(sub as any).title} className="group relative">
                <Link 
                  href={(sub as any).href || '/services'}
                  className={`${(theme === 'light' && scrolled) ? 'text-gray-900' : 'text-white'} group-hover:text-[#009edb] font-bold text-base mb-1 transition-all flex items-center gap-2 py-1 hover:translate-x-1`}
                >
                  <span className="w-1.5 h-1.5 bg-[#009edb] rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                  {(sub as any).title}
                </Link>
                {/* Render sub-items if they are objects (like SAARC countries) */}
                {(sub as any).items && (sub as any).items.length > 0 && typeof (sub as any).items[0] !== 'string' && (
                  <div className="hidden group-hover:block absolute left-0 top-full bg-white dark:bg-slate-950 p-3 rounded-lg shadow-xl border border-gray-100 dark:border-gray-800 z-20 min-w-[180px]">
                    {(sub as any).items.map((item: any, i: number) => (
                      <Link 
                        key={i}
                        href={item.href}
                        className="block text-sm text-gray-600 hover:text-[#009edb] dark:text-gray-300 dark:hover:text-[#009edb] transition-colors py-1.5 px-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-md"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          } else if ('href' in sub && 'label' in sub) {
            // This is a simple link item
            return (
              <div key={index} className="group">
                <Link 
                  href={sub.href}
                  className={`text-left ${(theme === 'light' && scrolled) ? 'text-gray-700' : 'text-white'} group-hover:text-[#009edb] text-base font-bold transition-all flex items-center gap-2 py-1 hover:translate-x-1`}
                >
                  <span className="w-1.5 h-1.5 bg-[#009edb] rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                  {sub.label}
                </Link>
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
                  className="text-left text-sm font-bold transition-all block py-1 hover:translate-x-1"
                >
                  {sub}
                </button>
              );
            } else if ('title' in sub) {
              // This is a service item with title and items array
              return (
                <div key={(sub as any).title} className="space-y-2">
                  <Link 
                    href={(sub as any).href || '/services'}
                    className={`${(theme === 'light' && scrolled) ? 'text-gray-900' : 'text-white'} font-bold text-sm block hover:text-[#009edb] transition-colors`}
                  >
                    {(sub as any).title}
                  </Link>
                  {/* Render sub-items if they are objects */}
                  {(sub as any).items && (sub as any).items.length > 0 && typeof (sub as any).items[0] !== 'string' && (
                    <div className="pl-3 space-y-2 border-l border-gray-200 dark:border-gray-700 ml-1">
                      {(sub as any).items.map((item: any, i: number) => (
                        <Link 
                          key={i}
                          href={item.href}
                          className="block text-xs text-gray-500 hover:text-[#009edb] dark:text-gray-400 dark:hover:text-[#009edb] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else if ('href' in sub && 'label' in sub) {
              // This is a simple link item
              return (
                <Link
                  key={index}
                  href={sub.href}
                  style={{
                    color: theme === 'light' ? '#6b7280' : '#ffffff',
                  }}
                  className="text-left text-sm font-bold transition-all block py-1 hover:translate-x-1"
                >
                  {sub.label}
                </Link>
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
            ? (theme === 'light' 
                ? 'h-16 bg-[#a8d5f4] backdrop-blur-lg shadow-lg shadow-black/5'
                : 'h-16 bg-slate-950/95 backdrop-blur-lg shadow-lg shadow-slate-950/20'
              )
            : (theme === 'light' ? 'h-20 bg-slate-950' : 'h-20 bg-slate-950')
        }`}
      >
        <div className="h-full flex justify-between items-center px-4 md:px-8 w-full mx-auto relative z-10">
          {/* LEFT SIDE */}
          <div className="flex gap-2 lg:gap-6 items-center">
            
            <motion.div className={`flex items-center gap-1.5 md:gap-3  cursor-pointer`}>
            <Link href="/">
              <motion.div className={`flex items-center gap-2 cursor-pointer flex-row-reverse`}>
                {/* TEXT: Always visible */}
                <motion.div
                  className={`text-left leading-tight whitespace-nowrap  `}
                  initial={false}
                  animate={{ 
                    opacity: 1,
                    width: 'auto'
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className={`font-bold text-white text-xs md:text-sm tracking-loose`}>
                    ASIJA & ASSOCIATES LLP
                  </div>
                  <div className={`text-[10px] md:text-[10px] mt-0.5 tracking-wide ${(scrolled && theme === 'light') ? 'text-theme-green' : 'text-white'}`}>
                    Chartered Accountants
                  </div>
                </motion.div>

                {/* LOGO */}
                <motion.div 
                  className=""
                  
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <img
                    src={scrolled ? "/logo13.png" : "/logo12.png"}
                    alt="Asija Logo"
                    className={`w-13 md:w-13`}
                  />
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>

            {/* Desktop Navigation - Left */}
            <nav className="hidden min-[1100px]:flex gap-0.5 relative">
              {menuItems.map((item) => (
                <motion.div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.subs && item.subs.length > 0 ? setHoveredItem(item.label) : null}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <NavItem 
                    label={item.label}
                    isActive={hoveredItem === item.label}
                    hasDropdown={item.subs && item.subs.length > 0}
                    href={item.href}
                  />
                </motion.div>
              ))}
              <motion.div
                className="relative"
                onMouseEnter={() => setHoveredItem(null)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <NavItem 
                  label="Policies"
                  href="/policies"
                />
              </motion.div>
            </nav>
          </div>

          {/* RIGHT SIDE – Desktop */}
          <nav className="hidden min-[1100px]:flex gap-1 2xl:gap-4 items-center">
            {rightMenu.map((item) => (
              <motion.div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.subs && item.subs.length > 0 ? setHoveredItem(item.label) : null}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <NavItem 
                  label={item.label}
                  isIcon={item.isIcon}
                  icon={item.icon}
                  isActive={hoveredItem === item.label}
                  hasDropdown={item.subs && item.subs.length > 0}
                  href={item.href}
                />
              </motion.div>
            ))}

            {/* Social Icons Desktop */}
            <div className="flex items-center gap-1.5 2xl:gap-4 mr-1 2xl:mr-2">
               <a href="https://www.linkedin.com/company/asija-&-associates-llp/" target="_blank" rel="noopener noreferrer" className="w-5 h-5 text-white/70 hover:text-[#009edb] transition-colors"><LinkedInIcon /></a>
               <a href="https://www.instagram.com/teamasija/" target="_blank" rel="noopener noreferrer" className="w-5 h-5 text-white/70 hover:text-[#009edb] transition-colors"><InstagramIcon /></a>
               <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="w-5 h-5 text-white/70 hover:text-[#009edb] transition-colors"><WhatsAppIcon /></a>
            </div>

            {/* Admin Dashboard (visible only to service@asija.in) */}
            {session?.user?.email === 'service@asija.in' && (
              <Link href="/admin" className="ml-1 2xl:ml-4 px-2 2xl:px-3 py-2 rounded-md bg-[#0b76a3] hover:bg-[#0077a3] text-white text-sm font-medium">
                Dashboard
              </Link>
            )}

            <div className='w-0.5 h-6 bg-zinc-500 mr-1 2xl:mr-4' ></div>

            {/* Theme Toggle (moved from ThemeProvider) */}
            {!session && <ThemeToggle />}

            {/* Language Switcher */}
            {!session && <LanguageSwitcher />}

            {/* Login/User Menu */}
            {session ? (
              <div className="relative ml-1 2xl:ml-4">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-9 h-9 rounded-full bg-[#009edb] text-black font-bold text-lg flex items-center justify-center hover:bg-[#0077a3] transition-colors shadow-lg shadow-[#009edb]/20"
                >
                  {session.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                </button>
                
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-56 bg-slate-950 border border-white/10 rounded-xl shadow-2xl z-50"
                    >
                      <div className="py-1">
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm text-white font-medium truncate">{session.user?.name}</p>
                          <p className="text-xs text-white/50 truncate">{session.user?.email}</p>
                        </div>
                        
                        <div className="px-4 py-2 flex items-center justify-between hover:bg-white/5 transition-colors">
                           <span className="text-sm text-white/90">Theme</span>
                           <ThemeToggle />
                        </div>
                        <div className="px-4 py-2 flex items-center justify-between border-b border-white/10 hover:bg-white/5 transition-colors">
                           <span className="text-sm text-white/90">Language</span>
                           <LanguageSwitcher />
                        </div>

                        <Link 
                          href="/policies" 
                          className="block px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 hover:text-[#009edb] transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Account
                        </Link>
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            signOut();
                          }}
                          className="block w-full text-left px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 hover:text-red-400 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
               <Link href="/login" className="text-white hover:text-[#009edb] text-sm font-medium ml-1 2xl:ml-4 flex items-center justify-center gap-1">
                 Login <LogIn size={15}/>
               </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-[1100px]:hidden text-white p-2 hover:bg-white/15 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Bottom border gradient */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#009edb] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>

      {/* Desktop Mega Menu Dropdown */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            className={`fixed left-0 right-0 backdrop-blur-xl shadow-2xl z-50 border-t ${
              theme === 'light' 
                ? 'bg-sky-100 border-sky-200 shadow-sky-100/20' 
                : 'bg-slate-950/98 border-white/5 shadow-slate-950/20'
            }`}
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
                  <h3 className="text-[#009edb] font-semibold text-xl mb-6 tracking-wide flex items-center gap-2">
                    {hoveredItem}
                  </h3>
                  {renderSubItems(findMenuItem(hoveredItem)?.subs)}
                </div>

                {/* Overview Panel */}
                <div className={`backdrop-blur-sm p-6 rounded-2xl border h-fit ${
                  theme === 'light'
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-linear-to-b from-white/5 to-white/3 border-white/10'
                }`}>
                  <h4 className={`font-semibold text-lg mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Overview</h4>


                  <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-white/70'}`}>
                    {findMenuItem(hoveredItem)?.overview || 'Explore Insights'}
                  </p>
                  <div className="mt-5">
                    <InteractiveHoverButton
                      text="Learn More"
                      className="w-auto"
                      onClick={() => {
                        const href = findMenuItem(hoveredItem)?.href;
                        if (href) router.push(href);
                      }}
                    />
                  </div>
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
              className="fixed inset-0 bg-slate-950/45 backdrop-blur-sm z-40 min-[1100px]:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                backgroundColor: theme === 'light' ? '#ffffff' : '#020617',
              }}
              className="fixed top-0 right-0 bottom-0 w-80 z-50 min-[1100px]:hidden shadow-2xl overflow-y-auto"
            >
              <div className="flex flex-col h-full p-6">
                {/* Close Button + Top Controls */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <LanguageSwitcher align="left" />
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
                  {menuItems.map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div
                        className="flex items-center justify-between hover:bg-white/8 rounded-lg transition-all border-l-2 border-transparent hover:border-[#009edb] w-full"
                        style={{
                          color: theme === 'light' ? '#1f2937' : '#ffffff',
                        }}
                      >
                        {item.href ? (
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-left font-medium text-base py-3 px-4 flex-1"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            onClick={() => {
                              if (item.subs && item.subs.length > 0) {
                                setMobileOpenItem(mobileOpenItem === item.label ? null : item.label);
                              }
                            }}
                            className="text-left font-medium text-base py-3 px-4 flex-1"
                          >
                            {item.label}
                          </button>
                        )}

                        {item.subs && item.subs.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setMobileOpenItem(mobileOpenItem === item.label ? null : item.label);
                            }}
                            className="p-3"
                          >
                            <motion.div
                              animate={{ rotate: mobileOpenItem === item.label ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDownIcon />
                            </motion.div>
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {mobileOpenItem === item.label && renderMobileSubItems(item.subs)}
                      </AnimatePresence>
                    </motion.div>
                  ))}

                  {session?.user?.email === 'service@asija.in' && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: menuItems.length * 0.05 }}
                    >
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          color: theme === 'light' ? '#1f2937' : '#ffffff',
                        }}
                        className="text-left font-medium text-base py-3 px-4 hover:bg-white/8 rounded-lg transition-all border-l-2 border-transparent hover:border-[#009edb] w-full block"
                      >
                        Dashboard
                      </Link>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: menuItems.length * 0.05 }}
                  >
                    <Link
                      href="/policies"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        color: theme === 'light' ? '#1f2937' : '#ffffff',
                      }}
                      className="text-left font-medium text-base py-3 px-4 hover:bg-white/8 rounded-lg transition-all border-l-2 border-transparent hover:border-[#009edb] w-full block"
                    >
                      Policies
                    </Link>
                  </motion.div>

                  <div className="h-px bg-linear-to-r from-white/20 to-transparent my-2" />

                  {/* Mobile Login/Logout */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (menuItems.length + 1) * 0.05 }}
                  >
                     {session ? (
                        <button
                          onClick={() => {
                            signOut();
                            setMobileMenuOpen(false);
                          }}
                          style={{
                            color: theme === 'light' ? '#1f2937' : '#ffffff',
                          }}
                          className="text-left font-medium text-base py-3 px-4 hover:bg-white/8 rounded-lg transition-all border-l-2 border-transparent hover:border-[#009edb] w-full block"
                        >
                          Logout
                        </button>
                     ) : (
                        <Link
                          href="/login"
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            color: theme === 'light' ? '#1f2937' : '#ffffff',
                          }}
                          className="text-left font-medium text-base py-3 px-4 hover:bg-white/8 rounded-lg transition-all border-l-2 border-transparent hover:border-[#009edb] w-full block"
                        >
                          Login
                        </Link>
                     )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: menuItems.length * 0.05 }}
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
                      className="text-left font-medium text-base py-3 px-4 hover:bg-white/8 rounded-lg transition-all border-l-2 border-transparent hover:border-[#009edb] w-full flex items-center justify-between"
                    >
                      {rightMenu[0].label}
                      {rightMenu[0].subs && rightMenu[0].subs.length > 0 && (
                        <motion.div
                          animate={{ rotate: mobileOpenItem === rightMenu[0].label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDownIcon />
                        </motion.div>
                      )}
                    </button>
                    <AnimatePresence>
                      {mobileOpenItem === rightMenu[0].label && renderMobileSubItems(rightMenu[0].subs)}
                    </AnimatePresence>
                  </motion.div>

                  {/* Social Icons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (menuItems.length + 1) * 0.05 }}
                    className="flex gap-6 mt-auto pt-8"
                  >
                    <a 
                      href="https://www.instagram.com/teamasija/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: theme === 'light' ? '#f3f4f6' : 'rgba(255,255,255,0.08)',
                        color: theme === 'light' ? '#1f2937' : '#ffffff',
                      }}
                      className="w-12 h-12 flex items-center justify-center rounded-lg transition-all hover:scale-110"
                    >
                      <InstagramIcon />
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/asija-&-associates-llp/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: theme === 'light' ? '#f3f4f6' : 'rgba(255,255,255,0.08)',
                        color: theme === 'light' ? '#1f2937' : '#ffffff',
                      }}
                      className="w-12 h-12 flex items-center justify-center rounded-lg transition-all hover:scale-110"
                    >
                      <LinkedInIcon />
                    </a>
                    <button 
                      style={{
                        backgroundColor: theme === 'light' ? '#f3f4f6' : 'rgba(255,255,255,0.08)',
                        color: theme === 'light' ? '#1f2937' : '#ffffff',
                      }}
                      className="w-12 h-12 flex items-center justify-center rounded-lg transition-all hover:scale-110"
                    >
                      <WhatsAppIcon />
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
      className="p-1 rounded-md shadow-sm border transition-all duration-200"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}