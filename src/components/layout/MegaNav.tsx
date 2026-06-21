"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/lib/data/categories";
import { ArrowRight } from "lucide-react";

interface MegaNavProps {
  activeSlug: string | null;
  onClose: () => void;
}

const subLinks: Record<string, string[]> = {
  "living-room": ["Sofas & Sectionals", "Coffee Tables", "TV Units", "Armchairs", "Ottoman & Poufs"],
  "dining-room": ["Dining Sets", "Dining Tables", "Dining Chairs", "Bar Stools", "Buffets"],
  "royal-sets": ["Platinum Collection", "Gold Edition", "Silver Line", "Bespoke Orders"],
  bedroom: ["Beds & Frames", "Wardrobes", "Dressers", "Nightstands", "Bedroom Sets"],
  outdoor: ["Outdoor Sofas", "Garden Tables", "Sun Loungers", "Pergola Sets"],
  decor: ["Rugs & Carpets", "Lighting", "Wall Art", "Vases & Ornaments", "Throws & Cushions"],
};

export function MegaNav({ activeSlug, onClose }: MegaNavProps) {
  const active = categories.find((c) => c.slug === activeSlug);

  return (
    <AnimatePresence>
      {activeSlug && active && (
        <motion.div
          key={activeSlug}
          initial={{ opacity: 0, y: -4, scaleY: 0.97 }}
          animate={{ opacity: 1, y: 0, scaleY: 1 }}
          exit={{ opacity: 0, y: -4, scaleY: 0.97 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "top" }}
          className="absolute top-full left-0 right-0 bg-stone-950/98 backdrop-blur-sm border-t border-stone-800 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-3 gap-12">
            {/* Sub-links */}
            <div className="col-span-2">
              <p className="text-[0.6rem] text-gold-500 tracking-widest uppercase font-sans mb-5">
                {active.label}
              </p>
              <ul className="grid grid-cols-2 gap-y-3 gap-x-8">
                {(subLinks[activeSlug] || []).map((sub) => (
                  <li key={sub}>
                    <Link
                      href={`/shop/${activeSlug}`}
                      onClick={onClose}
                      className="group flex items-center gap-2 text-stone-300 hover:text-white transition-colors duration-200"
                    >
                      <span className="font-serif text-base font-light group-hover:text-gold-400 transition-colors">
                        {sub}
                      </span>
                      <ArrowRight
                        size={12}
                        className="text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/shop/${activeSlug}`}
                onClick={onClose}
                className="mt-8 inline-flex items-center gap-2 text-[0.65rem] tracking-widest uppercase font-sans text-gold-400 hover:text-gold-300 transition-colors"
              >
                View All {active.label}
                <ArrowRight size={12} />
              </Link>
            </div>

            {/* Featured image */}
            <div className="relative overflow-hidden aspect-[4/3]">
              <Image
                src={active.image}
                alt={active.label}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="350px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-serif text-lg font-light">
                  {active.label}
                </p>
                <p className="text-stone-300 text-xs font-sans mt-1">
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
