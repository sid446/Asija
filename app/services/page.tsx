'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight ,Check} from 'lucide-react';

interface ServiceGroup {
  title: string;
  translationKey: string;
  items: string[];
  insights?: boolean;
  imgSrc: string;
  description: string;
  detailedDescription: string;
  benefits: string[];
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
    detailedDescription: `Our Audit and Assurance services provide comprehensive solutions designed to ensure compliance, transparency, and financial accuracy across all aspects of your business operations. We bring decades of experience and deep expertise to help organizations meet regulatory requirements while building stakeholder confidence.

Our statutory audit services ensure full compliance with the Companies Act 2013 and other applicable regulations. We conduct thorough examinations of financial statements, internal controls, and business processes to provide reliable assurance to shareholders, regulators, and other stakeholders.

Through internal audit engagements, we help organizations strengthen their internal control frameworks, identify operational inefficiencies, and mitigate risks. Our team works closely with management to provide actionable recommendations that enhance governance and operational effectiveness.

We also specialize in procurement audits, fund audits for government and non-profit organizations, and management audits that evaluate the effectiveness of organizational leadership and strategic initiatives. Each engagement is tailored to meet the specific needs and objectives of our clients.`,
    benefits: [
      'Enhanced financial credibility and stakeholder confidence',
      'Identification of operational inefficiencies and risk areas',
      'Compliance with regulatory requirements and industry standards',
      'Improved internal controls and governance frameworks',
      'Strategic insights for business improvement',
    ],
  },
  {
    title: 'Direct Tax',
    translationKey: 'services.directTax',
    items: ['Income Tax Services', 'Benami Transaction', 'Tax Planning & Advisory', 'Return Filing & Compliance', 'Assessment & Appeals', 'Transfer Pricing'],
    insights: true,
    imgSrc: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1470&auto=format&fit=crop',
    description: 'Expert guidance on income tax planning, compliance, and representation in complex tax matters.',
    detailedDescription: `Our Direct Tax services offer comprehensive solutions for individuals, businesses, and institutions navigating India's complex income tax landscape. We combine technical expertise with practical insights to help clients optimize their tax positions while ensuring full compliance with applicable laws.

We provide end-to-end income tax services including strategic tax planning, return preparation and filing, assessment representation, and appellate services. Our team stays current with evolving tax regulations and judicial precedents to provide informed guidance on complex tax matters.

Our expertise extends to handling Benami transaction cases, representing clients before tax authorities, and managing investigations under the Prevention of Money Laundering Act (PMLA) and Benami Transactions (Prohibition) Act. We work diligently to protect our clients' interests while ensuring compliance with all legal requirements.

We also provide transfer pricing services for multinational enterprises, helping them establish and defend arm's length pricing for international transactions. Our approach combines economic analysis with legal expertise to minimize tax risks and disputes.`,
    benefits: [
      'Minimized tax liability through strategic planning',
      'Expert representation before tax authorities',
      'Timely compliance with filing and payment obligations',
      'Risk mitigation in complex tax matters',
      'Peace of mind with professional tax management',
    ],
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
    ],
    insights: true,
    imgSrc: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1470&auto=format&fit=crop',
    description: 'End-to-end corporate legal compliance and advisory services for businesses of all sizes.',
    detailedDescription: `Our Corporate Law Services provide comprehensive support for businesses navigating India's complex regulatory landscape. From entity formation to ongoing compliance, we offer end-to-end solutions that help organizations operate efficiently within the legal framework.

We assist clients with company incorporation, LLP formation, and partnership registrations. Our services include drafting constitutive documents, obtaining necessary approvals, and ensuring compliance with the Companies Act 2013, LLP Act 2008, and Partnership Act 1932.

For NGOs and non-profit organizations, we provide specialized services including registration under various acts, obtaining 12A and 80G certifications, FCRA registration and compliance, and advisory on governance and regulatory matters. We understand the unique challenges faced by the social sector and provide practical solutions.

Our corporate compliance services ensure timely filing of statutory returns, maintenance of statutory registers and records, secretarial compliance, and board meeting management. We help organizations avoid penalties and maintain good standing with regulatory authorities.`,
    benefits: [
      'Seamless entity formation and structuring',
      'Ongoing compliance management',
      'Risk mitigation through proper governance',
      'Expert advisory on regulatory matters',
      'Cost-effective compliance solutions',
    ],
  },
  {
    title: 'Consultancy',
    translationKey: 'services.consultancy',
    items: [
      'Process Re-Engineering',
      'Business Advisory',
      'Start-up Consultancy',
      'MIS System Designing',
      'Financial Modeling',
      'Strategic Planning',
    ],
    insights: true,
    imgSrc: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop',
    description: 'Strategic business consulting to optimize operations, drive growth, and achieve your vision.',
    detailedDescription: `Our Consultancy services help businesses optimize their operations, improve efficiency, and achieve sustainable growth. We work as strategic partners, providing insights and solutions tailored to each client's unique circumstances and objectives.

Our process re-engineering services identify inefficiencies in business operations and design streamlined workflows that reduce costs and improve productivity. We analyze existing processes, identify bottlenecks, and implement improvements that deliver measurable results.

For start-ups and emerging businesses, we provide comprehensive support including business plan development, financial modeling, funding assistance, and regulatory compliance guidance. We help entrepreneurs transform their ideas into viable businesses with solid foundations for growth.

Our MIS system designing services help organizations establish robust management information systems that provide timely, accurate data for decision-making. We design customized reporting frameworks that align with business objectives and provide actionable insights.

Through business advisory services, we provide strategic guidance on critical business decisions including expansion planning, mergers and acquisitions, restructuring, and performance improvement initiatives.`,
    benefits: [
      'Improved operational efficiency and productivity',
      'Data-driven decision making capabilities',
      'Strategic clarity and direction',
      'Accelerated business growth',
      'Risk-aware business development',
    ],
  },
  {
    title: 'Indirect Tax',
    translationKey: 'services.indirectTax',
    items: ['Goods and Service Tax', 'Custom Duty', 'Professional Tax', 'GST Compliance', 'GST Advisory', 'GST Litigation'],
    insights: true,
    imgSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1515&auto=format&fit=crop',
    description: 'GST and indirect tax solutions ensuring seamless compliance and optimal tax efficiency.',
    detailedDescription: `Our Indirect Tax services provide comprehensive solutions for businesses navigating India's GST regime and other indirect tax obligations. We help clients optimize their tax positions while ensuring full compliance with applicable laws and regulations.

We offer end-to-end GST services including registration, return filing, input tax credit optimization, and compliance management. Our team stays updated with frequent GST notifications, circulars, and judicial pronouncements to provide current and accurate guidance.

Our GST advisory services help businesses structure their operations tax-efficiently, manage complex transactions, and handle sector-specific GST issues. We provide opinions on GST applicability, classification, valuation, and other contentious matters.

For GST litigation, we represent clients before GST authorities, appellate tribunals, and courts. We have successfully handled numerous cases involving GST demands, refunds, and interpretational issues.

We also provide customs duty advisory and compliance services for businesses engaged in import-export activities, helping them navigate customs valuation, classification, and duty optimization opportunities.`,
    benefits: [
      'Optimized GST liability and cash flow',
      'Seamless compliance with GST regulations',
      'Expert representation in litigation matters',
      'Minimized risk of penalties and interest',
      'Strategic guidance on indirect tax planning',
    ],
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
    description: 'Proactive risk identification and mitigation strategies to protect your business interests and ensure sustainable growth.',
    detailedDescription: `Our Risk Advisory Services help organizations identify, assess, and mitigate risks that could impact their objectives and operations. We provide comprehensive solutions that strengthen risk management frameworks and enhance organizational resilience.

Our enterprise risk management services help organizations establish robust ERM frameworks aligned with their strategic objectives. We assist in identifying key risks, assessing their potential impact, and developing mitigation strategies that balance risk and opportunity.

Through internal controls assessment, we evaluate the design and operating effectiveness of internal controls over financial reporting, operations, and compliance. We provide recommendations to strengthen control environments and reduce the risk of errors, fraud, and regulatory violations.

Our fraud risk management services help organizations prevent, detect, and respond to fraud. We conduct fraud risk assessments, design anti-fraud controls, and provide forensic accounting services when fraud is suspected or detected.

We also provide compliance risk advisory services, helping organizations navigate complex regulatory environments and avoid costly penalties. Our services include regulatory compliance assessments, policy and procedure development, and compliance monitoring programs.`,
    benefits: [
      'Proactive identification and mitigation of key risks',
      'Strengthened internal control environment',
      'Reduced likelihood of fraud and financial losses',
      'Enhanced regulatory compliance',
      'Improved business resilience and continuity',
    ],
  },
];

// Animated Letter Animation
const letterVariants: Variants = {
  hover: { y: '-50%' },
};

const AnimatedLetter: React.FC<{ letter: string }> = ({ letter }) => (
  <div className="inline-block h-[36px] overflow-hidden font-semibold text-3xl">
    <motion.span
      className="flex min-w-[4px] flex-col"
      variants={letterVariants}
      transition={{ duration: 0.5 }}
    >
      <span>{letter}</span>
      <span>{letter}</span>
    </motion.span>
  </div>
);

// Service Card Component

interface ServiceCardProps {
  service: ServiceGroup;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <motion.div
      whileHover="hover"
      onClick={onClick}
      className="group relative h-96 w-full cursor-pointer overflow-hidden  shadow-xl bg-gray-800"
      transition={{ staggerChildren: 0.035 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 md:saturate-0 md:group-hover:saturate-100"
        style={{ backgroundImage: `url(${service.imgSrc})` }}
      />
      <div className="absolute inset-0 bg-black/50 transition-all duration-500 group-hover:bg-black/70" />

      <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white">
        <svg
          className="ml-auto w-9 h-9 text-white/70 transition-transform duration-500 group-hover:-rotate-45 group-hover:text-[#1DCD9F]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>

        <div>
          <h3 className="mb-4 text-3xl font-bold leading-tight">
            {service.title.split('').map((letter, i) => (
              <AnimatedLetter key={i} letter={letter} />
            ))}
          </h3>
          <p className="mb-5 text-gray-200 line-clamp-2">{service.description}</p>
          <span className="inline-block bg-[#1DCD9F]/20 border border-[#1DCD9F] text-[#1DCD9F] px-4 py-2 rounded-full text-sm font-medium">
            {service.items.length} Services
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<ServiceGroup | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock scroll when modal is open
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

  // Trap scroll inside modal
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0f0f0f]" />
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
          alt="Financial Excellence"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute left-1/2 sm:left-[0%] top-1/2 sm:top-[60%] z-10 text-left px-6 max-w-6xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Services<span className="text-[#1DCD9F]">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            Comprehensive Financial Solutions for Your Success
          </p>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto border-l-4 border-[#1DCD9F] pl-6">
            From audit to advisory, we deliver excellence at every step of your financial journey.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className='p-10 flex flex-col gap-8'>
        <h1 className='text-4xl font-bold'>Our Core Services <span className='text-6xl text-[#1DCD9F]'>.</span></h1>
        <p className='text-md max-w-3xl text-gray-300'>We deliver precise, compliant, and value-driven solutions tailored to your business needs. Explore our comprehensive range of auditing and chartered accountancy services below</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceGroups.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <ServiceCard service={service} onClick={() => setSelectedService(service)} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#1DCD9F]/10 via-transparent to-transparent">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Let's discuss how our expertise can help you achieve financial excellence and sustainable growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-[#1DCD9F] hover:bg-[#19b892] text-black font-bold px-10 py-5 rounded-full text-lg transition-all transform hover:scale-105 shadow-2xl"
            >
              Get Started Now
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="tel:+911234567890"
              className="inline-flex items-center justify-center gap-3 border-2 border-[#1DCD9F] text-[#1DCD9F] hover:bg-[#1DCD9F] hover:text-black font-bold px-10 py-5 rounded-full text-lg transition-all"
            >
              Call Us Today
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 cursor-pointer"
            />
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 100 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-[#111111] rounded-3xl z-50 overflow-y-auto shadow-2xl border border-[#1DCD9F]/30 scrollbar-thin scrollbar-thumb-[#1DCD9F] scrollbar-track-[#1a1a1a]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-[#111111]/95 backdrop-blur-xl border-b border-[#1DCD9F]/30 p-6 flex justify-between items-center z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white">{selectedService.title}</h2>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-14 h-14 rounded-full bg-[#1DCD9F]/20 hover:bg-[#1DCD9F] transition-all group"
                >
                  <svg className="w-8 h-8 mx-auto text-white group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-8 md:p-12 space-y-12">
                <div>
                  <h3 className="text-3xl font-bold text-[#1DCD9F] mb-6">Overview</h3>
                  <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">{selectedService.detailedDescription}</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-[#1DCD9F] mb-8">Our Services Include:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {selectedService.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-4 bg-[#1a1a1a] p-5 rounded-xl hover:bg-[#1DCD9F]/10 transition-colors"
                      >
                        <span className="text-2xl text-[#1DCD9F]"><Check /></span>
                        <span className="text-gray-200 font-medium">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-[#1DCD9F] mb-8">Key Benefits</h3>
                  <div className="space-y-5">
                    {selectedService.benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-5 bg-gradient-to-r from-[#1DCD9F]/10 to-transparent p-6 rounded-xl"
                      >
                        <span className="text-3xl"><ArrowRight /></span>
                        <span className="text-lg text-gray-200">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#1DCD9F]/20 to-transparent p-10 rounded-2xl text-center">
                  <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
                  <p className="text-gray-300 mb-8 text-lg">
                    Contact us today for a personalized consultation tailored to your business needs.
                  </p>
                  <a
                    href="/contact"
                    className="inline-block bg-[#1DCD9F] hover:bg-[#19b892] text-black font-bold px-10 py-4 rounded-full text-lg transition-all transform hover:scale-105 shadow-xl"
                  >
                    Schedule a Consultation
                  </a>
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