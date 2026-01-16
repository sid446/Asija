'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { useAppSelector } from '@/lib/store/hooks';

type ContactContent = {
  tagline: string;
  title: string;
  description: string;
  officeLocations: string;
  officeLocation1: string;
  officeLocation2: string;
  contactNo: string;
  phone1: string;
  phone2: string;
  emails: string;
  email1: string;
  email2: string;
  enquiryForm: string;
  imageAlt: string;
  image: string;
};

type Location = {
  _id: string;
  label: string;
  title: string;
  address: string;
  phones: string[];
  email: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  order: number;
};

const Contact = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { contactContent } = useAppSelector((state) => state.contact);
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('/api/admin/locations');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (Array.isArray(data)) {
          // Sort locations by order field
          const sortedLocations = data.sort((a: Location, b: Location) => {
            return (a.order || 0) - (b.order || 0);
          });
          setLocations(sortedLocations);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLocationsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Sort locations by order field
  const sortedLocations = [...locations].sort((a, b) => {
    return (a.order || 0) - (b.order || 0);
  });

  if (!contactContent) return null;

  return (
    <section id="contact" className={`relative py-20 overflow-hidden transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-slate-950'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col gap-12 lg:gap-23">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#009edb] font-medium text-sm md:text-lg tracking-wider mb-2 uppercase">
              {contactContent.tagline}
            </h2>
            <h1 className={`text-3xl md:text-5xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
              {contactContent.title} <span className="text-[#009edb]">.</span>
            </h1>
            <p className={`text-base md:text-lg mb-8 md:mb-10 leading-relaxed ${isLight ? 'text-gray-600' : 'text-white/70'}`}>
              {contactContent.description}
            </p>

            <div className="space-y-4">
              {/* Locations */}
              <div className="flex items-start gap-4 group">
                <div className={`p-3 rounded-full shrink-0 transition-colors ${isLight ? 'text-[#009edb] group-hover:bg-[#009edb] group-hover:text-white' : 'bg-white/5 text-[#009edb] group-hover:bg-[#009edb] group-hover:text-white'}`}>
                  <MapPin size={24} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg mb-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {contactContent.officeLocations}
                  </h3>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${isLight ? 'text-gray-600' : 'text-white/70'}`}>
                    {locations.length > 0 ? (
                      sortedLocations.map((loc) => (
                        <div key={loc._id} className="text-sm">
                          <p className="font-medium text-[#009edb] uppercase mb-1">{loc.title}</p>
                          <p className="leading-tight">{loc.address}</p>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full">
                        <p className="text-sm leading-tight">
                          {contactContent.officeLocation1} <br />
                          {contactContent.officeLocation2}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 mb-12">
              <Link 
                href="/contact"
                scroll={false}
                prefetch={false}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#009edb] text-white font-semibold rounded-lg hover:bg-[#0077a3] transition-all hover:gap-3 shadow-lg shadow-[#009edb]/20"
              >
                {contactContent.enquiryForm} <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>

          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full aspect-video lg:aspect-21/9">
              <img 
                src={contactContent.image} 
                alt={contactContent.imageAlt} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#009edb]/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#009edb]/10 rounded-full blur-3xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
