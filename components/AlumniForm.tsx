'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, XCircle, ExternalLink, CircleCheck, Mail, ArrowRight } from 'lucide-react';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';

const benefits = [
	{
		id: 1,
		feature: 'Exclusive networking events',
	},
	{
		id: 2,
		feature: 'Career opportunities & mentorship',
	},
	{
		id: 3,
		feature: 'Stay updated with Asija news',
	},
	{
		id: 4,
		feature: 'Access to alumni directory',
	},
];

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

export default function AlumniForm() {
	const [step, setStep] = useState<'email' | 'otp' | 'details' | 'success'>(
		'email'
	);
	const [loading, setLoading] = useState(false);
	const otpRequestRef = useRef(false);
	const [message, setMessage] = useState<
		{ type: 'success' | 'error'; text: string } | null
	>(null);

	const [formData, setFormData] = useState({
		email: '',
		otp: '',
		fullName: '',
		phone: '',
		yearOfLeaving: '',
		designationAtAsija: '',
		currentProfessionalQualification: '',
		currentDesignation: '',
		linkedinProfile: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const sendOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		if (loading || otpRequestRef.current) return; // Prevent double execution
		
		setLoading(true);
		otpRequestRef.current = true;
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
				setMessage({
					type: 'error',
					text: data.message || 'Failed to send OTP',
				});
			}
		} catch (error) {
			setMessage({ type: 'error', text: 'Something went wrong.' });
		} finally {
			setLoading(false);
			otpRequestRef.current = false;
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
		<div className="flex items-center justify-center p-4 sm:p-10 w-full">
			<div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 w-full max-w-7xl">
				{/* Left Column: Form */}
				<div className="lg:col-span-7">
					<div className="space-y-6">
						<div>
							<h3 className="text-xl font-semibold text-theme">
								{step === 'email' && 'Join the Alumni Network'}
								{step === 'otp' && 'Verify Your Email'}
								{step === 'details' && 'Complete Your Profile'}
								{step === 'success' && 'Registration Complete'}
							</h3>
							<p className="text-sm text-muted mt-1">
								{step === 'email' && 'Enter your email to get started.'}
								{step === 'otp' && `We sent a code to ${formData.email}`}
								{step === 'details' && 'Tell us a bit about yourself.'}
								{step === 'success' && 'Thank you for joining!'}
							</p>
						</div>

						{message && (
							<div
								className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
									message.type === 'success'
										? 'bg-green-500/10 text-green-500'
										: 'bg-red-500/10 text-red-500'
								}`}
							>
								{message.type === 'success' ? (
									<CheckCircle size={16} />
								) : (
									<XCircle size={16} />
								)}
								{message.text}
							</div>
						)}

						{step === 'email' && (
							<form onSubmit={sendOtp} className="space-y-4">
								<div>
									<Label htmlFor="email">Email Address</Label>
									<div className="relative">
										<Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted" />
										<Input
											id="email"
											name="email"
											type="email"
											placeholder="you@example.com"
											required
											value={formData.email}
											onChange={handleChange}
											className="pl-10"
										/>
									</div>
								</div>
								<div className="flex justify-end">
									<InteractiveHoverButton
										type="submit"
										disabled={loading}
										className="w-full sm:w-auto"
										text={loading ? "Sending..." : "Send OTP"}
									/>
								</div>
							</form>
						)}

						{step === 'otp' && (
							<form onSubmit={verifyOtp} className="space-y-4">
								<div>
									<Label htmlFor="otp">One-Time Password</Label>
									<Input
										id="otp"
										name="otp"
										type="text"
										placeholder="Enter 6-digit code"
										required
										value={formData.otp}
										onChange={handleChange}
										className="text-center tracking-widest text-lg"
										maxLength={6}
									/>
								</div>
								<div className="flex flex-col sm:flex-row gap-3 justify-end items-center">
									<button
										type="button"
										onClick={() => setStep('email')}
										className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 hover:bg-theme/10 text-theme"
									>
										Change Email
									</button>
									<InteractiveHoverButton 
										type="submit" 
										disabled={loading}
										text={loading ? "Verifying..." : "Verify OTP"}
									/>
								</div>
							</form>
						)}

						{step === 'details' && (
							<form onSubmit={submitForm} className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="md:col-span-2">
										<Label htmlFor="email-display">Email Address</Label>
										<Input
											id="email-display"
											value={formData.email}
											disabled
											className="bg-theme/5 text-muted cursor-not-allowed"
										/>
									</div>

									<div className="md:col-span-2">
										<Label htmlFor="fullName">Full Name</Label>
										<Input
											id="fullName"
											name="fullName"
											required
											value={formData.fullName}
											onChange={handleChange}
										/>
									</div>

									<div>
										<Label htmlFor="phone">Phone Number</Label>
										<Input
											id="phone"
											name="phone"
											type="tel"
											required
											value={formData.phone}
											onChange={handleChange}
										/>
									</div>

									<div>
										<Label htmlFor="yearOfLeaving">Year of Leaving</Label>
										<Input
											id="yearOfLeaving"
											name="yearOfLeaving"
											type="number"
											required
											value={formData.yearOfLeaving}
											onChange={handleChange}
										/>
									</div>

									<div>
										<Label htmlFor="designationAtAsija">Designation at Asija</Label>
										<Input
											id="designationAtAsija"
											name="designationAtAsija"
											required
											value={formData.designationAtAsija}
											onChange={handleChange}
										/>
									</div>

									<div>
										<Label htmlFor="currentProfessionalQualification">Current Professional Qualification</Label>
										<Input
											id="currentProfessionalQualification"
											name="currentProfessionalQualification"
											required
											value={formData.currentProfessionalQualification}
											onChange={handleChange}
										/>
									</div>

									<div className="md:col-span-2">
										<Label htmlFor="currentDesignation">Current Designation</Label>
										<Input
											id="currentDesignation"
											name="currentDesignation"
											required
											value={formData.currentDesignation}
											onChange={handleChange}
										/>
									</div>

									<div className="md:col-span-2">
										<Label htmlFor="linkedinProfile">LinkedIn Profile (Optional)</Label>
										<Input
											id="linkedinProfile"
											name="linkedinProfile"
											type="url"
											value={formData.linkedinProfile}
											onChange={handleChange}
											placeholder="https://linkedin.com/in/..."
										/>
									</div>
								</div>

								<div className="flex justify-end pt-4">
									<InteractiveHoverButton
										type="submit"
										disabled={loading}
										className="w-full sm:w-auto"
										text={loading ? "Submitting..." : "Complete Registration"}
									/>
								</div>
							</form>
						)}

						{step === 'success' && (
							<div className="text-center py-10 bg-surface rounded-lg border border-theme/10">
								<div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
									<CheckCircle size={32} />
								</div>
								<h3 className="text-xl font-bold text-theme mb-2">
									Registration Submitted!
								</h3>
								<p className="text-muted max-w-md mx-auto mb-6">
									Your details have been sent to the admin for approval. You will
									receive an email once your profile is approved.
								</p>
								<div className="flex justify-center">
									<InteractiveHoverButton
										onClick={() => (window.location.href = '/')}
										text="Return Home"
									/>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Right Column: Info Card */}
				<div className="lg:col-span-5">
					<div className="rounded-xl border border-theme/10 bg-surface shadow-sm overflow-hidden">
						<div className="p-6">
							<h4 className="text-sm font-semibold text-theme">
								Why join the Asija Alumni Network?
							</h4>
							<p className="mt-2 text-sm leading-6 text-muted">
								Stay connected with your former colleagues and be part of a growing
								community of professionals.
							</p>
							<ul className="mt-4 space-y-3">
								{benefits.map((item) => (
									<li
										key={item.id}
										className="flex items-start space-x-3 text-theme"
									>
										<CircleCheck className="h-5 w-5 text-accent shrink-0" />
										<span className="text-sm">{item.feature}</span>
									</li>
								))}
							</ul>
							<div className="mt-6 pt-6 border-t border-theme/10">
								<a
									href="/about"
									className="inline-flex items-center gap-1 text-sm text-accent hover:underline hover:underline-offset-4"
								>
									Learn more about Asija
									<ExternalLink className="h-4 w-4" aria-hidden={true} />
								</a>
							</div>
						</div>
						<div className="bg-theme/5 px-6 py-4">
							<p className="text-xs text-muted">
								Need help? Contact us at{' '}
								<a
									href="mailto:alumni@asija.com"
									className="text-accent hover:underline"
								>
									alumni@asija.com
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
