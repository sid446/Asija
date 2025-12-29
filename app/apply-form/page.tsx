"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, XCircle, ArrowRight, Upload, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';
import Link from 'next/link';

// Reusable UI Components
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
		className={`flex min-h-[80px] w-full rounded-md border border-theme/20 bg-surface px-3 py-2 text-sm text-theme placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent disabled:cursor-not-allowed disabled:opacity-50 transition-all ${
			props.className || ''
		}`}
	/>
);

export default function ApplyFormPage() {
	const { theme } = useTheme();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState('');

	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		phone: '',
		position: '',
		department: '',
		experience: '',
		currentLocation: '',
		preferredLocation: '',
		age: '',
		gender: '',
		coverLetter: '',
		resume: null as File | null,
	});

	const isLight = theme === 'light';

	// Scroll to top when component mounts
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setFormData(prev => ({ ...prev, resume: file }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const submitData = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
				if (value !== null) {
					submitData.append(key, value);
				}
			});

			const response = await fetch('/api/career/applications', {
				method: 'POST',
				body: submitData,
			});

			if (response.ok) {
				setSubmitted(true);
			} else {
				const errorData = await response.json();
				setError(errorData.error || 'Failed to submit application');
			}
		} catch (err) {
			setError('Network error. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	if (submitted) {
		return (
			<div className={`min-h-screen flex flex-col ${isLight ? 'bg-white' : 'bg-slate-950'}`}>
				<Navbar />
				<div className="flex-1 flex items-center justify-center px-4">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						className={`max-w-md w-full p-8 rounded-2xl text-center ${
							isLight ? 'bg-white border border-gray-200' : 'bg-slate-900/50 border border-white/10'
						}`}
					>
						<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
						<h2 className={`text-2xl font-bold mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>
							Application Submitted!
						</h2>
						<p className={`mb-6 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
							Thank you for your interest in joining Asija & Associates LLP. We'll review your application and get back to you soon.
						</p>
						<div className="space-y-3">
							<Link href="/career" prefetch={false}>
								<InteractiveHoverButton text="View Open Positions" />
							</Link>
							<Link href="/" prefetch={false}>
								<InteractiveHoverButton text="Back to Home" className="bg-transparent border border-[#009edb] text-[#009edb] hover:bg-[#009edb] hover:text-white" />
							</Link>
						</div>
					</motion.div>
				</div>
				<Footer />
			</div>
		);
	}

	return (
		<div className={`min-h-screen flex flex-col ${isLight ? 'bg-white' : 'bg-slate-950'}`}>
			<Navbar />

			{/* Hero Section */}
			<div className="relative pt-32 pb-12 overflow-hidden">
				<div className="absolute inset-0 z-0">
					<div className={`absolute inset-0 ${isLight ? 'bg-[#149ffb]/70' : 'bg-slate-950'}`} />
					<div className={`absolute inset-0 opacity-30 ${isLight ? 'bg-[radial-gradient(#009edb_1px,transparent_1px)] [background-size:16px_16px]' : 'bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]'}`} />
					<div className={`absolute inset-0 bg-gradient-to-b ${isLight ? 'from-transparent via-white/50 to-white' : 'from-transparent via-slate-950/50 to-slate-950'}`} />
				</div>

				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
							Apply for a Position
						</h1>
						<p className={`text-lg max-w-2xl mx-auto ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
							Join our team and contribute to excellence in audit, tax, and advisory services.
						</p>
					</motion.div>
				</div>
			</div>

			{/* Application Form */}
			<div className="flex-1 py-12">
				<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className={`p-8 rounded-2xl ${
							isLight ? 'bg-white border border-gray-200' : 'bg-slate-900/50 border border-white/10'
						}`}
					>
						<div className="flex items-center gap-4 mb-6">
							<Link href="/career" prefetch={false}>
								<button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
									isLight ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-slate-800 text-gray-400'
								}`}>
									<ArrowLeft size={16} />
									Back to Career
								</button>
							</Link>
						</div>

						{error && (
							<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
								<XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
								<p className="text-red-700 text-sm">{error}</p>
							</div>
						)}

						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<Label htmlFor="fullName">Full Name *</Label>
									<Input
										id="fullName"
										name="fullName"
										type="text"
										required
										value={formData.fullName}
										onChange={handleInputChange}
										placeholder="Enter your full name"
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
										onChange={handleInputChange}
										placeholder="your.email@example.com"
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
										onChange={handleInputChange}
										placeholder="+91 XXXXX XXXXX"
									/>
								</div>
								<div>
									<Label htmlFor="position">Position Applied For *</Label>
									<Input
										id="position"
										name="position"
										type="text"
										required
										value={formData.position}
										onChange={handleInputChange}
										placeholder="e.g., Senior Auditor, Tax Consultant"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<Label htmlFor="department">Department</Label>
									<Select
										id="department"
										name="department"
										value={formData.department}
										onChange={handleInputChange}
									>
										<option value="">Select Department</option>
										<option value="Audit">Audit</option>
										<option value="Tax">Tax</option>
										<option value="Advisory">Advisory</option>
										<option value="Finance">Finance</option>
										<option value="Other">Other</option>
									</Select>
								</div>
								<div>
									<Label htmlFor="experience">Years of Experience</Label>
									<Select
										id="experience"
										name="experience"
										value={formData.experience}
										onChange={handleInputChange}
									>
										<option value="">Select Experience</option>
										<option value="0-1">0-1 years</option>
										<option value="1-3">1-3 years</option>
										<option value="3-5">3-5 years</option>
										<option value="5-10">5-10 years</option>
										<option value="10+">10+ years</option>
									</Select>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<Label htmlFor="currentLocation">Current Location</Label>
									<Input
										id="currentLocation"
										name="currentLocation"
										type="text"
										value={formData.currentLocation}
										onChange={handleInputChange}
										placeholder="e.g., New Delhi, Mumbai"
									/>
								</div>
								<div>
									<Label htmlFor="preferredLocation">Preferred Location</Label>
									<Input
										id="preferredLocation"
										name="preferredLocation"
										type="text"
										value={formData.preferredLocation}
										onChange={handleInputChange}
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
										onChange={handleInputChange}
										placeholder="Enter your age"
									/>
								</div>
								<div>
									<Label htmlFor="gender">Gender</Label>
									<Select
										id="gender"
										name="gender"
										value={formData.gender}
										onChange={handleInputChange}
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
								<Label htmlFor="coverLetter">Cover Letter</Label>
								<TextArea
									id="coverLetter"
									name="coverLetter"
									rows={4}
									value={formData.coverLetter}
									onChange={handleInputChange}
									placeholder="Tell us why you're interested in this position and what makes you a great fit..."
								/>
							</div>

							<div>
								<Label htmlFor="resume">Resume/CV *</Label>
								<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-[#009edb] transition-colors">
									<div className="space-y-1 text-center">
										<Upload className={`mx-auto h-12 w-12 ${isLight ? 'text-gray-400' : 'text-gray-500'}`} />
										<div className="flex text-sm text-gray-600">
											<label
												htmlFor="resume"
												className="relative cursor-pointer bg-white rounded-md font-medium text-[#009edb] hover:text-[#0077a3] focus-within:outline-none"
											>
												<span>Upload your resume</span>
												<input
													id="resume"
													name="resume"
													type="file"
													className="sr-only"
													accept=".pdf,.doc,.docx"
													required
													onChange={handleFileChange}
												/>
											</label>
											<p className="pl-1">or drag and drop</p>
										</div>
										<p className={`text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
											PDF, DOC, DOCX up to 10MB
										</p>
									</div>
								</div>
								{formData.resume && (
									<p className="mt-2 text-sm text-green-600">
										Selected: {formData.resume.name}
									</p>
								)}
							</div>

							<div className="flex justify-end">
								<InteractiveHoverButton
									type="submit"
									disabled={loading}
									className="w-full md:w-auto"
								>
									{loading ? (
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
					</motion.div>
				</div>
			</div>

			<Footer />
		</div>
	);
}