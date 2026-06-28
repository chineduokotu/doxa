"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/lib/data/categories";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MegaNavProps {
  activeSlug: string | null;
  onClose:    () => void;
  solidBg?:   boolean;
}

const subLinks: Record<string, string[]> = {
  "living-room": ["Sofas & Sectionals", "Coffee Tables", "TV Units", "Armchairs", "Ottoman & Poufs"],
  "dining-room": ["Dining Sets", "Dining Tables", "Dining Chairs", "Bar Stools", "Buffets"],
  "royal-sets":  ["Platinum Collection", "Gold Edition", "Silver Line", "Bespoke Orders"],
  bedroom:       ["Beds & Frames", "Wardrobes", "Dressers", "Nightstands", "Bedroom Sets"],
  outdoor:       ["Outdoor Sofas", "Garden Tables", "Sun Loungers", "Pergola Sets"],
  decor:         ["Rugs & Carpets", "Lighting", "Wall Art", "Vases & Ornaments", "Throws & Cushions"],
};

export function MegaNav({ activeSlug, onClose, solidBg = false }: MegaNavProps) {
  const active = categories.find((c) => c.slug === activeSlug);

  return (
    <AnimatePresence>
      {activeSlug && active && (
        <motion.div
          key={activeSlug}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "absolute top-full left-0 right-0 backdrop-blur-sm border-t shadow-2xl transition-all duration-300",
            solidBg
              ? "bg-white/97 border-ink-200"
              : "bg-black/97 border-white/5"
          )}
        >
          <div className="max-w-screen-xl mx-auto px-8 py-10 grid grid-cols-3 gap-12">

            {/* Sub-links */}
            <div className="col-span-2">
              <p className="font-sans text-[9.5px] text-[#D4AF37] tracking-[0.2em] uppercase mb-6">
                {active.label}
              </p>

              <ul className="grid grid-cols-2 gap-y-3.5 gap-x-8">
                {(subLinks[activeSlug] || []).map((sub) => (
                  <li key={sub}>
                    <Link
                      href={`/shop/${activeSlug}`}
                      onClick={onClose}
                      className={cn(
                        "group flex items-center gap-2 transition-colors duration-200",
                        solidBg ? "text-ink-500 hover:text-ink-950" : "text-white/40 hover:text-white"
                      )}
                    >
                      <span className={cn(
                        "font-serif text-[1.05rem] font-light transition-colors",
                        solidBg ? "group-hover:text-ink-950" : "group-hover:text-white"
                      )}>
                        {sub}
                      </span>
                      <ArrowRight
                        size={11}
                        strokeWidth={1.5}
                        className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={`/shop/${activeSlug}`}
                onClick={onClose}
                className="mt-8 inline-flex items-center gap-2 font-sans text-[9.5px] tracking-[0.18em] uppercase text-[#D4AF37] hover:text-[#AA7700] transition-colors duration-200"
              >
                View All {active.label}
                <ArrowRight size={11} strokeWidth={1.5} />
              </Link>
            </div>

            {/* Featured image */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image
                src={active.image}
                alt={active.label}
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                sizes="320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="font-serif text-white text-lg font-light leading-tight">
                  {active.label}
                </p>
                <p className="font-sans text-white/45 text-[11px] mt-1 leading-relaxed">
                  {active.description}
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
