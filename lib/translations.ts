import en from './locales/en/translation.json';
import hi from './locales/hi/translation.json';
import ar from './locales/ar/translation.json';
import ur from './locales/ur/translation.json';
import dz from './locales/dz/translation.json';

export const translations = {
  en,
  hi,
  ar,
  ur,
  dz,
} as const;

export type Language = keyof typeof translations;
