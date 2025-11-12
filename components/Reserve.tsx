
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => (
  <div className="fixed top-0 left-0 right-0 z-50 h-20 flex justify-between items-center px-8 
                  border-b border-white/20 
                  backdrop-blur-md bg-white/30 
                  isolate">
    <h1 className="text-2xl font-bold text-white">ASIJA</h1>
    
    <nav className="flex gap-8">
      {['About Us', 'Our Team', 'Careers', 'Articles', 'Testimony'].map((item) => (
        <button key={item} className="text-white/90 hover:text-white transition-colors">
          {item}
        </button>
      ))}
    </nav>

    <div className="flex gap-4 items-center text-white">
      <button className="text-white/90 hover:text-white transition-colors">Contact</button>
      {/* Instagram SVG */}
      <button className="w-5 h-5 hover:opacity-80">
        <svg viewBox="0 0 24 24" fill="currentColor">...</svg>
      </button>
      {/* LinkedIn SVG */}
      <button className="w-5 h-5 hover:opacity-80">
        <svg viewBox="0 0 24 24" fill="currentColor">...</svg>
      </button>
    </div>
  </div>
);

