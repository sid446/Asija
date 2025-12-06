'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/ui/CTA';
import { CheckCircle2 } from 'lucide-react';

export default function UAEPage() {
  return (
    <div className="w-full min-h-screen bg-slate-950 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 z-10" />
        <img 
          src="https://plus.unsplash.com/premium_photo-1661964303354-f0496d6d6e0b?q=80&w=1320&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="UAE Business" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950 to-transparent z-20" />
        
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4" style={{color:"white"}}
          >
            Services in UAE<span className="text-[#009edb]">.</span>
          </motion.h1>
          <p className="text-xl  max-w-2xl mx-auto" style={{color:"white"}}>
            Comprehensive financial and tech solutions tailored for the dynamic UAE market.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Empowering Business in the Middle East</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            Asija Global Services provides specialized support for businesses operating in or expanding to the United Arab Emirates. From VAT compliance to corporate tax structuring, our team ensures your operations are efficient and compliant with local regulations.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              'VAT & Corporate Tax Compliance',
              'Accounting & Bookkeeping',
              'CFO Advisory Services',
              'Business Setup & Licensing',
              'Audit & Assurance',
              'Technology Implementation'
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
