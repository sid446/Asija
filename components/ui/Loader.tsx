// components/Loader.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WaveLoader } from './WaveLoader';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading (2 seconds total)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#141212] overflow-hidden"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}           // Slides UP
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Centered Wave Loader */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <WaveLoader
              bars={5}
              barClass="bg-[#1DCD9F]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}