'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import { X } from 'lucide-react';
import { getOptimizedImageUrl } from '@/lib/utils';

const FULL_WIDTH_PX = 120;
const COLLAPSED_WIDTH_PX = 35;
const GAP_PX = 2;
const MARGIN_PX = 2;

type GalleryItem = {
  _id: string;
  title: string;
  date: string;
  description: string;
  images: string[];
};

export default function GalleryCarousel({ 
  images, 
  initialIndex = 0, 
  onClose 
}: { 
  images: string[], 
  initialIndex?: number, 
  onClose: () => void 
}) {
  const [index, setIndex] = useState<number>(initialIndex);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;

      animate(x, targetX, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setIndex(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setIndex(i => Math.min(images.length - 1, i + 1));
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-50"
      >
        <X className="w-8 h-8" />
      </button>

      <div className='w-full max-w-5xl mx-auto flex flex-col gap-6'>
        {/* Main Carousel */}
        <div className='relative overflow-hidden rounded-lg aspect-[16/9] bg-black' ref={containerRef}>
          <motion.div
            className='flex h-full'
            drag='x'
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, info) => {
              setIsDragging(false);
              const containerWidth = containerRef.current?.offsetWidth || 1;
              const offset = info.offset.x;
              const velocity = info.velocity.x;

              let newIndex = index;

              if (Math.abs(velocity) > 500) {
                newIndex = velocity > 0 ? index - 1 : index + 1;
              } else if (Math.abs(offset) > containerWidth * 0.3) {
                newIndex = offset > 0 ? index - 1 : index + 1;
              }

              newIndex = Math.max(0, Math.min(images.length - 1, newIndex));
              setIndex(newIndex);
            }}
            style={{ x }}
          >
            {images.map((img, i) => (
              <div key={i} className='shrink-0 w-full h-full flex items-center justify-center'>
                <img
                  src={getOptimizedImageUrl(img, 1200)}
                  alt={`Gallery image ${i + 1}`}
                  className='max-w-full max-h-full object-contain select-none pointer-events-none'
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.button
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
              ${index === 0 ? 'opacity-0 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'}`}
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
          </motion.button>

          <motion.button
            disabled={index === images.length - 1}
            onClick={() => setIndex((i) => Math.min(images.length - 1, i + 1))}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform z-10
              ${index === images.length - 1 ? 'opacity-0 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'}`}
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </motion.button>
        </div>

        <Thumbnails index={index} setIndex={setIndex} images={images} />
      </div>
    </div>
  );
}

function Thumbnails({
  index,
  setIndex,
  images
}: {
  index: number;
  setIndex: (index: number) => void;
  images: string[];
}) {
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (thumbnailsRef.current) {
      let scrollPosition = 0;
      for (let i = 0; i < index; i++) {
        scrollPosition += COLLAPSED_WIDTH_PX + GAP_PX;
      }

      scrollPosition += MARGIN_PX;

      const containerWidth = thumbnailsRef.current.offsetWidth;
      const centerOffset = containerWidth / 2 - FULL_WIDTH_PX / 2;
      scrollPosition -= centerOffset;

      thumbnailsRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [index]);

  return (
    <div
      ref={thumbnailsRef}
      className='overflow-x-auto scrollbar-hide w-full max-w-3xl mx-auto'
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className='flex gap-1 h-16 sm:h-20 pb-2 mx-auto' style={{ width: 'fit-content' }}>
        {images.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? 'active' : 'inactive'}
            variants={{
              active: {
                width: FULL_WIDTH_PX,
                marginLeft: MARGIN_PX,
                marginRight: MARGIN_PX,
                opacity: 1
              },
              inactive: {
                width: COLLAPSED_WIDTH_PX,
                marginLeft: 0,
                marginRight: 0,
                opacity: 0.5
              },
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className='relative shrink-0 h-full overflow-hidden rounded-lg'
          >
            <img
              src={getOptimizedImageUrl(img, 200)}
              alt={`Thumbnail ${i + 1}`}
              className='w-full h-full object-cover pointer-events-none select-none'
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
