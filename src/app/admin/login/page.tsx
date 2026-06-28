"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ShieldCheck, ChevronRight, User, Lock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (brand.trim().toLowerCase() !== "doxa") {
        throw new Error("Invalid brand. Set brand name to 'doxa' to manage Doxa Homes catalog.");
      }

      if (username.trim() !== "admin" || (password !== "admin" && password !== "admin123")) {
        throw new Error("Invalid credentials. Try brand: doxa, user: admin, pass: admin");
      }

      // Successful simulated auth
      const token = "doxa_client_token_998877";
      const adminUser = { username: "admin", brand: "doxa" };

      localStorage.setItem("doxa_admin_token", token);
      localStorage.setItem("doxa_admin_user", JSON.stringify(adminUser));
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-6 overflow-hidden">
      {/* ─── Background Elements ─────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/dox9.jpeg"
          alt="Luxury furniture background"
          fill
          className="object-cover opacity-15 filter brightness-50"
          priority
        />
        {/* Deep luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-zinc-950/95 to-black" />
        {/* Subtle gold radial ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* ─── Login Card Container ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-md w-full"
      >
        <div className="backdrop-blur-xl bg-zinc-950/60 border border-zinc-800/80 p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500 rounded-none relative">
          
          {/* Top subtle gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-14 h-14 bg-zinc-900/90 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
            >
              <ShieldCheck className="text-[#D4AF37]" size={24} />
            </motion.div>
            
            <p className="text-[#D4AF37]/80 text-[0.55rem] tracking-[0.3em] uppercase font-sans mb-2 font-medium">
              Management Portal
            </p>
            <h1 className="font-serif text-2xl lg:text-3xl text-zinc-100 font-light tracking-wide">
              Admin Login
            </h1>
            <p className="text-[10px] text-zinc-500 font-sans mt-2 font-light">
              Tip: Use brand: <span className="text-[#D4AF37] font-semibold">doxa</span>, user: <span className="text-zinc-300 font-medium">admin</span>, pass: <span className="text-zinc-300 font-medium">admin</span>
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-950/30 border border-red-900/50 text-red-400 text-xs font-sans mb-6 text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Brand Field */}
            <div className="space-y-2">
              <label className="block text-zinc-400 text-[0.6rem] font-semibold tracking-[0.15em] uppercase" htmlFor="brand">
                Brand Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Tag size={14} />
                </div>
                <input
                  id="brand"
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. doxa, existing_brand"
                  className="w-full min-h-[3rem] bg-zinc-900/40 border border-zinc-800 focus:border-[#D4AF37]/80 focus:ring-1 focus:ring-[#D4AF37]/40 text-zinc-100 font-sans text-xs px-10 py-3 transition-all duration-300 outline-none placeholder:text-zinc-600 shadow-inner"
                />
              </div>
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-zinc-400 text-[0.6rem] font-semibold tracking-[0.15em] uppercase" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <User size={14} />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full min-h-[3rem] bg-zinc-900/40 border border-zinc-800 focus:border-[#D4AF37]/80 focus:ring-1 focus:ring-[#D4AF37]/40 text-zinc-100 font-sans text-xs px-10 py-3 transition-all duration-300 outline-none placeholder:text-zinc-600 shadow-inner"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-zinc-400 text-[0.6rem] font-semibold tracking-[0.15em] uppercase" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock size={14} />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full min-h-[3rem] bg-zinc-900/40 border border-zinc-800 focus:border-[#D4AF37]/80 focus:ring-1 focus:ring-[#D4AF37]/40 text-zinc-100 font-sans text-xs px-10 py-3 transition-all duration-300 outline-none placeholder:text-zinc-600 shadow-inner"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="solid"
              size="lg"
              fullWidth
              disabled={loading}
              className="mt-8 bg-[#D4AF37] hover:bg-[#AA7700] hover:text-white text-zinc-950 font-sans text-[0.65rem] tracking-[0.2em] font-semibold uppercase py-3.5 transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.15)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.3)] select-none border-none flex items-center justify-center gap-2 h-12"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In <ChevronRight size={14} />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center border-t border-zinc-900 pt-6">
            <Link
              href="/"
              className="text-zinc-500 hover:text-[#D4AF37] font-sans text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-300"
            >
              ← Back to Storefront
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
