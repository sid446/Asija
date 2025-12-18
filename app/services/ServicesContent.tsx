// app/services/ServicesContent.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Calendar, ShieldCheck, Users, Zap, GraduationCap, Globe, ChevronDown } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/components/ThemeProvider';
import CTA from '@/components/ui/CTA';
import ServiceProcess from '@/components/ui/ServiceProcess';
import Loader from '@/components/ui/Loader';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';

interface ServiceGroup {
  title: string;
  translationKey: string;
  items: string[];
  insights?: boolean;
  imgSrc: string;
  description: string;
  detailedDescription: string;
  benefits: string[];
  subItems?: Record<string, string[]>;
  deepSubItems?: Record<string, Record<string, Record<string, string[]>>>;
}

// Service groups are now fetched from API


const letterVariants: Variants = { hover: { y: '-50%' } };

const AnimatedLetter: React.FC<{ letter: string }> = ({ letter }) => (
  <div className="inline-block h-[36px] overflow-hidden font-semibold text-3xl">
    <motion.span className="flex min-w-[4px] flex-col" variants={letterVariants} transition={{ duration: 0.5 }}>
      <span>{letter}</span>
      <span>{letter}</span>
    </motion.span>
  </div>
);

interface ServiceCardProps {
  service: ServiceGroup;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <motion.div
      whileHover="hover"
      onClick={onClick}
      className="group relative h-60 sm:h-72 md:h-80 lg:h-96 w-full cursor-pointer overflow-hidden shadow-xl bg-theme"
      transition={{ staggerChildren: 0.035 }}
    >
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 md:saturate-0 md:group-hover:saturate-100"
        style={{ backgroundImage: `url(${service.imgSrc})` }}
      />
      <motion.div 
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        variants={{ hover: { backgroundColor: 'rgba(0, 0, 0, 0.7)' } }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-6 md:p-8 text-white">
        <svg className="ml-auto w-6 sm:w-8 md:w-9 h-6 sm:h-8 md:h-9 transition-transform duration-500 group-hover:-rotate-45 group-hover:text-[#009edb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>

        <div>
          <h3 className="mb-2 sm:mb-4 text-xl sm:text-2xl md:text-3xl font-bold leading-tight" style={{color:'white'}}>
            {service.title.split('').map((letter, i) => (
              <AnimatedLetter key={i} letter={letter} />
            ))}
          </h3>
          <p className="mb-3 sm:mb-5 text-xs sm:text-sm line-clamp-2 opacity-90" style={{color:'white'}}>{service.description}</p>
          <span className="inline-block border border-[#009edb] px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-[#009edb]/20 text-[#009edb]">
            {service.items.length} Services
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const ExpandableMainItem: React.FC<{
  mainItem: string;
  service: ServiceGroup;
  serviceTitle: string;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ mainItem, service, serviceTitle, isExpanded, onToggle }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const hasSubItems = service.subItems?.[mainItem];
  const hasDeepSubItems = service.deepSubItems?.[serviceTitle]?.[mainItem];

  return (
    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className={`border rounded-xl overflow-hidden ${isLight ? 'bg-white border-gray-200' : 'bg-gray-900/30 border-gray-800'}`}>
      <button onClick={onToggle} className={`w-full flex items-center gap-4 p-5 transition-colors ${isLight ? 'hover:bg-gray-50' : 'hover:bg-gray-800/50'}`}>
        <span className={`font-semibold text-lg flex-1 text-left ${isLight ? 'text-gray-900' : 'text-white'}`}>{mainItem}</span>
        {(hasSubItems || hasDeepSubItems) && (
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-5 h-5 text-[#009edb]" />
          </motion.div>
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (hasSubItems || hasDeepSubItems) && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className={`px-6 py-4 space-y-2 ${isLight ? 'bg-gray-50' : 'bg-gray-950'}`}>
            {hasSubItems && !hasDeepSubItems && (
              <div className="space-y-2">
                {hasSubItems.map((sub, j) => (
                  <div key={j} className="flex items-start gap-3 ml-10 text-sm">
                    <span className="mt-1.5 text-[#009edb]">•</span>
                    <span className={`${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{sub}</span>
                  </div>
                ))}
              </div>
            )}

            {hasDeepSubItems && (
              <div className="space-y-5">
                {Object.entries(hasDeepSubItems).map(([cat, items]) => (
                  <div key={cat}>
                    <p className="font-semibold text-sm mb-3 ml-10 text-[#009edb]">{cat}</p>
                    {Object.entries(items).map(([subCat, subItems]) => (
                      <div key={subCat} className="ml-10">
                        <p className={`font-medium text-sm mb-2 ml-6 ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>{subCat}</p>
                        {Array.isArray(subItems) ? (
                          subItems.map((item, k) => (
                            <div key={k} className="flex items-start gap-3 ml-16 text-xs">
                              <span className="mt-1.5 text-gray-500">◦</span>
                              <span className={`${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{item}</span>
                            </div>
                          ))
                        ) : (
                          <div className={`ml-16 text-xs ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{String(subItems)}</div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function ServicesContent() {
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const [serviceGroups, setServiceGroups] = useState<ServiceGroup[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceGroup | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (response.ok) {
          const data = await response.json();
          setServiceGroups(data);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const serviceName = searchParams?.get('service');
    if (serviceName && serviceGroups.length > 0) {
      const service = serviceGroups.find(s => s.title === serviceName);
      if (service) setSelectedService(service);
    }
  }, [searchParams, serviceGroups]);

  useEffect(() => {
    if (selectedService) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [selectedService]);



  const toggleItemExpanded = (itemName: string) => {
    setExpandedItems(prev => ({ ...prev, [itemName]: !prev[itemName] }));
  };

  return (
    <div className="w-full h-auto bg-theme text-white">
      <Loader pageName="Services" />
      <Navbar />
      {/* Hero */}
      <div className='relative w-full h-[100vh]'>
        <div className='absolute inset-x-0 top-0 h-[100vh] bg-linear-to-t from-slate-950/70 via-slate-950/40 to-transparent pointer-events-none z-10'></div>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://res.cloudinary.com/db2qa9dzs/video/upload/so_0,w_1280,q_auto,f_jpg/v1764130416/vid124_xmfn8i.jpg"
        >
          <source
            src="https://res.cloudinary.com/db2qa9dzs/video/upload/f_webm,q_auto:eco,vc_auto,w_1920/v1764130416/vid124_xmfn8i.webm"
            type="video/webm"
          />
          <source
            src="https://res.cloudinary.com/db2qa9dzs/video/upload/f_mp4,q_auto:eco,vc_auto,w_1920/v1764130416/vid124_xmfn8i.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute text-left top-[60%] sm:top-[75%] left-1/2 sm:left-[35%] transform -translate-x-1/2 -translate-y-1/2 px-4 w-full sm:w-auto z-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg" style={{color:"white"}}>Our Services<span className="text-[#009edb] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">.</span></h1>
          <p className="mt-4 sm:mt-4 text-lg sm:text-lg md:text-xl lg:text-2xl drop-shadow-md" style={{color:"white"}}>Comprehensive Financial Solutions for Your Success</p>
          <p className="mt-6 sm:mt-8 text-base sm:text-base md:text-lg lg:text-xl border-l-4 border-[#009edb] pl-3 sm:pl-4" style={{color:"white"}}>
            Delivering excellence from audit to advisory, we guide your financial journey with expertise and integrity.<br />
            We turn compliance into confidence and challenges into growth opportunities.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-10 sm:py-20 px-3 sm:px-6 md:px-12 lg:px-20">
        <div className='p-4 sm:p-10 flex flex-col gap-4 sm:gap-8'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>Our Core Services <span className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#009edb]'>.</span></h1>
          <p className='text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl text-gray-300'>We deliver precise, compliant, and value-driven solutions tailored to your business needs.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {serviceGroups.map((service, index) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15, duration: 0.6 }}>
              <ServiceCard service={service} onClick={() => setSelectedService(service)} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Service Process */}
      <ServiceProcess/>

      {/* CTA */}
      <CTA />

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedService(null)} 
              className={`fixed inset-0 backdrop-blur-md z-40 cursor-pointer ${theme === 'light' ? 'bg-slate-950/40' : 'bg-slate-950/90'}`} 
            />
            <motion.div
              ref={modalRef}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`fixed inset-0 z-50 flex flex-col shadow-2xl ${theme === 'light' ? 'bg-white' : 'bg-[#0a0a0a]'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-40 md:h-48 shrink-0 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${selectedService.imgSrc})` }} />
                <div className="absolute inset-0 bg-linear-to-b from-slate-950/60 via-slate-950/70 to-[#0a0a0a]" />
                <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-sm transition-all group border bg-slate-950/40 border-white/20 hover:bg-[#009edb] flex items-center justify-center z-10">
                  <svg className="w-5 h-5 md:w-6 md:h-6 !text-white" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-6 right-6 md:bottom-6 md:left-8 md:right-8">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2 !text-white" style={{ color: '#ffffff' }}>{selectedService.title}</h2>
                  <p className="text-sm md:text-base !text-gray-200 line-clamp-1" style={{ color: '#e5e7eb' }}>{selectedService.description}</p>
                </div>
              </div>

              {/* Content - Split View */}
              <div 
                className="flex-1 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row"
                data-lenis-prevent
              >
                
                {/* Left Panel: Overview & Benefits */}
                <div 
                  className={`contents md:block md:order-1 md:w-5/12 lg:w-2/5 md:p-8 md:overflow-y-auto md:border-r [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}
                  data-lenis-prevent
                >
                  {/* Overview */}
                  <div className="order-1 p-6 md:p-0 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-6 w-1 bg-[#009edb]" />
                      <h3 className={`text-lg md:text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Overview</h3>
                    </div>
                    <p className={`text-sm md:text-base leading-relaxed whitespace-pre-line ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}>
                      {selectedService.detailedDescription}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="order-3 p-6 md:p-0 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-6 w-1 bg-[#009edb]" />
                      <h3 className={`text-lg md:text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Key Benefits</h3>
                    </div>
                    <div className="space-y-3">
                      {selectedService.benefits.map((benefit, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className={`flex items-start gap-3 p-3 rounded-lg border-l-2 border-[#009edb] ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
                          <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="order-4 p-6 md:p-0 pt-4">
                    <InteractiveHoverButton 
                      text="Schedule a Consultation" 
                      className="w-full bg-[#009edb] text-white border-[#009edb]"
                      onClick={() => window.location.href = '/contact'}
                    />
                  </div>
                </div>

                {/* Right Panel: Services List */}
                <div 
                  className={`order-2 md:order-2 md:w-7/12 lg:w-3/5 p-6 md:p-8 md:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${theme === 'light' ? 'bg-gray-50' : 'bg-black/20'}`}
                  data-lenis-prevent
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-6 w-1 bg-[#009edb]" />
                    <h3 className={`text-lg md:text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Our Services Include</h3>
                  </div>
                  <div className="space-y-4 pb-8">
                    {selectedService.items.map((mainItem, i) => (
                      <ExpandableMainItem 
                        key={i} 
                        mainItem={mainItem} 
                        service={selectedService} 
                        serviceTitle={selectedService.title} 
                        isExpanded={expandedItems[mainItem] || false} 
                        onToggle={() => toggleItemExpanded(mainItem)} 
                      />
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}