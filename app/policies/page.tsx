"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";

const policies = [
  {
    title: 'Privacy Policy',
    content: 'We are committed to protecting your privacy and ensuring the security of your personal information. This policy outlines how we collect, use, and safeguard your data in accordance with global standards. We collect information to provide better services to all our users, from figuring out basic stuff like which language you speak, to more complex things like which ads you’ll find most useful, the people who matter most to you online, or which YouTube videos you might like.'
  },
  {
    title: 'Terms of Service',
    content: 'By accessing our services, you agree to abide by our terms and conditions. These terms govern your use of our website and services, ensuring a safe and transparent environment for all users. You must follow any policies made available to you within the Services. Don’t misuse our Services. For example, don’t interfere with our Services or try to access them using a method other than the interface and the instructions that we provide.'
  },
  {
    title: 'Data Protection',
    content: 'We implement robust security measures to protect your data from unauthorized access, alteration, or destruction. Our data protection protocols are regularly updated to meet the latest industry standards. We restrict access to personal information to Asija employees, contractors and agents who need to know that information in order to process it for us, and who are subject to strict contractual confidentiality obligations and may be disciplined or terminated if they fail to meet these obligations.'
  },
  {
    title: 'Cookie Policy',
    content: 'Our website uses cookies to enhance your browsing experience. Cookies help us analyze site traffic, personalize content, and improve overall site performance. You can manage your cookie preferences at any time. We use various technologies to collect and store information when you visit a Google service, and this may include using cookies or similar technologies to identify your browser or device.'
  }
];

const employeePolicies = [
  {
    title: 'Code of Conduct',
    content: 'All employees are expected to uphold the highest standards of integrity and professionalism. Our code of conduct defines the ethical behavior required in all business interactions.'
  },
  {
    title: 'Workplace Safety',
    content: 'We are dedicated to providing a safe and healthy work environment. Our safety policies ensure compliance with all occupational health and safety regulations.'
  },
  {
    title: 'Equal Opportunity',
    content: 'We are an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees, free from discrimination and harassment.'
  },
  {
    title: 'Remote Work Policy',
    content: 'We offer flexible remote work options to support work-life balance. This policy outlines the guidelines and expectations for employees working from home or other remote locations.'
  }
];

export default function PoliciesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className={`min-h-screen flex items-center justify-center ${isLight ? 'bg-white text-gray-900' : 'bg-slate-950 text-white'}`}>Loading...</div>;
  }

  if (!session) {
    return null; // Will redirect
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isLight ? 'bg-white text-gray-900' : 'bg-slate-950 text-white'}`}>
      <Navbar />
      
      <main className="pt-30 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Company <span className="text-[#009edb]">Policies</span>
          </h1>
          <p className={`text-lg max-w-2xl ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
            Transparency and integrity are at the core of our operations. Review our policies to understand how we operate and serve you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Policies (70%) */}
          <div className="w-full lg:w-[70%] space-y-12">
            
            {/* General Policies Section */}
            <section>
              <h2 className={`text-2xl font-semibold mb-6 flex items-center gap-2 ${isLight ? 'text-gray-800' : 'text-gray-100'}`}>
                <span className="w-2 h-8 bg-[#009edb] rounded-full"></span>
                General Policies
              </h2>
              <div className="space-y-8">
                {policies.map((policy, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                      isLight 
                        ? 'bg-white border-gray-100 hover:border-[#009edb]/30' 
                        : 'bg-slate-950 border-white/5 hover:border-[#009edb]/30'
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-3 text-[#009edb]">{policy.title}</h3>
                    <p className={`leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                      {policy.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Employee Policies Section */}
            <section>
              <h2 className={`text-2xl font-semibold mb-6 flex items-center gap-2 ${isLight ? 'text-gray-800' : 'text-gray-100'}`}>
                <span className="w-2 h-8 bg-[#009edb] rounded-full"></span>
                Employee & Internal Policies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {employeePolicies.map((policy, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-2xl border transition-all duration-300 ${
                      isLight 
                        ? 'bg-white border-gray-100' 
                        : 'bg-slate-950 border-white/5'
                    }`}
                  >
                    <h3 className="text-lg font-bold mb-2 text-[#009edb]">{policy.title}</h3>
                    <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                      {policy.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Side - Image (30%) */}
          <div className="w-full lg:w-[30%]">
            <div className="sticky top-24 space-y-6">
              <div className="relative rounded-2xl overflow-hidden aspect-3/4 shadow-2xl">
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent z-10" />
                <img 
                  src="/about1.jpg" 
                  alt="Office Culture" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <p className=" font-medium text-lg" style={{color:"white"}}>"Commitment to excellence defines our policy framework."</p>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border ${
                isLight 
                  ? 'bg-[#009edb]/10 border-[#009edb]/20' 
                  : 'bg-[#009edb]/5 border-[#009edb]/10'
              }`}>
                <h4 className={`font-bold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>Need Assistance?</h4>
                <p className={`text-sm mb-4 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                  If you have questions regarding our policies, please contact our HR department.
                </p>
                <button className="text-sm font-bold text-[#009edb] hover:underline">
                  Contact HR &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
