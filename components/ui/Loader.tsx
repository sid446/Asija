// components/Loader.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return p + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex overflow-hidden"
          exit={{ opacity: 1 }} // Prevent fade
        >
          {/* LEFT HALF */}
          <motion.div
            className="flex-1 bg-[#2a2a2a] flex flex-col items-end justify-center "
            initial={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          >
            <motion.span
              className="text-6xl md:text-8xl font-bold text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              LOAD
            </motion.span>
          </motion.div>

          {/* RIGHT HALF */}
          <motion.div
            className="flex-1 bg-[#2a2a2a] flex flex-col gap-10  items-start  justify-center "
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          >
            <motion.span
              className="text-6xl md:text-8xl font-bold text-white mt-20"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              ING
            </motion.span>
            <motion.div
            className=" text-2xl md:text-3xl font-medium text-white/80 ml-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {progress}%
          </motion.div>

          </motion.div>

          {/* PERCENTAGE – centered below */}
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}