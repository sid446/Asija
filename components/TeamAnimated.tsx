'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';
import { Maximize2, Minimize2, Loader2 } from 'lucide-react';

// Motion variants
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

// Helper to render structured content
const renderSectionContent = (items: any[]) => {
  if (!items || !Array.isArray(items)) return null;

  return (
    <ul className="space-y-4">
      {items.map((item, idx) => (
        <li key={idx} className="flex flex-col gap-1">
          <div className="flex items-start gap-2">
            <span className="text-[#009edb] mt-1.5 text-xs">●</span>
            <div className="flex-1">
              <span className="font-semibold block text-sm">{item.title}</span>
              {item.description && (
                <p className="text-sm opacity-80 mt-1 whitespace-pre-line leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
          
          {/* Sub-items */}
          {item.subItems && item.subItems.length > 0 && (
            <ul className="pl-6 mt-2 space-y-2 border-l border-[#009edb]/20 ml-1.5">
              {item.subItems.map((sub: string, subIdx: number) => (
                <li key={subIdx} className="flex items-start gap-2 text-sm opacity-80">
                  <span className="text-[#009edb] mt-1.5 text-[10px]">○</span>
                  <span className="whitespace-pre-line">{sub}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default function TeamAnimated() {
  const { theme } = useTheme();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch('/api/admin/team');
        const data = await res.json();
        if (data.items) {
          setMembers(data.items);
        }
      } catch (error) {
        console.error('Failed to fetch team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // LOCK BODY SCROLL + HIDE SCROLLBAR WHEN SIDEBAR IS OPEN
  useEffect(() => {
    if (selectedMember) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Lock body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';

      // Optional: hide scrollbar visually (no layout jump)
      document.documentElement.style.overflow = 'hidden';
    } else {
      setIsFullScreen(false);
      // Restore scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';

      document.documentElement.style.overflow = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [selectedMember]);

  // FORCE SIDEBAR TO CAPTURE MOUSE WHEEL (even on touchpads)
  useEffect(() => {
    if (!selectedMember) return;

    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      sidebar.scrollBy({ top: e.deltaY, behavior: 'auto' });
    };

    sidebar.addEventListener('wheel', handleWheel, { passive: false });
    return () => sidebar.removeEventListener('wheel', handleWheel);
  }, [selectedMember]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-[#009edb]" />
      </div>
    );
  }

  return (
    <>
      {/* Team Grid Section */}
      <section className="relative bg-slate-950 w-full overflow-hidden pt-32 md:pt-32">
        <div className="absolute inset-0 bg-slate-950/20 z-10" />
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-white text-left">
              Meet Our Team<span className="text-[#009edb]">.</span>
            </h2>
            <h3 className="text-2xl md:text-4xl mb-6 text-white text-left">
              The Experts Guiding Your Finances
            </h3>
            <p className="text-gray-300 text-lg text-left mt-10 border-l-4 border-[#009edb] pl-4 leading-relaxed">
              Meet the dedicated professionals who make your financial success their top priority. We believe that accounting is more than just numbers; it's about building lasting relationships...
            </p>
          </motion.div>

          {members.length === 0 ? (
            <div className="text-center text-gray-400 py-20">
              No team members found.
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {members.map((member, index) => (
                <motion.div
                  key={member._id || index}
                  variants={item}
                  className="group cursor-pointer flex flex-col items-center"
                  onClick={() => setSelectedMember(member)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative overflow-hidden rounded-lg w-64 h-75 bg-gray-800">
                    {member.avatar ? (
                      <img
                        className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                        src={member.avatar}
                        alt={`${member.name} - ${member.role}`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-[#009edb]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#009edb] transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
         
        </div>
         {/* Closing Hero Section with Overlay Text */}
<section className="relative h-100 mt-20 min-h-[100px] flex items-center justify-center overflow-hidden">
  {/* Background Image */}
  <img 
    src="/123456.jpg" 
    alt="Asija & Associates Team Office" 
    className="absolute inset-0 w-full h-full object-cover brightness-75"
    loading="lazy"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/60 to-slate-950/40" />

  {/* Content */}
  <motion.div 
    className="relative z-10 text-center px-6 max-w-5xl mx-auto"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight" style={{color:"white"}}>
      Your Success Is Our Legacy
      <span className="text-[#009edb]">.</span>
    </h2>
    
    <p className="text-sm md:text-md mb-10 max-w-3xl mx-auto leading-relaxed" style={{color:"white"}}>
      With over 39 years of excellence, Asija & Associates LLP continues to deliver trust, precision, 
      and strategic financial leadership to businesses and institutions across India and beyond.
    </p>

    <div className="flex flex-row gap-6 justify-center items-center">
      <Link href="/contact">
        <InteractiveHoverButton
          text="Start a Conversation"
          className="px-8 py-3"
        />
      </Link>
       <Link href="/">
        <InteractiveHoverButton
          text="Home"
          className="px-8 py-3"
        />
      </Link>


    </div>

    {/* Trust Badges / Logos (Optional) */}
    
  </motion.div>

  
</section>
      </section>

      {/* FINAL SIDEBAR - NO BODY SCROLL, NO SCROLLBAR, PERFECT SCROLLING */}
      <AnimatePresence>
        {selectedMember && (
          <>
            {/* Backdrop - only left side */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className={`fixed inset-0 backdrop-blur-sm z-40 cursor-pointer pr-0 sm:pr-[500px] lg:pr-[600px] ${theme === 'light' ? 'bg-slate-950/30' : 'bg-slate-950/60'}`}
            />

            {/* Sidebar - smooth scrolling + custom scrollbar */}
            <motion.div
              ref={sidebarRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`fixed inset-y-0 right-0 ${isFullScreen ? 'w-full' : 'w-full sm:w-[500px] lg:w-[600px]'} shadow-2xl z-50 overflow-y-auto overscroll-contain scrollbar-thin ${
                theme === 'light'
                  ? 'bg-gray-50 scrollbar-thumb-[#009edb]/60 scrollbar-track-gray-200 hover:scrollbar-thumb-[#009edb]'
                  : 'bg-slate-900 scrollbar-thumb-[#009edb]/70 scrollbar-track-slate-950 hover:scrollbar-thumb-[#009edb]'
              }`}
              style={{ WebkitOverflowScrolling: 'touch' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-6 right-6 flex gap-3 z-10">
                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#009edb] transition-all group ${
                    theme === 'light' ? 'bg-gray-300' : 'bg-slate-950'
                  }`}
                  title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                >
                  {isFullScreen ? (
                    <Minimize2 className={`w-6 h-6 group-hover:text-white ${
                      theme === 'light' ? 'text-gray-700' : 'text-gray-400'
                    }`} />
                  ) : (
                    <Maximize2 className={`w-6 h-6 group-hover:text-white ${
                      theme === 'light' ? 'text-gray-700' : 'text-gray-400'
                    }`} />
                  )}
                </button>

                <button
                  onClick={() => setSelectedMember(null)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#009edb] transition-all group ${
                    theme === 'light' ? 'bg-gray-300' : 'bg-slate-950'
                  }`}
                >
                  <svg className={`w-7 h-7 group-hover:text-white ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-400'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-8 pt-24 sm:pt-8">
                {/* Header Section */}
                <div className="mb-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#009edb] mb-6 mx-auto sm:mx-0">
                    {selectedMember.avatar ? (
                      <img src={selectedMember.avatar} alt={selectedMember.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">No Image</div>
                    )}
                  </div>
                  <h2 className={`text-3xl font-bold mb-2 text-center sm:text-left uppercase tracking-wide ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {selectedMember.name}
                  </h2>
                  <p className="text-[#009edb] text-xl font-medium text-center sm:text-left">{selectedMember.role}</p>
                  
                  {selectedMember.linkedin && (
                    <div className="mt-4 flex justify-center sm:justify-start">
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <InteractiveHoverButton
                          text="Connect on LinkedIn"
                          className="bg-[#0077B5] hover:bg-[#006399] border-[#0077B5] text-white px-6 py-2 text-sm"
                        />
                      </a>
                    </div>
                  )}
                </div>

                <div className="h-px bg-linear-to-r from-transparent via-[#009edb] to-transparent mb-8" />

                {/* Structured Information */}
                <div className="space-y-5 mb-10">
                  {selectedMember.mobile && (
                    <div className="flex items-start gap-4">
                      <span className={`font-semibold min-w-[180px] text-sm ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-400'
                      }`}>Mobile No.</span>
                      <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-500'}>:</span>
                      <a href={`tel:${selectedMember.mobile}`} className="text-[#009edb] hover:text-[#008bc0] flex-1 text-sm transition-colors">
                        {selectedMember.mobile}
                      </a>
                    </div>
                  )}

                  {selectedMember.email && (
                    <div className="flex items-start gap-4">
                      <span className={`font-semibold min-w-[180px] text-sm ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-400'
                      }`}>Email</span>
                      <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-500'}>:</span>
                      <a href={`mailto:${selectedMember.email}`} className="text-[#009edb] hover:text-[#008bc0] flex-1 text-sm break-all transition-colors">
                        {selectedMember.email}
                      </a>
                    </div>
                  )}
                </div>

                <div className="h-px bg-linear-to-r from-transparent via-[#009edb] to-transparent mb-10" />

                {/* Detailed Sections */}
                <div className="space-y-8 mb-12">
                  {/* Background / Bio */}
                  {selectedMember.description && (
                    <div>
                      <h3 className={`text-lg font-bold mb-3 uppercase tracking-wider ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>About {selectedMember.name}</h3>
                      <p className={`leading-relaxed whitespace-pre-line text-justify text-sm ${
                        theme === 'light' ? 'text-gray-800' : 'text-gray-300'
                      }`}>
                        {selectedMember.description}
                      </p>
                    </div>
                  )}

                  {/* Professional Experience */}
                  {selectedMember.experience && (
                    <div>
                      <h3 className={`text-lg font-bold mb-3 uppercase tracking-wider ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Professional Experience</h3>
                      <div className={`text-justify text-sm ${
                        theme === 'light' ? 'text-gray-800' : 'text-gray-300'
                      }`}>
                        {renderSectionContent(selectedMember.experience)}
                      </div>
                    </div>
                  )}

                  {/* Skills & Expertise */}
                  {selectedMember.specialization && (
                    <div>
                      <h3 className={`text-lg font-bold mb-3 uppercase tracking-wider ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Skills & Expertise</h3>
                      <div className={`text-justify text-sm ${
                        theme === 'light' ? 'text-gray-800' : 'text-gray-300'
                      }`}>
                        {renderSectionContent(selectedMember.specialization)}
                      </div>
                    </div>
                  )}

                  {/* Education & Certifications */}
                  {selectedMember.qualifications && (
                    <div>
                      <h3 className={`text-lg font-bold mb-3 uppercase tracking-wider ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Education & Certifications</h3>
                      <div className={`text-justify text-sm ${
                        theme === 'light' ? 'text-gray-800' : 'text-gray-300'
                      }`}>
                        {renderSectionContent(selectedMember.qualifications)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}