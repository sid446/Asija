import React from 'react';
import { Navbar } from './Navbar';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from './Button';

function Hero() {
  return (
    <div className="relative w-screen h-[90vh] overflow-hidden">
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
      >
        <source
          src="https://res.cloudinary.com/db2qa9dzs/video/upload/v1762886458/vid1_izwyyc.mp4"
          type="video/mp4"
        />
        <source src="/videos/sample.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Left-to-right gradient + left-side blur */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient (covers whole area) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        {/* Blur mask – only on the left half */}
        <div className="absolute inset-0 w-full bg-black/30 backdrop-blur-md" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-center pt-30 px-6 sm:px-10 lg:px-16">
        <div className="w-full max-w-xl space-y-6 text-left">
          {/* Tagline */}
          <p className="text-[#1DCD9F] font-bold text-sm sm:text-base lg:text-lg tracking-wider uppercase">
            Build the Future with Clarity
          </p>

          {/* Main Headline */}
          <h1 className="text-white font-semibold text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Transformation
          </h1>

          {/* Description with left border */}
          <div className="border-l-4 border-[#169976] pl-4 ">
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-20">
              Asija teams give you the confidence to shape the future and create new value by
              reimagining and realizing transformations across the entire enterprise.
            </p>
          </div>
          <div className='flex'>
          <Button 
            label="Learn More"
            link="/get-started"
            color1="#1DCD9F"      // green background
            textColor="#000000"    // black text/arrow
            position="left"
          />
          <Button 
            label="contact us"
            link="/get-started"
            color1="#000000"      // green background
            textColor="#1DCD9F"    // black text/arrow
            position="left"
          />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Hero;