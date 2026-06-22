"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Newsletter() {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#f9f9f9] border-t border-[#e5e5e5] relative overflow-hidden">
      {/* Subtle noise / grain texture via repeating gradient */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
           style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    backgroundSize: "200px 200px" }} />

      <div className="max-w-screen-xl mx-auto px-8 relative">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}
          >
            <p className="font-sans text-[10px] text-[#ecb881] tracking-[0.24em] uppercase mb-4">
              The Inner Circle
            </p>

            <h2 className="display-lg text-[#0c0c0c] mb-4">
              First Access.{" "}
              <span className="text-[#888888] italic font-light">Always.</span>
            </h2>

            <p className="font-sans text-[#555555] text-sm leading-[1.85] mb-10 max-w-md mx-auto">
              Join our curated list and be first to know about new arrivals,
              exclusive collections, and private showroom events in Benin City.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-8"
              >
                {/* Checkmark circle */}
                <div className="w-12 h-12 rounded-full border border-[#ecb881]/40 bg-[#ecb881]/10 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-5 h-5 text-[#ecb881]" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-serif text-xl text-[#0c0c0c] font-light mb-2">
                  You&apos;re in the circle.
                </p>
                <p className="font-sans text-[#555555] text-sm">
                  Watch your inbox — something beautiful is coming.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-md mx-auto overflow-hidden bg-white border border-[#e5e5e5] focus-within:border-[#ecb881] transition-colors duration-200"
              >
                <input
                  type="email"
                  id="newsletter-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="min-w-0 flex-1 bg-transparent text-[#0c0c0c] text-sm font-sans px-5 py-4 placeholder:text-[#888888] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 bg-[#0c0c0c] hover:bg-[#222222] text-white px-5 py-4 inline-flex items-center justify-center gap-2 font-sans text-[9.5px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ArrowRight size={13} strokeWidth={1.5} />
                  )}
                  Join
                </button>
              </form>
            )}

            <p className="font-sans text-[#888888] text-[11px] mt-5">
              No spam, ever. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
