'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const leftItems = ['About Us', 'Our Team', 'Careers', 'Articles', 'Testimony'] as const;
const rightItems = ['Contact', 'Instagram', 'LinkedIn'] as const;

/* --------------------------------------------------------------- */
/*  ICON COMPONENTS                                                */
/* --------------------------------------------------------------- */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.946-.2-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.44-.645 1.44-1.44-.645-1.44-1.44-1.44z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.368-.027-3.127-1.904-3.127-1.907 0-2.2 1.489-2.2 3.027v5.704h-3v-11h2.879v1.51h.041c.4-.757 1.377-1.555 2.834-1.555 3.033 0 3.596 1.997 3.596 4.595v5.45z" />
  </svg>
);

/* --------------------------------------------------------------- */
/*  NAV ITEM (used for both sides)                                 */
/* --------------------------------------------------------------- */
type NavItemProps = {
  label: string;
  isIcon?: boolean;
  children?: React.ReactNode;
};

const NavItem = ({ label, isIcon, children }: NavItemProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const id = label;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
    >
      {isIcon ? (
        <button className="w-5 h-5 block">{children}</button>
      ) : (
        <button className="text-white/90 hover:text-white text-sm transition-colors relative z-10">
          {label}
        </button>
      )}

      {/* Shared underline */}
      {hovered === id && (
        <motion.div
          layoutId="nav-underline"
          className="absolute h-1 bg-[#1DCD9F] left-0 right-0"
          style={{ bottom: -26 }}
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0.8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </div>
  );
};

/* --------------------------------------------------------------- */
/*  MAIN NAVBAR                                                    */
/* --------------------------------------------------------------- */
export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-20 flex justify-between items-center px-8 bg-[#141212]">
      {/* LEFT SIDE */}
      <div className="flex gap-20 items-center">
        <h1 className="text-2xl font-bold text-white">ASIJA</h1>

        <nav className="flex gap-8">
          {leftItems.map((item) => (
            <NavItem key={item} label={item} />
          ))}
        </nav>
      </div>

      {/* RIGHT SIDE – same underline animation */}
      <nav className="flex gap-4 text-white items-center">
        <NavItem label="Contact" />
        <NavItem label="Instagram" isIcon>
          <InstagramIcon />
        </NavItem>
        <NavItem label="LinkedIn" isIcon>
          <LinkedInIcon />
        </NavItem>
      </nav>
    </div>
  );
};