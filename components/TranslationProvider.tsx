'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Language = 'en' | 'ur' | 'ar' | 'hi' | 'dz';

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
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  const dir = language === 'ar' || language === 'ur' ? 'rtl' : 'ltr';

  // Load translations from JSON file
  const loadTranslations = async (lang: Language) => {
    try {
      setLoading(true);
      const response = await fetch(`/locales/${lang}/translation.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang} translations`);
      const data = await response.json();
      setTranslations(data);
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error);
      // Fallback to English if translation fails
      if (lang !== 'en') {
        const fallback = await fetch('/locales/en/translation.json');
        const data = await fallback.json();
        setTranslations(data);
      }
    } finally {
      setLoading(false);
    }
  };

  // Translation function
  const t = (key: string): string => {
    return getNestedTranslation(translations, key);
  };

  // Load saved language preference on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') as Language;
    if (savedLang && ['en', 'ur', 'ar', 'hi', 'dz'].includes(savedLang)) {
      setLanguage(savedLang);
    } else {
      loadTranslations('en');
    }
  }, []);

  // Load translations when language changes
  useEffect(() => {
    loadTranslations(language);
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
  { code: 'en' as Language, name: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'ur' as Language, name: 'Urdu', flag: '🇵🇰', nativeName: 'اردو' },
  { code: 'ar' as Language, name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'hi' as Language, name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
  { code: 'dz' as Language, name: 'Dzongkha', flag: '🇧🇹', nativeName: 'རྫོང་ཁ་' },
];

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, loading } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="flex items-center justify-center gap-2 px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all disabled:opacity-50"
        whileHover={{ scale: loading ? 1 : 1.05 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
      >
        <span className="text-sm text-white">{currentLang.flag}</span>
        <span className="text-white text-xs font-medium hidden sm:inline">
          {currentLang.nativeName}
        </span>
        {loading ? (
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-4 h-4 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && !loading && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute top-full right-0 mt-2 w-40 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
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
                        ? 'bg-[#1DCD9F]/20 text-[#1DCD9F]' 
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                      }
                    `}
                  >
                    <span className="text-lg ">{lang.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium text-xs">{lang.nativeName}</div>
                      <div className="text-xs opacity-70">{lang.name}</div>
                    </div>
                    {language === lang.code && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 text-[#1DCD9F]"
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
          </>
        )}
      </AnimatePresence>
    </div>
  );
};