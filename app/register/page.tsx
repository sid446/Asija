"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/login");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
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
            alt="Register Background" 
            className="absolute inset-0 w-full h-full object-cover"
         />
         <div className="relative z-20 p-12 text-white max-w-xl" style={{ color: 'white' }}>
            <h2 className="text-5xl font-bold mb-6 leading-tight" style={{ color: 'white' }}>Join <span className="text-[#009edb]">Asija</span> Today</h2>
            <p className="text-xl " style={{ color: '#e5e7eb' }}>Create an account to start your journey with our professional financial services.</p>
         </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-theme">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-theme mb-2">Create Account</h1>
            <p className="text-muted">Sign up to get started</p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="John Doe"
                className="w-full p-4 rounded-lg bg-surface border border-theme text-theme focus:outline-none focus:border-[#009edb] focus:ring-1 focus:ring-[#009edb] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@company.com"
                className="w-full p-4 rounded-lg bg-surface border border-theme text-theme focus:outline-none focus:border-[#009edb] focus:ring-1 focus:ring-[#009edb] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full p-4 rounded-lg bg-surface border border-theme text-theme focus:outline-none focus:border-[#009edb] focus:ring-1 focus:ring-[#009edb] transition-all"
              />
            </div>
            
            <button className="w-full bg-[#009edb] text-black font-bold text-lg cursor-pointer py-4 rounded-lg hover:bg-[#008bbd] transition-all hover:scale-[1.02] active:scale-[0.98] mt-2">
              Register
            </button>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm py-3 px-4 rounded-lg text-center">
                {error}
              </div>
            )}
            
            <p className="text-center text-muted mt-4">
              Already have an account? <Link className="text-[#009edb] hover:underline font-medium" href={"/login"}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
