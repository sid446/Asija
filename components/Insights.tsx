"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Lightbulb } from 'lucide-react';
import Gallery4 from '@/components/ui/gallery4';
import { useTheme } from './ThemeProvider';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchInsights } from '@/lib/store/slices/insightsSlice';
import type { Insight } from '@/lib/store/slices/insightsSlice';

export default function     Insights() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const dispatch = useAppDispatch();
  const { insights, loading, error, fetched } = useAppSelector((state) => state.insights);

  useEffect(() => {
    // Only fetch if we haven't fetched yet and not currently loading
    if (!fetched && !loading) {
      dispatch(fetchInsights());
    }
  }, [dispatch, fetched, loading]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-lg">Loading insights...</div>
      </div>
    );
  }

  if (error) {
    console.error('Failed to load insights:', error);
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-lg text-red-500">Failed to load insights. Please try again later.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <section className={`py-20 ${isLight ? 'bg-[#68a5bd]' : 'bg-slate-950'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009edb] mx-auto mb-4"></div>
            <p className="text-theme">Loading insights...</p>
          </div>
        </div>
      </section>
    );
  }

  if (insights.length === 0) {
    return null; // Don't render the Insights section if there are no insights
  }

  // Transform insights data for Gallery4 component
  const galleryData = insights.map((insight, index) => ({
    id: insight._id,
    title: insight.title,
    description: insight.description,
    image: insight.image || '/placeholder-insight.jpg',
    href: `/insights/${insight.slug}`
  }));

  return (
    <section className={`py-20 bg-theme transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left ">
          <div className="flex justify-left gap-3 mb-4">
           
            <h2 className="text-3xl md:text-4xl font-bold text-theme">Latest Insights <span className='text-[#009EDB] text-7xl'>.</span></h2>
          </div>
          <p className="text-xl text-muted max-w-3xl">
            Stay informed with our latest research, industry analysis, and thought leadership
            on technology, business, and innovation trends.
          </p>
        </div>

        {/* Insights Gallery */}
        <Gallery4
          items={galleryData}
          title=""
          description=""
        />

        {/* Call to Action */}
        <div className="text-center ">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 bg-[#009edb] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0077a3] transition-colors shadow-lg hover:shadow-xl"
          >
            View All Insights
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}