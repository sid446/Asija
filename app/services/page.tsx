'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Check, Calendar, ShieldCheck, Users, Zap, GraduationCap, Globe, ChevronDown } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

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

const serviceGroups: ServiceGroup[] = [
  {
    title: 'Audit and Assurance',
    translationKey: 'services.auditAssurance',
    items: [
      'Statutory Audit',
      'Internal Audit',
      'Procurement Audit',
      'Special Audit',
      'Fund Audit',
      'Externally Funded Project Audit',
      'Management Audit',
    ],
    insights: true,
    imgSrc: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1470&auto=format&fit=crop',
    description: 'Comprehensive audit solutions ensuring compliance, transparency, and financial accuracy across all business operations.',
    detailedDescription: `Our Audit and Assurance services provide comprehensive solutions designed to ensure compliance, transparency, and financial accuracy...`,
    benefits: [
      'Enhanced financial credibility and stakeholder confidence',
      'Identification of operational inefficiencies and risk areas',
      'Compliance with regulatory requirements and industry standards',
      'Improved internal controls and governance frameworks',
      'Strategic insights for business improvement',
    ],
    subItems: {
      'Statutory Audit': [
        'Assessment of Internal Control and Auditing of Accounts',
        'Accounting Standard Compliances',
        'Companies Act Compliances',
        'IFRS Compliances',
        'IGAAP Compliances',
        'True & Fair Opinion Assurance',
      ],
      'Internal Audit': [
        'Monitor Operating Results',
        'Verify Financial Records',
        'Evaluate Internal Controls',
        'Assist with increasing efficiency and effectiveness of operations',
        'Fraud Detection',
      ],
      'Procurement Audit': [
        'Tender Process Review',
        'Vendor Evaluation and Selection Review',
        'Purchase Order Review',
        'Internal Process Review',
      ],
      'Special Audit': [
        'Audit against Rules & Orders',
        'Audit of Sanctions',
        'Audit against provision of fraud',
        'Propriety Audit',
        'Performance Audit',
      ],
      'Fund Audit': [
        'Grant or Program Audit',
        'Compliance with applicable legislation',
        'Compliance with applicable Accounting Standard',
      ],
      'Externally Funded Project Audit': [
        'Review of Project Disbursement',
        'Review of Documentation',
        'Review of Project Financial Report',
        'Review of Management Structure',
        'Review of Project Monitoring and Evaluation',
      ],
      'Management Audit': [
        'Assessment of methods and policies of organizations\' management',
        'Identification of weakness of system and management',
        'Suggestions for Improvements',
      ],
    },
  },
  {
    title: 'Direct Tax',
    translationKey: 'services.directTax',
    items: ['Income Tax Services', 'Benami Transaction'],
    insights: true,
    imgSrc: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1470&auto=format&fit=crop',
    description: 'Expert guidance on income tax planning, compliance, and representation in complex tax matters.',
    detailedDescription: `The Direct Tax Vertical of Asija & Associates LLP has a professional reputation...`,
    benefits: [
      'Minimized tax liability through strategic planning',
      'Expert representation before tax authorities',
      'Timely compliance with filing and payment obligations',
      'Risk mitigation in complex tax matters',
      'Peace of mind with professional tax management',
    ],
    subItems: {
      'Income Tax Services': [
        'Compliance Support Services',
        'Registrations, Certifications & Approvals',
        'Advisory Services',
        'Representations',
      ],
      'Benami Transaction': ['Advisory Services', 'Representations'],
    },
    deepSubItems: {
      'Direct Tax': {
        'Income Tax Services': {
          'Compliance Support Services': [
            'PAN / TAN registrations',
            'Filing of Income Tax Returns',
            'TDS / TCS Compliance & e-Return Filing',
            'Advance Tax Calculation & Tax Deposition',
            'e-Filing of Form 15CA & Form 15CB',
            'e-Filing of Audit report and other digital documents and forms',
          ],
          'Registrations, Certifications & Approvals': [
            '12AA(1)(b), 80G(5)(vi), 10(23C)(vi) from Commissioner of Income Tax (Exemption)',
            'Approval u/s 17(2)(ii)(b) for specialized hospitals',
            'Certificate u/s 197 (Lower/Nil TDS)',
            'Certificate u/s 206C(9) for Lower/Nil TCS',
            'Certification u/s 195(2) & 195(3) for International Transactions',
          ],
          'Advisory Services': [
            'International and Domestic Tax Planning',
            'Assistance in availing benefits, exemptions, relief, rebates and deductions',
            'Innovative tax minimization strategies with risk mitigation',
          ],
          'Representations': [
            'Scrutiny Assessments before Assessing Officer',
            'Revision of Orders before Principal Commissioner',
            'Appeals before CIT(A)',
            'Representation before ITAT',
            'Before Director General of Income Tax (Investigation)',
          ],
        },
        'Benami Transaction': {
          'Advisory Services': [
            'Transaction Advisory on potential Benami transactions',
            'Guidance during enquiry by Initiating Officer',
          ],
          'Representations': [
            'Before Initiating Officer (AC/DC)',
            'Before Approving Authority (Addl./Jt. Commissioner)',
            'Before Administrator',
            'Before Adjudicating Authority',
            'Before Appellate Tribunal',
          ],
        },
      },
    },
  },
  {
    title: 'Corporate Law Services',
    translationKey: 'services.corporateLaw',
    items: [
      'Companies Act 2013',
      'Limited Liability Partnership Act 2008',
      'Partnership Act 1932',
      'NGO Registration & Consultancy',
      'Foreign Contribution Regulation Act 2010',
      'Assurance Services',
      'Other Services',
    ],
    insights: true,
    imgSrc: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1470&auto=format&fit=crop',
    description: 'End-to-end corporate legal compliance and advisory services for businesses of all sizes.',
    detailedDescription: `Our Corporate Law Services provide comprehensive support for businesses navigating India's complex regulatory landscape...`,
    benefits: [
      'Seamless entity formation and structuring',
      'Ongoing compliance management',
      'Risk mitigation through proper governance',
      'Expert advisory on regulatory matters',
      'Cost-effective compliance solutions',
    ],
    subItems: {
      'Companies Act 2013': [
        'Incorporation of Private/ Public / OPC',
        'Annual Filing of Companies',
        'Company Law Compliances',
        'CSR Compliances',
        'Conversion of entities into Part I – Company',
        'Advisory & Retainership',
        'Secretarial Compliances',
        'Strike Off / Winding Up',
      ],
      'Limited Liability Partnership Act 2008': [
        'Incorporation of LLP',
        'Conversion of entities (Partnership firms and companies) into LLP',
        'Annual Filing of LLPs',
        'Secretarial Compliances',
        'Specialized Drafting of LLP Agreement',
        'Strike off / Winding Up',
        'Advisory Services related to LLP Act',
      ],
      'Partnership Act 1932': [
        'Drafting of Partnership Agreement',
        'Registration of Partnership Firms',
        'Partnership Act Compliances',
        'Conversion of Firms into LLP/ Company',
      ],
      'NGO Registration & Consultancy': [
        'Registration of Charitable Trusts',
        'Registration / Renewal of Society',
        'Incorporation of Section-8 Company',
        'Drafting of Memorandum/ Bye laws of Society',
        'Drafting of Trust Deed',
        'Compliances under Societies Act',
        'Advisory related to NGOs',
      ],
      'Foreign Contribution Regulation Act 2010': [
        'Registration/ Prior Permission from Ministry of Home Affairs',
        'Annual Return Filing',
        'FCRA Compliances',
        'Advisory related to Foreign Remittance',
      ],
      'Assurance Services': [
        'Secretarial Audit',
        'Compliance Audit of Entities on Retainership Basis',
        'Search Report',
        'Due Diligence Report',
      ],
      'Other Services': [
        'Legalostью Drafting (Drafting of various agreements, Contract Vetting)',
        'Intellectual Property Right (Trademark, Copyright)',
        'AOP/BOI/ HUF Formation',
        'Importer Exporter Code',
        'Issuance of Digital Signature Certificate',
        'Dematerialization',
      ],
    },
  },
  {
    title: 'Banking & Finance',
    translationKey: 'services.bankingFinance',
    items: ['Banking', 'Finance'],
    insights: true,
    imgSrc: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1551&auto=format&fit=crop',
    description: 'Specialized audit and financing solutions for banks and financial institutions.',
    detailedDescription: `We provide specialized services to banking and financial institutions with deep domain expertise in regulatory compliance, risk management, and financing solutions.`,
    benefits: [
      'Regulatory compliance assurance',
      'Enhanced risk management in lending',
      'Optimized financing structures',
      'Improved audit quality and reporting',
      'Stronger governance and controls',
    ],
    subItems: {
      'Banking': [
        'Statutory Audit',
        'Concurrent Audit',
        'Revenue Audit',
        'Information System Audit',
        'Stock Audit',
      ],
      'Finance': [
        'Project Financing',
        'Working Capital Finance',
        'Corporate Lending',
      ],
    },
  },
  {
    title: 'Consultancy',
    translationKey: 'services.consultancy',
    items: [
      'Process Re-Engineering',
      'Start-up Consultancy',
      'Business Advisory',
      'MIS System Designing',
    ],
    insights: true,
    imgSrc: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop',
    description: 'Strategic business consulting to optimize operations, drive growth, and achieve your vision.',
    detailedDescription: `Our Consultancy services help businesses optimize their operations...`,
    benefits: [
      'Improved operational efficiency and productivity',
      'Data-driven decision making capabilities',
      'Strategic clarity and direction',
      'Accelerated business growth',
      'Risk-aware business development',
    ],
    subItems: {
      'Process Re-Engineering': [
        'Suggesting the best practices',
        'Identifying Performance gaps by comparing current processes with best practices',
        'Training of employees of entity for new changes to be made',
        'Review and Monitoring of implemented processes',
        'Capacity Building',
      ],
      'Start-up Consultancy': [
        'Certifications and special licenses assistance',
        'Analysis of market and competitors',
        'Consultancy and Advisory Services',
        'Process Mapping & assisting',
        'Review and monitoring on continuous basis',
      ],
      'Business Advisory': [
        'IT risk and Assurance',
        'Process Audit and controls',
        'Risk Management',
        'Finance Management Consulting',
        'Supply Chain and Customer Management Services',
      ],
      'MIS System Designing': [
        'Accounting Information and System Design',
        'Transaction Processing Systems',
        'Budgetary controls and designs',
        'IT system design and consultancy',
      ],
    },
  },
  {
    title: 'Indirect Tax',
    translationKey: 'services.indirectTax',
    items: ['Goods and Service Tax', 'Custom Duty', 'Professional Tax', 'GST Compliance', 'GST Advisory', 'GST Litigation'],
    insights: true,
    imgSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1515&auto=format&fit=crop',
    description: 'GST and indirect tax solutions ensuring seamless compliance and optimal tax efficiency.',
    detailedDescription: `Our Indirect Tax services provide comprehensive solutions...`,
    benefits: [
      'Optimized GST liability and cash flow',
      'Seamless compliance with GST regulations',
      'Expert representation in litigation matters',
      'Minimized risk of penalties and interest',
      'Strategic guidance on indirect tax planning',
    ],
    subItems: {
      'Goods and Service Tax': [
        'Tax Advisory (Applicability / Rates defined)',
        'Registration',
        'Transition / Conversion from Old Laws (VAT, Service Tax, Excise & VAT to GST)',
        'Return Filing (Monthly / Annually)',
        'GST Compliance Management',
        'Input Tax Credit Optimization',
        'GST Audit & Health Check',
      ],
    },
  },
  {
    title: 'Risk Advisory Services',
    translationKey: 'services.riskAdvisory',
    items: [
      'Enterprise Risk Management',
      'Internal Controls Assessment',
      'Fraud Risk Management',
      'Compliance Risk Advisory',
      'Business Continuity Planning',
      'Cybersecurity Risk Assessment',
    ],
    insights: true,
    imgSrc: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1470&auto=format&fit=crop',
    description: 'Proactive risk identification and mitigation strategies to protect your business interests.',
    detailedDescription: `Our Risk Advisory Services help organizations identify, assess, and mitigate risks...`,
    benefits: [
      'Proactive identification and mitigation of key risks',
      'Strengthened internal control environment',
      'Reduced likelihood of fraud and financial losses',
      'Enhanced regulatory compliance',
      'Improved business resilience and continuity',
    ],
  },
];

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
      className="group relative h-60 sm:h-72 md:h-80 lg:h-96 w-full cursor-pointer overflow-hidden shadow-xl bg-gray-800"
      transition={{ staggerChildren: 0.035 }}
    >
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 md:saturate-0 md:group-hover:saturate-100"
        style={{ backgroundImage: `url(${service.imgSrc})` }}
      />
      <div className="absolute inset-0 bg-black/50 transition-all duration-500 group-hover:bg-black/70" />

      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-6 md:p-8 text-white">
        <svg className="ml-auto w-6 sm:w-8 md:w-9 h-6 sm:h-8 md:h-9 text-white/70 transition-transform duration-500 group-hover:-rotate-45 group-hover:text-[#1DCD9F]"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>

        <div>
          <h3 className="mb-2 sm:mb-4 text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
            {service.title.split('').map((letter, i) => (
              <AnimatedLetter key={i} letter={letter} />
            ))}
          </h3>
          <p className="mb-3 sm:mb-5 text-xs sm:text-sm text-gray-200 line-clamp-2">{service.description}</p>
          <span className="inline-block bg-[#1DCD9F]/20 border border-[#1DCD9F] text-[#1DCD9F] px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
            {service.items.length} Services
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Expandable Item Component
const ExpandableMainItem: React.FC<{
  mainItem: string;
  service: ServiceGroup;
  serviceTitle: string;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ mainItem, service, serviceTitle, isExpanded, onToggle }) => {
  const hasSubItems = service.subItems?.[mainItem];
  const hasDeepSubItems = service.deepSubItems?.[serviceTitle]?.[mainItem];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900/30"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 bg-gray-900/70 p-5 hover:bg-gray-800/70 transition-colors"
      >
        
        <span className="text-white font-semibold text-lg flex-1 text-left">{mainItem}</span>
        {(hasSubItems || hasDeepSubItems) && (
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-[#1DCD9F]" />
          </motion.div>
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (hasSubItems || hasDeepSubItems) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-4 bg-gray-900/40 space-y-2"
          >
            {/* Regular subItems */}
            {hasSubItems && !hasDeepSubItems && (
              <div className="space-y-2">
                {Array.isArray(hasSubItems) ? hasSubItems.map((sub, j) => (
                  <div key={j} className="flex items-start gap-3 ml-10 text-gray-300 text-sm">
                    <span className="mt-1.5 text-[#1DCD9F]">•</span>
                    <span>{sub}</span>
                  </div>
                )) : null}
              </div>
            )}

            {/* Deep subItems with categories */}
            {hasDeepSubItems && (
              <div className="space-y-5">
                {Object.entries(hasDeepSubItems).map(([cat, items]) => (
                  <div key={cat}>
                    <p className="text-[#1DCD9F] font-semibold text-sm mb-3 ml-10">{cat}</p>
                    {Array.isArray(items) ? (
                      items.map((item, k) => (
                        <div key={k} className="flex items-start gap-3 ml-16 text-gray-400 text-sm">
                          <span className="mt-1.5">–</span>
                          <span>{item}</span>
                        </div>
                      ))
                    ) : (
                      Object.entries(items).map(([subCat, subItems]) => (
                        <div key={subCat} className="ml-10">
                          <p className="text-gray-300 font-medium text-sm mb-2 ml-6">{subCat}</p>
                          {Array.isArray(subItems) && subItems.map((item, k) => (
                            <div key={k} className="flex items-start gap-3 ml-16 text-gray-400 text-xs">
                              <span className="mt-1.5">◦</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      ))
                    )}
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

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<ServiceGroup | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedService) {
      setExpandedItems({});
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

  useEffect(() => {
    if (!selectedService || !modalRef.current) return;
    const modal = modalRef.current;
    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
      if (e.deltaY !== 0) {
        modal.scrollBy({ top: e.deltaY * 1.2, behavior: 'auto' });
      }
    };
    modal.addEventListener('wheel', handleWheel, { passive: false });
    return () => modal.removeEventListener('wheel', handleWheel);
  }, [selectedService]);

  const toggleItemExpanded = (itemName: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white">
      {/* Hero */}
      <Navbar/>
      <section className="relative h-[50vh] sm:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0f0f0f]" />
        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
          alt="Financial Excellence" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          className="absolute left-[0%] top-[50%] sm:top-[60%] z-10 text-left px-4 sm:px-6 max-w-6xl mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-6">Our Services<span className="text-[#1DCD9F]">.</span></h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-3 sm:mb-6">Comprehensive Financial Solutions for Your Success</p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400  mx-auto border-l-4 border-[#1DCD9F] pl-3 sm:pl-6">
            From audit to advisory, we deliver excellence at every step of your financial journey.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-10 sm:py-20 px-3 sm:px-6 md:px-12 lg:px-20">
        <div className='p-4 sm:p-10 flex flex-col gap-4 sm:gap-8'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>Our Core Services <span className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1DCD9F]'>.</span></h1>
          <p className='text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl text-gray-300'>We deliver precise, compliant, and value-driven solutions tailored to your business needs.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {serviceGroups.map((service, index) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.15, duration: 0.6 }}>
              <ServiceCard service={service} onClick={() => setSelectedService(service)} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-10 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#1a1a1a]">
        <div className="mx-auto max-w-5xl space-y-8 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 mx-auto max-w-2xl space-y-3 sm:space-y-6 text-center"
          >
            <h2 className="text-balance text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              Why Choose <span className="text-[#1DCD9F]">Us</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400">
              13+ years of expertise, 500+ trusted clients, and one partner for all your financial needs.
            </p>
          </motion.div>

          <div className="relative mx-auto max-w-7xl divide-x divide-y divide-[#2c2c2c] border border-[#2c2c2c] bg-[#202020] *:p-4 sm:*:p-6 md:*:p-8 sm:grid-cols-2 lg:grid-cols-3 grid">
            {[
              { title: "13+ Years Expertise", desc: "Deep domain knowledge across audit, tax, corporate law, banking, and advisory.", icon: Calendar },
              { title: "500+ Happy Clients", desc: "From startups to listed companies across diverse industries trust us.", icon: Users },
              { title: "One-Stop Partner", desc: "Audit, tax, corporate law, banking, and risk advisory under one roof.", icon: ShieldCheck },
              { title: "Proactive Approach", desc: "We optimize tax, reduce risk, and drive sustainable growth.", icon: Zap },
              { title: "Expert Team", desc: "Qualified CAs, Company Secretaries, and Lawyers as your extended team.", icon: GraduationCap },
              { title: "Pan-India Presence", desc: "Seamless virtual and physical support with secure, paperless processes.", icon: Globe },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Icon className="h-3 sm:h-4 w-3 sm:w-4 text-[#1DCD9F] shrink-0" />
                    <h3 className="text-xs sm:text-sm font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-12 bg-linear-to-r from-[#1DCD9F]/10 via-transparent to-transparent">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Ready to Transform Your Business?</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-12 max-w-3xl mx-auto">
            Let's discuss how our expertise can help you achieve financial excellence and sustainable growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#1DCD9F] hover:bg-[#19b892] text-black font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all transform hover:scale-105 shadow-2xl">
              Get Started Now
              <svg className="w-4 sm:w-6 h-4 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="tel:+911234567890" className="inline-flex items-center justify-center gap-2 sm:gap-3 border-2 border-[#1DCD9F] text-[#1DCD9F] hover:bg-[#1DCD9F] hover:text-black font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all">
              Call Us Today
            </a>
          </div>
        </div>
      </section>

      {/* Modal - Expandable Items */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)} className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 cursor-pointer" />
            <motion.div
              ref={modalRef}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 h-[100vh] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0f0f0f] z-50 overflow-hidden shadow-2xl border-t border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 md:h-64 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${selectedService.imgSrc})` }} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-[#0a0a0a]" />
                <button onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm hover:bg-[#1DCD9F] transition-all group border border-white/20">
                  <svg className="w-6 h-6 mx-auto text-white group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-8 left-8 right-8">
                  <h2 className="text-2xl md:text-5xl font-bold text-white mb-3">{selectedService.title}</h2>
                  <p className="text-gray-200 text-sm md:text-lg">{selectedService.description}</p>
                </div>
              </div>

              <div className="overflow-y-auto h-[calc(100%-12rem)] md:h-[calc(100%-16rem)] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <div className="p-8 md:p-12 space-y-12">

                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-8 w-1 bg-[#1DCD9F]" />
                      <h3 className="text-xl md:text-2xl font-bold text-white">Overview</h3>
                    </div>
                    <p className="text-base text-gray-400 leading-relaxed whitespace-pre-line border-l-2 border-gray-800 pl-6">
                      {selectedService.detailedDescription}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-8 w-1 bg-[#1DCD9F]" />
                      <h3 className="text-xl md:text-2xl font-bold text-white">Our Services Include </h3>
                    </div>
                    <div className="space-y-6">
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

                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-8 w-1 bg-[#1DCD9F]" />
                      <h3 className="text-2xl font-bold text-white">Key Benefits</h3>
                    </div>
                    <div className="space-y-4">
                      {selectedService.benefits.map((benefit, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-4 bg-gradient-to-r from-gray-900/30 to-transparent p-5 rounded-lg border-l-2 border-[#1DCD9F] hover:border-l-4 transition-all"
                        >
                          
                          <span className="text-gray-400 text-sm leading-relaxed">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="relative overflow-hidden bg-gradient-to-r from-[#1DCD9F]/5 via-[#1DCD9F]/10 to-transparent p-10 rounded-xl border border-[#1DCD9F]/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#1DCD9F]/5 rounded-full blur-3xl" />
                    <div className="relative text-center">
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">Ready to Get Started?</h3>
                      <p className="text-gray-400 mb-8 text-base max-w-2xl mx-auto">
                        Contact us today for a personalized consultation tailored to your business needs.
                      </p>
                      <a href="#contact" className="inline-flex items-center gap-3 bg-[#1DCD9F] hover:bg-[#19b892] text-black font-bold px-8 py-4 rounded-full text-base transition-all transform hover:scale-105 shadow-lg hover:shadow-[#1DCD9F]/50">
                        Schedule a Consultation <ArrowRight className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Footer/>
    </div>
  );
}