'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';
import CTA from '@/components/ui/CTA';
import Link from 'next/link';
import { Globe, TrendingUp, ShieldCheck, Laptop, BarChart3, Users } from 'lucide-react';

const regions = [
  { name: 'UAE', href: '/global-services/uae', image: 'https://images.unsplash.com/flagged/photo-1554992369-085dc418ee00?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'UK', href: '/global-services/uk', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1470&auto=format&fit=crop' },
  { name: 'Australia', href: '/global-services/australia', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2130&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Canada', href: '/global-services/canada', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1470&auto=format&fit=crop' },
  { name: 'USA', href: '/global-services/usa', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1499&auto=format&fit=crop' },
];

const services = [
  {
    title: 'Accounting & Bookkeeping',
    description: 'Precision-driven financial record keeping ensuring compliance and clarity for your global operations.',
    icon: <ShieldCheck className="w-8 h-8 text-[#009edb]" />,
  },
  {
    title: 'Virtual CFO & CEO Services',
    description: 'Strategic leadership and financial guidance to help you navigate complex markets and drive growth.',
    icon: <Users className="w-8 h-8 text-[#009edb]" />,
  },
  {
    title: 'MIS & Tech Solutions',
    description: 'Data-driven insights and technology integration to optimize your management information systems.',
    icon: <Laptop className="w-8 h-8 text-[#009edb]" />,
  },
  {
    title: 'KPO Services',
    description: 'Knowledge Process Outsourcing solutions that enhance operational efficiency and reduce costs.',
    icon: <BarChart3 className="w-8 h-8 text-[#009edb]" />,
  },
];

export default function GlobalServices() {
  return (
    <div className="w-full min-h-screen bg-slate-950 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/60 to-slate-950 z-10" />
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="https://res.cloudinary.com/db2qa9dzs/video/upload/v1764353942/1851190-uhd_3840_2160_25fps_a9d0fu.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6" style={{color:"white"}}
          >
            Asija Global Services<span className="text-[#009edb]">.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl  max-w-3xl mx-auto leading-relaxed" style={{color:"white"}}
          >
            Empowering organizations worldwide with premier KPO, Financial, and Technology solutions.
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-slate-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Global Expertise, <br />
              <span className="text-[#009edb]">Local Precision.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Asija Global Services is a dedicated KPO vertical providing world-class Accounting, Bookkeeping, CFO, and CEO services. We integrate advanced MIS and Tech solutions to streamline operations for organizations across the globe.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether you are expanding into new markets or optimizing existing operations, our team delivers the strategic insight and operational excellence you need to succeed.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#009edb]/50 transition-colors"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2" >{service.title}</h3>
                <p className="text-sm" >{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#020617]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{color:"white"}}>Our Global Presence</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Serving clients across key international markets with tailored solutions that respect local regulations and global standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region, index) => (
              <Link href={region.href} key={index}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer bg-slate-900"
                >
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                       style={{ backgroundImage: `url(${region.image})` }} />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-bold " style={{color:"white"}}>{region.name}</h3>
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[#009edb] transition-colors">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <p className=" mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0"  style={{color:"white"}}>
                      Explore our services in {region.name}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
