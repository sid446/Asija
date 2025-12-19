"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { Maximize2, Download, FileText, File } from "lucide-react";
import Link from "next/link";

type PolicyItem = {
  _id: string;
  title: string;
  content: string;
  category: 'general' | 'employee';
  subCategory?: string; // Allow any string value for custom departments
  pdfUrl?: string;
  excelUrl?: string;
  policyType?: 'text' | 'pdf';
  order: number;
};

export default function AdminPoliciesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    const fetchPolicies = async () => {
      try {
        const res = await fetch('/api/admin/policies');
        const data = await res.json();
        if (Array.isArray(data)) {
          const adminPolicies = data.filter((p: PolicyItem) => p.category === 'employee' && p.subCategory === 'ADMIN');
          setPolicies(adminPolicies);
        }
      } catch (error) {
        console.error('Failed to fetch policies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [session, status, router]);

  const textPolicies = policies.filter(p => p.policyType === 'text' || (!p.policyType && p.content && !p.pdfUrl));
  const pdfPolicies = policies.filter(p => p.policyType === 'pdf' || (!p.policyType && p.pdfUrl));

  if (status === "loading" || loading) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isLight ? 'bg-white text-gray-900' : 'bg-slate-950 text-white'}`}>
        <Navbar />
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#009edb] border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isLight ? 'bg-white text-gray-900' : 'bg-slate-950 text-white'}`}>
      <Navbar />

      <main className="pt-30 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <Link href="/policies" className="text-[#009edb] hover:text-[#0077a3] transition-colors">
              ← Back to Policies
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Admin <span className="text-[#009edb]">Policies</span>
          </h1>
          <p className={`text-lg max-w-2xl ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
            Administrative policies and operational guidelines for our employees.
          </p>
        </div>

        {/* Text Policies Section */}
        {textPolicies.length > 0 && (
          <section className="mb-12">
            <h2 className={`text-2xl font-semibold mb-6 flex items-center gap-2 ${isLight ? 'text-gray-800' : 'text-gray-100'}`}>
              <FileText className="w-6 h-6 text-[#009edb]" />
              Text Policies
            </h2>
            <div className="space-y-8">
              {textPolicies.map((policy, index) => (
                <motion.div
                  key={policy._id}
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
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#009edb]">{policy.title}</h3>
                    {policy.excelUrl && (
                      <a
                        href={policy.excelUrl}
                        download
                        className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download Excel
                      </a>
                    )}
                  </div>
                  <div className={`leading-relaxed whitespace-pre-line ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                    {policy.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* PDF Policies Section */}
        {pdfPolicies.length > 0 && (
          <section className="mb-12">
            <h2 className={`text-2xl font-semibold mb-6 flex items-center gap-2 ${isLight ? 'text-gray-800' : 'text-gray-100'}`}>
              <File className="w-6 h-6 text-[#009edb]" />
              PDF Policies
            </h2>
            <div className="space-y-8">
              {pdfPolicies.map((policy, index) => (
                <motion.div
                  key={policy._id}
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
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#009edb]">{policy.title}</h3>
                    <div className="flex gap-2">
                      {policy.excelUrl && (
                        <a
                          href={policy.excelUrl}
                          download
                          className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                        >
                          <Download className="w-4 h-4" />
                          Excel
                        </a>
                      )}
                      <button
                        onClick={() => {
                          let viewerUrl = policy.pdfUrl!;
                          if (policy.pdfUrl!.includes('drive.google.com')) {
                            viewerUrl = policy.pdfUrl!.replace('/view', '/preview');
                          } else if (policy.pdfUrl!.includes('onedrive.live.com') || policy.pdfUrl!.includes('1drv.ms')) {
                            viewerUrl = policy.pdfUrl!;
                          }
                          window.open(viewerUrl, '_blank', 'fullscreen=yes,scrollbars=yes,resizable=yes');
                        }}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                      >
                        <Maximize2 className="w-4 h-4" />
                        Full Screen
                      </button>
                    </div>
                  </div>
                  <p className={`mb-4 ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>{policy.content}</p>
                  {!(policy.pdfUrl!.includes('onedrive.live.com') || policy.pdfUrl!.includes('1drv.ms')) && (
                    <div className="w-full h-[400px] border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
                      <iframe
                        src={
                          policy.pdfUrl!.includes('drive.google.com')
                            ? policy.pdfUrl!.replace('/view', '/preview')
                            : policy.pdfUrl
                        }
                        className="w-full h-full"
                        frameBorder="0"
                        title={policy.title}
                        allow="autoplay"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                      />
                    </div>
                  )}
                  {policy.pdfUrl!.includes('onedrive.live.com') || policy.pdfUrl!.includes('1drv.ms') ? (
                    <div className="w-full text-center py-8 border rounded-lg bg-gray-50 dark:bg-gray-800 mb-4">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-400">
                        OneDrive document - Click "Full Screen" to view
                      </p>
                    </div>
                  ) : null}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {textPolicies.length === 0 && pdfPolicies.length === 0 && (
          <div className="text-center py-20">
            <p className={`text-lg ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>No Admin policies available at the moment.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}