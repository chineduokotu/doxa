"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";

const CONSENT_KEY = "doxa-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Delay banner appearance slightly for polish
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(CONSENT_KEY, "dismissed");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-40 border border-white/10 bg-ink-950 text-ink-100 shadow-2xl sm:left-auto sm:bottom-6 sm:right-6 sm:w-[360px]"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <p className="font-serif text-base font-light leading-snug">
                We use cookies to enhance your experience.
              </p>
              <button
                onClick={handleDismiss}
                className="text-ink-400 hover:text-ink-100 transition-colors mt-0.5 shrink-0"
                aria-label="Close cookie banner"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-ink-400 text-xs leading-relaxed mb-4 font-sans">
              By continuing to browse Doxa Home, you consent to our use of
              cookies for analytics and personalisation.
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              <Button
                onClick={handleAccept}
                variant="gold"
                size="sm"
                fullWidth
              >
                Accept
              </Button>
              <Button
                onClick={handleDismiss}
                variant="outline"
                size="sm"
                fullWidth
                className="border-ink-600 text-ink-300 hover:bg-ink-700 hover:text-white"
              >
                Decline
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
