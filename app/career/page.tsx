"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, MapPin, Briefcase, Clock, CheckCircle2, X } from 'lucide-react';
import Navbar from '@/components/Navbar';

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
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    setSelectedJob(job);
    setIsFormOpen(true);
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 px-4 md:px-8 ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-950'}`}>
        <Navbar/>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            Join Our <span className="text-[#009edb]">Team</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Build your career with Asija & Associates LLP. We are always looking for talented individuals to join our growing family.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[#009edb]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl p-6 border transition-all hover:shadow-lg ${
                  theme === 'light' 
                    ? 'bg-white border-gray-200 hover:border-[#009edb]/30' 
                    : 'bg-white/5 border-white/10 hover:border-[#009edb]/30'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#009edb]/10 text-[#009edb] mb-2">
                      {job.department}
                    </span>
                    <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      {job.title}
                    </h3>
                  </div>
                  {/* <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span> */}
                </div>

                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <div className={`flex items-center gap-1.5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    <MapPin size={16} />
                    {job.location}
                  </div>
                  <div className={`flex items-center gap-1.5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    <Briefcase size={16} />
                    {job.type}
                  </div>
                </div>

                <p className={`mb-6 text-sm leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {job.description}
                </p>

                <div className="mb-6">
                  <h4 className={`text-sm font-semibold mb-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Requirements:</h4>
                  <ul className="space-y-1">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className={`text-sm flex items-start gap-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#009edb]" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleApply(job)}
                  className="w-full py-3 rounded-lg bg-[#009edb] text-white font-medium hover:bg-[#008ac0] transition-colors"
                >
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ApplicationModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        job={selectedJob}
        theme={theme}
      />
    </div>
  );
}

function ApplicationModal({ isOpen, onClose, job, theme }: { isOpen: boolean; onClose: () => void; job: Job | null; theme: string }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    currentCTC: '',
    expectedCTC: '',
    resumeLink: '',
    coverLetter: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !job) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/career/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, jobId: job._id }),
      });
      
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            qualification: '',
            experience: '',
            currentCTC: '',
            expectedCTC: '',
            resumeLink: '',
            coverLetter: ''
          });
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = `w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${
    theme === 'light' 
      ? 'bg-white border-gray-300 focus:border-[#009edb] text-gray-900' 
      : 'bg-white/5 border-white/10 focus:border-[#009edb] text-white'
  }`;

  const labelClasses = `block text-sm font-medium mb-1.5 ${
    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
  }`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
          theme === 'light' ? 'bg-white' : 'bg-slate-900 border border-white/10'
        }`}
      >
        <div className={`sticky top-0 z-10 px-6 py-4 border-b flex justify-between items-center ${
          theme === 'light' ? 'bg-white border-gray-100' : 'bg-slate-900 border-white/10'
        }`}>
          <div>
            <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              Apply for {job.title}
            </h2>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              {job.department} • {job.location}
            </p>
          </div>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
              theme === 'light' ? 'text-gray-500 hover:bg-gray-100' : 'text-gray-400 hover:bg-white/10'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                Application Submitted!
              </h3>
              <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                Thank you for your interest. We will review your application and get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Full Name *</label>
                  <input 
                    type="text" 
                    required
                    className={inputClasses}
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Email *</label>
                  <input 
                    type="email" 
                    required
                    className={inputClasses}
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    className={inputClasses}
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Qualification *</label>
                  <select 
                    required
                    className={inputClasses}
                    value={formData.qualification}
                    onChange={e => setFormData({...formData, qualification: e.target.value})}
                  >
                    <option value="">Select Qualification</option>
                    <option value="CA Final">CA Final</option>
                    <option value="CA Intermediate">CA Intermediate</option>
                    <option value="CA Foundation">CA Foundation</option>
                    <option value="B.Com">B.Com</option>
                    <option value="M.Com">M.Com</option>
                    <option value="MBA">MBA</option>
                    <option value="CS">CS</option>
                    <option value="CMA">CMA</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Experience (Years) *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Fresher, 2 years"
                    className={inputClasses}
                    value={formData.experience}
                    onChange={e => setFormData({...formData, experience: e.target.value})}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Resume Link (Google Drive/LinkedIn)</label>
                  <input 
                    type="url" 
                    placeholder="https://..."
                    className={inputClasses}
                    value={formData.resumeLink}
                    onChange={e => setFormData({...formData, resumeLink: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Current CTC (Optional)</label>
                  <input 
                    type="text" 
                    className={inputClasses}
                    value={formData.currentCTC}
                    onChange={e => setFormData({...formData, currentCTC: e.target.value})}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Expected CTC (Optional)</label>
                  <input 
                    type="text" 
                    className={inputClasses}
                    value={formData.expectedCTC}
                    onChange={e => setFormData({...formData, expectedCTC: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Cover Letter / Message</label>
                <textarea 
                  rows={4}
                  className={inputClasses}
                  value={formData.coverLetter}
                  onChange={e => setFormData({...formData, coverLetter: e.target.value})}
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#009edb] text-white font-semibold rounded-lg hover:bg-[#008ac0] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
