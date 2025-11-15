'use client';

import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Contact() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#252525] to-[#1a1818] flex flex-col items-center px-6 md:px-20 lg:px-32 pb-20 text-white overflow-hidden">
      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-7xl flex flex-col lg:flex-row justify-between gap-12 mb-16 mt-10"
      >
        {/* LEFT: Text */}
        <div className="lg:w-1/2 space-y-5">
          <p className="text-[#1DCD9F] font-medium text-lg tracking-wider">
            Contact us
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Connect With Us <span className='text-6xl text-[#1DCD9F]'>.</span>
          </h1>
          <p className="text-xl text-white/70 max-w-lg">
            We’d love to hear from you! Please get in touch.
          </p>
        </div>

        {/* RIGHT: Contact Info */}
        <div className="lg:w-1/2 space-y-8">
          {/* Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-4 group"
          >
            <div className="w-10 h-10 bg-[#1DCD9F]/20 rounded-full flex items-center justify-center group-hover:bg-[#1DCD9F]/30 transition-colors">
              <Phone className="w-5 h-5 text-[#1DCD9F]" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Mobile</h3>
              <p className="text-white/60 text-md">+91 98765 43210</p>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-4 group"
          >
            <div className="w-10 h-10 bg-[#1DCD9F]/20 rounded-full flex items-center justify-center group-hover:bg-[#1DCD9F]/30 transition-colors">
              <Mail className="w-5 h-5 text-[#1DCD9F]" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Email</h3>
              <a
                href="mailto:hello@asija.in"
                className="text-white/60 text-md hover:text-[#1DCD9F] transition-colors"
              >
                hello@asija.in
              </a>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-start gap-4 group"
          >
            <div className="w-10 h-10 bg-[#1DCD9F]/20 rounded-full flex items-center justify-center group-hover:bg-[#1DCD9F]/30 transition-colors">
              <MapPin className="w-5 h-5 text-[#1DCD9F]" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Location</h3>
              <p className="text-white/60 text-md">
                Bandra West, Mumbai 400050, India
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Full-width Image with Bottom Fade */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="w-full max-w-7xl relative overflow-hidden "
      >
        

        <Image
          src="/hey.jpg"
          alt="Asija team in creative studio"
          width={1920}
          height={1080}
          className="w-full h-[60vh] md:h-[70vh] object-cover"
          priority
        />
      </motion.div>
    </div>
  );
}