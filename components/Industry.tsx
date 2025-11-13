'use client';
import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const industriesSlides = [
  {
    title: "Banking & Finance",
    description: "End-to-end audit, tax planning, and compliance for banks, NBFCs, and fintech startups.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#141212",
    textColor: "#ffffff",
    slug: "banking"
  },
  {
    title: "Education",
    description: "Financial advisory for schools, universities, and edtech platforms with grant compliance.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#141212",
    textColor: "#ffffff",
    slug: "education"
  },
  {
    title: "Healthcare",
    description: "Hospital accounting, medical billing, and regulatory compliance under NABH & HIPAA.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#141212",
    textColor: "#ffffff",
    slug: "healthcare"
  },
  {
    title: "Infrastructure",
    description: "Project finance, PPP models, and cost audits for roads, metro, and smart cities.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#141212",
    textColor: "#ffffff",
    slug: "infrastructure"
  },
  {
    title: "Real Estate",
    description: "RERA compliance, project funding, and valuation for developers and REITs.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#141212",
    textColor: "#ffffff",
    slug: "realestate"
  },
];

// ============================================================
// INDUSTRIES SECTION COMPONENT
// ============================================================

export default function Industries() {
  return (
    <section className="bg-black w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Industries We Serve
            <span className="text-[#1DCD9F] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"> .</span>
          </h1>
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-300 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto mb-16"
        >
          Tailored financial solutions across diverse sectors. Click any industry to explore our specialized services.
        </motion.p>

        {/* Progressive Carousel */}
        <ProgressSlider vertical={false} activeSlider='banking' duration={6000}>
          
          {/* Image Content - Fixed Height Container */}
          <SliderContent className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden">
            {industriesSlides.map((item, index) => (
              <SliderWrapper key={index} value={item.slug} className="absolute inset-0">
                <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    className='absolute inset-0 w-full h-full object-cover'
                    src={item.image}
                    alt={item.title}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Text Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
                    >
                      <div className="flex-1">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                          {item.title}
                        </h2>
                        <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      
                      {/* Learn More Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="self-start sm:self-end flex-shrink-0 group relative overflow-hidden bg-[#1DCD9F] hover:bg-[#0EA578] text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#1DCD9F]/50"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Learn More
                          <svg 
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                        
                        {/* Button Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </SliderWrapper>
            ))}
          </SliderContent>

          {/* Navigation Buttons */}
          <SliderBtnGroup className='mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 touch-manipulation'>
            {industriesSlides.map((item, index) => (
              <SliderBtn
                key={index}
                value={item.slug}
                className='group relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#141212] border border-white/10 rounded-xl p-4 sm:p-5 text-left cursor-pointer transition-all duration-300 hover:border-[#1DCD9F]/50 hover:shadow-xl hover:shadow-[#1DCD9F]/20 touch-manipulation select-none'
                progressBarClass='bg-[#1DCD9F] h-full'
              >
                {/* Gradient Bar on Top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1DCD9F] to-[#0EA578] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <h3 className='text-sm sm:text-base font-bold text-white mb-2 group-hover:text-[#1DCD9F] transition-colors duration-300'>
                  {item.title}
                </h3>
                <p className='text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed'>
                  {item.description}
                </p>

                {/* Hover Glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1DCD9F]/10 to-transparent" />
                </div>
              </SliderBtn>
            ))}
          </SliderBtnGroup>
          
        </ProgressSlider>

      </div>
    </section>
  );
}