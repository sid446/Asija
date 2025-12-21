"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lightbulb } from 'lucide-react';
import Gallery4 from '@/components/ui/gallery4';
import { useTheme } from './ThemeProvider';

interface Insight {
  _id: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  slug: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
}

export default function     Insights() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await fetch('/api/insights');
      if (response.ok) {
        const data = await response.json();
        // Get featured insights or latest 3 insights
        const featuredOrLatest = data
          .filter((insight: Insight) => insight.published)
          .sort((a: Insight, b: Insight) => {
            // Prioritize featured insights, then by creation date
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          })
          .slice(0, 3);
        setInsights(featuredOrLatest);
      }
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setLoading(false);
    }
  };

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
    return (
      <section className={`py-20 ${isLight ? 'bg-[#68a5bd]' : 'bg-slate-950'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className=" mb-16">
            <div className="flex justify-left gap-3 mb-4">
              <Lightbulb className="w-8 h-8 text-[#009edb]" />
              <h2 className="text-3xl md:text-4xl font-bold text-theme">Latest Insights</h2>
            </div>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Stay informed with our latest research, industry analysis, and thought leadership
              on technology, business, and innovation trends.
            </p>
          </div>

          {/* Empty State */}
          <div className="text-center py-16">
            <Lightbulb className="w-16 h-16 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-theme mb-2">Insights Coming Soon</h3>
            <p className="text-muted mb-6 max-w-2xl mx-auto">
              We're working on bringing you valuable insights and thought leadership content.
              Check back soon for the latest industry trends and analysis.
            </p>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 bg-[#009edb] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0077a3] transition-colors shadow-lg hover:shadow-xl"
            >
              Visit Insights Page
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    );
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
          title="Insights"
          description="Explore our latest insights and perspectives"
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