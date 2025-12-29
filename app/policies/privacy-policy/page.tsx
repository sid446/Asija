"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link
              href="/policies"
              prefetch={false}
              className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Policies
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-theme mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-muted mt-4">
              Last updated: December 18, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl shadow-sm border border-theme p-8 md:p-12"
          >
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-theme mb-6">1. Information We Collect</h2>
              <p className="text-muted mb-6 leading-relaxed">
                We collect information you provide directly to us, such as when you contact us, subscribe to our newsletter,
                or use our services. This may include your name, email address, phone number, and any other information
                you choose to provide.
              </p>

              <h2 className="text-2xl font-bold text-theme mb-6">2. How We Use Your Information</h2>
              <p className="text-muted mb-6 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted mb-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Communicate with you about products, services, offers, and events</li>
                <li>Monitor and analyze trends, usage, and activities</li>
              </ul>

              <h2 className="text-2xl font-bold text-theme mb-6">3. Information Sharing</h2>
              <p className="text-muted mb-6 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
                except as described in this policy. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted mb-6 space-y-2">
                <li>With service providers who assist us in operating our website and conducting our business</li>
                <li>When required by law or to protect our rights and safety</li>
                <li>In connection with a business transfer, such as a merger or sale of assets</li>
              </ul>

              <h2 className="text-2xl font-bold text-theme mb-6">4. Data Security</h2>
              <p className="text-muted mb-6 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
                internet is 100% secure.
              </p>

              <h2 className="text-2xl font-bold text-theme mb-6">5. Your Rights</h2>
              <p className="text-muted mb-6 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted mb-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Correct any inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict processing of your personal information</li>
                <li>Data portability</li>
              </ul>

              <h2 className="text-2xl font-bold text-theme mb-6">6. Cookies</h2>
              <p className="text-muted mb-6 leading-relaxed">
                We use cookies and similar technologies to enhance your experience on our website. You can control
                cookie settings through your browser preferences.
              </p>

              <h2 className="text-2xl font-bold text-theme mb-6">7. Changes to This Policy</h2>
              <p className="text-muted mb-6 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                new policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="text-2xl font-bold text-theme mb-6">8. Contact Us</h2>
              <p className="text-muted mb-6 leading-relaxed">
                If you have any questions about this privacy policy, please contact us at:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-theme font-medium">Asija & Associates LLP</p>
                <p className="text-muted">1st floor, 34/5 Gokhale Marg,</p>
                <p className="text-muted">Lucknow, U.P. (India) – 226001</p>
                <p className="text-muted">Phone: 0522-4004652, 0522-2205072</p>
                <p className="text-muted">Email: privacy@asija.in</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}