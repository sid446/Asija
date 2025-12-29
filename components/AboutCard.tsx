'use client';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';

type AboutCardProps = {
  image: string;
  title: string;
  description: string;
  buttonContent?: string;
  isMobile?: boolean;
  index?: number;
  onButtonClick?: () => void;
  link?: string;
};

const AboutCard = ({
  image,
  title,
  description,
  buttonContent = 'Learn More',
  isMobile,
  index = 0,
  onButtonClick,
  link,
}: AboutCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '200px', // Start loading EARLY
  });

  const delay = index * 75; // Faster stagger

  const ButtonContent = () => (
    <InteractiveHoverButton
      onClick={onButtonClick}
      text={buttonContent}
      className={`
        ${isMobile 
          ? 'w-full text-[10px] min-w-0 px-4 py-2' 
          : 'w-full sm:w-auto min-w-0 sm:min-w-32 text-[10px] sm:text-base px-3 py-1.5 sm:px-6 sm:py-2'
        }
      `}
    />
  );

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: inView ? `${delay}ms` : '0ms',
        willChange: inView ? 'transform, opacity' : 'auto',
      }}
        className={`
        transform transition-all duration-500 ease-out
        ${inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
        group w-full bg-card border-t-4 border-accent 
        shadow-md overflow-hidden 
        hover:shadow-lg hover:-translate-y-1
        ${isMobile ? 'h-auto' : ''}
      `}
    >
      {/* OPTIMIZED IMAGE with Next.js Image */}
      <div className={`relative ${isMobile ? 'h-28' : 'h-36 sm:h-40 md:h-44'} overflow-hidden`}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={isMobile ? 112 : 176}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className={`p-3 ${isMobile ? 'sm:p-4' : 'sm:p-5 md:p-6'} space-y-2 sm:space-y-3`}>
        <h2
          className={`
            font-bold text-theme group-hover:accent transition-colors duration-300 line-clamp-2
            ${isMobile ? 'text-sm sm:text-base' : 'text-base sm:text-lg md:text-xl'}
          `}
        >
          {title}
        </h2>
        <p
          className={`
            leading-relaxed text-muted line-clamp-3
            ${isMobile ? 'text-xs sm:text-xs' : 'text-xs sm:text-sm'}
          `}
        >
          {description}
        </p>

        {/* Button */}
        {link ? (
          <Link href={link} prefetch={false}>
            <ButtonContent />
          </Link>
        ) : (
          <ButtonContent />
        )}
      </div>
    </div>
  );
};

export default AboutCard;