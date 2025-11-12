// app/services/page.tsx   (or wherever you keep pages)
'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ------------------------------------------------------------------
//  Service data – pulled from the menu you gave in Navbar
// ------------------------------------------------------------------
const serviceGroups = [
  {
    title: 'Audit and Assurance',
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
    items: ['Income Tax Services', 'Benami Transaction'],
    insights: true,
  },
  {
    title: 'Corporate Law Services',
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
    items: ['Goods and Service Tax', 'Custom', 'Professional Tax'],
    insights: true,
  },
  {
    title: 'Risk Advisory Services',
    items: [],
    insights: true,
  },
];

// ------------------------------------------------------------------
//  Collapsible Service Card
// ------------------------------------------------------------------
type ServiceCardProps = {
  group: typeof serviceGroups[number];
  index: number;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ group, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group bg-[#222222] border-t-4 border-[#1DCD9F] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Header – always visible */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-200 group-hover:text-[#1DCD9F] transition-colors">
          {group.title}
        </h3>
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-5 h-5 text-[#1DCD9F]" />
        </motion.div>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-3">
              {/* List of items */}
              {group.items.length > 0 ? (
                <ul className="space-y-1.5">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
                      <span className="w-1.5 h-1.5 bg-[#1DCD9F] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic text-sm">No sub-items listed yet.</p>
              )}

              {/* Insights link (optional) */}
              {group.insights && (
                <button className="mt-3 inline-flex items-center gap-1.5 text-[#1DCD9F] text-sm font-medium hover:underline">
                  View Insights
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {/* ---------- DETAIL AREA (empty for now) ---------- */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <p className="text-gray-600 text-xs italic">
                  Detailed description will be added later…
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ------------------------------------------------------------------
//  Main Services Section
// ------------------------------------------------------------------
export default function Services() {
  return (
    <section className="bg-black w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Heading – centered on mobile */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-center">
          Our Services
          <span className="text-[#1DCD9F] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            .
          </span>
        </h1>

        {/* Intro paragraph – centered on mobile */}
        <p className="mt-6 text-gray-300 text-sm sm:text-base leading-relaxed text-center sm:text-left max-w-3xl mx-auto sm:mx-0">
          Comprehensive audit, tax, and advisory solutions tailored to your business.
          Explore each service below to see how we can drive value for you.
        </p>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
          {serviceGroups.map((group, idx) => (
            <ServiceCard key={group.title} group={group} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}