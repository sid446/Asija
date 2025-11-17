'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from './TranslationProvider';
import Link from 'next/link';

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = {
    company: [
      { label: t('navbar.aboutUs'), href: '#about' },
      { label: t('navbar.services'), href: '#services' },
      { label: t('navbar.industries'), href: '#industries' },
      { label: t('navbar.career'), href: '#career' },
      { label: 'Our Team / Strength', href: '/team' }
    ],
    services: [
      { label: t('services.auditAssurance'), href: '#services' },
      { label: t('services.directTax'), href: '#services' },
      { label: t('services.corporateLaw'), href: '#services' },
      { label: t('services.consultancy'), href: '#services' }
    ],
    contact: [
      { label: t('footer.officeLocations'), href: '#contact' },
      { label: t('footer.contactNo'), href: '#contact' },
      { label: t('footer.emails'), href: '#contact' },
      { label: t('footer.enquiryForm'), href: '#contact' }
    ]
  };

  return (
  <footer className="bg-surface w-full ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <motion.h1 
                         className="text-lg md:text-lg mt-2 w-fit mb-2 leading-5 font-bold bg-clip-text  cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          ASIJA & ASSOCIATES LLP
                          <br />
                          <span className='text-sm sm:text-xs text-muted'>{t('common.charteredAccountants')}</span>
                        </motion.h1>
            <p className="text-muted text-sm leading-relaxed mb-6">
              {t('footer.description') || 'Professional audit, tax, and advisory services across multiple industries.'}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center bg-card hover:bg-accent rounded-lg transition-all duration-300 text-muted hover:text-white border-theme"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.946-.2-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.44-.645 1.44-1.44-.645-1.44-1.44-1.44z" />
                </svg>
              </motion.a>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center bg-card hover:bg-accent rounded-lg transition-all duration-300 text-muted hover:text-white border-theme"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-theme font-semibold text-lg mb-4">{t('footer.company') || 'Company'}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('/') ? (
                    <Link
                      href={link.href}
                      className="text-muted hover:text-accent transition-all duration-300 text-sm sm:text-base inline-block hover:translate-x-1"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-muted hover:text-accent transition-all duration-300 text-sm sm:text-base inline-block hover:translate-x-1"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-theme font-semibold text-lg mb-4">{t('footer.services') || 'Services'}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted hover:text-accent transition-all duration-300 text-sm sm:text-base inline-block hover:translate-x-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-theme font-semibold text-lg mb-4">{t('footer.contact') || 'Contact'}</h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted hover:text-accent transition-all duration-300 text-sm sm:text-base inline-block hover:translate-x-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-theme flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-muted text-sm text-center sm:text-left">
            {t('footer.copyright') || '© 2024 Asija & Associates LLP. All rights reserved.'}
          </p>
          <div className="flex gap-6 text-sm text-muted">
            <a href="#" className="hover:text-accent transition-colors">
              {t('footer.privacy') || 'Privacy Policy'}
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              {t('footer.terms') || 'Terms of Service'}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

