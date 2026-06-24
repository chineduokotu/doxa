"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cart";
import { ArrowRight } from "lucide-react";

interface NavLink {
  label: string;
  slug:  string;
}

interface MobileNavProps {
  isOpen:   boolean;
  onClose:  () => void;
  navLinks: NavLink[];
}

const subLinks: Record<string, string[]> = {
  "living-room": ["Sofas & Sectionals", "Coffee Tables", "Armchairs"],
  "dining-room": ["Dining Sets", "Dining Tables", "Dining Chairs"],
  "royal-sets":  ["Platinum Collection", "Gold Edition", "Bespoke Orders"],
  bedroom:       ["Beds & Frames", "Wardrobes", "Dressers"],
  outdoor:       ["Outdoor Sofas", "Garden Tables", "Sun Loungers"],
  decor:         ["Rugs & Carpets", "Lighting", "Wall Art"],
};

export function MobileNav({ isOpen, onClose, navLinks }: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[4px]"
          />

          {/* Drawer */}
          <motion.div
            key="mobile-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[min(88vw,360px)] bg-white flex flex-col overflow-hidden border-l border-[#e8e4de]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8e4de]">
              <Link href="/" aria-label="Doxa Home" className="shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Doxa Home"
                  width={140}
                  height={44}
                  priority
                  className="h-auto w-[120px]"
                />
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-8 h-8 flex items-center justify-center text-[#a09a94] hover:text-[#0c0c0c] transition-colors"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Mobile navigation">
              <p className="font-sans text-[9px] tracking-[0.2em] text-[#a09a94] uppercase mb-6">
                Collections
              </p>

              <ul className="space-y-0.5">
                {navLinks.map((link) => (
                  <li key={link.slug}>
                    <button
                      onClick={() => setExpanded(expanded === link.slug ? null : link.slug)}
                      className="w-full flex items-center justify-between py-3.5 border-b border-[#f0ede8] text-left"
                    >
                      <span className="font-serif text-[1.05rem] text-[#1a1816]/70 hover:text-[#1a1816] font-light transition-colors">
                        {link.label}
                      </span>
                      <ChevronDown
                        size={14}
                        strokeWidth={1.5}
                        className={`text-[#a09a94] transition-transform duration-200 ${
                          expanded === link.slug ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {expanded === link.slug && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <li className="h-2" />
                          {(subLinks[link.slug] || []).map((sub) => (
                            <li key={sub}>
                              <Link
                                href={`/shop/${link.slug}`}
                                onClick={onClose}
                                className="block py-2 pl-4 font-sans text-[13px] text-[#6b6560] hover:text-[#0c0c0c] transition-colors"
                              >
                                {sub}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              href={`/shop/${link.slug}`}
                              onClick={onClose}
                              className="flex items-center gap-1.5 py-2 pl-4 font-sans text-[9.5px] text-[#dc320c] hover:text-[#a81e0a] tracking-[0.16em] uppercase transition-colors"
                            >
                              View All <ArrowRight size={10} strokeWidth={1.5} />
                            </Link>
                          </li>
                          <li className="h-2" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>

              {/* Static links */}
              <div className="mt-8 pt-6 border-t border-[#e8e4de] space-y-5">
                {[
                  { label: "All Products", href: "/shop"    },
                  { label: "Our Story",    href: "/about"   },
                  { label: "Contact",      href: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="block font-sans text-[10px] tracking-[0.18em] uppercase text-[#6b6560] hover:text-[#0c0c0c] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-[#e8e4de]">
              <Link
                href="/shop"
                onClick={onClose}
                className="flex items-center justify-between w-full py-3.5 px-4 bg-[#f9f9f9] hover:bg-[#f2f2f2] text-[#0c0c0c] border border-[#e5e5e5] transition-colors"
              >
                <span className="font-sans text-[12px] text-[#6b6560]">Browse All Pieces</span>
                <div className="flex items-center gap-2 font-sans text-[9.5px] text-[#dc320c]">
                  {itemCount > 0 && <span>{itemCount} in bag ·</span>}
                  <ArrowRight size={12} strokeWidth={1.5} />
                </div>
              </Link>
              <p className="font-sans text-[#a09a94] text-[10px] text-center mt-4 tracking-wide">
                Airport Road, Benin City · +234 000 000 0000
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
