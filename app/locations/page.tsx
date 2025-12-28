'use client';

import React, { useEffect, useState, Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, ExternalLink, Loader2 } from 'lucide-react';

// Lazy load the heavy AsiaMap component
const AsiaMap = dynamic(() => import('@/components/ui/AsiaMap'), {
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-slate-800 rounded-2xl">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Loading map...</p>
      </div>
    </div>
  ),
  ssr: false // Disable server-side rendering for the map
});

type Location = {
  _id: string;
  label: string;
  title: string;
  address: string;
  phones: string[];
  email: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  order: number;
};

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('/api/admin/locations');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (Array.isArray(data)) {
          // Sort locations by order field
          const sortedLocations = data.sort((a: Location, b: Location) => {
            return (a.order || 0) - (b.order || 0);
          });
          setLocations(sortedLocations);
        }
      } catch (error) {
        console.error('Failed to fetch locations', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const sortedLocations = useMemo(() => {
    return locations.sort((a: Location, b: Location) => {
      return (a.order || 0) - (b.order || 0);
    });
  }, [locations]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Locations</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Visit our offices across India. Click on the map markers or address cards for directions.
            </p>
          </div>

          {loading ? (
            <div className="space-y-8">
              {/* Map skeleton */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-800">
                <div className="h-96 bg-gray-200 dark:bg-slate-700 rounded-xl animate-pulse flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Loading map...</p>
                  </div>
                </div>
              </div>

              {/* Address cards skeleton */}
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
                    <div className="animate-pulse">
                      <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Map Section */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-800">
                {!mapLoaded ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Interactive Map</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">View all our locations on an interactive map</p>
                    <button
                      onClick={() => setMapLoaded(true)}
                      className="bg-[#009edb] hover:bg-[#0088cc] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      Load Map
                    </button>
                  </div>
                ) : (
                  <Suspense fallback={
                    <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-slate-800 rounded-xl">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">Loading map...</p>
                      </div>
                    </div>
                  }>
                    <AsiaMap locations={sortedLocations} />
                  </Suspense>
                )}
                <p className="text-center text-sm text-gray-500 mt-4">
                  Interactive Map: Click on a location to view on Google Maps
                </p>
              </div>

              {/* Address Cards */}
              <div className="space-y-6">
                {sortedLocations.map((loc, idx) => (
                  <div
                    key={loc._id}
                    className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:scale-[1.02]"
                    onClick={() => window.open(loc.googleMapsUrl, '_blank')}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-[#009edb] mb-2 group-hover:underline decoration-2 underline-offset-4">
                          {loc.title}
                        </h3>
                        <div className="space-y-3 text-gray-600 dark:text-gray-300">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-[#009edb] shrink-0 mt-0.5" />
                            <p className="text-sm leading-relaxed">{loc.address}</p>
                          </div>
                          
                          {loc.phones && loc.phones.length > 0 && (
                            <div className="flex items-center gap-3">
                              <Phone className="w-5 h-5 text-[#009edb] shrink-0" />
                              <div className="text-sm">
                                {loc.phones.map((p, i) => (
                                  <span key={i} className="block">{p}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-[#009edb] shrink-0" />
                            <a href={`mailto:${loc.email}`} className="text-sm hover:text-[#009edb] transition-colors">
                              {loc.email}
                            </a>
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#009edb] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
