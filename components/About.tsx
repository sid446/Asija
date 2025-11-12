







'use client';
import React from 'react';
import AboutCard from './AboutCard';
import Beams from './Beams';

const cardsData = [
  {
    image: '/mission1.jpg',
    title: 'Vision & Mission',
    description:
      'Achieve significant presence in every region of the country. Provide client-defined, quality services on global standards. Offer balanced threefold services in Audit, Taxation & Consultancy. Place clients’ interests ahead of the firm. Emerge as a leader in CA firms through dedication and quality. Be a well-recognized firm that fosters client needs and is the aspired choice for trainees. We continuously seek value-added knowledge for our people, clients, and society, blending professionalism with excellence.',
    buttonContent: 'Discover Our Purpose',
  },
  {
    image: '/histoy.jpg',
    title: 'Our Rich History',
    description:
      'With over 39 years of excellence, founded on 1st April 1986 by CA Uttam Chandra Asija. A trusted name serving Government, Corporate & Private sectors. Pioneered excellence in Accounting, Auditing, Taxation, Assurance, and Business Advisory with a strong focus on client satisfaction.',
    buttonContent: 'Explore Our Journey',
  },
  {
    image: '/img1.jpg',
    title: 'Area & Infrastructure',
    description:
      'Spanning 6,050 sq.ft. — one of Lucknow’s largest CA offices. Fully air-conditioned with generator & inverter backup. Strategically located in the commercial hub. Divided into dedicated verticals: Audit & Assurance (2,800 sq.ft.), Taxation (1,250 sq.ft.), Corporate Law & Admin (2,000 sq.ft.). Committed to personal and professional growth.',
    buttonContent: 'See Our Space',
  },
  {
    image: '/img2.jpg',
    title: 'Networking',
    description:
      'High-speed Wi-Fi across all terminals. Multiple laser & inkjet printers. 24/7 dedicated internet. High-tech servers with access control. Individual @asija.in email IDs for all partners and staff. Seamless, secure, and efficient digital infrastructure.',
    buttonContent: 'Connect with Us',
  },
  {
    image: '/about1.jpg',
    title: 'Data Security & Safety',
    description:
      'Client confidentiality is paramount. Multi-layered protection: professional antivirus, password security, role-based access. Only authorized personnel can modify data. Robust, reliable, and trusted.',
    buttonContent: 'Learn About Our Security',
  },
  {
    image: '/about2.jpg',
    title: 'Culture',
    description:
      'We are a family. We value integrity, teamwork, and growth. Every member is empowered with responsibility under experienced partners. Excellence is our culture — not a goal. We respect knowledge, skills, and individuality while delivering quality with professionalism.',
    buttonContent: 'Discover Our Culture',
  },
];
interface AboutProps {
  cardsRef: React.RefObject<HTMLDivElement>; // Required, non-nullable
}

const About = ({ cardsRef }: AboutProps) => {
  return (
    <section className="relative bg-[#141212] w-full overflow-hidden">

      {/* === UPPER SECTION: Compact on Mobile === */}
      <div className="relative z-10 px-4 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
        
        {/* Animated Beams */}
        <div className="absolute inset-0 z-0">
          <Beams
            intensity={1.6}
            speed={0.5}
            animationType="rotate3d"
            colors={['#1DCD9F', '#0EA578']}
            distort={10}
            rayCount={10}
            mixBlendMode="lighten"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 z-10" />

        {/* Upper Content */}
        <div className="relative z-20 max-w-7xl mx-auto max-h-screen overflow-y-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
          <div className="pb-12 sm:pb-16 md:pb-20 lg:pb-28">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-center">
              Our Legacy of Trust
              <span className="text-[#1DCD9F] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"> .</span>
            </h1>

            <blockquote className={`
              mt-4 sm:mt-6 md:mt-8 lg:mt-10 text-sm sm:text-base md:text-lg lg:text-xl 
              text-gray-300 italic font-light leading-relaxed text-center
              ${'sm:border-l-4 sm:border-[#1DCD9F] sm:pl-6 sm:text-left'} py-1 sm:py-2
            `}>
              "Coming together is a beginning, keeping together is progress, working together is success."
            </blockquote>

            <div className="mt-6 sm:mt-8 md:mt-10 space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed font-light text-center sm:text-left">
              <p>
                <span className="text-white">Asija & Associates LLP, Chartered Accountants</span> was established on{' '}
                <span className="text-[#1DCD9F] font-medium">1st April 1986</span> by our founder member{' '}
                <span className="text-white">CA. Uttam Chandra Asija</span> with the aim of providing a wide range of
                Accounting and Financial services to clients in the Government, Corporate, and Private Sectors.
              </p>
              <p>
                Over the years, the firm has been built around a team of professionals possessing vast experience in{' '}
                <span className="text-[#1DCD9F]">auditing, accounting, taxation, company law matters</span>, and a host of other
                financial services. We assist clients in solving complex problems and support the growth of society at large.
              </p>

              <div className="hidden sm:block space-y-3 text-left">
                <p>
                  Our firm has not only augmented in knowledge and skills but has also established a{' '}
                  <span className="text-[#1DCD9F]">landmark achievement</span> by becoming the{' '}
                  <span className="text-white">
                    first Chartered Accountancy firm in Lucknow to convert into a Limited Liability Partnership.
                  </span>
                </p>
                <p className="mt-3 text-white text-sm sm:text-base">
                  We, at Asija, aim to deliver <span className="text-[#1DCD9F]">quality to our stakeholders</span> and strive to be the{' '}
                  <span className="">best at everything we do</span>. We believe in working
                  together to fulfill the needs of our clients <em>beyond their expectations</em>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === LOWER SECTION: Full-Width Card Panel with Heading === */}
      <div className="relative z-30 -mt-12 sm:-mt-16 lg:-mt-20">
        <div className="bg-[#222222]  shadow-2xl">
          <div className="px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-12 xl:px-20">
            <div className="max-w-7xl mx-auto">

              {/* NEW HEADING */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight  mb-8 sm:mb-12">
                Explore Our Strengths
                <span className="text-[#1DCD9F] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"> .</span>
              </h2>

              {/* Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2  lg:grid-cols-3 gap-4 mt-0  sm:mt-15 sm:gap-6 mb-10">
                {cardsData.map((card, index) => (
                  <AboutCard
                    key={index}
                    image={card.image}
                    title={card.title}
                    description={card.description}
                    buttonContent={card.buttonContent}
                    isMobile
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;



