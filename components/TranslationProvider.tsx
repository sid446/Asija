'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TranslationContextType {
  googleTranslateEnabled: boolean;
  toggleGoogleTranslate: () => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) throw new Error('useTranslation must be used within TranslationProvider');
  return context;
};

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [googleTranslateEnabled, setGoogleTranslateEnabled] = useState(false);

  // Toggle Google Translate
  const toggleGoogleTranslate = () => {
    setGoogleTranslateEnabled(!googleTranslateEnabled);
  };

  return (
    <TranslationContext.Provider value={{ 
      googleTranslateEnabled,
      toggleGoogleTranslate
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const LanguageSwitcher: React.FC<{ align?: 'left' | 'right' }> = ({ align = 'right' }) => {
  const { googleTranslateEnabled, toggleGoogleTranslate } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [translateElementReady, setTranslateElementReady] = useState(false);

  // Initialize Google Translate when dropdown opens
  useEffect(() => {
    if (isOpen && !translateElementReady) {
      // Check if script is already loaded
      if (!document.querySelector('#google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);

        // Add custom styles for Google Translate
        const style = document.createElement('style');
        style.textContent = `
          .google-translate-inline select {
            background: #1a1a1a !important;
            color: white !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 6px !important;
            padding: 4px 8px !important;
            font-size: 14px !important;
            min-width: 120px !important;
          }
          .google-translate-inline select option {
            background: #1a1a1a !important;
            color: white !important;
          }
          .google-translate-inline .goog-te-gadget {
            color: white !important;
            font-family: inherit !important;
          }
          .goog-te-banner-frame {
            display: none !important;
          }
          .goog-te-menu-frame {
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 6px !important;
            background: #1a1a1a !important;
            z-index: 40 !important;
          }
          .goog-te-menu2 {
            background: #1a1a1a !important;
          }
          .goog-te-menu2-item div, .goog-te-menu2-item:link div, .goog-te-menu2-item:visited div, .goog-te-menu2-item:active div {
            color: white !important;
            background: #1a1a1a !important;
          }
          .goog-te-menu2-item:hover div {
            background: rgba(255, 255, 255, 0.1) !important;
          }
          /* Override Google Translate overlay z-index to not interfere with navbar */
          .goog-te-menu-frame,
          .goog-te-menu2,
          .goog-te-balloon-frame,
          .goog-te-balloon-window,
          .goog-te-gadget-icon,
          .goog-te-gadget-simple,
          .goog-te-menu-value span[style*="position"][style*="z-index"] {
            z-index: 40 !important;
          }
          /* Ensure navbar stays above Google Translate overlays */
          .goog-te-banner-frame,
          .goog-te-balloon-frame {
            z-index: 40
            background: rgba(255, 255, 255, 0.1) !important;
          }
          /* Override Google Translate overlay z-index to not interfere with navbar */
          .goog-te-menu-frame,
          .goog-te-menu2,
          .goog-te-balloon-frame,
          .goog-te-balloon-window,
          .goog-te-gadget-icon,
          .goog-te-gadget-simple,
          .goog-te-menu-value span[style*="position"][style*="z-index"] {
            z-index: 40 !important;
          }
          /* Ensure navbar stays above Google Translate overlays */
          .goog-te-banner-frame,
          .goog-te-balloon-frame {
            z-index: 40 !important;
          }
        `;
        document.head.appendChild(style);

        // Initialize Google Translate after a short delay to ensure DOM is ready
        setTimeout(() => {
          (window as any).googleTranslateElementInit = () => {
            if (document.getElementById('google_translate_element')) {
              new (window as any).google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,ur,ar,hi,dz',
                layout: (window as any).google.translate.TranslateElement.InlineLayout.HORIZONTAL,
                autoDisplay: false,
                multilanguagePage: true
              }, 'google_translate_element');
              
              setTranslateElementReady(true);
            }
          };

          // If script is already loaded, initialize immediately
          if ((window as any).google && (window as any).google.translate) {
            (window as any).googleTranslateElementInit();
          }
        }, 100);
      } else {
        // Script already loaded, initialize immediately
        setTimeout(() => {
          if ((window as any).google && (window as any).google.translate && document.getElementById('google_translate_element')) {
            new (window as any).google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'en,ur,ar,hi,dz',
              layout: (window as any).google.translate.TranslateElement.InlineLayout.HORIZONTAL,
              autoDisplay: false,
              multilanguagePage: true
            }, 'google_translate_element');
            
            setTranslateElementReady(true);
          }
        }, 100);
      }
    }
  }, [isOpen, googleTranslateEnabled, translateElementReady]);

  return (
    <div className="relative">
      {/* ---------- Trigger ---------- */}
            <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-1 p-1 bg-white/8 hover:bg-white/15 border border-white/15 rounded-lg transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Translation Options"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
        </svg>
      </motion.button>

      {/* ---------- Dropdown (inside the sidebar) ---------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`absolute top-full ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-40 bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-40`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-2 space-y-1">
              {/* Google Translate Toggle */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                onClick={toggleGoogleTranslate}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-all text-left
                  ${googleTranslateEnabled 
                    ? 'bg-[#009edb]/20 text-[#009edb]' 
                    : 'text-white/80 hover:bg-white/8 hover:text-white'
                  }
                `}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9s-2.015-9-4.5-9m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 2.84L21 14l-2.5-2.5m-9.5 0L3 14l2.5-2.5m4.5-4.5l2.5 2.5m4.5-4.5l-2.5 2.5" />
                </svg>
                <div className="flex-1">
                  <div className="font-medium text-sm">Google Translate</div>
                  <div className="text-xs opacity-70">{googleTranslateEnabled ? 'Enabled' : 'Disabled'}</div>
                </div>
                {googleTranslateEnabled && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 text-[#009edb]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </motion.svg>
                )}
              </motion.button>
              
              {/* Google Translate Element */}
              {googleTranslateEnabled && isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-3 bg-[#1a1a1a] rounded-lg border border-white/10"
                >
                  <div id="google_translate_element" className="google-translate-inline"></div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};