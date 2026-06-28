"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Custom premium WhatsApp SVG
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ width: "100%", height: "100%" }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M11.99 2C6.477 2 2 6.477 2 11.99c0 1.872.518 3.624 1.416 5.125L2 22l5.042-1.396A9.94 9.94 0 0 0 11.99 22C17.523 22 22 17.523 22 11.99 22 6.477 17.523 2 11.99 2zm0 18.18a8.14 8.14 0 0 1-4.152-1.138l-.298-.177-3.073.85.867-3.003-.194-.31A8.18 8.18 0 0 1 3.82 11.99c0-4.507 3.663-8.17 8.17-8.17s8.17 3.663 8.17 8.17-3.663 8.17-8.17 8.17z" />
    </svg>
  );
}

export function WhatsAppFloatingButton() {
  const [cookieBannerActive, setCookieBannerActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl =
    "https://wa.me/2349030181800?text=Hello%20Doxa%20Home%2C%20I%20am%20interested%20in%20your%20premium%20furniture%20collections.";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const consent = localStorage.getItem("doxa-cookie-consent");
    if (!consent) {
      setCookieBannerActive(true);
    }

    const handleConsentCheck = () => {
      const updatedConsent = localStorage.getItem("doxa-cookie-consent");
      if (updatedConsent) {
        setCookieBannerActive(false);
      }
    };
    window.addEventListener("click", handleConsentCheck);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleConsentCheck);
    };
  }, []);

  const handleFabClick = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  // Safe height translation to keep it above the cookie banner when active
  const yOffset = cookieBannerActive ? (isMobile ? -175 : -190) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: yOffset,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
        y: { type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 select-none"
    >
      {/* ─── Tiny Hover Tooltip ─── */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-14 top-2 bg-ink-950/95 text-white border border-white/10 font-sans text-[9px] tracking-widest uppercase py-1 px-2.5 shadow-md whitespace-nowrap hidden sm:block rounded-sm"
          >
            WhatsApp Chat
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Compact Floating Button ─── */}
      <button
        onClick={handleFabClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat with Doxa Home on WhatsApp"
        className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 hover:bg-[#20ba59] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
      >
        <div className="w-5.5 h-5.5 shrink-0">
          <WhatsAppIcon />
        </div>
      </button>
    </motion.div>
  );
}
