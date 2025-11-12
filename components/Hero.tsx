// components/Hero.tsx
import React from 'react';
import { Navbar } from './Navbar';
import { ArrowRight } from 'lucide-react';
import Button from './Button';

function Hero() {
  return (
    <div className="relative w-screen h-[85vh] sm:h-[90vh] overflow-hidden">
      <Navbar />

      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/thumbnail.jpg"
        loading="lazy"
      >
        <source
          src="https://res.cloudinary.com/db2qa9dzs/video/upload/v1762886458/vid1_izwyyc.mp4"
          type="video/mp4"
        />
        <source src="/videos/sample.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient + Blur Overlay */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient (left-heavy) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

        {/* Blur mask – left side only */}
        <div className="absolute inset-0 w-full sm:w-1/2 bg-black/40 backdrop-blur-sm sm:backdrop-blur-md" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-center px-4 sm:px-6 md:px-10 lg:px-16 pt-16 sm:pt-20">
        <div className="w-full max-w-lg space-y-4 sm:space-y-5 md:space-y-6 text-left">
          {/* Tagline */}
          <p className="text-[#1DCD9F] font-bold text-xs sm:text-sm md:text-base tracking-widest uppercase">
            Build the Future with Clarity
          </p>

          {/* Main Headline */}
          <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            Transformation
          </h1>

          {/* Description */}
          <div className="border-l-4 border-[#169976] pl-3 sm:pl-4">
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Asija teams give you the confidence to shape the future and create new value by
              reimagining and realizing transformations across the entire enterprise.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            <Button
              label="Learn More"
              link="/get-started"
              color1="#1DCD9F"
              textColor="#000000"
              position="left"
            />
            <Button
              label="Contact Us"
              link="/contact"
              color1="#000000"
              textColor="#1DCD9F"
              position="left"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;