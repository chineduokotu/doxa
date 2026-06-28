"use client";

import { useState } from "react";
import { galleryItems, GalleryItem } from "@/lib/data/gallery";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Image as ImageIcon, Video, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  { label: "All Collections", slug: "all" },
  { label: "Living Room", slug: "living-room" },
  { label: "Dining Room", slug: "dining-room" },
  { label: "Royal Sets", slug: "royal-sets" },
  { label: "Bedroom", slug: "bedroom" },
  { label: "Outdoor", slug: "outdoor" },
  { label: "Décor", slug: "decor" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [mediaFilter, setMediaFilter] = useState<"all" | "image" | "video">("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Filter logic
  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesMediaType = mediaFilter === "all" || item.mediaType === mediaFilter;
    return matchesCategory && matchesMediaType;
  });

  return (
    <div className="min-h-screen bg-black text-zinc-100 pt-28 lg:pt-36 pb-24">
      <div className="max-w-screen-xl mx-auto px-8">
        
        {/* ─── Header ────────────────────────────────────────── */}
        <div className="mb-14 text-center max-w-xl mx-auto">
          <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mb-6" />
          <p className="font-sans text-[10px] text-[#D4AF37] tracking-[0.25em] uppercase mb-3">
            Visual Showcase
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-white mb-6">
            Our Gallery
          </h1>
          <p className="font-sans text-xs text-zinc-400 leading-[1.85] font-light">
            Browse through our cinematic videos and high-definition photography of bespoke luxury furniture, conceptualized for refined spaces in Benin City and Lagos.
          </p>
        </div>

        {/* ─── Filters Control Panel ──────────────────────────── */}
        <div className="flex flex-col gap-6 items-center justify-between border-y border-zinc-800/60 py-6 mb-12">
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 font-sans text-[9px] tracking-[0.16em] uppercase transition-all duration-300 ${
                  activeCategory === cat.slug
                    ? "bg-[#D4AF37] text-zinc-950 font-semibold"
                    : "bg-zinc-900/40 text-zinc-400 hover:text-white border border-zinc-800/40 hover:border-zinc-700/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Media Type Filter */}
          <div className="flex items-center gap-2 bg-zinc-900/40 border border-zinc-800/40 p-1">
            {(["all", "image", "video"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setMediaFilter(type)}
                className={`px-4 py-1.5 font-sans text-[9px] tracking-[0.15em] uppercase transition-all duration-300 flex items-center gap-1.5 ${
                  mediaFilter === type
                    ? "bg-zinc-800 text-white font-medium"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {type === "image" && <ImageIcon size={10} />}
                {type === "video" && <Video size={10} />}
                {type === "all" ? "All Media" : type === "image" ? "Images Only" : "Videos Only"}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Grid Gallery ───────────────────────────────────── */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 font-sans text-xs">
            No media files found matching selected filters.
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setActiveItem(item)}
                  className="group relative aspect-[4/5] bg-zinc-900 overflow-hidden cursor-pointer border border-zinc-800/20"
                >
                  {/* Media Content */}
                  {item.mediaType === "image" ? (
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      {/* Video Thumbnail (uses standard styling & thumbnail overlay) */}
                      <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                        <video 
                          src={item.url}
                          muted 
                          playsInline
                          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out" 
                        />
                      </div>
                      {/* Play indicator */}
                      <div className="absolute top-4 left-4 bg-black/60 border border-white/10 text-white p-1 rounded-sm text-[8px] tracking-[0.15em] uppercase font-sans flex items-center gap-1 z-10">
                        <Video size={8} /> Video
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-11 h-11 bg-zinc-950/80 border border-[#D4AF37]/50 rounded-full flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                          <Play size={16} fill="#D4AF37" className="translate-x-[1px]" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <p className="text-[8px] text-[#D4AF37] tracking-[0.2em] uppercase font-semibold mb-1">
                      {item.category.replace("-", " ")}
                    </p>
                    <h3 className="font-serif text-sm text-white font-light mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-zinc-400 line-clamp-1 font-sans">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ─── Lightbox Modal Overlay ───────────────────────── */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-md"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 w-11 h-11 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center rounded-full hover:scale-105 transition-transform duration-200 z-50"
              >
                <X size={20} />
              </button>

              {/* Lightbox Content Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-4xl w-full aspect-[4/5] sm:aspect-[16/10] bg-zinc-950 border border-zinc-900 overflow-hidden flex flex-col sm:flex-row shadow-2xl"
              >
                {/* Media Side */}
                <div className="relative flex-1 bg-black">
                  {activeItem.mediaType === "image" ? (
                    <Image
                      src={activeItem.url}
                      alt={activeItem.title}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <video
                      src={activeItem.url}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* Text Side */}
                <div className="w-full sm:w-[280px] bg-zinc-900/90 border-t sm:border-t-0 sm:border-l border-zinc-800 p-6 flex flex-col justify-between shrink-0">
                  <div>
                    <div className="w-6 h-[1px] bg-[#D4AF37] mb-4" />
                    <p className="text-[9px] text-[#D4AF37] tracking-[0.2em] uppercase font-semibold mb-2">
                      {activeItem.category.replace("-", " ")}
                    </p>
                    <h2 className="font-serif text-lg text-white font-light tracking-wide mb-3 leading-snug">
                      {activeItem.title}
                    </h2>
                    <p className="text-zinc-400 font-sans text-[11px] leading-[1.75] font-light">
                      {activeItem.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-800">
                    <Link
                      href={`/shop/${activeItem.category}`}
                      onClick={() => setActiveItem(null)}
                      className="inline-flex items-center gap-1.5 font-sans text-[9px] text-[#D4AF37] hover:text-white tracking-[0.15em] uppercase transition-colors"
                    >
                      Shop Collection <ChevronRight size={10} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
