'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Timeline } from '@/components/Timeline';
import Values from '@/components/Values';
import Footer from '@/components/Footer';
import Loader from '@/components/ui/Loader';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';

 const data = [
  {
    title: "1986 – The Beginning of a Legacy",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">
          Foundation by <span className="text-[#009edb] font-bold">CA Uttam Chand Asija</span>
        </p>
        <p className="text-sm text-gray-400 leading-relaxed">
          The foundation of our firm was laid on 01 April 1986 by our visionary Founding Partner, CA Uttam Chand Asija. With a strong belief in ethical practice and professional discipline, he began the journey as a sole practitioner. His unwavering dedication, deep technical knowledge, and client-centric approach shaped the culture and values that continue to guide our firm even today.
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
      </div>
    ),
  },
  {
    title: "2004 – Transition into a Partnership Structure",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Expanding Leadership</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          After nearly two decades of consistent growth and expanding clientele, the firm transitioned into a partnership structure in 2004 with four partners. This shift strengthened leadership capabilities, diversified expertise, and prepared the firm for future expansion.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://plus.unsplash.com/premium_photo-1664392124762-db2317f99f84?q=80&w=748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Team meeting"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
            alt="Client handshake"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2014 – Recognition by C&AG",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Major Auditor Panel</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          A prestigious milestone was achieved in 2014, when Asija & Associates LLP was placed on the Major Auditor Panel created by the Office of the Comptroller & Auditor General (C&AG) of India. This recognition reaffirmed our professional credentials and enabled us to undertake large-scale statutory audits of government bodies and public sector enterprises.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=600&fit=crop"
            alt="Government Audit"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=600&fit=crop"
            alt="Financial Documents"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2016 – Evolution into a Limited Liability Partnership (LLP)",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Modern Governance</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          In 2016, the firm adopted a modern governance structure by converting into a Limited Liability Partnership (LLP). This strengthened risk management, improved operational flexibility, and enabled the firm to manage larger, more complex assignments.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop"
            alt="Corporate Structure"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=600&fit=crop"
            alt="Legal Documents"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2017 – First Expansion Outside Uttar Pradesh",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Bengaluru Branch</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          A historic milestone was achieved in 2017 when we opened our first branch outside Uttar Pradesh in Bengaluru. This expansion marked our entry into South India—one of the country’s most dynamic business ecosystems. Establishing the Bengaluru branch demonstrated our readiness to serve a wider client base and paved the way for national-level operations.
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
      </div>
    ),
  },
  {
    title: "2018 – Expansion to the National Capital Region",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">New Delhi Branch</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          In 2018, the firm strengthened its presence in North India by opening a new branch in New Delhi. This expansion enhanced our accessibility to major corporate hubs, government institutions, and regulatory bodies, enabling us to cater to a broader range of industries with greater efficiency.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=600&fit=crop"
            alt="New Delhi"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=600&fit=crop"
            alt="Corporate Office"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2021 – Multi-State Growth Across India",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Pan-India Presence</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          The year 2021 was a landmark period of accelerated expansion. Our firm entered three additional states, establishing branches in:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-400 leading-relaxed ml-4">
            <li><span className="text-gray-300 font-semibold">Mumbai (Maharashtra)</span> – Expanding into India’s financial capital.</li>
            <li><span className="text-gray-300 font-semibold">Dehradun (Uttarakhand)</span> – Strengthened our footprint in northern India.</li>
            <li><span className="text-gray-300 font-semibold">Guwahati (Assam)</span> – Marked our significant entry into the North-East region.</li>
        </ul>
        <p className="text-sm text-gray-400 leading-relaxed">
            This multi-state presence elevated the firm into a truly pan-India professional services network.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=600&fit=crop"
            alt="India Map Concept"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop"
            alt="Network"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2022 – A Stronger Leadership: 10 Partners",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Expanded Leadership</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          In 2022, the firm expanded its leadership team to 10 partners, each specializing in diverse service areas such as audit, taxation, advisory, compliance, finance, and system reviews. This strengthened governance framework empowered the firm to undertake large-scale, complex assignments with enhanced quality, oversight, and strategic depth.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=600&fit=crop"
            alt="Boardroom"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=600&fit=crop"
            alt="Leadership Team"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2024 – Global Recognition & Expansion",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">UN Empanelment & North-East Growth</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          In 2024, we expanded further in the North-East region with an additional branch, reinforcing our commitment to serving emerging markets.
        </p>
        <p className="text-sm text-gray-400 leading-relaxed">
          A landmark international achievement was unlocked in 2024, when Asija & Associates LLP was formally empanelled by the United Nations for assignments across South Asia. This global accreditation positioned the firm on an international platform and opened avenues for development-sector engagements worldwide.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=600&fit=crop"
            alt="Global Business"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          
        </div>
      </div>
    ),
  },
  {
    title: "2025 – First International Assignment Executed",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Global Professional Services</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          In 2025, we proudly completed our first international assignment in collaboration with UN agencies, marking our entry into the global professional services space. This milestone reflects the firm’s capability, credibility, and readiness to deliver at global standards.
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
      <Loader pageName="About Us" />
      <Navbar />

      {/* Background Image + Gradient Overlay */}
      <div className='absolute inset-x-0 top-0 h-[100vh] bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none'></div>
      
      <Image
        src="/Culture.jpg"
        alt="About Us"
        width={1920}
        height={1080}
        className="w-full h-[100vh] object-cover"
        priority
      />

      {/* Hero Overlay Content – unchanged */}
      <div className="absolute text-left  top-[70%] sm:top-[75%] left-1/2 sm:left-[35%] transform -translate-x-1/2 -translate-y-1/2 px-4 w-full sm:w-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold  drop-shadow-lg" style={{color:"white"}}>
          Who We Are <span className='text-[#009edb] text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>.</span>
        </h1>
        <p className="mt-6 sm:mt-4 text-lg sm:text-lg md:text-xl lg:text-2xl drop-shadow-md"style={{color:"white"}}>
          Unwavering dedication to financial excellence and professional integrity.
        </p>
        <p className='mt-8 sm:mt-8 text-base sm:text-base md:text-lg lg:text-xl  border-l-4 border-[#009edb] pl-3 sm:pl-4' style={{color:"white"}}>
          We are not just your accountants; we are your strategic allies. <span className='font-bold'>Asija</span> combines deep-seated expertise with a forward-thinking mindset to deliver more than just numbers...
        </p>
      </div>

      {/* OUR STORY – RESPONSIVE LAYOUT */}
      <div className='w-full h-auto flex flex-col lg:flex-row gap-6 sm:gap-8 p-6 sm:p-8 md:p-12 lg:p-20'>
        <div className='w-full lg:w-[40%] flex flex-col gap-4 sm:gap-10'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold border-l-4 sm:border-l-10 px-3 sm:px-6 border-[#009edb] text-white drop-shadow-lg'>
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
            <div className="mt-4 sm:mt-6">
              <InteractiveHoverButton
                onClick={() => setIsExpanded(!isExpanded)}
                text={isExpanded ? 'Read less' : 'Read more'}
              />
            </div>
          )}
        </div>
      </div>
      <Timeline data={data} />

      {/* Our People Section */}
      <div className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our People – <span className="text-[#009edb]">The Heart of Our Firm</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Today, our firm proudly comprises more than 100 professionals, including qualified chartered accountants, semi-qualified managers, and skilled executives. This diverse and talented team represents a balanced mix of experience, technical capability, and youthful energy.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              This inclusive workforce drives innovation, collaboration, and excellence across all our assignments.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Team Composition</h3>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">Female Professionals</span>
                  <span className="font-bold text-[#009edb]">42%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#009edb]" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">Male Professionals</span>
                  <span className="font-bold text-[#009edb]">58%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#009edb]" style={{ width: '58%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Looking Ahead Section */}
      <div className="w-full bg-[#009edb]/5 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Looking Ahead  
          </h2>
          <span className="text-3xl md:text-4xl font-bold text-[#009edb]">Our Vision for the Future</span>
          <p className="text-lg text-gray-600 leading-relaxed mt-8 mb-8">
            As Asija & Associates LLP continues to expand its footprint across India and beyond, we remain deeply committed to our founding values of integrity, excellence, and professional independence. With a growing global presence, a strengthened leadership team, and a dynamic workforce, we are poised to embrace new opportunities in audit, advisory, compliance, systems, and development-sector consulting.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            Our journey ahead is guided by innovation, technology-driven solutions, and a steadfast focus on delivering measurable value to clients. We look forward with pride, purpose, and confidence as we continue to build a firm that stands for trust, quality, and global capability.
          </p>
        </div>
      </div>

      <Values />
      <Footer/>
      
    </div>
  );
}

export default page;