'use client';
import React, { useState, useEffect } from 'react';
import AboutCard from './AboutCard';
import Beams from './Beams';
import { useTranslation } from './TranslationProvider';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { InteractiveHoverButton } from './ui/InteractiveHoverButton';

interface AboutCardData {
  _id: string;
  image: string;
  title: string;
  description: string;
  buttonContent: string;
  link: string;
  order: number;
}

const Values = () => {
  const { t } = useTranslation();
  const [selectedCard, setSelectedCard] = useState<AboutCardData | null>(null);
  const [cardsData, setCardsData] = useState<AboutCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch about cards from API
  useEffect(() => {
    const fetchAboutCards = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/about-cards');
        if (!response.ok) {
          throw new Error('Failed to fetch about cards');
        }
        const data = await response.json();
        setCardsData(data.items || []);
      } catch (err) {
        console.error('Error fetching about cards:', err);
        setError('Failed to load about cards');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutCards();
  }, []);

  // Handle URL hash on mount to open specific card
  useEffect(() => {
    if (typeof window !== 'undefined' && cardsData.length > 0) {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const card = cardsData.find(c => c._id === hash || c.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === hash);
        if (card) {
          setSelectedCard(card);
          // Scroll to values section
          const element = document.getElementById('values');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  }, [cardsData]);

  return (
    <section id="values" className="relative bg-slate-950  w-full overflow-hidden mt-10 sm:mt-20 lg:mt-30 ">
      

      <div className="relative z-30 -mt-12 sm:-mt-16 lg:-mt-20">
        <div className="bg-slate-950  shadow-2xl">
          <div className="px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-12 xl:px-20">
            <div className="max-w-7xl mx-auto">

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight  mb-8 sm:mb-12" 
              >
                {t('about.exploreStrengths')} {/* UPDATED */}
                <span className="text-[#009edb] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"> .</span>
              </h2>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#009edb] border-t-transparent"></div>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-red-400 text-lg">{error}</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2  lg:grid-cols-3 gap-4 mt-0  sm:mt-15 sm:gap-6 mb-10">
                  {cardsData.map((card, index) => (
                    <AboutCard
                      key={card._id}
                      image={card.image}
                      title={card.title}
                      description={card.description}
                      buttonContent={card.buttonContent}
                      isMobile={false}
                      index={index}
                      onButtonClick={() => setSelectedCard(card)}
                    />
                  ))}
                </div>
              )}
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
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50"
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
                className="w-full md:w-1/2 md:h-screen bg-white dark:bg-slate-950 rounded-t-3xl md:rounded-none shadow-2xl max-h-[90vh] md:max-h-full overflow-y-auto flex flex-col"
              >
                {/* Close Button */}
                <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedCard.title}
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
                    {selectedCard.description}
                  </p>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 p-6 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950 flex gap-3 flex-shrink-0">
                  {selectedCard.title === 'Culture' && (
                    <Link href="/gallery" className="flex-1">
                      <InteractiveHoverButton
                        text="View Gallery"
                        className="w-full bg-[#009edb] hover:bg-[#007acc] text-white border-[#009edb]"
                      />
                    </Link>
                  )}
                  <InteractiveHoverButton
                    onClick={() => setSelectedCard(null)}
                    text="Close"
                    className={`${selectedCard.title === 'Culture' ? 'flex-1' : 'flex-1'} bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-white border-none`}
                  />
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