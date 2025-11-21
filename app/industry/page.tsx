import { Suspense } from 'react';
import IndustriesContent from './IndustriesContent';
import Loader from '@/components/ui/Loader';

export default function IndustriesPage() {
  return (
    <Suspense fallback={<Loader />}>
      <IndustriesContent />
    </Suspense>
  );
}
