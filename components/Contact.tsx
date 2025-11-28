'use client';
import React from 'react';
import { useTranslation } from './TranslationProvider';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section id="contact" className={`relative py-20 overflow-hidden transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-slate-950'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className=" gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            
          >
            <h2 className="text-[#009edb] font-medium text-lg tracking-wider mb-2 uppercase">
              {t('contact.tagline')}
            </h2>
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
              {t('contact.title')} <span className="text-[#009edb]">.</span>
            </h1>
            <p className={`text-lg mb-10 leading-relaxed ${isLight ? 'text-gray-600' : 'text-white/70'}`}>
              {t('contact.description')}
            </p>

            <div className="space-y-8 flex  gap-50">
              {/* Location */}
              <div className="flex  items-start gap-4 group">
                <div className={`p-3 rounded-full shrink-0 transition-colors ${isLight ? 'bg-blue-50 text-[#009edb] group-hover:bg-[#009edb] group-hover:text-white' : 'bg-white/5 text-[#009edb] group-hover:bg-[#009edb] group-hover:text-white'}`}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className={`font-semibold text-lg mb-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {t('contact.officeLocations')}
                  </h3>
                  <p className={`${isLight ? 'text-gray-600' : 'text-white/70'}`}>
                    {t('contact.officeLocation1')} <br />
                    {t('contact.officeLocation2')}
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
                    {t('contact.contactNo')}
                  </h3>
                  <div className={`${isLight ? 'text-gray-600' : 'text-white/70'}`}>
                    <p>{t('contact.phone1')}</p>
                    <p>{t('contact.phone2')}</p>
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
                    {t('contact.emails')}
                  </h3>
                  <div className={`${isLight ? 'text-gray-600' : 'text-white/70'}`}>
                    <a href={`mailto:${t('contact.email1')}`} className="block hover:text-[#009edb] transition-colors">{t('contact.email1')}</a>
                    <a href={`mailto:${t('contact.email2')}`} className="block hover:text-[#009edb] transition-colors">{t('contact.email2')}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 mb-12">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#009edb] text-white font-semibold rounded-lg hover:bg-[#0077a3] transition-all hover:gap-3 shadow-lg shadow-[#009edb]/20"
              >
                {t('contact.enquiryForm')} <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>

          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className=" overflow-hidden shadow-2xl w-ful">
              <img 
                src="/aboutUs.jpg" 
                alt={t('contact.imageAlt')} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
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
