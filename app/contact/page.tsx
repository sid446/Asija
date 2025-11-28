'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/components/TranslationProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const offices = [
  {
    title: "HEAD OFFICE",
    address: "1st floor, 34/5 Gokhale Marg, Lucknow, U.P. (India) – 226001",
    phones: ["0522-4004652", "0522-2205072"],
    email: "admin@asija.in"
  },
  {
    title: "BRANCH OFFICE - BENGALURU",
    address: "B-1203 Mantri Greens Apartment, Next to Mantri Square Mall, Malleshwaram, Bengaluru 560003",
    phone: "+91-8860082758",
    email: "admin@asija.in"
  },
  {
    title: "BRANCH OFFICE - JAIPUR",
    address: "Mehai Building Flat No.-G-1, A-43 Mangalam City Village Hatoj Kalwar Road, Jaipur - 302012",
    phone: "+91-9473560308",
    email: "admin@asija.in"
  }
];

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    topic: 'Chartered Accounting Services',
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
          topic: 'Chartered Accounting Services',
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
          <h2 className="text-accent font-medium text-lg tracking-wider mb-2">{t('contact.tagline')}</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-theme mb-6">{t('contact.title')} <span className="text-accent">.</span></h1>
          <p className="text-muted text-lg">{t('contact.description')}</p>
        </motion.div>

        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface p-6 md:p-8 rounded-2xl border border-theme/10 shadow-lg"
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

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-theme">Topic *</label>
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-theme/5 border border-theme/10 text-theme focus:outline-none focus:border-accent transition-colors"
                    required
                  >
                    <option value="Chartered Accounting Services">Chartered Accounting Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-theme">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full p-3 rounded-lg bg-theme/5 border border-theme/10 text-theme focus:outline-none focus:border-accent transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-theme">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full p-3 rounded-lg bg-theme/5 border border-theme/10 text-theme focus:outline-none focus:border-accent transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-theme">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full p-3 rounded-lg bg-theme/5 border border-theme/10 text-theme focus:outline-none focus:border-accent transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-theme">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="w-full p-3 rounded-lg bg-theme/5 border border-theme/10 text-theme focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-theme">Job Title</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder="Manager"
                      className="w-full p-3 rounded-lg bg-theme/5 border border-theme/10 text-theme focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-theme">Zipcode</label>
                    <input
                      type="text"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleChange}
                      placeholder="123456"
                      className="w-full p-3 rounded-lg bg-theme/5 border border-theme/10 text-theme focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-theme">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className="w-full p-3 rounded-lg bg-theme/5 border border-theme/10 text-theme focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-theme">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full p-3 rounded-lg bg-theme/5 border border-theme/10 text-theme focus:outline-none focus:border-accent transition-colors resize-none"
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

          {/* RIGHT: Office Locations */}
          <div className="space-y-8">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                className="bg-surface p-6 rounded-xl border border-theme/10 hover:border-accent/30 transition-colors group"
              >
                <h3 className="text-xl font-bold text-theme mb-4 border-b border-theme/10 pb-2 group-hover:text-accent transition-colors">
                  {office.title}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 rounded-full bg-theme/5 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-muted text-sm leading-relaxed">
                      {office.address}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 rounded-full bg-theme/5 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-accent" />
                    </div>
                    <div className="text-muted text-sm">
                      {office.phones ? (
                        office.phones.map((phone, i) => (
                          <div key={i}>{phone}</div>
                        ))
                      ) : (
                        <div>{office.phone}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 rounded-full bg-theme/5 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-accent" />
                    </div>
                    <a href={`mailto:${office.email}`} className="text-muted text-sm hover:text-accent transition-colors">
                      {office.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
