'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const members = [
  {
    name: 'CA Ashish Kapoor',
    role: 'Sr. Partner',
    avatar: '/AshishKapoor.jpeg',
    linkedin: 'https://linkedin.com/in/ashishkapoor',
    description: `CA. Ashish Kapoor is the Senior Partner at Asija & Associates LLP, a distinguished Chartered Accountancy firm with a legacy of over 39 years of professional excellence. With more than two decades of experience, he has been at the forefront of guiding organizations across diverse sectors including technology services, financial services, automotive, infrastructure, education, and manufacturing. Ashish specializes in Direct and Indirect Taxation, with deep expertise in Income Tax Litigation, Benami Law, and Goods & Services Tax (GST). He is also widely recognized for his contributions to financial regulations, compliance frameworks, and advisory to FinTech enterprises. His balanced approach to consulting and litigation has made him a trusted advisor to corporates, government institutions, and international organizations. Over the years, he has been a sought-after speaker, trainer, and thought leader, delivering sessions at prestigious platforms such as the Institute of Chartered Accountants of India (ICAI), Reserve Bank of India (RBI), Indian Institutes of Management (IIMs), the National Academy of Direct Taxes (NADT), the National Academy of Customs, Indirect Taxes & Narcotics (NACIN), and several leading corporate and educational forums. His presentations cover a wide spectrum—ranging from taxation of charitable trusts and GST reforms to income tax litigation strategies, internal controls, and financial governance. Ashish has had the privilege of working with and advising global and national institutions and he also actively represents clients before the Income Tax Appellate Authority, Company Law Board, and appellate authorities under the PMLA & Benami Transactions Act.

Beyond his practice, Ashish Kapoor is a frequent contributor to professional publications and journals, authoring articles on evolving tax reforms, compliance issues, and governance standards. His writings and talks aim not only at simplifying complex tax frameworks but also at strengthening professional education and policy awareness within the business community.

Known for his strategic insight, analytical depth, and strong communication skills, Ashish blends technical expertise with practical solutions, helping businesses stay compliant while fostering sustainable growth. His leadership continues to shape Asija & Associates LLP as a trusted partner for corporates, institutions, and public bodies in India and abroad.`,
  },
  {
    name: 'CA Ruchi Kapoor',
    role: 'Sr. Partner',
    avatar: '/RuchiKapoor.jpeg',
    linkedin: '#',
    description: 'Experienced senior partner specializing in corporate finance and strategic planning.',
  },
  {
    name: 'CA Anand Srivastav',
    role: 'Sr. Partner',
    avatar: '/AnanadShrivastav.jpeg',
    linkedin: '#',
    description: 'Expert in taxation and compliance with over 15 years of experience.',
  },
  {
    name: 'CA Kamal Ferwani',
    role: 'Sr. Partner',
    avatar: '/kamalFerwani.jpeg',
    linkedin: '#',
    description: `Mr. Kamal Kumar Ferwani is the Senior Partner of the firm and has more than 20 years of experience in the specialized fields of Auditing of Government Entities and Private Clientele. He did his graduation from Feroze Gandhi Degree College Rae-Bareli, affiliated by Kanpur University in the year 1997. He started its career in the year 2004 by joining the Asija & Associates and became FCA in the year 2009. He representing the first generation of his family. His core skills lie in understanding clients requirements & transforming them into satisfying results.

He has also done following Diploma & Certification courses from ICAI:
• Certified Course of FAFD organized by ICAI - 2017
• Certified Course of DISA organized by ICAI - 2016
• Certified Course of Concurrent Audit of Bank - 2015
• Certified Course of BRSR organized by ICAI - 2021
• Certified Course of Public Finance & Government Accounting organized by ICAI – 2021
• Certificate for Empanelment of Peer Reviewer by ICAI – 2021
• Certified Course of IND-AS organized by ICAI
• Certified Course of Derivatives organized by ICAI – 2022
• Certified Course on The Insolvency and Bankruptcy Code organized by ICAI – 2021
• Diploma in Information System Audit (DISA)

Since over a decade, Mr. Kamal has obtained good experience in almost every field such as taxation laws, auditing, corporate finance liaison etc. He handles various issues with equal ease with his core expertise lies in financial consultancy. He has mastered the art of project reports, project financing, and other legal compliances.

Specialization: Audit Wing (Govt. & Banking Sector)
Years of Experience: 20+ Years
Mobile No.: +91-9559990003
Email: kamal.ferwani@asija.in`,
  },
  {
    name: 'Hasan',
    role: 'Partner',
    avatar: '/Hasan.jpeg',
    linkedin: '#',
    description: 'Dedicated professional with expertise in financial consulting and analysis.',
  },
  {
    name: 'Rohit Singh',
    role: 'Partner',
    avatar: '/RohitSingh.jpeg',
    linkedin: '#',
    description: 'Specializes in business advisory and financial planning strategies.',
  },
  {
    name: 'Aniket Gupta',
    role: 'Associate Director',
    avatar: '/AniketGupta.jpeg',
    linkedin: '#',
    description: 'Rising talent in taxation and regulatory compliance services.',
  },
  {
    name: 'Naeem Khan',
    role: 'Associate Director',
    avatar: '/NaeemKhan.jpeg',
    linkedin: '#',
    description: 'Focused on providing comprehensive audit and assurance services.',
  },
];

// Motion variants
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function TeamAnimated() {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      {/* Team Grid Section */}
      <section className="relative bg-[#2a2a2a] w-full overflow-hidden py-16 md:py-32">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-10 text-white text-left">
              Meet Our Team<span className="text-[#1DCD9F]">.</span>
            </h2>
            <h3 className="text-2xl md:text-4xl mb-6 text-white text-left">
              The Experts Guiding Your Finances
            </h3>
            <p className="text-gray-300 text-lg text-left mt-10 border-l-4 border-[#1DCD9F] pl-4 leading-relaxed">
              Meet the dedicated professionals who make your financial success their top priority. We believe that accounting is more than just numbers; it's about building lasting relationships...
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {members.map((member, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group cursor-pointer"
                onClick={() => setSelectedMember(member)}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    className="w-full h-96 object-cover object-top group-hover:h-93 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    src={member.avatar}
                    alt={`${member.name} - ${member.role}`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1DCD9F]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#1DCD9F] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 cursor-pointer
                         pr-0 sm:pr-[500px] lg:pr-[600px]"
            />

            {/* Sidebar - smooth scrolling + custom scrollbar */}
            <motion.div
              ref={sidebarRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[500px] lg:w-[600px] 
                         bg-[#1a1a1a] shadow-2xl z-50 
                         overflow-y-auto overscroll-contain
                         scrollbar-thin scrollbar-thumb-[#1DCD9F]/70 scrollbar-track-[#2a2a2a]
                         hover:scrollbar-thumb-[#1DCD9F]"
              style={{ WebkitOverflowScrolling: 'touch' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-[#1DCD9F] transition-all group z-10"
              >
                <svg className="w-7 h-7 text-gray-400 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8 pt-24 sm:pt-8">
                <div className="mb-10">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#1DCD9F] mb-6 mx-auto sm:mx-0">
                    <img src={selectedMember.avatar} alt={selectedMember.name} className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 text-white text-center sm:text-left">{selectedMember.name}</h2>
                  <p className="text-[#1DCD9F] text-xl font-medium text-center sm:text-left">{selectedMember.role}</p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-[#1DCD9F] to-transparent mb-10" />

                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6 text-white">About</h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line text-justify">
                    {selectedMember.description}
                  </p>
                </div>

                <div className="pt-8 border-t border-[#1DCD9F]/20">
                  <h3 className="text-xl font-semibold mb-5 text-white">
                    Connect with {selectedMember.name.split(' ')[0]}
                  </h3>
                  <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#0077B5] hover:bg-[#006399] text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-[#0077B5]/50 group"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Connect on LinkedIn
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}