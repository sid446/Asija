"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfServicePage() {
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
              className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Policies
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-theme mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Please read these terms carefully before using our services. By using our website, you agree to be bound by these terms.
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
              <h2 className="text-2xl font-bold text-theme mb-6">1. Acceptance of Terms</h2>
              <p className="text-muted mb-6 leading-relaxed">
                By accessing and using Asija & Associates LLP's website and services, you accept and agree to be bound by
                the terms and provision of this agreement. If you do not agree to abide by the above, please do not use
                this service.
              </p>

              <h2 className="text-2xl font-bold text-theme mb-6">2. Description of Service</h2>
              <p className="text-muted mb-6 leading-relaxed">
                Asija & Associates LLP provides professional accounting, auditing, tax consulting, and advisory services.
                Our website serves as an information portal and client portal for our services.
              </p>

              <h2 className="text-2xl font-bold text-theme mb-6">3. User Responsibilities</h2>
              <p className="text-muted mb-6 leading-relaxed">
                You agree to use our services only for lawful purposes and in accordance with these terms. You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-muted mb-6 space-y-2">
                <li>Maintaining the confidentiality of your account information</li>
                <li>Providing accurate and complete information</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Using the services in compliance with applicable laws and regulations</li>
              </ul>

              <h2 className="text-2xl font-bold text-theme mb-6">4. Professional Services</h2>
              <p className="text-muted mb-6 leading-relaxed">
                Our professional services are provided in accordance with applicable professional standards and regulations.
                All work is performed with due professional care and skill. However, we cannot guarantee specific outcomes
                or results, as these depend on various factors including the completeness and accuracy of information provided.
              </p>

              <h2 className="text-2xl font-bold text-theme mb-6">5. Intellectual Property</h2>
              <p className="text-muted mb-6 leading-relaxed">
                The content, features, and functionality of our website and services are owned by Asija & Associates LLP
                and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce,
                distribute, or create derivative works without our express written permission.
              </p>

              <h2 className="text-2xl font-bold text-theme mb-6">6. Limitation of Liability</h2>
              <p className="text-muted mb-6 leading-relaxed">
                In no event shall Asija & Associates LLP be liable for any indirect, incidental, special, consequential,
                or punitive damages arising out of or related to your use of our services. Our total liability shall not
                exceed the amount paid for the specific service in question.
              </p>

              <h2 className="text-2xl font-bold text-theme mb-6">7. Confidentiality</h2>
              <p className="text-muted mb-6 leading-relaxed">
                We maintain strict confidentiality regarding client information and affairs. All client communications
                and documents are treated with the utmost confidentiality in accordance with professional standards
                and applicable laws.
              </p>

              <h2 className="text-2xl font-bold text-theme mb-6">8. Termination</h2>
              <p className="text-muted mb-6 leading-relaxed">
                Either party may terminate this agreement at any time. Upon termination, your right to use our services
                will cease immediately. We reserve the right to terminate or suspend access to our services at our
                discretion, without prior notice, for conduct that violates these terms.
              </p>

              <h2 className="text-2xl font-bold text-theme mb-6">9. Governing Law</h2>
              <p className="text-muted mb-6 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes
                arising from these terms shall be subject to the exclusive jurisdiction of the courts in India.
              </p>

              <h2 className="text-2xl font-bold text-theme mb-6">10. Changes to Terms</h2>
              <p className="text-muted mb-6 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting on our website. Your continued use of our services constitutes acceptance of the modified terms.
              </p>

              <h2 className="text-2xl font-bold text-theme mb-6">11. Contact Information</h2>
              <p className="text-muted mb-6 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-theme font-medium">Asija & Associates LLP</p>
                <p className="text-muted">1st floor, 34/5 Gokhale Marg,</p>
                <p className="text-muted">Lucknow, U.P. (India) – 226001</p>
                <p className="text-muted">Phone: 0522-4004652, 0522-2205072</p>
                <p className="text-muted">Email: legal@asija.in</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}