'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/ui/CTA';
import { CheckCircle2 } from 'lucide-react';

export default function USAPage() {
  return (
    <div className="w-full min-h-screen bg-slate-950 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1499&auto=format&fit=crop" 
          alt="USA Business" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950 to-transparent z-20" />
        
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4" style={{color:"white"}}
          >
            Services in USA<span className="text-[#009edb]">.</span>
          </motion.h1>
          <p className="text-xl  max-w-2xl mx-auto" style={{color:"white"}}>
            Strategic financial leadership and KPO solutions for US businesses.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Driving Growth in the US Market</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            From startups to established corporations, we provide the financial backbone your business needs. Our services cover IRS compliance, strategic CFO advisory, and advanced tech integration to keep you ahead of the curve.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              'IRS Tax Compliance & Filing',
              'US GAAP Financial Reporting',
              'Virtual CFO & Controller Services',
              'QuickBooks/Xero Management',
              'Business Valuation',
              'Mergers & Acquisitions Support'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 className="text-[#009edb] w-6 h-6" />
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
