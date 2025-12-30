// components/Loader.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WaveLoader } from './WaveLoader';

interface LoaderProps {
  pageName?: string;
}

export default function Loader({ pageName }: LoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading (1 second total)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-theme overflow-hidden"
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
              barClass="bg-[#009edb]"
              message={pageName}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}