import React from 'react'
import { motion } from 'framer-motion';
import { Calendar, Users, ShieldCheck, Zap, GraduationCap, Globe } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

function WhyChooseUs() {
  const { theme } = useTheme();

  return (
     <section className="py-10 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f0f0f0' }}>
        <div className="mx-auto max-w-5xl space-y-8 sm:space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative z-10 mx-auto max-w-2xl space-y-3 sm:space-y-6 text-center">
            <h2 className="text-balance text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              Why Choose <span className="text-[#1DCD9F]">Us</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400">
              13+ years of expertise, 500+ trusted clients, and one partner for all your financial needs.
            </p>
          </motion.div>

          <div className="relative mx-auto max-w-7xl divide-x divide-y divide-[#2c2c2c] border border-[#2c2c2c] *:p-4 sm:*:p-6 md:*:p-8 grid sm:grid-cols-2 lg:grid-cols-3" style={{ backgroundColor: theme === 'dark' ? '#202020' : '#ffffff' }}>
            {[
              { title: "13+ Years Expertise", desc: "Deep domain knowledge across audit, tax, corporate law, banking, and advisory.", icon: Calendar },
              { title: "500+ Happy Clients", desc: "From startups to listed companies across diverse industries trust us.", icon: Users },
              { title: "One-Stop Partner", desc: "Audit, tax, corporate law, banking, and risk advisory under one roof.", icon: ShieldCheck },
              { title: "Proactive Approach", desc: "We optimize tax, reduce risk, and drive sustainable growth.", icon: Zap },
              { title: "Expert Team", desc: "Qualified CAs, Company Secretaries, and Lawyers as your extended team.", icon: GraduationCap },
              { title: "Pan-India Presence", desc: "Seamless virtual and physical support with secure, paperless processes.", icon: Globe },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }} className="space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Icon className="h-3 sm:h-4 w-3 sm:w-4 text-[#1DCD9F] shrink-0" />
                    <h3 className="text-xs sm:text-sm font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
  )
}

export default WhyChooseUs