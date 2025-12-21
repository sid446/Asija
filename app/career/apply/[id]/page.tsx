"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, XCircle, ArrowRight, Briefcase, MapPin, ArrowLeft, Upload } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';
import Link from 'next/link';

// Reusable UI Components (from AlumniForm)
const Label = ({
	htmlFor,
	children,
	className = '',
}: {
	htmlFor?: string;
	children: React.ReactNode;
	className?: string;
}) => (
	<label
		htmlFor={htmlFor}
		className={`block text-sm font-medium text-theme mb-2 ${className}`}
	>
		{children}
	</label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
	<input
		{...props}
		className={`flex h-10 w-full rounded-md border border-theme/20 bg-surface px-3 py-2 text-sm text-theme placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent disabled:cursor-not-allowed disabled:opacity-50 transition-all ${
			props.className || ''
		}`}
	/>
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
	<select
		{...props}
		className={`flex h-10 w-full rounded-md border border-theme/20 bg-surface px-3 py-2 text-sm text-theme placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent disabled:cursor-not-allowed disabled:opacity-50 transition-all ${
			props.className || ''
		}`}
	/>
);

const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
	<textarea
		{...props}
		className={`flex w-full rounded-md border border-theme/20 bg-surface px-3 py-2 text-sm text-theme placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent disabled:cursor-not-allowed disabled:opacity-50 transition-all ${
			props.className || ''
		}`}
	/>
);

type Job = {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
};

export default function JobApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    currentLocation: '',
    preferredLocation: '',
    age: '',
    gender: '',
    currentCTC: '',
    expectedCTC: '',
    resumeLink: '',
    coverLetter: ''
  });

  useEffect(() => {
    const fetchJob = async () => {
      if (!params?.id) {
        setMessage({ type: 'error', text: 'Invalid job ID' });
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/career/jobs');
        const data = await res.json();
        if (data.success) {
          const foundJob = data.data.find((j: Job) => j._id === params.id);
          if (foundJob) {
            setJob(foundJob);
          } else {
            // Handle job not found
            setMessage({ type: 'error', text: 'Job not found' });
          }
        }
      } catch (error) {
        console.error('Failed to fetch job:', error);
        setMessage({ type: 'error', text: 'Failed to load job details' });
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchJob();
    }
  }, [params?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/career/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, jobId: job?._id || null }),
      });
      
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setMessage({ type: 'success', text: 'Application submitted successfully!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Submission failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong.' });
    } finally {
      setSubmitting(false);
    }
  };

  const isLight = theme === 'light';

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col ${isLight ? 'bg-white' : 'bg-slate-950'}`}>
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#009edb]" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className={`min-h-screen flex flex-col ${isLight ? 'bg-white' : 'bg-slate-950'}`}>
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center p-4">
            <h2 className="text-2xl font-bold text-theme mb-4">Job Not Found</h2>
            <InteractiveHoverButton onClick={() => router.push('/career')} text="Back to Careers" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${isLight ? 'bg-white' : 'bg-slate-950'}`}>
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <button 
            onClick={() => router.back()} 
            className="mb-8 pl-0 hover:bg-transparent hover:text-accent inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-10 py-2 text-theme"
        >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Openings
        </button>

        {/* Job Description Section */}
        <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                            {job.department}
                        </span>
                        <span className="text-xs flex items-center gap-1 text-muted">
                            <Briefcase size={12} /> {job.type}
                        </span>
                        <span className="text-xs flex items-center gap-1 text-muted">
                            <MapPin size={12} /> {job.location}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-theme mb-4">{job.title}</h1>
                </div>
            </div>

            <div className="prose max-w-none text-muted mb-8">
                <p className="text-lg leading-relaxed">{job.description}</p>
            </div>

            <div className="bg-surface rounded-xl p-6 border border-theme/10">
                <h3 className="text-lg font-semibold text-theme mb-4">Requirements</h3>
                <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, i) => (
                        <span key={i} className="text-sm px-3 py-1.5 rounded-md border border-theme/20 bg-theme/5 text-muted">
                            {req}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        {/* Application Form Section */}
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-theme mb-2">Apply for this Position</h2>
                <p className="text-muted">Please fill out the form below to submit your application.</p>
            </div>

            {submitted ? (
                <div className="text-center py-16 bg-surface rounded-xl border border-theme/10">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-theme mb-3">
                        Application Submitted!
                    </h3>
                    <p className="text-lg text-muted max-w-md mx-auto mb-8">
                        Thank you for your interest. We will review your application and get back to you soon.
                    </p>
                    <div className="flex justify-center">
                        <InteractiveHoverButton onClick={() => router.push('/career')} text="Browse More Jobs" />
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-6 md:p-10 rounded-xl border border-theme/10 shadow-sm">
                    {message && message.type === 'error' && (
                        <div className="p-4 rounded-lg bg-red-500/10 text-red-500 flex items-center gap-2 text-sm">
                            <XCircle size={16} /> {message.text}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input 
                                id="fullName"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input 
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input 
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 98765 43210"
                            />
                        </div>
                        <div>
                            <Label htmlFor="qualification">Qualification *</Label>
                            <Select 
                                id="qualification"
                                name="qualification"
                                required
                                value={formData.qualification}
                                onChange={handleChange}
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
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="experience">Experience (Years) *</Label>
                            <Input 
                                id="experience"
                                name="experience"
                                required
                                placeholder="e.g. Fresher, 2 years"
                                value={formData.experience}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="resumeLink">Resume Link (Drive/LinkedIn)</Label>
                            <div className="relative">
                                <Upload className="absolute left-3 top-2.5 h-5 w-5 text-muted" />
                                <Input 
                                    id="resumeLink"
                                    name="resumeLink"
                                    type="url"
                                    placeholder="https://..."
                                    className="pl-10"
                                    value={formData.resumeLink}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="currentCTC">Current CTC (Optional)</Label>
                            <Input 
                                id="currentCTC"
                                name="currentCTC"
                                value={formData.currentCTC}
                                onChange={handleChange}
                                placeholder="e.g. 6 LPA"
                            />
                        </div>
                        <div>
                            <Label htmlFor="expectedCTC">Expected CTC (Optional)</Label>
                            <Input 
                                id="expectedCTC"
                                name="expectedCTC"
                                value={formData.expectedCTC}
                                onChange={handleChange}
                                placeholder="e.g. 8 LPA"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="currentLocation">Current Location</Label>
                            <Input 
                                id="currentLocation"
                                name="currentLocation"
                                value={formData.currentLocation}
                                onChange={handleChange}
                                placeholder="e.g., New Delhi, Mumbai"
                            />
                        </div>
                        <div>
                            <Label htmlFor="preferredLocation">Preferred Location</Label>
                            <Input 
                                id="preferredLocation"
                                name="preferredLocation"
                                value={formData.preferredLocation}
                                onChange={handleChange}
                                placeholder="e.g., New Delhi, Mumbai"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="age">Age</Label>
                            <Input 
                                id="age"
                                name="age"
                                type="number"
                                min="18"
                                max="65"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="Enter your age"
                            />
                        </div>
                        <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="coverLetter">Cover Letter / Message</Label>
                        <TextArea 
                            id="coverLetter"
                            name="coverLetter"
                            rows={4}
                            value={formData.coverLetter}
                            onChange={handleChange}
                            placeholder="Tell us why you're a good fit..."
                        />
                    </div>

                    <div className="pt-4 flex justify-center">
                        <InteractiveHoverButton 
                            type="submit" 
                            disabled={submitting}
                            className="w-full md:w-auto"
                        >
                            {submitting ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Submitting...
                                </div>
                            ) : (
                                'Submit Application'
                            )}
                        </InteractiveHoverButton>
                    </div>
                </form>
            )}
        </div>
      </div>

      <section className="py-8 bg-background text-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <InteractiveHoverButton text="Home" className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90" />
            </Link>
            <Link href="/career">
              <InteractiveHoverButton text="Back to Openings" className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
