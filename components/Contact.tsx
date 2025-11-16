'use client';

import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from './TranslationProvider';

export default function Contact() {
  const { t } = useTranslation();
  
  return (
    <div id="contact" className="w-full min-h-screen bg-theme flex flex-col items-center px-6 md:px-20 lg:px-32 pb-20 overflow-hidden">
      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-7xl flex flex-col lg:flex-row justify-between gap-12 mb-8 sm:mb-16 mt-10"
      >
        {/* LEFT: Text */}
        <div className="lg:w-1/2 space-y-2 sm:space-y-5">
          <p className="accent font-medium text-xl sm:text-lg tracking-wider">
            {t('contact.tagline')}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-theme">
            {t('contact.title')} <span className='text-6xl accent'>.</span>
          </h1>
          <p className="text-xl text-muted max-w-lg">
            {t('contact.description')}
          </p>
        </div>

        {/* RIGHT: Contact Info */}
        <div className="lg:w-1/2 space-y-3 sm:space-y-8">
          {/* Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-4 group"
          >
            <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
              <Phone className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-theme">{t('contact.mobile')}</h3>
              <p className="text-muted text-md">{t('contact.phone1')}</p>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-4 group"
          >
            <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
              <Mail className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-theme">{t('contact.emails')}</h3>
              <a
                href={`mailto:${t('contact.email1')}`}
                className="text-muted text-md hover:text-accent transition-colors"
              >
                {t('contact.email1')}
              </a>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-start gap-4 group"
          >
            <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-theme">{t('contact.officeLocations')}</h3>
              <p className="text-muted text-md">
                {t('contact.location')}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Full-width Image with Bottom Fade */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="w-full max-w-7xl relative overflow-hidden "
      >
        

        <div className="relative">
          <Image
            src="/hey.jpg"
            alt={t('contact.imageAlt')}
            width={1920}
            height={1080}
            className="w-full h-[60vh] md:h-[70vh] object-cover"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-theme via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}