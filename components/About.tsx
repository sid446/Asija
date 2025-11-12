












// components/About.tsx
'use client';
import React, { forwardRef } from 'react';
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
  cardsRef?: React.RefObject<HTMLDivElement>;
}

const About = forwardRef<HTMLDivElement, AboutProps>(({ cardsRef }, ref) => {
  return (
    <section ref={ref} className="relative bg-[#141212] w-full overflow-hidden">
      {/* ... your existing upper section ... */}

      {/* LOWER SECTION */}
      <div className="relative z-30 -mt-12 sm:-mt-16 lg:-mt-20">
        <div className="bg-[#222222] rounded-t-3xl shadow-2xl">
          <div className="px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-12 xl:px-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight text-center mb-8 sm:mb-12">
                Explore Our Strengths
                <span className="text-[#1DCD9F] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"> .</span>
              </h2>

              <div ref={cardsRef} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {cardsData.map((card, index) => (
                  <div key={index} className="about-card">
                    <AboutCard
                      image={card.image}
                      title={card.title}
                      description={card.description}
                      buttonContent={card.buttonContent}
                      isMobile
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';
export default About;