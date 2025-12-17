'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2, Calendar, Folder, ChevronRight } from 'lucide-react';
import GalleryCarousel from '@/components/GalleryCarousel';
import { getOptimizedImageUrl } from '@/lib/utils';

type GalleryItem = {
  _id: string;
  title: string;
  date: string;
  category: string;
  year: string;
  description: string;
  thumbnail?: string;
  images: string[];
};

export default function GalleryPage() {
  const [events, setEvents] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<GalleryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/admin/gallery');
        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data);
        }
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(events.map(e => e.category || 'Uncategorized'));
    return Array.from(cats).sort();
  }, [events]);

  // Extract unique years for selected category
  const years = useMemo(() => {
    if (!selectedCategory) return [];
    const categoryEvents = events.filter(e => (e.category || 'Uncategorized') === selectedCategory);
    const yrs = new Set(categoryEvents.map(e => e.year || new Date(e.date).getFullYear().toString()));
    return Array.from(yrs).sort((a, b) => b.localeCompare(a)); // Descending
  }, [events, selectedCategory]);

  // Filter events
  const filteredEvents = useMemo(() => {
    if (!selectedCategory) return [];
    let filtered = events.filter(e => (e.category || 'Uncategorized') === selectedCategory);
    if (selectedYear) {
      filtered = filtered.filter(e => (e.year || new Date(e.date).getFullYear().toString()) === selectedYear);
    }
    return filtered;
  }, [events, selectedCategory, selectedYear]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left flex flex-col mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Gallery <span className='text-[#0077A3] text-5xl'>.</span></h1>
            <p className="text-lg text-gray-400 dark:text-gray-400  ">
              Glimpses of our events, celebrations, and moments of togetherness at Asija & Associates LLP.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No gallery events found.</p>
            </div>
          ) : (
            <>
              {/* Breadcrumb / Navigation */}
              <div className="flex items-center gap-2 mb-8 text-sm text-gray-600 dark:text-gray-400">
                <button 
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedYear(null);
                  }}
                  className={`hover:text-blue-600 ${!selectedCategory ? 'font-bold text-blue-600' : ''}`}
                >
                  All Categories
                </button>
                {selectedCategory && (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <button
                      onClick={() => setSelectedYear(null)}
                      className={`hover:text-blue-600 ${!selectedYear ? 'font-bold text-blue-600' : ''}`}
                    >
                      {selectedCategory}
                    </button>
                  </>
                )}
                {selectedYear && (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span className="font-bold text-gray-900 dark:text-white">{selectedYear}</span>
                  </>
                )}
              </div>

              {!selectedCategory ? (
                // Categories View
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {categories.map((category, idx) => {
                    // Get latest image for thumbnail
                    const categoryEvents = events.filter(e => (e.category || 'Uncategorized') === category);
                    const thumbnail = categoryEvents[0]?.thumbnail || categoryEvents[0]?.images[0];
                    
                    return (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => setSelectedCategory(category)}
                        className="group cursor-pointer bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all"
                      >
                        <div className="aspect-video bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                          {thumbnail ? (
                            <img 
                              src={getOptimizedImageUrl(thumbnail, 600)} 
                              alt={category}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                              <Folder className="w-12 h-12" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300" />
                          <div className="absolute bottom-4 left-4 z-10">
                            <h3 className="text-xl font-bold text-white! drop-shadow-md" style={{ color: '#ffffff' }}>{category}</h3>
                            <p className="text-sm text-white/90! drop-shadow-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{categoryEvents.length} Events</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : !selectedYear ? (
                // Years View (Folders)
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {years.map((year, idx) => {
                    // Get latest image for thumbnail from this year
                    const yearEvents = events.filter(e => 
                      (e.category || 'Uncategorized') === selectedCategory && 
                      (e.year || new Date(e.date).getFullYear().toString()) === year
                    );
                    const thumbnail = yearEvents[0]?.thumbnail || yearEvents[0]?.images[0];

                    return (
                      <motion.div
                        key={year}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => setSelectedYear(year)}
                        className="group cursor-pointer bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all"
                      >
                        <div className="aspect-video bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                          {thumbnail ? (
                            <img 
                              src={getOptimizedImageUrl(thumbnail, 600)} 
                              alt={year}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                              <Folder className="w-12 h-12" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300" />
                          <div className="absolute bottom-4 left-4 z-10">
                            <h3 className="text-xl font-bold text-white! drop-shadow-md" style={{ color: '#ffffff' }}>{year}</h3>
                            <p className="text-sm text-white/90! drop-shadow-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{yearEvents.length} Events</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                // Events View (Grid)
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredEvents.map((event, idx) => (
                      <motion.div
                        key={event._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group cursor-pointer flex flex-col h-full"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4 shadow-sm group-hover:shadow-md transition-shadow rounded-xl">
                          {(event.thumbnail || event.images.length > 0) ? (
                            <img
                              src={getOptimizedImageUrl(event.thumbnail || event.images[0], 600)}
                              alt={event.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                              No Image
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                          
                          {/* Image count badge */}
                          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm !text-white text-xs px-2 py-1 rounded-full">
                            {event.images.length} Photos
                          </div>
                        </div>

                        <div className="flex flex-col flex-grow">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors mb-1">
                            {event.title}
                          </h3>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mb-2">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            <span className="mx-2">•</span>
                            <span>{event.year}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {filteredEvents.length === 0 && (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      No events found for this year.
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />

      {/* Full Screen Carousel */}
      {selectedEvent && (
        <GalleryCarousel 
          images={selectedEvent.images} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
}
