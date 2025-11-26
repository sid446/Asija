'use client';

import React from 'react';
import AlumniForm from '@/components/AlumniForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function AlumniPage() {
  return (
    <main className="min-h-screen bg-theme flex flex-col">
      <Navbar />
      
      <div className="grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden mt-12">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl z-10"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-theme mb-4">
              Alumni <span className="text-accent">Network</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Join our alumni community to stay connected, network with peers, and access exclusive opportunities.
            </p>
          </div>

          <AlumniForm />
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
