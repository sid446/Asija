'use client';
import React, { useState } from 'react';
import AboutCard from './AboutCard';
import Beams from './Beams';
import { useTranslation } from './TranslationProvider'; // ADD THIS
import { motion, AnimatePresence } from 'framer-motion';

const cardsData = [
  {
    image: '/mission1.jpg',
    title: 'Vision & Mission',
    titleKey: 'about.visionMission',
    description:
      'Achieve significant presence in every region of the country, Provide client defined, quality services on Global Standards, Provide balanced and rounded threefold services in the areas of Audit, Taxation & Consultancy, To place the interest of the clients’ ahead of the Firm. To emerge as Leader in the CA firms through our Dedication and Quality of Service. Our Vision to be a well-Recognised Firm, that excellently fosters the needs of the Clients and which is an aspired choice for the trainees. At Asija and Associates. LLP, we are continuously looking for avenues to assimilate value added knowledge, for our people, for our clients and for the society as a whole. We aim to alloy a perfect blend of professionalism with high standards of service, in our pursuit of excellence.',
    descriptionKey: 'about.visionDesc',
    buttonContentKey: 'about.buttonVision',
  },
  {
    image: '/histoy.jpg',
    title: 'Our Rich History',
    titleKey: 'about.history',
    description:
      'With over 39 years of history, we have been one of the prominent Chartered accountancy firms providing wide array financial and advisory services to our numerous Government, Corporate & Private Sector clients. On 1st April, 1986, CA Uttam Chandra Asija (Founder) laid down a solid foundation for the brand with strong emphasis on client satisfaction and delivering excellence in Accounting, Auditing, Taxation, Assurance and Business Advisory services.',
    descriptionKey: 'about.historyDesc',
    buttonContentKey: 'about.buttonHistory',
  },
  {
    image: '/img1.jpg',
    title: 'Area & Infrastructure',
    titleKey: 'about.areaInfra',
    description:
      "Our Firm is spread over a huge area of 6,050 square feet, one of the Biggest CA offices in Lucknow. Fully air-conditioned environment with power back up facility by generators & invertors. The Head Office is situated in the heart of commercial hub of the city of Lucknow and the total area is divided into dedicated Vertical Offices: Audit & Assurance Vertical Office covering 2,800 square feet area. Direct & Indirect Taxation Vertical Office covering 1,250 square feet area. Corporate Law Vertical Office along with Admin & HR wing of the firm covering 2,000 square feet area. The firm is committed in providing an environment that continuously cultivates personal and professional growth of its people.",
    descriptionKey: 'about.areaDesc',
    buttonContentKey: 'about.buttonArea',
  },
  {
    image: '/img2.jpg',
    title: 'Networking',
    titleKey: 'about.networking',
    description:
      'Our Office has provision of working on multiple computers connected via Wi-Fi and have Multiple laser and Ink Jet Printers. Dedicated high speed 24hr internet connection through Wi-Fi on all terminal. High-tech servers are installed with proper access control for high-speed working without any lags or safety issues. Individual e-mail id has been provided to all the partners and staff via our domain @asija.in.',
    descriptionKey: 'about.networkingDesc',
    buttonContentKey: 'about.buttonNetworking',
  },
  {
    image: '/about1.jpg',
    title: 'Data Security & Safety',
    titleKey: 'about.dataSecurity',
    description:
      'Client Information Confidentiality is of paramount importance for our Firm. The Data security in our firm is multi-staged. The data protection from viruses, spyware and malware is through the professional antivirus kits that have been installed on all the computers. The internal data security is through password protection. Only the authorised person is has access to alter the data in any manner.',
    descriptionKey: 'about.dataSecurityDesc',
    buttonContentKey: 'about.buttonSecurity',
  },
  {
    image: '/about2.jpg',
    title: 'Culture',
    titleKey: 'about.culture',
    description:
      'When a team outgrows individual performance and learns team confidence, excellence becomes a reality. At Asija & Associates LLP, we believe in the power of boundless energy of people and their ability to perform in an increasingly complex business environment. Our team is our most valuable asset. Under the care & guidance of our experienced partners, the team, aims to provide quality professional & consultancy services to our clients. We treat our team as a family. We respect people for who they are and for their knowledge, skills and experience as individuals and team members. We place a sense of responsibility on every member, to conduct business with High level integrity and confidentiality and professionalism.',
    descriptionKey: 'about.cultureDesc',
    buttonContentKey: 'about.buttonCulture',
  },
];

const Values = () => {
  const { t } = useTranslation(); // ADD THIS
  const [selectedCard, setSelectedCard] = useState<typeof cardsData[0] | null>(null);
  
  return (
    <section id="values" className="relative bg-[#2a2a2a] w-full overflow-hidden mt-10 sm:mt-20 lg:mt-30">
      

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
                    onButtonClick={() => setSelectedCard(card)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedCard && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 flex flex-col md:inset-0 md:flex md:items-end md:justify-end"
              onClick={() => setSelectedCard(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="w-full md:w-1/2 md:h-screen bg-white dark:bg-[#2a2a2a] rounded-t-3xl md:rounded-none shadow-2xl max-h-[90vh] md:max-h-full overflow-y-auto flex flex-col"
              >
                {/* Close Button */}
                <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#2a2a2a]">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedCard.titleKey ? t(selectedCard.titleKey) : selectedCard.title}
                  </h2>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Image */}
                <div className="relative w-full h-64 md:h-80 overflow-hidden flex-shrink-0">
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-4 flex-1">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                    {selectedCard.descriptionKey ? t(selectedCard.descriptionKey) : selectedCard.description}
                  </p>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 p-6 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#2a2a2a] flex gap-3 flex-shrink-0">
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="flex-1 px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600  font-medium rounded-lg transition-colors"style={{color:"white"}}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Values;