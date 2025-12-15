'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/ui/CTA';
import Link from 'next/link';
import { Globe, TrendingUp, ShieldCheck, Laptop, BarChart3, Users, Briefcase, FileText, HelpCircle, Phone, Home, CreditCard, Calendar } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

type GlobalServiceContentData = {
  heroTitle: string;
  heroDescription: string;
  heroVideoUrl: string;
  introTitle: string;
  introDescription1: string;
  introDescription2: string;
};

type GlobalRegionItem = {
  _id: string;
  name: string;
  image: string;
  href: string;
  order: number;
};

type GlobalOfferingItem = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
};

export default function GlobalServices() {
  const [content, setContent] = useState<GlobalServiceContentData | null>(null);
  const [regions, setRegions] = useState<GlobalRegionItem[]>([]);
  const [offerings, setOfferings] = useState<GlobalOfferingItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contentRes, regionsRes, offeringsRes] = await Promise.all([
          fetch('/api/admin/global-service-content'),
          fetch('/api/admin/global-regions'),
          fetch('/api/admin/global-offerings')
        ]);

        const contentData = await contentRes.json();
        const regionsData = await regionsRes.json();
        const offeringsData = await offeringsRes.json();

        if (contentData && !contentData.error) setContent(contentData);
        if (Array.isArray(regionsData)) setRegions(regionsData);
        if (Array.isArray(offeringsData)) setOfferings(offeringsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || ShieldCheck;
    return <Icon className="w-8 h-8 text-[#009edb]" />;
  };

  if (!content) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/60 to-slate-950 z-10" />
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6" style={{color:"white"}}
          >
            {content.heroTitle}<span className="text-[#009edb]">.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl  max-w-3xl mx-auto leading-relaxed" style={{color:"white"}}
          >
            {content.heroDescription}
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-slate-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {content.introTitle.split(',')[0]}, <br />
              <span className="text-[#009edb]">{content.introTitle.split(',')[1] || ''}</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {content.introDescription1}
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              {content.introDescription2}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {offerings.map((service, index) => (
              <motion.div 
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#009edb]/50 transition-colors"
              >
                <div className="mb-4">{getIcon(service.icon)}</div>
                <h3 className="text-xl font-semibold mb-2" >{service.title}</h3>
                <p className="text-sm" >{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#020617]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{color:"white"}}>Our Global Presence</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Serving clients across key international markets with tailored solutions that respect local regulations and global standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region, index) => (
              <Link href={region.href} key={region._id}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer bg-slate-900"
                >
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                       style={{ backgroundImage: `url(${region.image})` }} />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-bold " style={{color:"white"}}>{region.name}</h3>
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[#009edb] transition-colors">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <p className=" mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0"  style={{color:"white"}}>
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