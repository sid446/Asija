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
import { Maximize2, X } from "lucide-react";

type PolicyItem = {
  _id: string;
  title: string;
  content: string;
  category: 'general' | 'employee';
  subCategory?: 'HR' | 'IT' | 'ADMIN' | 'VERTICLE COLLECTIVES';
  pdfUrl?: string;
  order: number;
};

export default function PoliciesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [employeePolicies, setEmployeePolicies] = useState<PolicyItem[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

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

    fetchPolicies();
  }, []);

  const groupedEmployeePolicies = {
    HR: employeePolicies.filter(p => p.subCategory === 'HR'),
    IT: employeePolicies.filter(p => p.subCategory === 'IT'),
    ADMIN: employeePolicies.filter(p => p.subCategory === 'ADMIN'),
    'VERTICLE COLLECTIVES': employeePolicies.filter(p => p.subCategory === 'VERTICLE COLLECTIVES'),
  };

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
            {session && (
              <section>
                <h2 className={`text-2xl font-semibold mb-6 flex items-center gap-2 ${isLight ? 'text-gray-800' : 'text-gray-100'}`}>
                  <span className="w-2 h-8 bg-[#009edb] rounded-full"></span>
                  Employee & Internal Policies
                </h2>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {Object.entries(groupedEmployeePolicies).map(([category, items]) => (
                    items.length > 0 && (
                      <AccordionItem key={category} value={category} className="border rounded-lg px-4">
                        <AccordionTrigger className={`text-lg font-medium ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                          {category} Policies
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-4">
                            {items.map((policy) => (
                              <div key={policy._id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                <h4 className="font-semibold text-[#009edb] mb-2">{policy.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{policy.content}</p>
                                {policy.pdfUrl && (
                                  <div className="mt-4">
                                    <div className="w-full h-[500px] border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-2">
                                      <iframe
                                        src={policy.pdfUrl.includes('drive.google.com') ? policy.pdfUrl.replace('/view', '/preview') : policy.pdfUrl}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        title={policy.title}
                                        allow="autoplay"
                                        sandbox="allow-scripts allow-same-origin allow-forms"
                                      />
                                    </div>
                                    <button
                                      onClick={() => setSelectedPdf(policy.pdfUrl!)}
                                      className="mt-2 flex items-center gap-2 text-sm text-[#009edb] hover:underline"
                                    >
                                      <Maximize2 className="w-4 h-4" />
                                      View Full Screen
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  ))}
                </Accordion>
              </section>
            )}

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

      {/* Full Screen PDF Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-xl overflow-hidden flex flex-col">
            <div className="flex justify-end p-2 bg-gray-100 border-b">
              <button 
                onClick={() => setSelectedPdf(null)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 bg-gray-50">
              <iframe
                src={selectedPdf.includes('drive.google.com') ? selectedPdf.replace('/view', '/preview') : selectedPdf}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
