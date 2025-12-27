import React from 'react'
import { motion } from 'framer-motion';
import { Search, Lightbulb, Settings, BarChart3, ShieldCheck, RefreshCw } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

function ServiceProcess() {
  const { theme } = useTheme();

  const steps = [
    { 
      title: "Discovery & Assessment", 
      desc: "We begin by understanding your business goals, challenges, and regulatory environment to tailor our approach.",
      icon: Search 
    },
    { 
      title: "Strategic Planning", 
      desc: "Our experts formulate a comprehensive strategy that aligns with your objectives and ensures compliance.",
      icon: Lightbulb 
    },
    { 
      title: "Implementation", 
      desc: "We execute the plan with precision, utilizing advanced tools and methodologies for optimal results.",
      icon: Settings 
    },
    { 
      title: "Performance Review", 
      desc: "Regular monitoring and reporting to track progress and identify areas for further improvement.",
      icon: BarChart3 
    },
    { 
      title: "Compliance Assurance", 
      desc: "Continuous checks to ensure all activities remain within the legal and regulatory frameworks.",
      icon: ShieldCheck 
    },
    { 
      title: "Continuous Optimization", 
      desc: "We adapt to changing market conditions and regulations to keep your business ahead of the curve.",
      icon: RefreshCw 
    },
  ];

  return (
     <section className="py-10 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20" >
        <div className="mx-auto max-w-5xl space-y-8 sm:space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative z-10 mx-auto max-w-2xl space-y-3 sm:space-y-6 text-center">
            <h2 className="text-balance text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              Our Service <span className="text-[#009edb]">Delivery Process</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400">
              A structured approach to delivering excellence, ensuring transparency, compliance, and value at every step.
            </p>
          </motion.div>

          <div className="relative mx-auto max-w-7xl divide-x divide-y divide-[#2c2c2c] border border-[#2c2c2c] *:p-4 sm:*:p-6 md:*:p-8 grid sm:grid-cols-2 lg:grid-cols-3" >
            {steps.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }} className="space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2 rounded-lg bg-[#009edb]/10">
                        <Icon className="h-5 sm:h-6 w-5 sm:w-6 text-[#009edb] shrink-0" />
                    </div>
                    <h3 className={`text-sm sm:text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
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

export default ServiceProcess
