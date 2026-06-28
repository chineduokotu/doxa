"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Phone, Mail, ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";

interface NavLink {
  label: string;
  slug:  string;
}

interface MobileNavProps {
  isOpen:   boolean;
  onClose:  () => void;
  navLinks: NavLink[];
}

const subLinks: Record<string, { label: string; href: string }[]> = {
  "living-room": [
    { label: "Sofas & Sectionals", href: "/shop/living-room" },
    { label: "Coffee Tables",       href: "/shop/living-room" },
    { label: "Armchairs",           href: "/shop/living-room" },
  ],
  "dining-room": [
    { label: "Dining Sets",    href: "/shop/dining-room" },
    { label: "Dining Tables",  href: "/shop/dining-room" },
    { label: "Dining Chairs",  href: "/shop/dining-room" },
  ],
  "royal-sets": [
    { label: "Platinum Collection", href: "/shop/royal-sets" },
    { label: "Gold Edition",        href: "/shop/royal-sets" },
    { label: "Bespoke Orders",      href: "/shop/royal-sets" },
  ],
  bedroom: [
    { label: "Beds & Frames", href: "/shop/bedroom" },
    { label: "Wardrobes",     href: "/shop/bedroom" },
    { label: "Dressers",      href: "/shop/bedroom" },
  ],
  outdoor: [
    { label: "Outdoor Sofas",  href: "/shop/outdoor" },
    { label: "Garden Tables",  href: "/shop/outdoor" },
    { label: "Sun Loungers",   href: "/shop/outdoor" },
  ],
  decor: [
    { label: "Rugs & Carpets", href: "/shop/decor" },
    { label: "Lighting",       href: "/shop/decor" },
    { label: "Wall Art",       href: "/shop/decor" },
  ],
};

export function MobileNav({ isOpen, onClose, navLinks }: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const itemCount     = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const openCart      = useCartStore((s) => s.openCart);

  const handleCartClick = () => { onClose(); openCart(); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* â”€â”€ Backdrop â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <motion.div
            key="mob-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              background: "rgba(0,0,0,0.72)",
              backdropFilter: "blur(6px)",
            }}
          />

          {/* â”€â”€ Drawer panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <motion.div
            key="mob-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 51,
              width: "min(88vw, 360px)",
              background: "#0d0c0a",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* â”€â”€ Gold top accent â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <div style={{ height: 2, background: "linear-gradient(to right, #D4AF37, #F5D061, #D4AF37)", flexShrink: 0 }} />

            {/* â”€â”€ Drawer header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                flexShrink: 0,
              }}
            >
              {/* Logo text */}
              <Link
                href="/"
                onClick={onClose}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.35rem",
                  fontWeight: 300,
                  letterSpacing: "0.18em",
                  color: "#ffffff",
                  textDecoration: "none",
                  lineHeight: 1,
                }}
              >
                DOXA<span style={{ color: "#D4AF37" }}>.</span>HOMES
              </Link>

              {/* Right cluster: cart + wishlist + close */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  onClick={onClose}
                  aria-label="Wishlist"
                  style={{
                    position: "relative",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#8a8578",
                    textDecoration: "none",
                  }}
                >
                  <Heart size={18} strokeWidth={1.5} />
                  {wishlistCount > 0 && (
                    <span style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      background: "#D4AF37",
                      color: "#0d0c0a",
                      fontSize: 8,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Inter', sans-serif",
                    }}>
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <button
                  onClick={handleCartClick}
                  aria-label="Cart"
                  style={{
                    position: "relative",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#8a8578",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  {itemCount > 0 && (
                    <span style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      background: "#D4AF37",
                      color: "#0d0c0a",
                      fontSize: 8,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Inter', sans-serif",
                    }}>
                      {itemCount > 9 ? "9+" : itemCount}
                    </span>
                  )}
                </button>

                {/* Close */}
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  style={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#8a8578",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "0.25rem",
                  }}
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* â”€â”€ Scrollable body â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>

              {/* Section label */}
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.55rem",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#555045",
                marginBottom: "1rem",
              }}>
                Collections
              </p>

              {/* Category links */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {navLinks.map((link, i) => {
                  const isExpanded = expanded === link.slug;
                  const subs = subLinks[link.slug] || [];
                  return (
                    <li
                      key={link.slug}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <button
                        onClick={() => setExpanded(isExpanded ? null : link.slug)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "1rem 0",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        <span style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: "1.15rem",
                          fontWeight: 300,
                          color: isExpanded ? "#D4AF37" : "#c0bbb0",
                          transition: "color 200ms",
                          letterSpacing: "0.02em",
                        }}>
                          {link.label}
                        </span>
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          border: `1px solid ${isExpanded ? "#D4AF37" : "rgba(255,255,255,0.1)"}`,
                          color: isExpanded ? "#D4AF37" : "#555045",
                          transition: "all 200ms",
                          flexShrink: 0,
                          transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                        }}>
                          <ChevronRight size={12} strokeWidth={2} />
                        </span>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            <div style={{ paddingBottom: "0.75rem", paddingLeft: "0.75rem" }}>
                              {/* Gold left rule */}
                              <div style={{ borderLeft: "1px solid #D4AF37", paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                {subs.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    onClick={onClose}
                                    style={{
                                      fontFamily: "'Inter', sans-serif",
                                      fontSize: "0.8125rem",
                                      color: "#8a8578",
                                      textDecoration: "none",
                                      display: "block",
                                      padding: "0.3rem 0",
                                      transition: "color 150ms",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8578")}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                                <Link
                                  href={`/shop/${link.slug}`}
                                  onClick={onClose}
                                  style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "0.6rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    color: "#D4AF37",
                                    textDecoration: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.35rem",
                                    paddingTop: "0.35rem",
                                  }}
                                >
                                  View All {link.label}
                                  <ChevronRight size={10} strokeWidth={2} />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>

              {/* â”€â”€ Static links â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
              <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.55rem",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#555045",
                  marginBottom: "1rem",
                }}>
                  Pages
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  {[
                    { label: "Home",         href: "/"        },
                    { label: "Gallery",      href: "/gallery" },
                    { label: "All Products", href: "/shop"    },
                    { label: "Our Story",    href: "/about"   },
                    { label: "Contact",      href: "/contact" },
                    { label: "Showroom",     href: "/contact#showroom" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.8rem",
                        color: "#8a8578",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "color 150ms",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#ffffff";
                        const icon = e.currentTarget.querySelector("span");
                        if (icon) icon.style.color = "#D4AF37";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#8a8578";
                        const icon = e.currentTarget.querySelector("span");
                        if (icon) icon.style.color = "#555045";
                      }}
                    >
                      {link.label}
                      <span style={{ color: "#555045", transition: "color 150ms" }}>
                        <ChevronRight size={13} strokeWidth={1.5} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* â”€â”€ Contact strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
              <div style={{
                marginTop: "2rem",
                padding: "1.25rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                gap: "0.65rem",
              }}>
                <a
                  href="tel:+2349060753966"
                  style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}
                >
                  <Phone size={12} style={{ color: "#D4AF37", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#8a8578" }}>
                    09060753966
                  </span>
                </a>
                <a
                  href="mailto:hello@doxahome.ng"
                  style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}
                >
                  <Mail size={12} style={{ color: "#D4AF37", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#8a8578" }}>
                    hello@doxahome.ng
                  </span>
                </a>
              </div>
            </div>

            {/* â”€â”€ Footer CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <div style={{
              padding: "1.25rem 1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              flexShrink: 0,
            }}>
              <Link
                href="/shop"
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  width: "100%",
                  padding: "0.9rem",
                  background: "#D4AF37",
                  color: "#0d0c0a",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderRadius: 2,
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#c19e30")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#D4AF37")}
              >
                Browse All Pieces
                <ChevronRight size={13} strokeWidth={2.5} />
              </Link>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                color: "#555045",
                textAlign: "center",
                marginTop: "0.75rem",
                letterSpacing: "0.04em",
              }}>
                108 Akpakpava Road, Benin City
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
