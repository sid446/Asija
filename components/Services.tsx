'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from './TranslationProvider'; // ADD THIS

// Service data stays the same
const serviceGroups = [
  {
    title: 'Audit and Assurance',
    translationKey: 'services.auditAssurance', // ADD THIS
    items: [
      'Statutory Audit',
      'Internal Audit',
      'Procurement Audit',
      'Special Audit',
      'Fund Audit',
      'Externally Funded Project Audit',
      'Management Audit',
    ],
    insights: true,
  },
  {
    title: 'Direct Tax',
    translationKey: 'services.directTax', // ADD THIS
    items: ['Income Tax Services', 'Benami Transaction'],
    insights: true,
  },
  {
    title: 'Corporate Law Services',
    translationKey: 'services.corporateLaw', // ADD THIS
    items: [
      'Companies Act 2013',
      'Limited Liability Partnership Act 2008',
      'Partnership Act 1932',
      'NGO Registration & Consultancy',
      'Foreign Contribution Regulation Act 2010',
      'Assurance Services',
    ],
    insights: true,
  },
  {
    title: 'Consultancy',
    translationKey: 'services.consultancy', // ADD THIS
    items: [
      'Process Re-Engineering',
      'Business Advisory',
      'Start-up Consultancy',
      'MIS System Designing',
    ],
    insights: true,
  },
  {
    title: 'Indirect Tax',
    translationKey: 'services.indirectTax', // ADD THIS
    items: ['Goods and Service Tax', 'Custom', 'Professional Tax'],
    insights: true,
  },
  {
    title: 'Risk Advisory Services',
    translationKey: 'services.riskAdvisory', // ADD THIS
    items: [],
    insights: true,
  },
];

type ServiceCardProps = {
  group: typeof serviceGroups[number];
  index: number;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ group, index }) => {
  const { t } = useTranslation(); // ADD THIS
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="group"
    >
      <div
        className={`
          relative overflow-hidden  bg-gradient-to-b from-[#1a1a1a] to-[#141212]
          border border-white/10 backdrop-blur-xl
          shadow-xl transition-all duration-500
          hover:shadow-2xl hover:shadow-[#1DCD9F]/20
          hover:border-[#1DCD9F]/30
          ${isOpen ? 'ring-2 ring-[#1DCD9F]/50' : ''}
        `}
      >
        <div className="h-1 bg-gradient-to-r from-[#1DCD9F] to-[#0EA578]" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-[#1DCD9F] transition-colors duration-300">
            {t(group.translationKey)} {/* UPDATED */}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="text-[#1DCD9F]"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-6 sm:px-6 sm:pb-7 space-y-5  border-t border-white/5 pt-5">
                {group.items.length > 0 ? (
                  <ul className="space-y-3">
                    {group.items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 text-gray-300 text-sm sm:text-base"
                      >
                        <div className="w-2 h-2 bg-[#1DCD9F] rounded-full flex-shrink-0" />
                        <span className="hover:text-white transition-colors">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic text-sm">No sub-services listed yet.</p>
                )}

                {group.insights && (
                  <motion.button
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 text-[#1DCD9F] text-sm font-semibold hover:underline"
                  >
                    {t('services.viewInsights')} {/* UPDATED */}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                )}

                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-gray-600 text-xs italic leading-relaxed">
                    Detailed insights, case studies, and expert guidance coming soon…
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1DCD9F]/10 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

export default function Services() {
  const { t } = useTranslation(); // ADD THIS
  
  return (
    <section className="bg-black w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md970 md:px-8 lg:px-12 xl:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {t('services.title')} {/* UPDATED */}
            <span className="text-[#1DCD9F] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"> .</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-gray-300 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto"
        >
          {t('services.description')} {/* UPDATED */}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-20">
          {serviceGroups.map((group, idx) => (
            <ServiceCard key={group.title} group={group} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}