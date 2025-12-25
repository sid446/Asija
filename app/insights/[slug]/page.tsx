"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, User, ArrowLeft, Share2, Lightbulb, Trash2 } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchInsights } from '@/lib/store/slices/insightsSlice';
import type { Insight } from '@/lib/store/slices/insightsSlice';


interface InsightPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function InsightPage({ params }: InsightPageProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const dispatch = useAppDispatch();
  const { fullInsights, fullFetched } = useAppSelector((state) => state.insights);
  const [slug, setSlug] = useState<string>('');
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedInsights, setRelatedInsights] = useState<Insight[]>([]);

  useEffect(() => {
    if (!fullFetched) {
      dispatch(fetchInsights());
    }
  }, [dispatch, fullFetched]);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (slug) {
      fetchInsight();
    }
  }, [slug, fullInsights]);

  const fetchInsight = async () => {
    try {
      const response = await fetch(`/api/insights/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setInsight(data);

        // Use fullInsights for related if available
        if (fullInsights.length > 0) {
          const related = fullInsights
            .filter((i) => i.category === data.category && i._id !== data._id)
            .slice(0, 3);
          setRelatedInsights(related);
        }
      } else if (response.status === 404) {
        // Handle 404 by showing not found state
        setInsight(null);
      }
    } catch (error) {
      console.error('Error fetching insight:', error);
      setInsight(null);
    } finally {
      setLoading(false);
    }
  };

  const shareInsight = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: insight?.title,
          text: insight?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // TEMP: Replace with real admin check
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true';

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this insight?')) return;
    try {
      const res = await fetch(`/api/admin/insights/${insight!._id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Insight deleted successfully!');
        router.push('/insights');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete insight');
      }
    } catch (err) {
      alert('Error deleting insight');
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isLight ? 'bg-[#68a5bd]' : 'bg-slate-950'} flex items-center justify-center transition-colors duration-300`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009edb] mx-auto mb-4"></div>
          <p className="text-theme">Loading insight...</p>
        </div>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className={`min-h-screen ${isLight ? 'bg-[#68a5bd]' : 'bg-slate-950'} flex items-center justify-center transition-colors duration-300`}>
        <div className="text-center max-w-md mx-auto px-4">
          <Lightbulb className="w-16 h-16 text-muted mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-theme mb-4">Insight Not Found</h1>
          <p className="text-muted mb-8">
            The insight you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 bg-[#009edb] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0077a3] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className={`min-h-screen bg-theme transition-colors duration-300`}>
      {/* Hero Section */}
      <div className="bg-linear-to-br from-[#009edb] to-[#0077a3] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-30">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-[#009edb] text-blue-100 text-sm font-medium rounded-full">
              {insight.category}
            </span>
            {insight.featured && (
              <span className="px-3 py-1 bg-yellow-500 text-yellow-100 text-sm font-medium rounded-full">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-theme">
            {insight.title}
          </h1>

          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            {insight.description}
          </p>

          <div className="flex items-center gap-6 text-blue-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(insight.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <button
              onClick={shareInsight}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
            {isAdmin && (
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {insight.image && (
          <div className="mb-12">
            <img
              src={insight.image}
              alt={insight.title}
              className="w-full h-64 md:h-96 object-cover  shadow-lg"
            />
          </div>
        )}

        <div className="bg-card  shadow-lg p-8 md:p-12 border border-theme">
          <div
            className="prose prose-lg max-w-none text-theme"
            dangerouslySetInnerHTML={{
              __html: insight.content.replace(/\n/g, '<br />')
            }}
          />
        </div>

        {/* Related Insights */}
        {relatedInsights.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-theme mb-8">Related Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedInsights.map((relatedInsight) => (
                <Link
                  key={relatedInsight._id}
                  href={`/insights/${relatedInsight.slug}`}
                  className="bg-card rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group border border-theme"
                >
                  {relatedInsight.image && (
                    <img
                      src={relatedInsight.image}
                      alt={relatedInsight.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                  <div className="p-4">
                    <span className="px-2 py-1 bg-[#009edb]/10 text-[#009edb] text-xs font-medium rounded-full mb-2 inline-block">
                      {relatedInsight.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {relatedInsight.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedInsight.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-[#0077A3] rounded-2xl p-8 text-center text-white">
          
          <h3 className="text-2xl font-bold mb-4">Stay Updated with Our Latest Insights</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest insights, research, and industry perspectives directly in your inbox.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white  px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors" style={{color:"black"}}
          >
            Get in Touch <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}