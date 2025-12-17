'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AsiaMap from '@/components/ui/AsiaMap';
import { MapPin, Phone, Mail, ExternalLink, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
};

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('/api/admin/locations');
        const data = await res.json();
        if (Array.isArray(data)) {
          // Sort locations so "HEAD OFFICE" comes first
          const sortedLocations = data.sort((a: Location, b: Location) => {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
            
            if (titleA.includes('HEAD OFFICE')) return -1;
            if (titleB.includes('HEAD OFFICE')) return 1;
            return 0;
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
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Map Section */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-800"
              >
                <AsiaMap locations={locations} />
                <p className="text-center text-sm text-gray-500 mt-4">
                  Interactive Map: Click on a location to view on Google Maps
                </p>
              </motion.div>

              {/* Address Cards */}
              <div className="space-y-6">
                {locations.map((loc, idx) => (
                  <motion.div
                    key={loc._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow group cursor-pointer"
                    onClick={() => window.open(loc.googleMapsUrl, '_blank')}
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
                  </motion.div>
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
