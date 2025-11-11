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
}

const Button: React.FC<ButtonProps> = ({
  label,
  link,
  position = 'left',
  textColor = '#69213f',
  color1 = '#FFFFFF',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const justify = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }[position];

  return (
    <div className={`flex ${justify} m-2`}>
      <Link href={link} className="flex group">
        {/* ---- LABEL PART ---- */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            h-[2.3rem] px-4 rounded-l-full flex items-center
            transition-all duration-300 ease-in-out
            ${isHovered ? 'rounded-full' : ''}
          `}
          style={{ backgroundColor: color1, color: textColor }}
        >
          <span className="font-semibold">{label}</span>
        </div>

        {/* ---- ARROW PART ---- */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            w-[2.3rem] h-[2.3rem] rounded-r-full flex items-center justify-center
            transition-all duration-300 ease-in-out
            ${isHovered ? 'rounded-full' : ''}
          `}
          style={{ backgroundColor: color1 }}
        >
          <ArrowUpRight className="w-4 h-4" style={{ color: textColor }} />
        </div>
      </Link>
    </div>
  );
};

export default Button;