'use client';
import React, { useState, useEffect } from 'react';
import { useTranslation } from './TranslationProvider';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

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

const Contact = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [content, setContent] = useState<ContactContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/admin/contact-content');
        const data = await res.json();
        if (data && !data.error) {
          setContent(data);
        }
      } catch (err) {
        console.error('Failed to fetch contact content:', err);
      }
    };
    fetchContent();
  }, []);

  if (!content) return null;

  return (
    <section id="contact" className={`relative py-20 overflow-hidden transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-slate-950'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col gap-12 lg:gap-20">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#009edb] font-medium text-sm md:text-lg tracking-wider mb-2 uppercase">
              {content.tagline}
            </h2>
            <h1 className={`text-3xl md:text-5xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
              {content.title} <span className="text-[#009edb]">.</span>
            </h1>
            <p className={`text-base md:text-lg mb-8 md:mb-10 leading-relaxed ${isLight ? 'text-gray-600' : 'text-white/70'}`}>
              {content.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Location */}
              <div className="flex  items-start gap-4 group">
                <div className={`p-3 rounded-full shrink-0 transition-colors ${isLight ? 'bg-blue-50 text-[#009edb] group-hover:bg-[#009edb] group-hover:text-white' : 'bg-white/5 text-[#009edb] group-hover:bg-[#009edb] group-hover:text-white'}`}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className={`font-semibold text-lg mb-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {content.officeLocations}
                  </h3>
                  <p className={`${isLight ? 'text-gray-600' : 'text-white/70'}`}>
                    {content.officeLocation1} <br />
                    {content.officeLocation2}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className={`p-3 rounded-full shrink-0 transition-colors ${isLight ? 'bg-blue-50 text-[#009edb] group-hover:bg-[#009edb] group-hover:text-white' : 'bg-white/5 text-[#009edb] group-hover:bg-[#009edb] group-hover:text-white'}`}>
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className={`font-semibold text-lg mb-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {content.contactNo}
                  </h3>
                  <div className={`${isLight ? 'text-gray-600' : 'text-white/70'}`}>
                    <p>{content.phone1}</p>
                    <p>{content.phone2}</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className={`p-3 rounded-full shrink-0 transition-colors ${isLight ? 'bg-blue-50 text-[#009edb] group-hover:bg-[#009edb] group-hover:text-white' : 'bg-white/5 text-[#009edb] group-hover:bg-[#009edb] group-hover:text-white'}`}>
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className={`font-semibold text-lg mb-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {content.emails}
                  </h3>
                  <div className={`${isLight ? 'text-gray-600' : 'text-white/70'}`}>
                    <a href={`mailto:${content.email1}`} className="block hover:text-[#009edb] transition-colors">{content.email1}</a>
                    <a href={`mailto:${content.email2}`} className="block hover:text-[#009edb] transition-colors">{content.email2}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 mb-12">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#009edb] text-white font-semibold rounded-lg hover:bg-[#0077a3] transition-all hover:gap-3 shadow-lg shadow-[#009edb]/20"
              >
                {content.enquiryForm} <ArrowRight size={20} />
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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full aspect-video lg:aspect-[21/9]">
              <img 
                src={content.image} 
                alt={content.imageAlt} 
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
