'use client';

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface ButtonProps {
  label: string;
  link: string;
  position?: 'left' | 'center' | 'right';
  textColor?: string;   // e.g. "#69213f"
  color1?: string;      // background colour, e.g. "#FFFFFF"
  fullWidthOnMobile?: boolean; // New: force full width on mobile
}

const Button: React.FC<ButtonProps> = ({
  label,
  link,
  position = 'left',
  textColor = '#69213f',
  color1 = '#FFFFFF',
  fullWidthOnMobile = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const justify = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }[position];

  return (
    <div
      className={`
        flex ${justify} m-1 sm:m-2
        ${fullWidthOnMobile ? 'w-full' : ''}
      `}
    >
      <Link
        href={link}
        className={`
          flex group w-full sm:w-auto
          ${fullWidthOnMobile ? '' : 'sm:inline-flex'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // Improve mobile tap experience
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {/* ---- LABEL PART ---- */}
        <div
          className={`
            h-7 sm:h-9 md:h-10 px-3 sm:px-4 
            rounded-l-full flex items-center justify-center
            transition-all duration-300 ease-in-out
            ${isHovered ? 'rounded-full pr-2 sm:pr-3' : ''}
            text-xs sm:text-sm font-semibold
          `}
          style={{ backgroundColor: color1, color: textColor }}
        >
          {label}
        </div>

        {/* ---- ARROW PART ---- */}
        <div
          className={`
            h-7 sm:h-9 md:h-10 w-7 sm:w-9 md:w-10
            rounded-r-full flex items-center justify-center
            transition-all duration-300 ease-in-out
            ${isHovered ? 'rounded-full' : ''}
          `}
          style={{ backgroundColor: color1 }}
        >
          <ArrowUpRight
            className={`
              transition-all duration-300
              ${isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''}
            `}
            style={{ color: textColor }}
            size={16}
          />
        </div>
      </Link>
    </div>
  );
};

export default Button;