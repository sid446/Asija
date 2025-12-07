'use client';
import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, FC } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from './TranslationProvider';
import { useTheme } from './ThemeProvider';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';
import { WaveLoader } from './ui/WaveLoader';

// ============================================================
// PROGRESSIVE CAROUSEL COMPONENT (copied from your spec)
// ============================================================

interface ProgressSliderContextType {
  active: string;
  progress: number;
  handleButtonClick: (value: string) => void;
  vertical: boolean;
}

interface ProgressSliderProps {
  children: ReactNode;
  duration?: number;
  fastDuration?: number;
  vertical?: boolean;
  activeSlider: string;
  className?: string;
}

const ProgressSliderContext = createContext<ProgressSliderContextType | undefined>(undefined);

const useProgressSliderContext = (): ProgressSliderContextType => {
  const context = useContext(ProgressSliderContext);
  if (!context) {
    throw new Error('useProgressSliderContext must be used within a ProgressSlider');
  }
  return context;
};

const ProgressSlider: FC<ProgressSliderProps> = ({
  children,
  duration = 5000,
  fastDuration = 400,
  vertical = false,
  activeSlider,
  className,
}) => {
  const [active, setActive] = useState<string>(activeSlider);
  const [progress, setProgress] = useState<number>(0);
  const [isFastForward, setIsFastForward] = useState<boolean>(false);
  const frame = useRef<number>(0);
  const firstFrameTime = useRef<number>(performance.now());
  const targetValue = useRef<string | null>(null);
  const [sliderValues, setSliderValues] = useState<string[]>([]);

  useEffect(() => {
    setActive(activeSlider);
  }, [activeSlider]);

  useEffect(() => {
    const getChildren = React.Children.toArray(children).find(
      (child): child is React.ReactElement<{ children?: ReactNode }> =>
        React.isValidElement(child) && child.type === SliderContent
    );

    if (getChildren) {
      const values = React.Children.toArray(getChildren.props.children)
        .filter((child): child is React.ReactElement<{ value: string }> => React.isValidElement(child))
        .map((child) => child.props.value);
      setSliderValues(values);
    }
  }, [children]);

  useEffect(() => {
    if (sliderValues.length > 0) {
      firstFrameTime.current = performance.now();
      frame.current = requestAnimationFrame(animate);
    }
    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, [sliderValues, active, isFastForward]);

  const animate = (now: number) => {
    const currentDuration = isFastForward ? fastDuration : duration;
    const elapsedTime = now - firstFrameTime.current;
    const timeFraction = elapsedTime / currentDuration;

    if (timeFraction <= 1) {
      setProgress(
        isFastForward
          ? progress + (100 - progress) * timeFraction
          : timeFraction * 100
      );
      frame.current = requestAnimationFrame(animate);
    } else {
      if (isFastForward) {
        setIsFastForward(false);
        if (targetValue.current !== null) {
          setActive(targetValue.current);
          targetValue.current = null;
        }
      } else {
        const currentIndex = sliderValues.indexOf(active);
        const nextIndex = (currentIndex + 1) % sliderValues.length;
        setActive(sliderValues[nextIndex]);
      }
      setProgress(0);
      firstFrameTime.current = performance.now();
    }
  };

  const handleButtonClick = (value: string) => {
    if (value !== active) {
      const elapsedTime = performance.now() - firstFrameTime.current;
      const currentProgress = (elapsedTime / duration) * 100;
      setProgress(currentProgress);
      targetValue.current = value;
      setIsFastForward(true);
      firstFrameTime.current = performance.now();
    }
  };

  return (
    <ProgressSliderContext.Provider
      value={{ active, progress, handleButtonClick, vertical }}
    >
      <div className={className}>{children}</div>
    </ProgressSliderContext.Provider>
  );
};

const SliderContent: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

const SliderWrapper: FC<{ children: ReactNode; value: string; className?: string }> = ({
  children,
  value,
  className,
}) => {
  const { active } = useProgressSliderContext();
  const [direction, setDirection] = useState(0);
  const prevActive = useRef(active);

  useEffect(() => {
    const slideValues = ['banking', 'education', 'healthcare', 'infrastructure', 'realestate'];
    const prevIndex = slideValues.indexOf(prevActive.current);
    const currentIndex = slideValues.indexOf(active);
    
    if (currentIndex > prevIndex || (prevIndex === slideValues.length - 1 && currentIndex === 0)) {
      setDirection(1); // Moving forward
    } else {
      setDirection(-1); // Moving backward
    }
    
    prevActive.current = active;
  }, [active]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  return (
    <AnimatePresence mode='wait' custom={direction}>
      {active === value && (
        <motion.div
          key={value}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ 
            x: { type: "tween", duration: 0.5, ease: "easeInOut" },
            opacity: { duration: 0.3 }
          }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SliderBtnGroup: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

const SliderBtn: FC<{
  children: ReactNode;
  value: string;
  className?: string;
  progressBarClass?: string;
}> = ({ children, value, className, progressBarClass }) => {
  const { active, progress, handleButtonClick } = useProgressSliderContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleButtonClick(value);
  };

  return (
    <button
      type="button"
      className={`relative ${active === value ? 'opacity-100' : 'opacity-50'} ${className}`}
      onClick={handleClick}
      onTouchStart={(e) => e.currentTarget.focus()}
    >
      {children}
      <div
        className='absolute inset-0 overflow-hidden -z-10 max-h-full max-w-full'
        role='progressbar'
        aria-valuenow={active === value ? progress : 0}
      >
        <span
          className={`absolute left-0 ${progressBarClass}`}
          style={{
            width: active === value ? `${progress}%` : '0%',
          }}
        />
      </div>
    </button>
  );
};

// ============================================================
// INDUSTRIES DATA
// ============================================================

interface Industry {
  _id: string;
  title: string;
  description: string;
  details: string;
  image: string;
  order: number;
}

export default function Industries() {
  const { t } = useTranslation(); // ADD THIS
  const { theme } = useTheme();
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSlider, setActiveSlider] = useState<string>('');

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const res = await fetch('/api/industries');
        const data = await res.json();
        if (data.industries && Array.isArray(data.industries)) {
          setIndustries(data.industries);
          if (data.industries.length > 0) {
            setActiveSlider(data.industries[0]._id);
          }
        }
      } catch (error) {
        console.error('Failed to fetch industries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-theme">
        <WaveLoader message="Loading Industries..." />
      </div>
    );
  }

  if (industries.length === 0) {
    return null; 
  }
  
  return (
  <section className="bg-theme w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-theme leading-tight">
            {t('industries.title')} {/* UPDATED */}
            <span className="accent text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"> .</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-muted text-base sm:text-lg leading-relaxed  text-center max-w-3xl mx-auto mb-16"
        >
          {t('industries.description')} {/* UPDATED */}
        </motion.p>

        <ProgressSlider vertical={false} activeSlider={activeSlider} duration={6000}>
          
          <SliderContent className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden">
            {industries.map((item, index) => (
              <SliderWrapper key={item._id} value={item._id} className="absolute inset-0">
                <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    className='absolute inset-0 w-full h-full object-cover'
                    src={item.image}
                    alt={item.title}
                  />
                  {/* Dark gradient overlay at bottom for text visibility */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
                    >
                      <div className="flex-1">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4" style={{ color: '#ffffff' }}>
                          {item.title}
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed" style={{ color: '#ffffff' }}>
                          {item.description}
                        </p>
                      </div>
                      
                      <Link href="/industry">
                        <InteractiveHoverButton
                          text={t('common.learnMore')}
                          className="self-start sm:self-end shrink-0"
                        />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </SliderWrapper>
            ))}
          </SliderContent>

          <SliderBtnGroup className='mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 touch-manipulation'>
            {industries.map((item, index) => (
              <SliderBtn
                key={item._id}
                value={item._id}
                className='group relative overflow-hidden bg-card border border-theme rounded-xl p-4 sm:p-5 text-left cursor-pointer transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-(--theme-accent)/20 touch-manipulation select-none'
                progressBarClass='bg-accent h-full'
              >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-(--theme-accent) to-[#009edb] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <h3 className='text-sm sm:text-base font-bold text-theme mb-2 group-hover:accent transition-colors duration-300'>
                  {item.title}
                </h3>
                <p className='text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed'>
                  {item.description}
                </p>

                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-linear-to-t from-(--theme-accent)/10 to-transparent" />
                </div>
              </SliderBtn>
            ))}
          </SliderBtnGroup>
          
        </ProgressSlider>

      </div>
    </section>
  );
}


