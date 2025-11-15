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
  barClass = 'bg-[#1DCD9F]',
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
        <span className="text-lg font-medium text-white/90">{message}</span>
      )}
    </div>
  );
}