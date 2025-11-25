"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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

  return (
    <div className="min-h-screen w-full flex bg-[#1a1a1a]">
      {/* Left Side - Image & Text */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-black/40 z-10" />
         <img 
            src="/aboutUs.jpg" 
            alt="Login Background" 
            className="absolute inset-0 w-full h-full object-cover"
         />
         <div className="relative z-20 p-12 text-white max-w-xl">
            <h2 className="text-5xl font-bold mb-6 leading-tight">Welcome Back to <span className="text-[#1DCD9F]">Asija</span></h2>
            <p className="text-xl text-gray-200">Access your professional dashboard and manage your financial insights efficiently.</p>
         </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#1a1a1a]">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-white mb-2">Login</h1>
            <p className="text-gray-400">Enter your details to access your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@company.com"
                className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#1DCD9F] focus:ring-1 focus:ring-[#1DCD9F] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#1DCD9F] focus:ring-1 focus:ring-[#1DCD9F] transition-all"
              />
            </div>
            
            <button className="w-full bg-[#1DCD9F] text-black font-bold text-lg cursor-pointer py-4 rounded-lg hover:bg-[#19b892] transition-all hover:scale-[1.02] active:scale-[0.98] mt-2">
              Sign In
            </button>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm py-3 px-4 rounded-lg text-center">
                {error}
              </div>
            )}
            
            <p className="text-center text-gray-400 mt-4">
              Don't have an account? <Link className="text-[#1DCD9F] hover:underline font-medium" href={"/register"}>Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
