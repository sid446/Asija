"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import { motion } from 'framer-motion';
import { Loader2, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RotatingText from '@/components/ui/RotatingText';

type Job = {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
};

export default function CareerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/career/jobs');
      const data = await res.json();
      if (data.success) {
        setJobs(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (job: Job) => {
    router.push(`/career/apply/${job._id}`);
  };

  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen flex flex-col ${isLight ? 'bg-white' : 'bg-slate-950'}`}>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-3 overflow-hidden">
        <div className="absolute inset-0 z-0">
           {/* Background Image/Gradient */}
           <div className={`absolute inset-0 ${isLight ? 'bg-[#149ffb]/70' : 'bg-slate-950'}`} />
           <div className={`absolute inset-0 opacity-30 ${isLight ? 'bg-[radial-gradient(#009edb_1px,transparent_1px)] [background-size:16px_16px]' : 'bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]'}`} />
           <div className={`absolute inset-0 bg-gradient-to-b ${isLight ? 'from-transparent via-white/50 to-white' : 'from-transparent via-slate-950/50 to-slate-950'}`} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Build Your Career <br className="hidden md:block" />
              <span className="flex flex-wrap justify-center items-center gap-2 md:gap-3">
                With
                <RotatingText
                  texts={['Excellence', 'Innovation', 'Integrity', 'Passion']}
                  mainClassName="text-[#009edb] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={4000}
                />
              </span>
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
              Join Asija & Associates LLP and become part of a team that values integrity, innovation, and professional growth.
            </p>
          </motion.div>
        </div>
      </div>

     

      {/* Job Listings */}
      <div id="openings" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Current <span className="text-[#009edb]">Openings</span>
            </h2>
            <p className={`${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
              Explore opportunities to make an impact.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[#009edb]" />
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job, idx) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative p-6 md:p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  isLight 
                    ? 'bg-white border-gray-200 hover:border-[#009edb]' 
                    : 'bg-slate-900/50 border-white/10 hover:border-[#009edb]/50'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#009edb]/10 text-[#009edb]">
                        {job.department}
                      </span>
                      <span className={`text-xs flex items-center gap-1 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                        <Briefcase size={12} /> {job.type}
                      </span>
                      <span className={`text-xs flex items-center gap-1 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                        <MapPin size={12} /> {job.location}
                      </span>
                    </div>
                    <h3 className={`text-2xl font-bold mb-3 group-hover:text-[#009edb] transition-colors ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {job.title}
                    </h3>
                    <p className={`mb-4 max-w-3xl line-clamp-2 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                      {job.description}
                    </p>
                    
                    {/* Requirements Preview */}
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.slice(0, 3).map((req, i) => (
                        <span key={i} className={`text-xs px-2 py-1 rounded border ${isLight ? 'bg-gray-50 border-gray-200 text-gray-600' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                          {req}
                        </span>
                      ))}
                      {job.requirements.length > 3 && (
                        <span className={`text-xs px-2 py-1 rounded border ${isLight ? 'bg-gray-50 border-gray-200 text-gray-600' : 'bg-white/5 border-white/10 text-gray-400'}`}>
                          +{job.requirements.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={() => handleApply(job)}
                      className="w-full md:w-auto px-6 py-3 rounded-lg bg-[#009edb] text-white font-medium hover:bg-[#008ac0] transition-all flex items-center justify-center gap-2 group-hover:scale-105"
                    >
                      Apply Now <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}


