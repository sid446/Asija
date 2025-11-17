'use client';
import React from 'react';
import AboutCard from './AboutCard';
import Beams from './Beams';
import { useTranslation } from './TranslationProvider'; // ADD THIS

const cardsData = [
  {
    image: '/mission1.jpg',
    title: 'Vision & Mission',
    titleKey: 'about.visionMission',
    description:
      'Achieve significant presence in every region of the country. Provide client-defined, quality services on global standards...',
    descriptionKey: 'about.visionDesc',
    buttonContentKey: 'about.buttonVision',
  },
  {
    image: '/histoy.jpg',
    title: 'Our Rich History',
    titleKey: 'about.history',
    description:
      'With over 39 years of excellence, founded on 1st April 1986 by CA Uttam Chandra Asija...',
    descriptionKey: 'about.historyDesc',
    buttonContentKey: 'about.buttonHistory',
  },
  {
    image: '/img1.jpg',
    title: 'Area & Infrastructure',
    titleKey: 'about.areaInfra',
    description:
      'Spanning 6,050 sq.ft. — one of Lucknow largest CA offices...',
    descriptionKey: 'about.areaDesc',
    buttonContentKey: 'about.buttonArea',
  },
  {
    image: '/img2.jpg',
    title: 'Networking',
    titleKey: 'about.networking',
    description:
      'High-speed Wi-Fi across all terminals. Multiple laser & inkjet printers...',
    descriptionKey: 'about.networkingDesc',
    buttonContentKey: 'about.buttonNetworking',
  },
  {
    image: '/about1.jpg',
    title: 'Data Security & Safety',
    titleKey: 'about.dataSecurity',
    description:
      'Client confidentiality is paramount. Multi-layered protection...',
    descriptionKey: 'about.dataSecurityDesc',
    buttonContentKey: 'about.buttonSecurity',
  },
  {
    image: '/about2.jpg',
    title: 'Culture',
    titleKey: 'about.culture',
    description:
      'We are a family. We value integrity, teamwork, and growth...',
    descriptionKey: 'about.cultureDesc',
    buttonContentKey: 'about.buttonCulture',
  },
];

const About = () => {
  const { t } = useTranslation(); // ADD THIS
  
  return (
    <section className="relative bg-[#2a2a2a] w-full overflow-hidden">
      <div className="relative z-10 px-4 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
        
        <div className="absolute inset-0 z-0">
          <Beams
            intensity={1.3}
            speed={0.5}
            animationType="rotate3d"
            colors={['#1DCD9F', '#0EA578']}
            distort={10}
            rayCount={10}
            mixBlendMode="lighten"
          />
        </div>

        <div className="absolute inset-0 bg-black/20 z-10" />

        <div className="relative z-20 max-w-7xl mx-auto max-h-screen overflow-y-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
          <div className="pb-12 sm:pb-16 md:pb-20 lg:pb-28">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-center" style={{ color: '#ffffff' }}>
              {t('about.title')} {/* UPDATED */}
              <span className="text-[#1DCD9F] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"> .</span>
            </h1>

            <blockquote className={`
              mt-4 sm:mt-6 md:mt-8 lg:mt-10 text-sm sm:text-base md:text-lg lg:text-xl 
              italic font-light leading-relaxed text-center
              ${'sm:border-l-4 sm:border-[#1DCD9F] sm:pl-6 sm:text-left'} py-1 sm:py-2
            `}
              style={{ color: '#ffffff' }}
            >
              {t('about.quote')} {/* UPDATED */}
            </blockquote>

            <div className="mt-6 sm:mt-8 md:mt-10 space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed font-light text-center sm:text-left">
              <p style={{ color: '#ffffff' }}>{t('about.description1')}</p> {/* UPDATED */}
              <p style={{ color: '#ffffff' }}>{t('about.description2')}</p> {/* UPDATED */}

              <div className="hidden sm:block space-y-3 text-left">
                <p style={{ color: '#ffffff' }}>{t('about.description3')}</p> {/* UPDATED */}
                <p className="mt-3 text-sm sm:text-base" style={{ color: '#ffffff' }}>
                  {t('about.description4')} {/* UPDATED */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-30 -mt-12 sm:-mt-16 lg:-mt-20">
        <div className="bg-[#2a2a2a]  shadow-2xl">
          <div className="px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-12 xl:px-20">
            <div className="max-w-7xl mx-auto">

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight  mb-8 sm:mb-12" 
              >
                {t('about.exploreStrengths')} {/* UPDATED */}
                <span className="text-[#1DCD9F] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"> .</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-2  lg:grid-cols-3 gap-4 mt-0  sm:mt-15 sm:gap-6 mb-10">
                {cardsData.map((card, index) => (
                  <AboutCard
                    key={index}
                    image={card.image}
                    title={card.titleKey ? t(card.titleKey) : card.title} 
                    description={card.descriptionKey ? t(card.descriptionKey) : card.description}
                    buttonContent={card.buttonContentKey ? t(card.buttonContentKey) : t('common.learnMore')}
                    isMobile={false}
                    index={index}
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