'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const members = [
  {
    name: 'CA Ashish Kapoor',
    role: 'Sr. Partner',
    avatar: '/AshishKapoor.jpeg',
    linkedin: 'https://linkedin.com/in/ashishkapoor',
    qualifications: 'B.Com, FCA, Certified Concurrent Auditor of Bank, Certified Peer Review Auditor',
    specialization: 'Direct & Indirect Taxation, Income Tax Litigation, Benami Law, GST',
    experience: '20+ Years',
    membership: '406016',
    associationYears: '20+ Years',
    mobile: '+91-9559990001',
    email: 'ashish.kapoor@asija.in',
    description: `CA. Ashish Kapoor is the Senior Partner at Asija & Associates LLP, a distinguished Chartered Accountancy firm with a legacy of over 39 years of professional excellence. With more than two decades of experience, he has been at the forefront of guiding organizations across diverse sectors including technology services, financial services, automotive, infrastructure, education, and manufacturing. Ashish specializes in Direct and Indirect Taxation, with deep expertise in Income Tax Litigation, Benami Law, and Goods & Services Tax (GST). He is also widely recognized for his contributions to financial regulations, compliance frameworks, and advisory to FinTech enterprises. His balanced approach to consulting and litigation has made him a trusted advisor to corporates, government institutions, and international organizations. Over the years, he has been a sought-after speaker, trainer, and thought leader, delivering sessions at prestigious platforms such as the Institute of Chartered Accountants of India (ICAI), Reserve Bank of India (RBI), Indian Institutes of Management (IIMs), the National Academy of Direct Taxes (NADT), the National Academy of Customs, Indirect Taxes & Narcotics (NACIN), and several leading corporate and educational forums. His presentations cover a wide spectrum—ranging from taxation of charitable trusts and GST reforms to income tax litigation strategies, internal controls, and financial governance. Ashish has had the privilege of working with and advising global and national institutions and he also actively represents clients before the Income Tax Appellate Authority, Company Law Board, and appellate authorities under the PMLA & Benami Transactions Act.

Beyond his practice, Ashish Kapoor is a frequent contributor to professional publications and journals, authoring articles on evolving tax reforms, compliance issues, and governance standards. His writings and talks aim not only at simplifying complex tax frameworks but also at strengthening professional education and policy awareness within the business community.

Known for his strategic insight, analytical depth, and strong communication skills, Ashish blends technical expertise with practical solutions, helping businesses stay compliant while fostering sustainable growth. His leadership continues to shape Asija & Associates LLP as a trusted partner for corporates, institutions, and public bodies in India and abroad.`,
  },
  {
    name: 'CA Ruchi Kapoor',
    role: 'Sr. Partner',
    avatar: '/RuchiKapoor.jpeg',
    linkedin: '#',
    qualifications: 'B.Com, FCA, CCCA',
    specialization: 'Chief Finance and Admin Head',
    experience: '18 Years',
    membership: '406016',
    associationYears: '18+ Years',
    mobile: '+91-9559990002',
    email: 'ruchi.kapoor@asija.in',
    description: `CA Ruchi Kapoor is a Fellow Chartered Accountant and has been in the profession since 2006. She did her graduation in commerce from the University of Lucknow in the year 2003. She has done Certificate Course on Concurrent Audit of Banks conducted by the Institute of Chartered Accountants of India. She deals in various laws, Taxation and GST matters.

She is also Chief Finance Officer of our organization as she optimizes the financial performance of our firm, including its reporting, liquidity, and return on investment. She heads the HR of the firm too and is responsible for managing the employees and trainees life cycle (i.e., recruiting, hiring, onboarding, training, and firing employees) and administering teams benefits.

Being detail-oriented person, dedicated to perfection she drives changes with ease. She acts as Principal point-of-contact for the clients and helps them in troubleshooting and resolving issues while overseeing the activities around client delivery, billing/revenue collection, team management, adherence to compliance of ethics, guidelines and norms of the engagement.`,
  },
  {
    name: 'CA Anand Srivastav',
    role: 'Sr. Partner',
    avatar: '/AnanadShrivastav.jpeg',
    linkedin: '#',
    qualifications: 'FCA (ICAI), CPA Australia, ACA (ICAEW), FAFD',
    specialization: 'Audit, Assurance, Compliance, Corporate Governance, Forensic Accounting, UN HACT Assignments',
    experience: '22+ Years',
    membership: '',
    associationYears: '',
    mobile: '',
    email: '',
    description: `CA. Anand Prakash Srivastava is a Fellow Chartered Accountant (ICAI, India), Certified Public Accountant (CPA, Australia), Associate Chartered Accountant (ICAEW, England) with over 22 years of professional experience across industry and public practice. His career spans leadership roles in the telecom and insurance sectors for over 15 years, followed by public practice, where he has advised a diverse portfolio of clients in India and internationally.

During his industry tenure, Anand held senior finance leadership positions with HDFC Life Insurance, Essar Telecom, Tata Teleservices, and Reliance Communications. Notably, he was part of the core finance team at HDFC Life during its IPO in 2017, leading zonal accounts across seven states and managing consolidation for the company’s Dubai subsidiary. He also led compliance, governance, and finance operations across multiple geographies, driving efficiency, regulatory alignment, and business strategy.

In public practice, Anand brings expertise in audit, assurance and compliance including UN HACT assignments, knowledge process outsourcing (KPO), corporate governance, financial planning, forensic accounting, and systems audit. His certifications in Forensic Accounting, Wealth Management, Government Accounting, and Ind-AS further strengthen his ability to provide comprehensive advisory services to corporates, institutions, and startups.

Anand has also enriched his leadership skills through executive education at IIM Ahmedabad (Innovate, Disrupt & Change) and ISB Hyderabad (Analytical Thinking, Managerial Effectiveness, Leading in Times of Change). His professional interests lie in combining strategic finance, risk management, and technology-driven insights to help businesses adapt and grow in an evolving regulatory and digital landscape.

Known for his strategic mindset, governance expertise, and mentoring approach, Anand continues to contribute as a trusted advisor to organizations seeking robust financial, compliance, and operational frameworks.`,
  },
  {
    name: 'CA Kamal Ferwani',
    role: 'Sr. Partner',
    avatar: '/kamalFerwani.jpeg',
    linkedin: '#',
    qualifications: 'B.Com, FCA',
    specialization: 'Audit Wing (Govt. & Banking Sector)',
    experience: '20+ Years',
    membership: '',
    associationYears: '20+ Years',
    mobile: '+91-9559990003',
    email: 'kamal.ferwani@asija.in',
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

Since over a decade, Mr. Kamal has obtained good experience in almost every field such as taxation laws, auditing, corporate finance liaison etc. He handles various issues with equal ease with his core expertise lies in financial consultancy. He has mastered the art of project reports, project financing, and other legal compliances.`,
  },
  {
    name: 'CA Padmaja Sunkad',
    role: 'Sr. Partner',
    avatar: '/Padma.jpeg',
    linkedin: '#',
    qualifications: 'FCA, DISA, AICA, DIRM',
    specialization: 'Knowledge, Research, Training & Quality (KRTQ), GST & Customs, Information Systems Audit',
    experience: '20+ Years',
    membership: '',
    associationYears: '',
    mobile: '',
    email: '',
    description: `Sr Partner at Asija & Associates Chartered Accountants LLP in charge of Knowledge, Research, Training and Quality Vertical (KRTQ) of the firm. A practicing Chartered Accountant with 20+ years’ experience in various areas of Finance, Taxation, and Wealth Management. She has completed post qualification courses from ICAI such as DIRM (Diploma in Risk Management)-ICAI-2006, DISA (Diploma in Information Systems Audit)-ICAI 2011, AICA-Certificate Course on Artificial Intelligence Level 1-2024, Certificate Course on Corporate Social Responsibility and Impact Assessment-2025 and is also a Certified Yoga Instructor- YIC – SVYASA Yoga University Bengaluru-2022.

The KRTQ vertical under her leadership conducts training programs and workshops for Corporates, Govt entities, UN bodies and Pvt Clients for knowledge upgradation and training of their staff and management on various topics in Taxation, Corporate Law, Audit. Her vertical addresses various queries raised by clients, especially in GST and Customs and issues advisories to them from time to time.

Padmaja has a PAN India experience working in Pune, Bengaluru, Bareilly, Lucknow, Gurgaon expanding the footprint of the firm in very diverse working conditions. She has a flair for languages and speaks English, Hindi, Marathi, Kannada. She has been a regular speaker at sessions on various topics in GST conducted by NACIN, NADT. She has also been a faculty to CA students on technical topics and a soft skills trainer as well and has undertaken confidential assignments with the Institute of Chartered Accountants of India (ICAI).`,
  },
  {
    name: 'CA Mohammad Hassan Shuaib',
    role: 'Consultant',
    avatar: '/Hasan.jpeg',
    linkedin: '#',
    qualifications: 'CA, DISA, FAFD, AICA (Level 1)',
    specialization: 'Global Taxation, UAE & Middle East Tax Advisory, VAT, Corporate Tax, International Assurance & Compliance',
    experience: '8+ Years',
    membership: '',
    associationYears: '',
    mobile: '',
    email: 'hassan.shuaib@asija.in',
    description: `CA Mohammad Hassan Shuaib is a highly skilled Chartered Accountant with DISA, FAFD, and AICA (Level 1) certifications. With rich international exposure, he brings deep expertise in global taxation, regulatory compliance, tax structuring, and strategic advisory across multiple jurisdictions.

He has previously worked with PwC Assurance & Compliance (Kolkata) on high-profile audit and compliance engagements for clients based in the Cayman Islands, Bahamas, and Australia. Subsequently, he served as a Taxation Consultant in the UAE, advising corporate clients on VAT implementation, Corporate Tax, cross-border structuring, and compliance under Middle Eastern regulatory frameworks.

Currently driving Asija & Associates LLP’s international expansion in the UAE and broader Middle East region, Hassan plays a pivotal role in strengthening the firm’s global tax and assurance capabilities, delivering seamless cross-border solutions to clients operating in diverse and complex regulatory environments.`,
  },
  {
    name: 'CA Sunil Kumar Agarwal',
    role: 'Partner',
    avatar: '/SunilKumar.jpeg',
    linkedin: '#',
    qualifications: 'B.Com, FCA',
    specialization: 'Government & PSU Audits, Public Finance, International Audits (UN, Embassies)',
    experience: '36+ Years',
    membership: '',
    associationYears: '',
    mobile: '',
    email: '',
    description: `A versatile Chartered Accountant with a positive outlook and over 36 years of rich experience in audit, financial analysis, and the examination of financial statements. An accomplished professional with extensive tenure at the Comptroller & Auditor General of India (C&AG), contributing to audits of Public Sector Undertakings and government organizations across India.

He had an experience of working with prominent organizations including Steel Authority of India Limited (SAIL), Pradeshiya Industrial & Investment Corporation of U.P. Ltd. (PICUP), Uttar Pradesh Rajkiya Nirman Nigam Limited (UPRNN), U.P. Jal Nigam, Uttar Pradesh State Road Transport Corporation (UPSRTC), Lucknow Metro Rail Corporation, Uttar Pradesh Expressways Industrial Development Authority (UPEIDA), and Uttar Pradesh Forest Department and Corporation.

Gained global exposure as a C&AG auditor with Indian Embassies in Europe (2002–2005) and served as auditor for United Nations agencies, including UNCC and ITC in Geneva (2018). Recognized for delivering high-impact audits and financial advisory with excellent client feedback.

Possesses strong expertise in accounting principles, financial management, and industry-standard software, combining technical proficiency with a strategic understanding of global and domestic financial practices.`,
  },
   {
    name: 'CA Sahil Dua',
    role: 'Partner',
    avatar: '/sahil.jpeg',
    linkedin: '#',
    qualifications: 'FCA, DISA, B.Com',
    specialization: 'Audit & Consulting, Real Estate Advisory, Transaction Advisory, Information Systems Audit',
    experience: '10+ Years',
    membership: '',
    associationYears: '5+ Years',
    mobile: '+91-8081980032',
    email: 'sahil.dua@asija.in',
    description: `CA Sahil Dua is a Fellow Chartered Accountant (FCA) and a commerce graduate from the University of Lucknow. He has also completed a certification course on Information System Audit (DISA) conducted by the Institute of Chartered Accountants of India.

He has an experience of almost 10 years in the Real Estate Sector and has also been in Transaction Advisory for the real estate sector. He has been in Auditing and Assurance for the last four years and has successfully handled various private clientele. He has also been involved in various write-ups including articles on Budget for Lucknow Chartered Accountant’s Society.

Presently, he is an integral part of our Audit and Assurance Vertical, delivering high-quality audit, consulting, and advisory services to clients across industries.`,
  },
    {
    name: 'CA Akash Agarwal',
    role: 'Partner',
    avatar: '/AkashAgarwal.jpeg',
    linkedin: '#',
    qualifications: 'ACA, LL.B, B.Com',
    specialization: 'Direct Taxation, Tax Litigation, Indirect Taxation, Business & Taxation Consultancy',
    experience: '5+ Years',
    membership: '',
    associationYears: '5+ Years',
    mobile: '+91-9582462284',
    email: 'akash.agarwal@asija.in',
    description: `CA Akash Agarwal is an Associate Chartered Accountant (ACA), LL.B, and commerce graduate, associated with Asija & Associates LLP since June 2019. Currently, he heads key responsibilities in the Direct Taxation Vertical of the firm.

His core areas of expertise include Tax Litigation in Direct Tax matters, representation before income tax authorities, appeals, assessments, and providing end-to-end business consultancy related to taxation and compliances. With a strong blend of legal and accounting knowledge, he offers practical and result-oriented solutions in complex direct and indirect tax scenarios, helping clients navigate assessments, litigation, and strategic tax planning effectively.`,
  },
    
    {
    name: 'CA Rohit Singh',
    role: 'Partner',
    avatar: '/RohitSingh.jpeg',
    linkedin: '#',
    qualifications: 'B.Com, FCA',
    specialization: 'Indirect Taxation, GST, Tax Litigation, Management Consultancy',
    experience: '9+ Years',
    membership: '',
    associationYears: '9+ Years',
    mobile: '+91-8808567624',
    email: 'rohit.singh@asija.in',
    description: `CA Rohit Singh is a Fellow Chartered Accountant (FCA) and commerce graduate, associated with Asija & Associates LLP since June 2015. Currently he is serving in Indirect Taxation Vertical of the firm. His area of expertise includes Tax Litigation, GST and Management Consultancy. With over 9 years of professional experience, he provides end-to-end GST compliance, advisory, representation before authorities, and strategic management consultancy to a diverse client base. He is known for his practical approach in resolving complex GST matters and delivering value-added solutions that help businesses achieve compliance and operational efficiency.`,
  },
   
  {
    name: 'Aniket Gupta',
    role: 'Associate Director',
    avatar: '/AniketGupta.jpeg',
    linkedin: '#',
    qualifications: 'ACA, FAFD, B.Com',
    specialization: 'Taxation, Audit, Accounting, Financial Reporting, QuickBooks & Xero Bookkeeping',
    experience: '1.5+ Years',
    membership: '',
    associationYears: '',
    mobile: '',
    email: '',
    description: `Aniket Gupta is an Associate Chartered Accountant with over 1.5 years of hands-on experience in taxation, audit, accounting, and financial reporting. He has successfully managed a diverse portfolio of corporate and non-corporate clients, specializing in Income Tax and TDS compliance, GST filings, tax audits, and financial reporting with precision and diligence.

Aniket is a certified QuickBooks and Xero bookkeeper and has gained extensive exposure working with one of India’s largest Knowledge Process Outsourcing (KPO) firms as a Senior Associate. In this role, he has successfully managed full-spectrum bookkeeping responsibilities for a range of clients in the United States, demonstrating his technical expertise, operational efficiency, and ability to handle complex accounting processes independently. His experience includes maintaining accurate financial records, preparing financial statements, and conducting detailed financial analysis to support strategic decision-making.

Committed to continuous learning and professional development, Aniket has also completed the Forensic Accounting and Fraud Detection (FAFD) certification from the Institute of Chartered Accountants of India. His skill set combines technical accounting proficiency with analytical rigor, enabling him to deliver accurate, insightful, and value-added financial solutions to clients.`,
  },
  {
    name: 'Naeem Khan',
    role: 'Associate Director',
    avatar: '/NaeemKhan.jpeg',
    linkedin: '#',
    qualifications: 'CA, B.Com, FAFD, CPA (Ireland), CFA (Level II)',
    specialization: 'Income Tax Litigation, GST, Tax Compliance, International Expansion (UK Desk)',
    experience: '4+ Years',
    membership: '',
    associationYears: '',
    mobile: '',
    email: '',
    description: `CA Naeem Khan is a practicing Chartered Accountant based in Lucknow, with over four years of post-qualification experience in finance, taxation, audit, and commercial operations.

He specializes in Income Tax Litigation, representing clients before the Income Tax Appellate Tribunal (ITAT), and provides comprehensive support in tax compliance, advisory, and financial reporting. His professional journey includes successfully managing company registrations, audits, due diligence assignments, and finalization of accounts for a diverse client base.

Naeem also brings strong expertise in GST and income tax return filings, ensuring accuracy, statutory compliance, and timely execution of assignments.

Presently Naeem is driving the firm’s international expansion initiatives, with a special focus on the UK Desk and other global projects. His global outlook and diverse expertise strengthen the firm’s capability to serve clients across borders.`,
  },
  {
    name: 'Narayan Singh',
    role: 'Associate Director',
    avatar: '/narayan.png',
    linkedin: '#',
    qualifications: 'CMA, M.Com',
    specialization: 'Government Audit, Internal/Statutory/Process/Performance Audit, Business Development',
    experience: '6+ Years',
    membership: '',
    associationYears: '',
    mobile: '',
    email: '',
    description: `CMA Narayan Singh, M.Com and a qualified Cost and Management Accountant (CMA), brings with him more than six years of diverse experience in the field of auditing. He has been actively engaged in the Government Audit and Business Development verticals, where he has developed strong expertise in Internal, Statutory, Process and Performance Audit. Over the years, he has successfully handled large and complex audit assignments across a wide range of industries and sectors. His experience includes working with Central and State Public Sector Undertakings, Maharatna companies in the Power Sector (Generation, Transmission, and Distribution/Discoms), premier Educational Institutions including Institutes of National Importance, the Construction sector, and Government-funded projects. His ability to work across such diverse domains reflects his strong analytical skills, technical knowledge, and commitment to delivering value-driven audit solutions.

Beyond his core audit responsibilities, CMA Narayan Singh also plays a vital role in the firm’s Business Development vertical. He is actively involved in procurement, preparation and analysis of RFPs/EOIs, and managing the bidding process for the firm. His expertise with GeM (Government e-Marketplace) and other e-tendering portals allows him to ensure smooth participation in competitive bidding processes, thereby contributing to the firm’s strategic growth. His dual role as an audit professional and business development strategist makes him an integral asset to the organization, supporting both operational excellence and expansion initiatives.`,
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
      <section className="relative bg-[#2a2a2a] w-full overflow-hidden pt-32 md:pt-32">
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
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />

  {/* Content */}
  <motion.div 
    className="relative z-10 text-center px-6 max-w-5xl mx-auto"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
      Your Success Is Our Legacy
      <span className="text-[#1DCD9F]">.</span>
    </h2>
    
    <p className="text-sm md:text-md text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
      With over 39 years of excellence, Asija & Associates LLP continues to deliver trust, precision, 
      and strategic financial leadership to businesses and institutions across India and beyond.
    </p>

    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <a 
        href="/contact" 
        className="inline-flex items-center gap-3 bg-[#1DCD9F] hover:bg-[#19b892] text-black font-bold px-8  py-3 rounded-full text-sm transition-all transform hover:scale-105 shadow-xl"
      >
        Start a Conversation
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>

      <a 
        href="tel:+911234567890" 
        className="inline-flex items-center gap-3 border-2 border-[#1DCD9F] text-[#1DCD9F] hover:bg-[#1DCD9F] hover:text-black font-semibold px-8 py-3 rounded-full text-sm transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call Us Today
      </a>
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
                {/* Header Section */}
                <div className="mb-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#1DCD9F] mb-6 mx-auto sm:mx-0">
                    <img src={selectedMember.avatar} alt={selectedMember.name} className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2 text-white text-center sm:text-left uppercase tracking-wide">
                    {selectedMember.name}
                  </h2>
                  {selectedMember.qualifications && (
                    <p className="text-gray-400 text-lg mb-3 text-center sm:text-left">{selectedMember.qualifications}</p>
                  )}
                  <p className="text-[#1DCD9F] text-xl font-medium text-center sm:text-left">{selectedMember.role}</p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-[#1DCD9F] to-transparent mb-8" />

                {/* Structured Information */}
                <div className="space-y-5 mb-10">
                  {selectedMember.specialization && (
                    <div className="flex items-start gap-4">
                      <span className="text-gray-400 font-semibold min-w-[180px] text-sm">Specialization</span>
                      <span className="text-gray-500">:</span>
                      <span className="text-white flex-1 text-sm leading-relaxed">{selectedMember.specialization}</span>
                    </div>
                  )}

                  {selectedMember.experience && (
                    <div className="flex items-start gap-4">
                      <span className="text-gray-400 font-semibold min-w-[180px] text-sm">Years of Experience {selectedMember.membership && `/ Membership`}</span>
                      <span className="text-gray-500">:</span>
                      <span className="text-white flex-1 text-sm">
                        {selectedMember.experience} {selectedMember.membership && `/ ${selectedMember.membership}`}
                      </span>
                    </div>
                  )}

                  {selectedMember.associationYears && (
                    <div className="flex items-start gap-4">
                      <span className="text-gray-400 font-semibold min-w-[180px] text-sm">Association with the firm</span>
                      <span className="text-gray-500">:</span>
                      <span className="text-white flex-1 text-sm">{selectedMember.associationYears}</span>
                    </div>
                  )}

                  {selectedMember.mobile && (
                    <div className="flex items-start gap-4">
                      <span className="text-gray-400 font-semibold min-w-[180px] text-sm">Mobile No.</span>
                      <span className="text-gray-500">:</span>
                      <a href={`tel:${selectedMember.mobile}`} className="text-[#1DCD9F] hover:text-[#19b892] flex-1 text-sm transition-colors">
                        {selectedMember.mobile}
                      </a>
                    </div>
                  )}

                  {selectedMember.email && (
                    <div className="flex items-start gap-4">
                      <span className="text-gray-400 font-semibold min-w-[180px] text-sm">Email</span>
                      <span className="text-gray-500">:</span>
                      <a href={`mailto:${selectedMember.email}`} className="text-[#1DCD9F] hover:text-[#19b892] flex-1 text-sm break-all transition-colors">
                        {selectedMember.email}
                      </a>
                    </div>
                  )}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-[#1DCD9F] to-transparent mb-10" />

                {/* Description */}
                <div className="mb-12">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line text-justify text-sm">
                    {selectedMember.description}
                  </p>
                </div>

                {/* LinkedIn Connect */}
                <div className="pt-8 border-t border-[#1DCD9F]/20">
                  <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#0077B5] hover:bg-[#006399] text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-[#0077B5]/50 group w-full justify-center sm:w-auto"
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