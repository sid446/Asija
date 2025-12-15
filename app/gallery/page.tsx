'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2, Calendar } from 'lucide-react';
import GalleryCarousel from '@/components/GalleryCarousel';
import { getOptimizedImageUrl } from '@/lib/utils';

type GalleryItem = {
  _id: string;
  title: string;
  date: string;
  description: string;
  thumbnail?: string;
  images: string[];
};

export default function GalleryPage() {
  const [events, setEvents] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<GalleryItem | null>(null);

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Glimpses of our events, celebrations, and moments of togetherness at Asija & Associates LLP.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No gallery events found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {events.map((event, idx) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer flex flex-col h-full"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                    {(event.thumbnail || event.images.length > 0) ? (
                      <img
                        src={getOptimizedImageUrl(event.thumbnail || event.images[0], 600)}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Image count badge */}
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                      {event.images.length} Photos
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    {event.description && (
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
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
