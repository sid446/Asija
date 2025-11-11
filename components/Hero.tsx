

'use client';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Inter } from 'next/font/google';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import Button from './Button';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const carrouselItems = [
  {
    id: 1,
    title: "Thoughtfull Transport",
    title1: " Solutions",
    imageUrl: 'https://res.cloudinary.com/db2qa9dzs/image/upload/v1762857406/pexels-kampus-5940827_unswzl.jpg',
    quote: 'We make firm print profit then they have ever had in their past term with us.',
  },
  {
    id: 2,
    title: "Innovative Logistics",
    title1: " Services",
    imageUrl: 'https://res.cloudinary.com/db2qa9dzs/image/upload/v1762857407/img1_vi6ozf.jpg',
    quote: 'Delivering excellence through cutting-edge logistics solutions.',
  },
  {
    id: 3,
    title: "Reliable Freight",
    title1: " Management",
    imageUrl: 'https://res.cloudinary.com/db2qa9dzs/image/upload/v1762857596/img2_eemwgg.jpg',
    quote: 'Your trusted partner in seamless freight management.',
  },
];



const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

function Hero() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemIndex = wrap(0, carrouselItems.length, page);
  const currentItem = carrouselItems[itemIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, page]);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Background Carousel */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${currentItem.imageUrl}')` }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset }) => {
            if (Math.abs(offset.x) > 100) {
              paginate(offset.x > 0 ? -1 : 1);
            }
          }}
        />
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#533B4D] opacity-50 z-10" />

      {/* Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="absolute inset-0 flex flex-col z-20 pointer-events-none">
        {/* Top Section */}
        <div className="w-full h-[65%] flex">
          <div className="w-[75%] flex items-center  relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`title-${page}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 400, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="absolute inset-0 flex flex-col px-10 justify-center pointer-events-auto"
              >
                <h1 className={`text-white text-[60px] font-semibold leading-none ${inter.variable}`}>
                  {currentItem.title}
                </h1>
                <h1 className={`text-white text-[60px] font-semibold leading-none ${inter.variable}`}>
                  {currentItem.title1}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="w-[25%] border-l-2 border-zinc-400" />
        </div>

        {/* Bottom Section */}
        <div className="w-full h-[35%] border-t-2 border-zinc-400 flex">
          {/* Quote Panel - NO noise.png */}
          {/* Quote Panel - GLASSMORPHISM FIXED */}
<div className="w-[20%] h-full border-r-2 border-zinc-400 relative overflow-hidden">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center opacity-70"
    style={{
      background: `#561530`,
    }}
  />

  {/* GLASS LAYER - This is the key */}
  <div 
    className="absolute inset-0"
    style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(50px)',
      WebkitBackdropFilter: 'blur(100px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
    }}
  />

  {/* Optional: Subtle Noise Overlay (via CSS class) */}
  <div 
    className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }}
  />

  {/* Content */}
  <div className="relative z-10 h-full flex flex-col justify-between pl-5 pt-10 pb-10 pointer-events-auto">
    <AnimatePresence mode="wait" initial={false}>
      <motion.h2
        key={`quote-${page}`}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 200, damping: 25 },
          opacity: { duration: 0.5 },
        }}
        className="text-white text-xl lg:text-2xl font-medium w-[85%] drop-shadow-xl leading-tight"
      >
        {currentItem.quote}
      </motion.h2>
    </AnimatePresence>

    <Button 
      label="Learn More" 
      link="#about" 
      position="left" 
    />
  </div>
</div>

          {/* Navigation Arrows */}
          {/* Navigation Arrows Panel - GLASSMORPHISM */}
<div className="w-[55%] h-full relative overflow-hidden">
  {/* Background */}
  <div 
    className="w-[10%] absolute inset-0 opacity-70"
    style={{
      background: `#561530`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  />

  {/* GLASS PANEL - Left 10% */}
  <div 
    className="absolute left-0 top-0 w-[10%] h-full"
    style={{
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.05)',
    }}
  />

  {/* Noise Overlay */}
  <div 
    className="absolute left-0 top-0 w-[10%] h-full opacity-20 mix-blend-overlay pointer-events-none"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }}
  />

  {/* Controls */}
  <div className="absolute left-0 top-0 w-[10%] h-full flex flex-col items-center justify-center gap-6 z-10 pointer-events-auto">
    <button 
      onClick={() => paginate(-1)} 
      className="opacity-80 hover:opacity-100 transition-transform hover:scale-110"
    >
      <img className="w-8 h-8" src="/right.png" alt="Prev" />
    </button>
    <button 
      onClick={() => paginate(1)} 
      className="opacity-80 hover:opacity-100 transition-transform hover:scale-110"
    >
      <img className="w-8 h-8 rotate-180" src="/right.png" alt="Next" />
    </button>
    <div className="text-white text-xs font-medium tracking-wider">
      {itemIndex + 1} / {carrouselItems.length}
    </div>
  </div>
</div>

          <div className="w-[25%] h-full border-l-2 border-zinc-400" />
        </div>
      </div>
      {carrouselItems.map((item, index) => (
        index !== itemIndex && (
          <link
            key={item.id}
            rel="preload"
            as="image"
            href={item.imageUrl}
          />
        )
      ))}
    </div>
  );
}

export default Hero;