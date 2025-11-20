// app/services/page.tsx
import { Suspense } from 'react';
import ServicesContent from './ServicesContent';

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-black text-white text-2xl font-light">
          Loading services...
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}