'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function AlumniForm() {
  const [step, setStep] = useState<'email' | 'otp' | 'details' | 'success'>('email');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    fullName: '',
    phone: '',
    yearOfLeaving: '',
    designationAtAsija: '',
    currentOrganization: '',
    currentDesignation: '',
    linkedinProfile: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/alumni/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep('otp');
        setMessage({ type: 'success', text: 'OTP sent to your email.' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to send OTP' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/alumni/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep('details');
        setMessage({ type: 'success', text: 'Email verified successfully.' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Invalid OTP' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/alumni/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStep('success');
      } else {
        setMessage({ type: 'error', text: data.message || 'Submission failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card p-8 rounded-2xl shadow-xl border border-theme/10">
      <h2 className="text-2xl font-bold text-theme mb-6 text-center">Alumni Registration</h2>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {message.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
          {message.text}
        </div>
      )}

      {step === 'email' && (
        <form onSubmit={sendOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-theme/5 border border-theme/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-theme"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-accent text-black font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Send OTP'}
          </button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={verifyOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted mb-1">Enter OTP</label>
            <input
              type="text"
              name="otp"
              required
              value={formData.otp}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-theme/5 border border-theme/20 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-theme"
              placeholder="123456"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-accent text-black font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Verify OTP'}
          </button>
          <button
            type="button"
            onClick={() => setStep('email')}
            className="w-full text-sm text-muted hover:text-accent transition-colors"
          >
            Change Email
          </button>
        </form>
      )}

      {step === 'details' && (
        <form onSubmit={submitForm} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Full Name</label>
              <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-theme/5 border border-theme/20 focus:border-accent outline-none text-theme" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Phone Number</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-theme/5 border border-theme/20 focus:border-accent outline-none text-theme" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Year of Leaving Asija</label>
                <input type="number" name="yearOfLeaving" required value={formData.yearOfLeaving} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-theme/5 border border-theme/20 focus:border-accent outline-none text-theme" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Designation at Asija</label>
                <input type="text" name="designationAtAsija" required value={formData.designationAtAsija} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-theme/5 border border-theme/20 focus:border-accent outline-none text-theme" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Current Organization</label>
              <input type="text" name="currentOrganization" required value={formData.currentOrganization} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-theme/5 border border-theme/20 focus:border-accent outline-none text-theme" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Current Designation</label>
              <input type="text" name="currentDesignation" required value={formData.currentDesignation} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-theme/5 border border-theme/20 focus:border-accent outline-none text-theme" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1">LinkedIn Profile (Optional)</label>
              <input type="url" name="linkedinProfile" value={formData.linkedinProfile} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-theme/5 border border-theme/20 focus:border-accent outline-none text-theme" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-accent text-black font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 flex justify-center items-center mt-6"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Submit Registration'}
          </button>
        </form>
      )}

      {step === 'success' && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h3 className="text-xl font-bold text-theme mb-2">Registration Submitted!</h3>
          <p className="text-muted">
            Your details have been sent to the admin for approval. You will receive an email once your profile is approved.
          </p>
        </div>
      )}
    </div>
  );
}
