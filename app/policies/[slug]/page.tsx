"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { Maximize2, FileText, Table, Download } from "lucide-react";
import Link from "next/link";

type PolicyItem = {
  _id: string;
  title: string;
  content: string;
  category: 'general' | 'employee';
  subCategory?: string;
  pdfUrl?: string;
  excelUrl?: string;
  policyType?: 'text' | 'pdf';
  order: number;
};

type DepartmentItem = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export default function DepartmentPoliciesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [department, setDepartment] = useState<DepartmentItem | null>(null);
  const [loading, setLoading] = useState(true);

  const slug = params!.slug as string;

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch department info
        const deptRes = await fetch('/api/admin/departments');
        const deptData = await deptRes.json();
        if (Array.isArray(deptData)) {
          const currentDept = deptData.find((d: DepartmentItem) => d.slug === slug);
          setDepartment(currentDept || null);
        }

        // Fetch policies for this department
        const policyRes = await fetch('/api/admin/policies');
        const policyData = await policyRes.json();
        if (Array.isArray(policyData)) {
          const deptPolicies = policyData.filter((p: PolicyItem) =>
            p.category === 'employee' && p.subCategory?.toLowerCase() === slug.toLowerCase()
          );
          setPolicies(deptPolicies);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [status, session, router, slug]);

  if (loading) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isLight ? 'bg-white text-gray-900' : 'bg-slate-950 text-white'}`}>
        <Navbar />
        <main className="pt-30 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009edb]"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!department) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isLight ? 'bg-white text-gray-900' : 'bg-slate-950 text-white'}`}>
        <Navbar />
        <main className="pt-30 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Department Not Found</h1>
            <p className={`mb-8 ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
              The department you're looking for doesn't exist.
            </p>
            <Link href="/policies" prefetch={false}>
              <InteractiveHoverButton text="Back to Policies" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isLight ? 'bg-white text-gray-900' : 'bg-slate-950 text-white'}`}>
      <Navbar />

      <main className="pt-30 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center lg:text-left">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{department.icon}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                {department.name} <span className="text-[#009edb]">Policies</span>
              </h1>
              <p className={`text-lg mt-2 ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                {department.description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Policies */}
          <div className="w-full lg:w-[70%] space-y-8">
            {policies.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Policies Found</h3>
                <p className={`mb-6 ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                  There are currently no policies in this department.
                </p>
                <Link href="/policies" prefetch={false}>
                  <InteractiveHoverButton text="Back to All Policies" />
                </Link>
              </div>
            ) : (
              policies
                .sort((a, b) => a.order - b.order)
                .map((policy, index) => (
                  <motion.div
                    key={policy._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                      isLight
                        ? 'bg-white border-gray-100 hover:border-[#009edb]/30'
                        : 'bg-slate-950 border-white/5 hover:border-[#009edb]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-[#009edb]">{policy.title}</h3>
                      <div className="flex gap-2">
                        {policy.pdfUrl && (
                          <a
                            href={policy.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors"
                            title="View PDF Document"
                          >
                            <FileText className="h-5 w-5" />
                          </a>
                        )}
                        {policy.excelUrl && (
                          <a
                            href={policy.excelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 transition-colors"
                            title="Download Excel Spreadsheet"
                          >
                            <Table className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {policy.policyType === 'pdf' && policy.pdfUrl ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                          <FileText className="h-5 w-5" />
                          <span className="text-sm font-medium">PDF Document</span>
                        </div>
                        <div className="flex gap-3">
                          <a
                            href={policy.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <Maximize2 className="h-4 w-4" />
                            View PDF
                          </a>
                        </div>
                      </div>
                    ) : policy.excelUrl && !policy.pdfUrl ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <Table className="h-5 w-5" />
                          <span className="text-sm font-medium">Excel Spreadsheet</span>
                        </div>
                        <div className="flex gap-3">
                          <a
                            href={policy.excelUrl}
                            download
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Download className="h-4 w-4" />
                            Download Excel
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className={`prose prose-lg max-w-none ${isLight ? 'prose-gray' : 'prose-invert'}`}>
                        <div
                          className={`leading-relaxed ${isLight ? 'text-gray-700' : 'text-gray-300'}`}
                          dangerouslySetInnerHTML={{ __html: policy.content.replace(/\n/g, '<br />') }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))
            )}
          </div>

          {/* Right Side - Sidebar */}
          <div className="w-full lg:w-[30%]">
            <div className="sticky top-24 space-y-6">
              <div className={`p-6 rounded-2xl border ${
                isLight
                  ? 'bg-[#009edb]/10 border-[#009edb]/20'
                  : 'bg-[#009edb]/5 border-[#009edb]/10'
              }`}>
                <h4 className={`font-bold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  {department.name} Department
                </h4>
                <p className={`text-sm mb-4 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                  {department.description}
                </p>
                <div className="text-3xl mb-4">{department.icon}</div>
              </div>

              <div className={`p-6 rounded-2xl border ${
                isLight
                  ? 'bg-white border-gray-100'
                  : 'bg-slate-950 border-white/5'
              }`}>
                <h4 className={`font-bold mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  Policy Statistics
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                      Total Policies:
                    </span>
                    <span className="font-semibold text-[#009edb]">{policies.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                      Department:
                    </span>
                    <span className="font-semibold">{department.name}</span>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border ${
                isLight
                  ? 'bg-white border-gray-100'
                  : 'bg-slate-950 border-white/5'
              }`}>
                <h4 className={`font-bold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  Need Assistance?
                </h4>
                <p className={`text-sm mb-4 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                  If you have questions regarding these policies, please contact the {department.name} department.
                </p>
                <InteractiveHoverButton
                  text={`Contact ${department.name}`}
                  className="w-full justify-center"
                  onClick={() => window.open(`mailto:${slug}@asija.in`, '_blank')}
                />
              </div>

              <Link href="/policies" prefetch={false}>
                <InteractiveHoverButton
                  text="Back to All Policies"
                  className="w-full justify-center"
                />
              </Link>
              <Link href="/" prefetch={false}>
                <InteractiveHoverButton
                  text="Home"
                  className="w-full justify-center mt-2"
                />
              </Link>
              
            </div>
          </div>
        </div>
      </main>

    

      <Footer />
    </div>
  );
}