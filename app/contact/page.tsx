'use client';

import React, { useState, useEffect } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type ContactContent = {
  tagline: string;
  title: string;
  description: string;
  officeLocations: string;
  officeLocation1: string;
  officeLocation2: string;
  contactNo: string;
  phone1: string;
  phone2: string;
  emails: string;
  email1: string;
  email2: string;
  enquiryForm: string;
  imageAlt: string;
  image: string;
};

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

export default function ContactPage() {
  const [content, setContent] = useState<ContactContent | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [formData, setFormData] = useState({
    topic: 'Audit and Assurance',
    industry: 'Banking and Financial Institutions',
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    zipcode: '',
    location: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [contentRes, locationsRes] = await Promise.all([
          fetch('/api/admin/contact-content'),
          fetch('/api/admin/locations')
        ]);
        
        const contentData = await contentRes.json();
        const locationsData = await locationsRes.json();

        if (contentData && !contentData.error) {
          setContent(contentData);
        }
        if (Array.isArray(locationsData)) {
          // Sort locations so "HEAD OFFICE" comes first
          const sortedLocations = locationsData.sort((a, b) => {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
            
            if (titleA.includes('HEAD OFFICE')) return -1;
            if (titleB.includes('HEAD OFFICE')) return 1;
            return 0;
          });
          setLocations(sortedLocations);
        }
      } catch (err) {
        console.error('Failed to fetch contact content:', err);
      }
    };
    fetchContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setFormData({
          topic: 'Audit and Assurance',
          industry: 'Banking and Financial Institutions',
          name: '',
          email: '',
          phone: '',
          company: '',
          jobTitle: '',
          zipcode: '',
          location: '',
          message: ''
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-theme">
      <Navbar />
      <div className="flex-1 w-full flex flex-col items-center px-4 md:px-8 lg:px-16 py-32 overflow-hidden">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl"
        >
          <h2 className="text-accent font-medium text-lg tracking-wider mb-2">Get In Touch</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-theme mb-6">Contact Us <span className="text-accent">.</span></h1>
          <p className="text-muted text-lg">Ready to discuss your business needs? Reach out to our experts for personalized solutions.</p>
        </motion.div>

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface p-6 md:p-8 rounded-2xl border border-theme/10 shadow-lg h-fit"
          >
            <h3 className="text-2xl font-bold text-theme mb-6">Get in Touch</h3>
            
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-xl font-bold text-theme mb-2">Message Sent!</h4>
                <p className="text-muted">Thank you for contacting us. We will get back to you shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-accent hover:underline font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && (
                  <div className="bg-red-500/10 text-red-500 p-3 rounded-lg flex items-center gap-2 text-sm">
                    <AlertCircle size={16} /> {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">Service *</label>
                    <select
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:outline-none focus:border-[#009edb] transition-colors"
                      required
                    >
                      <option value="Audit and Assurance">Audit and Assurance</option>
                      <option value="Direct Tax">Direct Tax</option>
                      <option value="Corporate Law Services">Corporate Law Services</option>
                      <option value="Banking & Finance">Banking & Finance</option>
                      <option value="Consultancy">Consultancy</option>
                      <option value="Indirect Tax">Indirect Tax</option>
                      <option value="Risk Advisory Services">Risk Advisory Services</option>
                      <option value="Global Services">Global Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">Industry *</label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:outline-none focus:border-[#009edb] transition-colors"
                      required
                    >
                      <option value="Banking and Financial Institutions">Banking and Financial Institutions</option>
                      <option value="Education">Education</option>
                      <option value="Hospitality and Healthcare">Hospitality and Healthcare</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Media and Entertainment">Media and Entertainment</option>
                      <option value="Realty Sector">Realty Sector</option>
                      <option value="Retail, White Goods & Consumer Electronics">Retail, White Goods & Consumer Electronics</option>
                      <option value="Telecom">Telecom</option>
                      <option value="Textiles">Textiles</option>
                      <option value="Trading">Trading</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:border-[#009edb] transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:border-[#009edb] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:border-[#009edb] transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:border-[#009edb] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">Job Title</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder="Manager"
                      className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:border-[#009edb] transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">Zipcode</label>
                    <input
                      type="text"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleChange}
                      placeholder="123456"
                      className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:border-[#009edb] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:border-[#009edb] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full p-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:border-[#009edb] transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3 px-6 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right Column: All Branches Section */}
          {locations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full"
            >
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Our Offices</h2>
              <div className="grid grid-cols-1 gap-6 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                {locations.map((loc) => (
                  <div key={loc._id} className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-[#009edb] mb-4">{loc.title}</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{loc.address}</p>
                      </div>
                      {loc.phones && loc.phones.length > 0 && (
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
                          <div className="text-gray-600 dark:text-gray-300 text-sm">
                            {loc.phones.map(p => <p key={p}>{p}</p>)}
                          </div>
                        </div>
                      )}
                      {loc.email && (
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
                          <a href={`mailto:${loc.email}`} className="text-gray-600 dark:text-gray-300 text-sm hover:text-[#009edb] break-all">{loc.email}</a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}
