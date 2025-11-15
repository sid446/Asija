'use client';
import React from 'react';
import Navbar from './Navbar';
import Button from './Button';
import { useTranslation } from './TranslationProvider';

function Hero() {
  const { t } = useTranslation(); 
  
  return (
    <div className="fixed top-0 left-0 w-screen h-[100vh] sm:h-[90vh] overflow-hidden border-b-4 border-[#1DCD9F] z-10">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/thumbnail.jpg"
      >
        <source
          src="https://res.cloudinary.com/db2qa9dzs/video/upload/v1762886458/vid1_izwyyc.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Gradient + Blur Overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent md:from-black/90 md:via-black/50 md:to-transparent bg-black/70" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm md:backdrop-blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-30 flex h-full items-center justify-center md:justify-start px-4 sm:px-6 md:px-10 lg:px-16 pt-20">
        <div className="w-full max-w-lg space-y-4 sm:space-y-5 md:space-y-6 text-center md:text-left">
          <p className="text-[#1DCD9F] font-bold text-xs sm:text-sm md:text-base tracking-widest uppercase">
            {t('hero.tagline')} {/* UPDATED */}
          </p>
          <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            {t('hero.title')} {/* UPDATED */}
          </h1>
          <div className="border-0 md:border-l-4 border-[#169976] pl-0 md:pl-4 mx-auto md:mx-0 max-w-md md:max-w-none">
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              {t('hero.description')} {/* UPDATED */}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 justify-center items-center md:justify-start">
            <Button label={t('hero.learnMore')} link="/get-started" color1="#1DCD9F" textColor="#000000" /> {/* UPDATED */}
            <Button label={t('hero.contactUs')} link="/contact" color1="#000000" textColor="#1DCD9F" /> {/* UPDATED */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;