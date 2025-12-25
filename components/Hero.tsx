'use client';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchHeroContent } from '@/lib/store/slices/heroSlice';

type HeroContent = {
  tagline: string;
  title: string;
  description: string;
  learnMore: string;
  contactUs: string;
  videoPoster: string;
  videoWebm: string;
  videoMp4: string;
};

function Hero() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { content, loading, error } = useAppSelector((state) => state.hero);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Only fetch if we don't have content or if there's an error
    if (!content && !loading) {
      dispatch(fetchHeroContent());
    }
  }, [dispatch, content, loading]);

  if (loading || !content) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen sm:h-[90vh] overflow-hidden border-b-4 border-[#009edb] z-10 bg-slate-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    console.error('Failed to load hero content:', error);
    // Return default content if there's an error
    return null;
  }
  
  return (
    <div className="fixed top-0 left-0 w-screen h-screen sm:h-[90vh] overflow-hidden border-b-4 border-[#009edb] z-10">
      {/* Video Background */}
      {!videoLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950">
          <div className="text-white text-lg">Loading video...</div>
        </div>
      )}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={content.videoPoster}
        onCanPlay={() => setVideoLoaded(true)}
      >
        <source
          src={content.videoWebm}
          type="video/webm"
        />
        <source
          src={content.videoMp4}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Gradient + Blur Overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/60 via-slate-950/35 to-transparent md:from-slate-950/60 md:via-slate-950/35 md:to-transparent bg-slate-950/40" />
        <div className="absolute inset-0 bg-slate-950/25 backdrop-blur-sm md:backdrop-blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-30 flex h-full items-center justify-center md:justify-start px-4 sm:px-6 md:px-10 lg:px-16 pt-20">
        <div className="w-full max-w-lg space-y-4 sm:space-y-5 md:space-y-6 text-center md:text-left">
          <p className="font-bold text-sm sm:text-base md:text-base tracking-widest uppercase" style={{ color: '#009edb' }}>
            {content.tagline}
          </p>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-tight" style={{ color: '#ffffff' }}>
            {content.title}
          </h1>
          <div className="border-0 md:border-l-4 pl-0 md:pl-4 mx-auto md:mx-0 max-w-md md:max-w-none" style={{ borderColor: '#009edb' }}>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed" style={{ color: '#d1d5db' }}>
              {content.description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 justify-center items-center md:justify-start">
            <InteractiveHoverButton 
              text={content.learnMore} 
              className="bg-transparent! text-white border-[#009edb]"
              onClick={() => router.push('/about')}
            />
            <InteractiveHoverButton 
              text={content.contactUs} 
              className="bg-[#1e1e1e]! text-[#009edb] border-[#009edb]"
              onClick={() => router.push('/contact')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;