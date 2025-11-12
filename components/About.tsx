// About.tsx
import React from 'react';
import AboutCard from './AboutCard';

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

const About = () => {
  return (
    <section className="bg-[#141212] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12 xl:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight text-center sm:text-left">
          Our Legacy of Trust
          <span className="text-[#1DCD9F] text-5xl sm:text-6xl md:text-7xl font-bold"> .</span>
        </h1>

        {/* Quote */}
        <blockquote className="mt-8 sm:mt-10 text-base sm:text-lg md:text-xl text-gray-300 italic font-light leading-relaxed border-l-4 border-[#1DCD9F] pl-4 sm:pl-6 py-2">
          “Coming together is a beginning, keeping together is progress, working together is success.”
        </blockquote>

        {/* Main Content */}
        <div className="mt-10 sm:mt-12 space-y-5 sm:space-y-6 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-light">
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

          <p>
            Our firm has not only augmented in knowledge and skills but has also established a{' '}
            <span className="text-[#1DCD9F]">landmark achievement</span> by becoming the{' '}
            <span className="text-white">
              first Chartered Accountancy firm in Lucknow to convert into a Limited Liability Partnership.
            </span>
          </p>

          <p className="mt-6 sm:mt-8 text-white text-sm sm:text-base">
            We, at Asija, aim to deliver <span className="text-[#1DCD9F]">quality to our stakeholders</span> and strive to be the{' '}
            <span className="">best at everything we do</span>. We believe in working
            together to fulfill the needs of our clients <em>beyond their expectations</em>.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-20">
          {cardsData.map((card, index) => (
            <AboutCard
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
              buttonContent={card.buttonContent}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;