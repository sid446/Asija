"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordian";
import Link from "next/link";

type DepartmentItem = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
};
type PolicyItem = {
  _id: string;
  title: string;
  content?: string;
  category: 'general' | 'employee';
  subCategory?: string;
  pdfUrl?: string;
  excelUrl?: string;
  policyType: 'text' | 'pdf';
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export default function PoliciesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [employeePolicies, setEmployeePolicies] = useState<PolicyItem[]>([]);
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await fetch('/api/admin/policies');
        const data = await res.json();
        if (Array.isArray(data)) {
          setPolicies(data.filter((p: PolicyItem) => p.category === 'general'));
          setEmployeePolicies(data.filter((p: PolicyItem) => p.category === 'employee'));
        }
      } catch (error) {
        console.error('Failed to fetch policies:', error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const res = await fetch('/api/admin/departments');
        const data = await res.json();
        if (Array.isArray(data)) {
          setDepartments(data);
        }
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    };

    fetchPolicies();
    fetchDepartments();
  }, []);

  const groupedEmployeePolicies = employeePolicies.reduce((acc, policy) => {
    const deptSlug = policy.subCategory?.toLowerCase() || 'other';
    if (!acc[deptSlug]) {
      acc[deptSlug] = [];
    }
    acc[deptSlug].push(policy);
    return acc;
  }, {} as Record<string, PolicyItem[]>);

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

            {/* Legal Documents Section */}
            <section>
              <h2 className={`text-2xl font-semibold mb-6 flex items-center gap-2 ${isLight ? 'text-gray-800' : 'text-gray-100'}`}>
                <span className="w-2 h-8 bg-[#009edb] rounded-full"></span>
                Legal Documents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg cursor-pointer group ${
                    isLight
                      ? 'bg-white border-gray-100 hover:border-[#009edb]/30'
                      : 'bg-slate-950 border-white/5 hover:border-[#009edb]/30'
                  }`}
                  onClick={() => window.open('/policies/privacy-policy', '_blank')}
                >
                  <h3 className="text-xl font-bold mb-3 text-[#009edb] group-hover:translate-x-1 transition-transform">
                    Privacy Policy
                  </h3>
                  <p className={`leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                    Learn how we collect, use, and protect your personal information.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg cursor-pointer group ${
                    isLight
                      ? 'bg-white border-gray-100 hover:border-[#009edb]/30'
                      : 'bg-slate-950 border-white/5 hover:border-[#009edb]/30'
                  }`}
                  onClick={() => window.open('/policies/terms-of-service', '_blank')}
                >
                  <h3 className="text-xl font-bold mb-3 text-[#009edb] group-hover:translate-x-1 transition-transform">
                    Terms of Service
                  </h3>
                  <p className={`leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                    Read our terms and conditions for using our services.
                  </p>
                </motion.div>
              </div>
            </section>

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

              {!session && (
                <div className={`p-4 rounded-lg mb-6 text-center ${isLight ? 'bg-blue-50 text-blue-800' : 'bg-blue-900/20 text-blue-200'}`}>
                  <p>Please <Link href="/login" className="text-[#009edb] hover:underline font-medium">log in</Link> to view employee policies and department-specific guidelines.</p>
                </div>
              )}

              {departments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading departments...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {departments.map((department, index) => (
                    <motion.div
                      key={department.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg cursor-pointer group ${
                        isLight
                          ? 'bg-white border-gray-100 hover:border-[#009edb]/30'
                          : 'bg-slate-950 border-white/5 hover:border-[#009edb]/30'
                      }`}
                      onClick={() => session ? router.push(`/policies/${department.slug}`) : router.push('/login')}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-4">{department.icon}</div>
                        <h3 className="text-xl font-bold mb-3 text-[#009edb] group-hover:translate-y-[-2px] transition-transform">
                          {department.name}
                        </h3>
                        <p className={`leading-relaxed text-sm ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                          {department.description}
                        </p>
                        <div className="mt-4 flex justify-center">
                          <div className="text-[#009edb] group-hover:translate-x-1 transition-transform">
                            →
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
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
                <InteractiveHoverButton
                  text="Contact HR"
                  className="w-full justify-center"
                  onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=hr@asija.in', '_blank')}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
