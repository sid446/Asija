'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { InteractiveHoverButton } from './ui/InteractiveHoverButton';
import { WaveLoader } from './ui/WaveLoader';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchServices } from '@/lib/store/slices/servicesSlice';

interface Service {
  _id: string;
  title: string;
  translationKey: string;
  items: string[];
  insights: boolean;
  description?: string;
  detailedDescription?: string;
  benefits?: string[];
  subItems?: any;
  deepSubItems?: any;
}

type ServiceCardProps = {
  group: Service;
  index: number;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ group, index }) => {
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
          relative overflow-hidden bg-card
          border border-theme backdrop-blur-sm
          shadow-sm transition-all duration-500
          hover:shadow-lg hover:shadow-(--theme-accent)/10
          ${isOpen ? 'ring-2 ring-(--theme-accent)/20' : ''}
        `}
      >
  <div className="h-1 bg-linear-to-r from-(--theme-accent) to-[#0077a3]" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-theme group-hover:accent transition-colors duration-300">
            {group.title}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="text-accent"
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
                <div className="px-5 pb-6 sm:px-6 sm:pb-7 space-y-5  border-t border-theme pt-5">
                {group.items.length > 0 ? (
                  <ul className="space-y-3">
                    {group.items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 text-muted text-sm sm:text-base"
                      >
                          <div className="w-2 h-2 bg-accent rounded-full shrink-0" />
                          <span className="hover:accent transition-colors">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic text-sm">No sub-services listed yet.</p>
                )}



                {group.insights && (
                  <Link href={`/services?service=${encodeURIComponent(group.title)}`}>
                    <InteractiveHoverButton
                      text="View Insights"
                      className="w-auto"
                    />
                  </Link>
                )}

                <div className="mt-6 pt-5 border-t border-theme">
                  <p className="text-muted text-xs italic leading-relaxed">
                    Detailed insights, case studies, and expert guidance coming soon…
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-linear-to-t from-(--theme-accent)/10 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

export default function Services() {
  const dispatch = useAppDispatch();
  const { services, loading, error, fetched } = useAppSelector((state) => state.services);

  useEffect(() => {
    // Only fetch if we haven't fetched yet and not currently loading
    if (!fetched && !loading) {
      dispatch(fetchServices());
    }
  }, [dispatch, fetched, loading]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-theme">
        <WaveLoader />
      </div>
    );
  }

  if (error) {
    console.error('Failed to load services:', error);
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-theme">
        <div className="text-white text-lg">Failed to load services. Please try again later.</div>
      </div>
    );
  }
  
  return (
    <section className="bg-theme w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md970 md:px-8 lg:px-12 xl:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-theme leading-tight">
            Our Services
            <span className="accent text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"> .</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-muted text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto"
        >
          Comprehensive financial and legal solutions tailored to your business needs.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-20">
          {services.map((group, idx) => (
            <ServiceCard key={group._id || idx} group={group} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}