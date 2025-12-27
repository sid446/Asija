'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/ui/CTA';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';
import Link from 'next/link';
import {  TrendingUp, ShieldCheck} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useAppSelector } from '@/lib/store/hooks';

type GlobalServiceContentData = {
  heroTitle: string;
  heroDescription: string;
  heroVideoUrl: string;
  introTitle: string;
  introDescription1: string;
  introDescription2: string;
};

type GlobalOfferingItem = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

type GlobalRegionItem = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  href: string;
  order: number;
  heroImage?: string;
  heroTitle?: string;
  heroDescription?: string;
  contentHeading?: string;
  contentDescription?: string;
  features?: string[];
  createdAt: string;
  updatedAt: string;
};

export default function GlobalServices() {
  const { content, regions, offerings } = useAppSelector((state) => state.globalServices);

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || ShieldCheck;
    return <Icon className="w-8 h-8 text-[#009edb]" />;
  };

  if (!content) return <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center text-gray-900 dark:text-white">Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-white dark:to-slate-950 z-10" />
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={content.heroVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            style={{color: 'white'}}
          >
            {content.heroTitle}<span className="text-[#009edb]">.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl  max-w-3xl mx-auto leading-relaxed"
            style={{color: 'rgba(255, 255, 255, 0.9)'}}
          >
            {content.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              {content.introTitle.split(',')[0]}, <br />
              <span className="text-[#009edb]">{content.introTitle.split(',')[1] || ''}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
              {content.introDescription1}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {content.introDescription2}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {offerings.map((service: GlobalOfferingItem, index: number) => (
              <motion.div 
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#009edb]/50 transition-colors"
              >
                <div className="mb-4">{getIcon(service.icon)}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50 dark:bg-[#020617]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Our Global Footprint</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Serving clients across key international markets with tailored solutions that respect local regulations and global standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region: GlobalRegionItem, index: number) => (
              <Link href={region.href} key={region._id}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer bg-white dark:bg-slate-900 shadow-lg"
                >
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                       style={{ backgroundImage: `url(${region.image})` }} />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-bold" style={{color: 'white'}}>{region.name}</h3>
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[#009edb] transition-colors">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                    </div>
                      <p className=" mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0" style={{color: 'white'}}>
                      Explore our services in {region.name}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />

     

      <Footer />
    </div>
  );
}