"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import Loader from "@/components/ui/Loader";
import Link from "next/link";

type DepartmentItem = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
};
type PolicyItem = {
  _id: string;
  title: string;
  content?: string;
  category: 'general' | 'employee';
  subCategory?: string;
  pdfUrl?: string;
  excelUrl?: string;
  policyType: 'text' | 'pdf';
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export default function PoliciesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [employeePolicies, setEmployeePolicies] = useState<PolicyItem[]>([]);
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const sectionsContainerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
    if (isRightSwipe && currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const sections = [
    { 
      id: 'general-policies', 
      label: 'General', 
      title: 'General Policies',
      description: 'Transparency and integrity are at the core of our operations',
      bgImage: '/about1.jpg',
      color: 'from-blue-900/80 to-blue-700/80'
    },
    { 
      id: 'legal-documents', 
      label: 'Legal', 
      title: 'Legal Documents',
      description: 'Essential legal documents and terms of service',
      bgImage: '/about2.jpg',
      color: 'from-purple-900/80 to-purple-700/80'
    },
    { 
      id: 'employee-policies', 
      label: 'Employee', 
      title: 'Employee & Internal Policies',
      description: 'Department-specific guidelines and employee resources',
      bgImage: '/about3.jpg',
      color: 'from-green-900/80 to-green-700/80'
    },
  ];

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await fetch('/api/admin/policies');
        const data = await res.json();
        if (Array.isArray(data)) {
          setPolicies(data.filter((p: PolicyItem) => p.category === 'general'));
          setEmployeePolicies(data.filter((p: PolicyItem) => p.category === 'employee'));
        }
      } catch (error) {
        console.error('Failed to fetch policies:', error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const res = await fetch('/api/admin/departments');
        const data = await res.json();
        if (Array.isArray(data)) {
          setDepartments(data);
        }
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    };

    fetchPolicies();
    fetchDepartments();
  }, []);

  // Set loading to false after data is fetched
  useEffect(() => {
    if (policies.length >= 0 && departments.length >= 0) {
      setLoading(false);
    }
  }, [policies, departments]);

  // Keyboard handler for modal and navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedPolicy) {
        if (event.key === 'Escape') {
          setSelectedPolicy(null);
        }
      } else {
        // Arrow key navigation for sections
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
          event.preventDefault();
          if (currentSectionIndex < sections.length - 1) {
            setCurrentSectionIndex(currentSectionIndex + 1);
          }
        } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
          event.preventDefault();
          if (currentSectionIndex > 0) {
            setCurrentSectionIndex(currentSectionIndex - 1);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedPolicy, currentSectionIndex, sections.length]);

  const groupedEmployeePolicies = employeePolicies.reduce((acc, policy) => {
    const deptSlug = policy.subCategory?.toLowerCase() || 'other';
    if (!acc[deptSlug]) {
      acc[deptSlug] = [];
    }
    acc[deptSlug].push(policy);
    return acc;
  }, {} as Record<string, PolicyItem[]>);

  if (loading) {
    return <Loader pageName="Policies" />;
  }

  return (
    <div className={`h-screen overflow-hidden transition-colors duration-300 ${isLight ? 'bg-white text-gray-900' : 'bg-slate-950 text-white'}`}>
      <Navbar />
      
      <main className={`relative ${currentSectionIndex === 2 ? 'h-auto' : 'h-screen'} ${currentSectionIndex === 2 ? 'overflow-y-auto' : 'overflow-hidden'}`}>
        {/* Hero Sections */}
        <div 
          ref={sectionsContainerRef}
          className="space-y-0 transition-transform duration-600 ease-in-out"
          style={{ transform: `translateY(-${currentSectionIndex * 100}vh)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* General Policies Section */}
          <section 
            id="general-policies" 
            ref={(el) => { sectionRefs.current['general-policies'] = el; }}
            className="relative h-screen flex items-center justify-start overflow-hidden pt-24 sm:pt-0"
          >
            <div className="absolute inset-0">
              <img 
                src="https://res.cloudinary.com/db2qa9dzs/image/upload/v1766855466/pexels-imadclicks-9883024_spnihn.jpg" 
                alt="General Policies" 
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r from-black/30 to-black/10 `} />
            </div>
            
            <div className="relative z-10 text-left text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight" style={{color: '#74d2f8'}}>{sections[0].title} <span className="text-6xl " style={{color: 'white'}}>.</span></h2>
                <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90 max-w-2xl  leading-relaxed" style={{color: 'white'}}>{sections[0].description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
                  {policies.slice(0, 3).map((policy, index) => {
                    const content = policy.content || '';
                    const truncated = content.substring(0, 100);
                    const shouldTruncate = content.length > 100;
                    
                    return (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 backdrop-blur-lg rounded-lg p-4 sm:p-6 lg:p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 group"
                      >
                        <div className="w-8 sm:w-12 h-px bg-white/30 mb-3 sm:mb-4 group-hover:bg-[#009edb] transition-colors duration-300" />
                        <h3 className="text-lg sm:text-xl font-light mb-2 sm:mb-3 leading-tight" style={{color: '#32c5ff'}}>{policy.title}</h3>
                        <p className="text-xs sm:text-sm opacity-70 leading-relaxed" style={{color: 'white'}}>
                          {shouldTruncate ? `${truncated}...` : content}
                        </p>
                        {shouldTruncate && (
                          <button
                            onClick={() => setSelectedPolicy(policy)}
                            className="mt-3 sm:mt-4 text-xs font-light tracking-wider uppercase opacity-50 hover:opacity-80 transition-opacity duration-300"
                            style={{color: '#32c5ff'}}
                          >
                            READ MORE
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Legal Documents Section */}
          <section 
            id="legal-documents" 
            ref={(el) => { sectionRefs.current['legal-documents'] = el; }}
            className="relative h-screen flex items-center justify-start overflow-hidden pt-24  sm:pt-0"
          >
            <div className="absolute inset-0">
              <img 
                src="https://res.cloudinary.com/db2qa9dzs/image/upload/v1766834528/pexels-mhajrinvincible-19025419_kgsosu.jpg" 
                alt="Legal Documents" 
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r from-black/30 to-black/10 `} />
            </div>
            
            <div className="relative z-10 text-left text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight" style={{color: '#74d2f8'}}>{sections[1].title}<span className="text-6xl ml-4 " style={{color: 'white'}}>.</span></h2>
                <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90 max-w-2xl leading-relaxed" style={{color: 'white'}}>{sections[1].description}</p>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 cursor-pointer group w-full max-w-sm"
                    onClick={() => window.open('/policies/privacy-policy', '_blank')}
                  >
                    <div className="w-12 sm:w-16 h-px bg-white/30 mb-4 sm:mb-6 group-hover:bg-[#009edb] transition-colors duration-300" />
                    <h3 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 leading-tight" style={{color: '#74d2f8'}}>Privacy Policy</h3>
                    <p className="text-xs sm:text-sm opacity-70 leading-relaxed mb-4 sm:mb-6" style={{color: 'white'}}>Learn how we collect, use, and protect your personal information.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-light tracking-wider uppercase opacity-50" style={{color: 'white'}}>READ MORE</span>
                      <div className="text-base sm:text-lg group-hover:translate-x-2 transition-transform duration-300" style={{color: 'white'}}>→</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 cursor-pointer group w-full max-w-sm"
                    onClick={() => window.open('/policies/terms-of-service', '_blank')}
                  >
                    <div className="w-12 sm:w-16 h-px bg-white/30 mb-4 sm:mb-6 group-hover:bg-[#009edb] transition-colors duration-300" />
                    <h3 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 leading-tight" style={{color: '#74d2f8'}}>Terms of Service</h3>
                    <p className="text-xs sm:text-sm opacity-70 leading-relaxed mb-4 sm:mb-6" style={{color: 'white'}}>Read our terms and conditions for using our services.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-light tracking-wider uppercase opacity-50" style={{color: 'white'}}>READ MORE</span>
                      <div className="text-base sm:text-lg group-hover:translate-x-2 transition-transform duration-300" style={{color: 'white'}}>→</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Employee Policies Section */}
          <section 
            id="employee-policies" 
            ref={(el) => { sectionRefs.current['employee-policies'] = el; }}
            className="relative h-screen flex items-start justify-start overflow-y-auto  pt-24 sm:pt-35 "
          >
            <div className="absolute inset-0">
              <img 
                src="https://res.cloudinary.com/do5lklzbn/image/upload/v1766834244/ql_t1cg2w.jpg" 
                alt="Employee Policies" 
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r from-black/30 to-black/10 `} />
            </div>
            
            <div className="relative z-10 text-left text-white px-4 sm:px-6 lg:px-8 max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight" style={{color: '#74d2f8'}}>{sections[2].title}<span className="text-6xl ml-4" style={{color: 'white'}}>.</span></h2>
                
                <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90" style={{color: 'white'}}>{sections[2].description}</p>
                
                {!session && (
                  <div className="mb-6 sm:mb-8">
                    <p className="text-base sm:text-lg opacity-80 mb-4 sm:mb-6" style={{color: 'white'}}>Please log in to view employee policies and department-specific guidelines.</p>
                    <Link href="/login" prefetch={false}>
                      <InteractiveHoverButton
                        text="Login to View"
                        className="bg-white/20 hover:bg-white/30 border-white/30 text-white"
                      />
                    </Link>
                  </div>
                )}

                {session && departments.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {departments.map((department, index) => (
                      <motion.div
                        key={department.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10 hover:bg-white/10 transition-all duration-500 cursor-pointer group"
                        onClick={() => router.push(`/policies/${department.slug}`)}
                      >
                        <div className="w-8 sm:w-12 h-px bg-white/30 mb-4 sm:mb-6 group-hover:bg-[#009edb] transition-colors duration-300" />
                        <h3 className="text-lg sm:text-xl font-light mb-3 sm:mb-4 leading-tight" style={{color: '#74d2f8'}}>
                          {department.name}
                        </h3>
                        <p className="text-xs sm:text-sm opacity-70 leading-relaxed mb-4 sm:mb-6 line-clamp-2" style={{color: 'white'}}>
                          {department.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-light tracking-wider uppercase opacity-50" style={{color: 'white'}}>VIEW POLICIES</span>
                          <div className="text-sm sm:text-lg group-hover:translate-x-2 transition-transform duration-300" style={{color: 'white'}}>→</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        </div>

        {/* Magazine-Style Navigation */}
        <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
          <div className="backdrop-blur-md bg-white/20 border border-white/10 rounded-2xl p-4 md:p-6">
            <div className="space-y-4 md:space-y-6">
              {sections.map((section, index) => {
                const isActive = currentSectionIndex === index;
                
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => setCurrentSectionIndex(index)}
                    className={`block text-left transition-all duration-300 group ${
                      isActive ? 'text-[#009edb]' : 'text-white/80 hover:text-white'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      
                      <div className="flex flex-col">
                        <span className={`text-xs md:text-sm font-light tracking-wider uppercase ${
                          isActive ? 'text-[#009edb]' : 'text-white/60'
                        }`} style={{color: 'white'}}>
                          0{index + 1}
                        </span>
                        <span className={`text-base md:text-lg font-medium leading-tight ${
                          isActive ? 'text-[#009edb]' : 'text-white group-hover:text-white'
                        }`} style={{color: 'white'}}>
                          {section.label}
                        </span>
                      </div>
                    </div>
                    {isActive && (
                      <motion.div 
                        className="mt-1 md:mt-2 h-px bg-[#009edb] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="fixed bottom-1 left-1/2 transform -translate-x-1/2 z-40 lg:hidden">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-6 py-3">
            <div className="flex items-center gap-3">
              {sections.map((section, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSectionIndex(index)}
                  className={`px-3 py-1 rounded-full transition-all duration-300 text-xs font-light tracking-wider uppercase ${
                    currentSectionIndex === index ? 'bg-[#009edb] text-white scale-105' : 'bg-white/40 hover:bg-white/60 text-white'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {section.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

       
      </main>

      
      {/* Modal */}
      {selectedPolicy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedPolicy(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-lg p-4 sm:p-6 lg:p-8 max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] overflow-y-auto border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-light leading-tight pr-4" style={{color: 'white'}}>
                {selectedPolicy.title}
              </h2>
              <button
                onClick={() => setSelectedPolicy(null)}
                className="text-white/50 hover:text-white transition-colors duration-300 text-lg sm:text-xl flex-shrink-0"
              >
                ×
              </button>
            </div>
            <div className="text-xs sm:text-sm opacity-80 leading-relaxed whitespace-pre-wrap" style={{color: 'white'}}>
              {selectedPolicy.content}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
