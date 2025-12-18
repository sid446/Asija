'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Timeline } from '@/components/Timeline';
import Values from '@/components/Values';
import Footer from '@/components/Footer';
import Loader from '@/components/ui/Loader';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';

 const defaultData = [
  {
    title: "1986 – Establishment of the Firm",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">
          Foundation by <span className="text-[#009edb] font-bold">CA Uttam Chand Asija</span>
        </p>
        <p className="text-sm text-gray-400 leading-relaxed">
          The firm was founded on 01 April 1986 by CA Uttam Chand Asija. During the initial years, the practice focused on building a strong foundation rooted in accuracy, responsibility, and adherence to professional standards. These formative experiences shaped the work culture that continues to guide the firm.
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
    title: "2004 – Organizational Restructuring into a Partnership",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Expanding Leadership</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          In 2004, the practice evolved into a partnership. This transition allowed the inclusion of more professionals in leadership roles, encouraging collaborative working, shared responsibilities, and diversified expertise across various service areas.
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
    title: "2010 – Introduction of the Vertical-Based Operating Model",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Specialization & Quality</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          In 2010, the firm introduced a Vertical System to enhance specialization and service quality. Under this model, each vertical is led by a specialized Chartered Accountant, responsible for domain expertise, execution oversight, and quality control. This structure improved efficiency, accountability, and depth of professional delivery across all assignments.
        </p>
        <div className="grid grid-cols-2 gap-4">
           <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=600&fit=crop"
            alt="Strategic Planning"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1553877615-30c730db910a?w=600&h=600&fit=crop"
            alt="Team Collaboration"
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
          In 2016, the firm adopted the Limited Liability Partnership structure. This provided a more organized governance model, strengthened internal processes, and supported systematic handling of assignments as the scale of operations gradually increased.
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
    title: "2017 – Expansion into Southern India",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Bengaluru Branch</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          In 2017, the firm opened a branch in Bengaluru. This step allowed the firm to extend its presence to southern India and to cater to professional requirements arising in that region in a more accessible and coordinated manner.
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
    title: "2018 – Presence in the National Capital Region",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">New Delhi Branch</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          In 2018, a branch was established in New Delhi. Operating from the capital region enabled the firm to work more closely with organizations situated in an important administrative and business Centre.
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
    title: "2021 – Expansion into Western and North-Eastern India",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Mumbai & Guwahati</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          In 2021, the firm expanded its footprint further by establishing branches in:<br/>
          • Mumbai – strengthening its presence in Western India<br/>
          • Guwahati – enhancing operational reach in the North-Eastern region<br/>
          These expansions supported multi-regional operations and improved coordination across assignments.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=600&fit=crop"
            alt="Mumbai Skyline"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=600&fit=crop"
            alt="Guwahati Landscape"
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
        <p className="mb-8 text-xl font-medium text-gray-300">Leadership Growth</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          In 2022, the number of partners increased to ten. With a larger leadership group, the firm strengthened its ability to coordinate responsibilities, supervise diverse engagements, and maintain structured oversight across its branches.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=600&fit=crop"
            alt="Leadership Team"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=600&fit=crop"
            alt="Partners Meeting"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2024 – Strengthening Presence in the North-East",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Mizoram Branch</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          In 2024, the firm expanded further within the North-East region by establishing an additional branch in Mizoram. This step helped improve accessibility and operational convenience for assignments in that area.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1589216532372-1c2a367900d9?w=600&h=600&fit=crop"
            alt="Mizoram Landscape"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=600&fit=crop"
            alt="Office Expansion"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Our People – The Heart of Our Firm",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Diversity & Expertise</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          Today, the firm comprises a team of more than 100 professionals, including Qualified Chartered Accountants, Cost and Management Accountants, Company Secretaries, semi-qualified staff, trainees, and executives. The team brings together a well-balanced combination of experience, technical knowledge, and professional competence across different service areas.<br/><br/>
          As an organisation, the firm follows an equal-opportunity approach and encourages diversity and inclusivity within its workforce. The collective efforts of the team support the firm’s ability to handle assignments in a structured and coordinated manner.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop"
            alt="Diverse Team"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=600&fit=crop"
            alt="Teamwork"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Looking Ahead – Our Vision for the Future",
    content: (
      <div className="space-y-6">
        <p className="mb-8 text-xl font-medium text-gray-300">Future Vision</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          As Asija & Associates LLP continues to develop, the firm remains focused on strengthening its internal processes, adopting relevant technological tools, and maintaining consistency in professional execution. The guiding principles continue to be integrity, diligence, and adherence to applicable standards while handling all professional engagements.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=600&fit=crop"
            alt="Future Technology"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=600&fit=crop"
            alt="Strategic Vision"
            className="h-44 w-full rounded-lg object-cover shadow-lg border border-gray-800"
          />
        </div>
      </div>
    ),
  },
];
export default function AboutPage() {
  const [timelineData, setTimelineData] = useState<any[]>(defaultData);
  const [aboutContent, setAboutContent] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  const defaultFullText = `The journey of Asija & Associates LLP spans several decades of steady development. From its start as an individual practice to a multi-location professional firm, the growth has been steady structured, and grounded on the principles of discipline, ethics, and consistent professional learning and upgradation`;

  const fullText = aboutContent 
    ? [aboutContent.description1, aboutContent.description2, aboutContent.description3, aboutContent.description4]
        .filter(Boolean)
        .join('<br/><br/>')
    : defaultFullText;

  useEffect(() => {
    if (contentRef.current) {
      const isTruncated = contentRef.current.scrollHeight > contentRef.current.clientHeight;
      setShowButton(isTruncated);
    }
  }, [fullText]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/admin/about-content', { cache: 'no-store' });
        const data = await res.json();
        if (data && !data.error) {
          setAboutContent(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchContent();

    const fetchTimeline = async () => {
      try {
        const res = await fetch('/api/admin/about-timeline');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const formattedData = data.map((item: any) => ({
            title: item.year,
            content: (
              <div className="space-y-6">
                <p className="mb-8 text-xl font-medium text-gray-300">
                  {item.heading}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {item.images && item.images.map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Timeline image ${idx + 1}`}
                      className="h-40 w-full rounded-lg object-cover shadow-lg border border-gray-800"
                    />
                  ))}
                </div>
              </div>
            ),
          }));
          setTimelineData(formattedData);
        }
      } catch (error) {
        console.error('Failed to fetch timeline', error);
      }
    };
    fetchTimeline();
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
            {aboutContent?.title || 'Our Story'}
          </h1>
          <blockquote className='text-base sm:text-lg md:text-xl font-semibold text-gray-300'>
            {aboutContent?.quote ? `"${aboutContent.quote}"` : '" Coming together is a beginning, keeping together is progress Working together is success "'}
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
      <Timeline data={timelineData} />



      {/* Looking Ahead Section */}
      <div className="w-full  bg-[#b5d6e3] z-20 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            {aboutContent?.futureTitle || 'Looking Ahead'}
          </h2>
          <span className="text-3xl md:text-4xl font-bold text-[#009edb]">{aboutContent?.futureSubtitle || 'Our Vision for the Future'}</span>
          <p className="text-lg text-gray-600 leading-relaxed mt-8 mb-8">
            {aboutContent?.futureDescription1 || 'As Asija & Associates LLP continues to expand its footprint across India and beyond, we remain deeply committed to our founding values of integrity, excellence, and professional independence. With a growing global presence, a strengthened leadership team, and a dynamic workforce, we are poised to embrace new opportunities in audit, advisory, compliance, systems, and development-sector consulting.'}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            {aboutContent?.futureDescription2 || 'Our journey ahead is guided by innovation, technology-driven solutions, and a steadfast focus on delivering measurable value to clients. We look forward with pride, purpose, and confidence as we continue to build a firm that stands for trust, quality, and global capability.'}
          </p>
        </div>
      </div>

      <Values />
      <Footer/>
      
    </div>
  );
}

