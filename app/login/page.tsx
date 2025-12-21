"use client";

import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, Loader2 } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [otpStatus, setOtpStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const otpRequestRef = useRef(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const sendOtp = async () => {
    if (loading || otpRequestRef.current) return; // Prevent multiple clicks and StrictMode double execution
    
    setOtpStatus(null);
    setError('');
    setLoading(true);
    otpRequestRef.current = true;
    
    if (!email) {
      setError('Please enter your @asija.in email first');
      setLoading(false);
      otpRequestRef.current = false;
      return;
    }

    try {
      const resp = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        setError(data?.message || 'Failed to send OTP');
        setLoading(false);
        otpRequestRef.current = false;
        return;
      }

      setOtpStatus('OTP sent to your email (valid for 5 minutes). Enter it in the password field to login.');
      setLoading(false);
      otpRequestRef.current = false;
    } catch (err) {
      console.error(err);
      setError('Failed to send OTP');
      setLoading(false);
      otpRequestRef.current = false;
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-theme relative">
      <Link 
        href="/" 
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-surface border border-theme text-theme hover:bg-[#009edb] hover:text-white hover:border-[#009edb] transition-all duration-300 shadow-lg group"
        title="Back to Home"
      >
        <Home className="w-5 h-5" />
      </Link>

      {/* Left Side - Image & Text */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-slate-950/40 z-10" />
         <img 
            src="/aboutUs.jpg" 
            alt="Login Background" 
            className="absolute inset-0 w-full h-full object-cover"
         />
         <div className="relative z-20 p-12 text-white max-w-xl" style={{ color: 'white' }}>
            <h2 className="text-5xl font-bold mb-6 leading-tight" style={{ color: 'white' }}>Welcome Back to <span className="text-[#009edb]">Asija</span></h2>
            <p className="text-xl " style={{ color: '#e5e7eb' }}>Access your professional dashboard and manage your financial insights efficiently.</p>
         </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-theme">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-theme mb-2">Login</h1>
            <p className="text-muted">Enter your details to access your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Email</label>
              <div className="relative">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="name@asija.in"
                  value={email}
                  disabled={!!otpStatus || loading}
                  className="w-full p-4 rounded-lg bg-surface border border-theme text-theme focus:outline-none focus:border-[#009edb] focus:ring-1 focus:ring-[#009edb] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {loading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#009edb] border-t-transparent"></div>
                  </div>
                )}
              </div>
            </div>

            {otpStatus && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-sm font-medium text-muted">One-Time Password (OTP)</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={password}
                  className="w-full p-4 rounded-lg bg-surface border border-theme text-theme focus:outline-none focus:border-[#009edb] focus:ring-1 focus:ring-[#009edb] transition-all tracking-widest text-center text-lg font-mono"
                  maxLength={6}
                />
              </div>
            )}
            
            {!otpStatus ? (
              <InteractiveHoverButton 
                type="button"
                onClick={sendOtp}
                disabled={loading}
                text={loading ? "Sending..." : "Send Verification Code"}
                className="w-full mt-2 bg-[#009edb] text-white border-[#009edb]" 
              />
            ) : (
              <div className="flex flex-col gap-3">
                <InteractiveHoverButton 
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 bg-[#009edb] text-white border-[#009edb]" 
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </div>
                  ) : (
                    'Verify & Login'
                  )}
                </InteractiveHoverButton>
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => { setOtpStatus(null); setPassword(''); setError(''); }}
                    className="flex-1 text-sm py-2 px-4 rounded-lg border border-theme text-theme hover:bg-theme hover:text-surface transition-colors"
                  >
                    Change Email
                  </button>
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={loading}
                    className="flex-1 text-sm py-2 px-4 rounded-lg bg-[#009edb] text-white hover:bg-[#007acc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Resend OTP'
                    )}
                  </button>
                </div>
              </div>
            )}
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm py-3 px-4 rounded-lg text-center">
                {error}
              </div>
            )}
            {otpStatus && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-600 text-sm py-3 px-4 rounded-lg text-center">
                {otpStatus}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
