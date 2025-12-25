'use client';

import { useInitializeAppData } from '@/lib/store/useInitializeAppData';

export default function DataInitializer() {
  // This component ensures data is loaded on every page
  useInitializeAppData();
  return null;
}