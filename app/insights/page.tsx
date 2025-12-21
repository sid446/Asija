"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Insight {
  _id: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  category: string;
  slug: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
}

export default function InsightsPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await fetch('/api/insights');
      if (response.ok) {
        const data = await response.json();
        setInsights(data);
      }
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(insights.map(insight => insight.category)))];
  const filteredInsights = selectedCategory === 'All'
    ? insights
    : insights.filter(insight => insight.category === selectedCategory);

  const featuredInsights = insights.filter(insight => insight.featured);
  const regularInsights = filteredInsights.filter(insight => !insight.featured);

  // TEMP: Replace with real admin check
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true';

  const handleDeleteInsight = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this insight?')) return;
    try {
      const res = await fetch(`/api/admin/insights/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInsights(prev => prev.filter(insight => insight._id !== id));
        alert('Insight deleted successfully!');
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading insights...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className={`min-h-screen bg-theme transition-colors duration-300`}>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#009edb] to-[#0077a3] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-left">
            <div className="flex items-center justify-left gap-3 mb-6">
              
              <h1 className="text-4xl md:text-5xl font-bold text-theme">Insights</h1>
            </div>
            <p className="text-xl text-blue-100  mx-auto">
              Discover our latest thoughts, research, and perspectives on industry trends,
              technology innovations, and business strategies.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Insights */}
        {featuredInsights.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-theme mb-8">Featured Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredInsights.map((insight) => (
                <div key={insight._id} className="bg-card   overflow-hidden hover:shadow-xl transition-shadow border border-theme">
                  {insight.image && (
                    <img
                      src={insight.image}
                      alt={insight.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-[#009edb]/10 text-[#009edb] text-sm font-medium rounded-full">
                        {insight.category}
                      </span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                    <h3 className="text-xl text-theme font-bold mb-3 line-clamp-2">
                      {insight.title}
                    </h3>
                    <p className="text-muted mb-4 line-clamp-3">
                      {insight.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(insight.createdAt).toLocaleDateString()}
                      </div>
                      <Link
                        href={`/insights/${insight.slug}`}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    {isAdmin && (
                      <button
                        className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                        onClick={() => handleDeleteInsight(insight._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#009edb] text-white'
                    : 'bg-card text-theme hover:bg-surface border border-theme'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* All Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularInsights.map((insight) => (
            <div key={insight._id} className="bg-card overflow-hidden hover:shadow-xl transition-shadow border border-theme">
              {insight.image && (
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#009edb]/10 text-[#009edb] text-sm font-medium rounded-full">
                    {insight.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-theme mb-3 line-clamp-2">
                  {insight.title}
                </h3>
                <p className="text-muted mb-4 line-clamp-3">
                  {insight.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Calendar className="w-4 h-4" />
                    {new Date(insight.createdAt).toLocaleDateString()}
                  </div>
                  <Link
                    href={`/insights/${insight.slug}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                {isAdmin && (
                  <button
                    className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                    onClick={() => handleDeleteInsight(insight._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {regularInsights.length === 0 && (
          <div className="text-center py-16">
            <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No insights found</h3>
            <p className="text-gray-600">
              {selectedCategory === 'All'
                ? 'Check back later for new insights and thought leadership content.'
                : `No insights found in the ${selectedCategory} category.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}