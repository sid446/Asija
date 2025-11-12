// app/page.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutUs from '@/components/About';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Navbar from '@/components/Navbar';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null!); // Non-null assertion

  useEffect(() => {
    // Hero Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    tl.from('.hero-tagline', { opacity: 0, y: 20, duration: 1 })
      .from('.hero-title', { opacity: 0, y: 30, duration: 1 }, '-=0.8')
      .from('.hero-desc', { opacity: 0, y: 20, duration: 1 }, '-=0.8')
      .from('.hero-btn', { opacity: 0, y: 15, stagger: 0.2, duration: 0.8 }, '-=0.6');

    // About Section
    gsap.from(aboutRef.current, {
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.out',
    });

    // Card Grid Stagger
    const cards = cardsRef.current?.querySelectorAll('.about-card');
    if (cards) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Fixed Hero */}
      <div ref={heroRef}>
        <Navbar />
        <Hero />
      </div>

      {/* Spacer */}
      <div className="h-[100vh] sm:h-[90vh]" />

      {/* Scrollable Content */}
      <div ref={aboutRef} className="relative z-40">
        <AboutUs cardsRef={cardsRef} />
        <Services />
      </div>
    </div>
  );
}