'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTA from '@/components/ui/CTA';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useParams, notFound } from 'next/navigation';

type GlobalRegionData = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  heroImage: string;
  heroTitle: string;
  heroDescription: string;
  contentHeading: string;
  contentDescription: string;
  features: string[];
};

export default function RegionPage() {
  const params = useParams();
  const [region, setRegion] = useState<GlobalRegionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const res = await fetch(`/api/regions/${params.slug}`);
        if (!res.ok) {
          if (res.status === 404) return; // Handle not found
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        setRegion(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchRegion();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#009edb]" />
      </div>
    );
  }

  if (!region) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Region Not Found</h1>
          <p className="text-gray-400">The region you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 z-10" />
        <img 
          src={region.heroImage || region.image} 
          alt={`${region.name} Business`} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950 to-transparent z-20" />
        
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4" style={{ color: 'white' }}
          >
            {region.heroTitle || `Services in ${region.name}`}<span className="text-[#009edb]">.</span>
          </motion.h1>
          <p className="text-xl max-w-2xl mx-auto" style={{color:"white"}}>
            {region.heroDescription}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">{region.contentHeading}</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            {region.contentDescription}
          </p>

          {region.features && region.features.length > 0 && (
            <div className="grid md:grid-cols-2 gap-8">
              {region.features.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="text-[#009edb] w-6 h-6" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
