'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations, Language } from '@/lib/translations';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
  loading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) throw new Error('useTranslation must be used within TranslationProvider');
  return context;
};

// Helper function to get nested translation
const getNestedTranslation = (obj: any, path: string): string => {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path; // Return the key if translation not found
    }
  }
  
  return typeof result === 'string' ? result : path;
};

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [loading, setLoading] = useState(true);

  const dir = language === 'ar' || language === 'ur' ? 'rtl' : 'ltr';

  // Translation function
  const t = (key: string): string => {
    return getNestedTranslation(translations[language], key);
  };

  // Load saved language preference on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') as Language;
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
    setLoading(false);
  }, []);

  // Update document attributes when language changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, dir, loading }}>
      {children}
    </TranslationContext.Provider>
  );
};

const languages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English' },
  { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ur' as Language, name: 'Urdu', nativeName: 'اردو' },
  { code: 'ar' as Language, name: 'Arabic', nativeName: 'العربية' },
  { code: 'dz' as Language, name: 'Dzongkha', nativeName: 'རྫོང་ཁ་' },
];

export const LanguageSwitcher: React.FC<{ align?: 'left' | 'right' }> = ({ align = 'right' }) => {
  const { language, setLanguage, loading } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="relative">
      {/* ---------- Trigger ---------- */}
            <motion.button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="flex items-center justify-center gap-1 p-1 bg-white/8 hover:bg-white/15 border border-white/15 rounded-lg transition-all disabled:opacity-50"
        whileHover={{ scale: loading ? 1 : 1.05 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
        title={currentLang.nativeName}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
        </svg>
        {loading ? (
          <svg className="animate-spin h-2 w-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : null}
      </motion.button>

      {/* ---------- Dropdown (inside the sidebar) ---------- */}
      <AnimatePresence>
        {isOpen && !loading && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`absolute top-full ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-40 bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-2 space-y-1">
              {languages.map((lang, index) => (
                <motion.button
                  key={lang.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-all text-left
                    ${language === lang.code 
                      ? 'bg-[#009edb]/20 text-[#009edb]' 
                      : 'text-white/80 hover:bg-white/8 hover:text-white'
                    }
                  `}
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">{lang.nativeName}</div>
                  </div>
                  {language === lang.code && (
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
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};