// components/WaveLoader.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type WaveLoaderProps = {
  /** Number of bouncing bars */
  bars?: number;
  /** Optional message (e.g. "87%") */
  message?: string;
  /** Where the message appears */
  messagePlacement?: 'bottom' | 'right' | 'left';
  /** Tailwind class for the bars (color) */
  barClass?: string;
};

export function WaveLoader({
  bars = 5,
  message,
  messagePlacement = 'bottom',
  barClass = 'bg-[#009edb]',
}: WaveLoaderProps) {
  const layout = {
    bottom: 'flex-col',
    right: 'flex-row',
    left: 'flex-row-reverse',
  }[messagePlacement];

  return (
    <div className={cn('flex items-center justify-center gap-2', layout)}>
      <div className="flex gap-1">
        {Array.from({ length: bars }).map((_, i) => (
          <motion.div
            key={i}
            className={cn('w-2 h-5 rounded-full', barClass)}
            animate={{ scaleY: [1, 1.6, 1] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.08,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {message && (
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xs md:text-sm font-light uppercase tracking-[0.3em] text-theme opacity-80 mt-2"
        >
          {message}
        </motion.span>
      )}
    </div>
  );
}