// components/Loader.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { WaveLoader } from './WaveLoader';

interface LoaderProps {
  isLoading?: boolean;
  pageName?: string;
}

export default function Loader({ isLoading = true, pageName }: LoaderProps) {
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