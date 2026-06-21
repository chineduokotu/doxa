"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cart";

interface NavLink {
  label: string;
  slug: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

const subLinks: Record<string, string[]> = {
  "living-room": ["Sofas & Sectionals", "Coffee Tables", "Armchairs"],
  "dining-room": ["Dining Sets", "Dining Tables", "Dining Chairs"],
  "royal-sets": ["Platinum Collection", "Gold Edition", "Bespoke Orders"],
  bedroom: ["Beds & Frames", "Wardrobes", "Dressers"],
  outdoor: ["Outdoor Sofas", "Garden Tables", "Sun Loungers"],
  decor: ["Rugs & Carpets", "Lighting", "Wall Art"],
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
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[min(85vw,360px)] bg-stone-950 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800">
              <span className="font-serif text-xl text-white tracking-widest">
                DOXA<span className="text-gold-500">.</span>HOME
              </span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="text-stone-400 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <p className="text-[0.6rem] tracking-widest text-stone-500 uppercase font-sans mb-5">
                Collections
              </p>
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.slug}>
                    <button
                      onClick={() =>
                        setExpanded(
                          expanded === link.slug ? null : link.slug
                        )
                      }
                      className="w-full flex items-center justify-between py-3 border-b border-stone-800/50 text-left"
                    >
                      <span className="font-serif text-lg text-stone-200 font-light">
                        {link.label}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-stone-500 transition-transform duration-200 ${
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
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          {(subLinks[link.slug] || []).map((sub) => (
                            <li key={sub}>
                              <Link
                                href={`/shop/${link.slug}`}
                                onClick={onClose}
                                className="block py-2 pl-4 text-sm font-sans text-stone-400 hover:text-gold-400 transition-colors"
                              >
                                {sub}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              href={`/shop/${link.slug}`}
                              onClick={onClose}
                              className="block py-2 pl-4 text-xs font-sans text-gold-500 hover:text-gold-400 tracking-widest uppercase transition-colors"
                            >
                              View All →
                            </Link>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>

              {/* Static links */}
              <div className="mt-8 pt-6 border-t border-stone-800 space-y-4">
                {[
                  { label: "All Products", href: "/shop" },
                  { label: "Our Story", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="block text-[0.7rem] tracking-widest uppercase font-sans text-stone-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-stone-800">
              <Link
                href="/cart"
                onClick={onClose}
                className="flex items-center justify-between w-full py-3 px-4 bg-stone-800 hover:bg-stone-700 text-white transition-colors"
              >
                <span className="text-sm font-sans">View Cart</span>
                <div className="flex items-center gap-2">
                  <span className="text-gold-400 text-xs font-sans">
                    {itemCount} items
                  </span>
                  <ShoppingBag size={16} />
                </div>
              </Link>
              <p className="text-stone-500 text-[0.6rem] text-center mt-4 font-sans">
                Airport Road, Benin City · +234 000 000 0000
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
