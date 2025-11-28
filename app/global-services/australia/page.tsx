'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/ui/CTA';
import { CheckCircle2 } from 'lucide-react';

export default function AustraliaPage() {
  return (
    <div className="w-full min-h-screen bg-slate-950 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2130&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Australia Business" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950 to-transparent z-20" />
        
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4" style={{ color: 'white' }}
          >
            Services in Australia<span className="text-[#009edb]">.</span>
          </motion.h1>
          <p className="text-xl  max-w-2xl mx-auto" style={{color:"white"}}>
            Supporting Australian businesses with robust financial and tech solutions.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Excellence Down Under</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            Our services for the Australian market focus on efficiency and compliance. We help businesses manage their ATO obligations, streamline bookkeeping, and leverage technology for better decision-making.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              'ATO Compliance & Taxation',
              'Cloud Accounting (Xero/MYOB)',
              'SMSF Administration',
              'Business Advisory',
              'Outsourced Payroll',
              'Data Analytics & MIS'
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
