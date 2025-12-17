'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IndiaMap from '@/components/ui/IndiaMap';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const locations = [
  {
    label: "Head Office - Lucknow",
    title: "HEAD OFFICE",
    address: "1st floor, 34/5 Gokhale Marg, Lucknow, U.P. (India) – 226001",
    phones: ["0522-4004652", "0522-2205072"],
    email: "admin@asija.in",
    lat: 26.8542,
    lng: 80.9442,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Asija+Associates+Lucknow+Gokhale+Marg"
  },
  {
    label: "Branch Office - Bengaluru",
    title: "BRANCH OFFICE - BENGALURU",
    address: "B-1203 Mantri Greens Apartment, Next to Mantri Square Mall, Malleshwaram, Bengaluru 560003",
    phone: "+91-8860082758",
    email: "admin@asija.in",
    lat: 12.9915,
    lng: 77.5702,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Mantri+Greens+Apartment+Bengaluru"
  }
];

export default function LocationsPage() {
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-800"
            >
              <IndiaMap locations={locations} />
              <p className="text-center text-sm text-gray-500 mt-4">
                Interactive Map: Click on a location to view on Google Maps
              </p>
            </motion.div>

            {/* Address Cards */}
            <div className="space-y-6">
              {locations.map((loc, idx) => (
                <motion.div
                  key={idx}
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
                        
                        {(loc.phones || loc.phone) && (
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-[#009edb] shrink-0" />
                            <div className="text-sm">
                              {loc.phones ? (
                                loc.phones.map((p, i) => (
                                  <span key={i} className="block">{p}</span>
                                ))
                              ) : (
                                <span>{loc.phone}</span>
                              )}
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
