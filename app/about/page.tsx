'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Timeline } from '@/components/Timeline';
import Values from '@/components/Values';
import Footer from '@/components/Footer';

 const data = [
  {
    title: "1986",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">
          Founded by <span className="text-[#2BC99C] font-bold">CA. Uttam Chandra Asija</span> in Lucknow
        </p>
        <p className="text-sm text-gray-400 leading-relaxed">
          A humble beginning with a vision to redefine trust and excellence in accounting and financial advisory.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1624357676666-4cca3b657627?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Vintage office 1980s"
            className="h-40 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1680261019762-59d8fa84e0a3?q=80&w=1077&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Founder at desk"
            className="h-40 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
        </div>
        <div className="pt-4 bg-gradient-to-r from-[#2BC99C]/10 to-transparent p-4 rounded-lg">
          <p className="text-2xl font-bold text-[#2BC99C]">3 Core Services Launched</p>
          <p className="text-sm text-gray-400">Audit • Taxation • Advisory</p>
        </div>
      </div>
    ),
  },
  {
    title: "1990 – Growth Phase",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Strategic Expansion Begins</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          Building partnerships, growing the team, and earning trust across industries.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://plus.unsplash.com/premium_photo-1664392124762-db2317f99f84?q=80&w=748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Team meeting 1990s"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
            alt="Client handshake"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
         
        </div>
        <div className="pt-4 bg-gradient-to-r from-[#2BC99C]/10 to-transparent p-4 rounded-lg">
          <p className="text-2xl font-bold text-[#2BC99C]">₹99,99,999</p>
          <p className="text-sm text-gray-300">Strategic Funding Secured</p>
        </div>
      </div>
    ),
  },
  {
    title: "2000 – Expansion Era",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Pan-India Presence</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          Modernized operations, adopted technology, and expanded reach across the nation.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=600&fit=crop"
            alt="Business meeting room"
            className="h-48 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=600&fit=crop"
            alt="Growing team"
            className="h-48 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          
        </div>
        <div className="pt-4 bg-gradient-to-r from-[#2BC99C]/10 to-transparent p-4 rounded-lg">
          <p className="text-2xl font-bold text-[#2BC99C]">₹99,99,999</p>
          <p className="text-sm text-gray-300">Investment for National Growth</p>
        </div>
      </div>
    ),
  },
  {
    title: "2025 – Innovation & Leadership",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">The Future of Finance</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          Leading with AI-driven audits, ESG compliance, blockchain accounting, and serving 500+ enterprise clients.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1704655295066-681e61ecca6b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Modern office 2025"
            className="h-52 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=600&fit=crop"
            alt="AI & Technology"
            className="h-52 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
         
        </div>
        <div className="pt-6 text-center">
          <p className="text-5xl font-bold text-[#2BC99C] mb-2">500+</p>
          <p className="text-lg text-gray-300">Enterprise Clients & Growing Strong</p>
        </div>
      </div>
    ),
  },
];
function page() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  const fullText = `Asija & Associates LLP, Chartered Accountants was established on 1st April 1986 by our founder member CA. Uttam Chandra Asija with the aim of providing a wide range of Accounting and Financial services to clients in Government, Corporate & Private Sector. Over the years the firm has been built around a team of professionals, possessing vast experience in the areas of auditing, accounting, taxation, company law matters, along with a host of other financial services which are rendered to the clients to turning complex problems into growth opportunities and supporting the progress of society at large.<br/><br/>

Our Firm has not only grown tremendously in knowledge and expertise but has also created history by becoming the first Chartered Accountancy firm in Lucknow to convert into a Limited Liability Partnership (LLP) – a landmark achievement that reflects our progressive vision and commitment to excellence.<br/><br/>

Today, with decades of trust earned and hundreds of success stories written, we continue to stand by our core belief: delivering exceptional quality to every stakeholder and going above and beyond client expectations through collaboration, innovation, and unwavering integrity.`;

  useEffect(() => {
    if (contentRef.current) {
      const isTruncated = contentRef.current.scrollHeight > contentRef.current.clientHeight;
      setShowButton(isTruncated);
    }
  }, []);

  return (
    <div className='w-full h-auto flex flex-col justify-center items-center'>
      <Navbar />

      {/* Background Image + Gradient Overlay */}
      <div className='absolute inset-x-0 top-0 h-[100vh] bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none'></div>
      
      <Image
        src="/aboutUs.jpg"
        alt="About Us"
        width={1920}
        height={1080}
        className="w-full h-[100vh] object-cover"
        priority
      />

      {/* Hero Overlay Content – unchanged */}
      <div className="absolute text-left  top-[70%] sm:top-[60%] left-1/2 sm:left-[35%] transform -translate-x-1/2 -translate-y-1/2 px-4 w-full sm:w-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold  drop-shadow-lg" style={{color:"white"}}>
          Who We Are <span className='text-[#2BC99C] text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>.</span>
        </h1>
        <p className="mt-6 sm:mt-4 text-lg sm:text-lg md:text-xl lg:text-2xl drop-shadow-md"style={{color:"white"}}>
          Unwavering dedication to financial excellence and professional integrity.
        </p>
        <p className='mt-8 sm:mt-8 text-base sm:text-base md:text-lg lg:text-xl  border-l-4 border-[#2BC99C] pl-3 sm:pl-4' style={{color:"white"}}>
          We are not just your accountants; we are your strategic allies. <span className='font-bold'>Asija</span> combines deep-seated expertise with a forward-thinking mindset to deliver more than just numbers...
        </p>
      </div>

      {/* OUR STORY – RESPONSIVE LAYOUT */}
      <div className='w-full h-auto flex flex-col lg:flex-row gap-6 sm:gap-8 p-6 sm:p-8 md:p-12 lg:p-20'>
        <div className='w-full lg:w-[40%] flex flex-col gap-4 sm:gap-10'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold border-l-4 sm:border-l-10 px-3 sm:px-6 border-[#2BC99C] text-white drop-shadow-lg'>
            Our Story
          </h1>
          <blockquote className='text-base sm:text-lg md:text-xl font-semibold text-gray-300'>
            " Coming together is a beginning, keeping together is progress Working together is success "
          </blockquote>
        </div>

        <div className='w-full lg:w-[60%] relative'>
          <div className="overflow-hidden">
            <p
              ref={contentRef}
              className={`text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed transition-all duration-1000 ease-in-out ${
                isExpanded ? 'max-h-none' : 'max-h-40 sm:max-h-56'
              }`}
              style={{
                maskImage: isExpanded
                  ? 'none'
                  : 'linear-gradient(to bottom, black 70%, transparent 100%)',
                WebkitMaskImage: isExpanded
                  ? 'none'
                  : 'linear-gradient(to bottom, black 70%, transparent 100%)',
              }}
              dangerouslySetInnerHTML={{ __html: fullText }}
            />
          </div>

          {/* Premium button */}
          {showButton && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 sm:mt-6 flex items-center gap-2 text-[#2BC99C] font-semibold hover:text-white transition-all duration-300"
            >
              <span className="relative overflow-hidden inline-block">
                <span className={`inline-block transition-transform duration-500 ${isExpanded ? '-translate-y-full' : ''}`}>
                  Read more
                </span>
                <span className={`absolute top-0 left-0 inline-block transition-transform duration-500 ${isExpanded ? '' : 'translate-y-full'}`}>
                  Read less
                </span>
              </span>
              <span className="text-xl sm:text-2xl">
                {isExpanded ? '↑' : '↓'}
              </span>
            </button>
          )}
        </div>
      </div>
      <Timeline data={data} />
      <Values />
      <Footer/>
      
    </div>
  );
}

export default page;