"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f9f6f0 0%, #e8dcc8 50%, #f9f6f0 100%)",
      }}
    >
      {/* Gold accent decorations */}
      <div
        className="absolute top-0 left-0 w-48 h-48 opacity-5"
        style={{
          background:
            "radial-gradient(circle, #b8922a 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-64 h-64 opacity-5"
        style={{
          background:
            "radial-gradient(circle, #b8922a 0%, transparent 70%)",
        }}
      />

      <div className="max-w-2xl mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold-600 text-[0.65rem] tracking-[0.3em] uppercase font-sans mb-4">
            The Inner Circle
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-stone-900 font-light mb-4">
            First Access.
            <br />
            <em className="not-italic text-stone-500">Always.</em>
          </h2>
          <p className="text-stone-600 font-sans text-sm leading-relaxed mb-10 max-w-md mx-auto">
            Join our curated list and be first to know about new arrivals,
            exclusive collections, and private showroom events in Benin City.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="py-6"
            >
              <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10l4 4 8-8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="font-serif text-xl text-stone-900 font-light">
                You&apos;re in the circle.
              </p>
              <p className="text-stone-500 text-sm font-sans mt-2">
                Watch your inbox — something beautiful is coming.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md mx-auto overflow-hidden border border-stone-300 bg-white focus-within:border-gold-500"
            >
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="min-w-0 flex-1 bg-white text-stone-900 text-sm font-sans px-4 py-3.5 placeholder:text-stone-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="min-h-12 shrink-0 bg-stone-900 hover:bg-stone-700 text-white px-5 py-3.5 inline-flex items-center justify-center gap-2 text-[0.65rem] font-semibold tracking-widest uppercase font-sans transition-colors duration-200 disabled:opacity-60"
              >
                {loading ? (
                  <span className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send size={13} />
                )}
                Join
              </button>
            </form>
          )}

          <p className="text-stone-400 text-[0.65rem] mt-4 font-sans">
            No spam, ever. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
