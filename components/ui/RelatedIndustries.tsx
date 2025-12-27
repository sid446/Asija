import React from 'react'
import { motion } from 'framer-motion';
import { Building2, Landmark, Scale, FileText, Shield, Briefcase } from 'lucide-react';
import { useTheme } from '../ThemeProvider';

function RelatedIndustries() {
  const { theme } = useTheme();

  const entities = [
    { 
      name: "RBI", 
      fullName: "Reserve Bank of India",
      desc: "Central banking institution controlling the issue and supply of the Indian rupee.",
      icon: Landmark 
    },
    { 
      name: "SEBI", 
      fullName: "Securities and Exchange Board of India",
      desc: "Regulatory body for securities and commodity market in India.",
      icon: Scale 
    },
    { 
      name: "IRDAI", 
      fullName: "Insurance Regulatory and Development Authority",
      desc: "Regulatory body for insurance and re-insurance industries in India.",
      icon: Shield 
    },
    { 
      name: "MCA", 
      fullName: "Ministry of Corporate Affairs",
      desc: "Concerned with administration of the Companies Act 2013.",
      icon: Building2 
    },
    { 
      name: "ICAI", 
      fullName: "Institute of Chartered Accountants of India",
      desc: "National professional accounting body of India.",
      icon: FileText 
    },
    { 
      name: "IBBI", 
      fullName: "Insolvency and Bankruptcy Board of India",
      desc: "Regulator for overseeing insolvency proceedings and entities.",
      icon: Briefcase 
    },
  ];

  return (
     <section className="py-10 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20" >
        <div className="mx-auto max-w-5xl space-y-8 sm:space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative z-10 mx-auto max-w-2xl space-y-3 sm:space-y-6 text-center">
            <h2 className="text-balance text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              Regulatory <span className="text-[#009edb]">Bodies</span> & Related Institutions
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400">
              We work closely with major regulatory authorities and financial institutions to ensure compliance and excellence.
            </p>
          </motion.div>

          <div className="relative mx-auto max-w-7xl divide-x divide-y divide-[#2c2c2c] border border-[#2c2c2c] *:p-4 sm:*:p-6 md:*:p-8 grid sm:grid-cols-2 lg:grid-cols-3" >
            {entities.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }} className="space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Icon className="h-5 sm:h-6 w-5 sm:w-6 text-[#009edb] shrink-0" />
                    <div>
                        <h3 className="text-sm sm:text-base font-bold text-white">{item.name}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-500 font-medium">{item.fullName}</p>
                    </div>
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

export default RelatedIndustries
