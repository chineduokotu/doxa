"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

export function Newsletter() {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="py-32 lg:py-40 bg-[#0d0c0a] text-white border-t border-white/5 relative overflow-hidden">
      {/* Subtle radial golden glow behind content */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none blur-[80px]" 
        style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
      />

      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-8 bottom-0 w-[1px] bg-white/5 hidden md:block" />
      <div className="absolute top-0 right-8 bottom-0 w-[1px] bg-white/5 hidden md:block" />

      {/* Repeating noise texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
           style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    backgroundSize: "200px 200px" }} />

      <div className="max-w-screen-xl mx-auto px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Gold icon badge */}
            <div className="w-10 h-10 rounded-full border border-[#D4AF37]/35 flex items-center justify-center mx-auto mb-6 bg-white/[0.02] shadow-[0_8px_20px_rgba(0,0,0,0.4)] text-[#D4AF37]">
              <Mail size={15} strokeWidth={1.5} />
            </div>

            {/* Section label */}
            <p className="font-sans text-[10px] text-[#D4AF37] tracking-[0.26em] uppercase mb-4 font-bold">
              The Inner Circle
            </p>

            {/* Headline */}
            <h2 className="display-lg text-white mb-5 font-light">
              First Access. <span className="text-[#D4AF37] italic font-light">Always.</span>
            </h2>

            {/* Subline */}
            <p className="font-sans text-[#a09a94] text-[0.875rem] leading-[1.85] mb-12 max-w-md mx-auto">
              Join our curated list to receive exclusive product previews, private collection releases, and VIP invitations to our Benin City showroom events.
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45 }}
                  className="py-6"
                >
                  {/* Success Monogram icon */}
                  <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-5 shadow-lg text-[#D4AF37]">
                    <Sparkles size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl text-white font-light mb-2">
                    Welcome to the Circle.
                  </h3>
                  <p className="font-sans text-[#8a8578] text-xs max-w-xs mx-auto leading-relaxed">
                    You are now subscribed. Something truly beautiful is on its way to your inbox.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row w-full max-w-md mx-auto overflow-hidden bg-white/[0.03] border border-white/10 focus-within:border-[#D4AF37] transition-all duration-300 rounded-[2px]"
                >
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="min-w-0 flex-1 bg-transparent text-white text-sm font-sans px-5 py-4 placeholder:text-[#555045] focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="shrink-0 bg-[#D4AF37] hover:bg-white text-black hover:text-black px-6 py-4 inline-flex items-center justify-center gap-2.5 font-sans text-[9.5px] font-bold tracking-[0.18em] uppercase transition-all duration-300 disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        Join
                        <ArrowRight size={12} strokeWidth={2.5} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <p className="font-sans text-[#555045] text-[10px] tracking-wide mt-6">
              Privately managed list. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
