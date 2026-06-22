"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { MegaNav } from "./MegaNav";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Living Room", slug: "living-room" },
  { label: "Dining Room", slug: "dining-room" },
  { label: "Royal Sets",  slug: "royal-sets"  },
  { label: "Bedroom",     slug: "bedroom"     },
  { label: "Outdoor",     slug: "outdoor"     },
  { label: "Décor",       slug: "decor"       },
];

const subscribe         = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function Header() {
  const pathname   = usePathname();
  const isHome     = pathname === "/";
  const [scrolled, setScrolled]     = useState(false);
  const [activeNav, setActiveNav]   = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const mounted       = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const itemCount     = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const openCart      = useCartStore((s) => s.openCart);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Header style: transparent on home hero, solid dark once scrolled */
  const solidBg = scrolled || !isHome;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          solidBg
            ? "bg-white border-b border-[#e8e4de] shadow-sm"
            : "bg-transparent"
        )}
        onMouseLeave={() => setActiveNav(null)}
      >
        {/* ── Announcement / utility bar ─────────────────────── */}
        <div
          className={cn(
            "hidden lg:block transition-all duration-500",
            solidBg ? "bg-[#f4f0e8] border-b border-[#e8e4de]" : "bg-black/25"
          )}
        >
          <div className="max-w-screen-xl mx-auto px-8 flex items-center justify-between h-9">
            <p className={cn(
              "text-[10px] tracking-[0.18em] uppercase font-sans transition-colors duration-500",
              solidBg ? "text-[#6b6560]" : "text-white/35"
            )}>
              Free delivery on orders over ₦500,000 — Airport Road, Benin City
            </p>
            <div className={cn(
              "flex items-center divide-x transition-colors duration-500",
              solidBg ? "divide-[#e8e4de]" : "divide-white/10"
            )}>
              {[
                { label: "Our Story",  href: "/about"   },
                { label: "Contact",    href: "/contact"  },
                { label: "Showroom",   href: "/contact#showroom" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "px-4 text-[10px] tracking-[0.14em] uppercase transition-colors duration-200 font-sans",
                    solidBg ? "text-[#6b6560] hover:text-[#1a1816]" : "text-white/40 hover:text-white/80"
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main nav bar ───────────────────────────────────── */}
        <div className="max-w-screen-xl mx-auto px-8 flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "shrink-0 font-serif text-[1.55rem] font-light tracking-[0.18em] transition-colors duration-300 select-none",
              solidBg ? "text-[#0c0c0c] hover:text-[#0c0c0c]/80" : "text-white hover:text-white/80"
            )}
          >
            DOXA<span className="text-[#dc320c]">.</span>HOME
          </Link>

          {/* Desktop nav links — centered */}
          <nav className="hidden lg:flex items-center gap-9" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.slug}
                className={cn(
                  "nav-link",
                  solidBg ? "nav-link-dark text-[#6b6560]" : "text-white/75",
                  activeNav === link.slug && (solidBg ? "text-[#0c0c0c]" : "text-white")
                )}
                onMouseEnter={() => setActiveNav(link.slug)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right icon cluster */}
          <div className="flex items-center gap-1">
            <Link
              href="/search"
              aria-label="Search products"
              className={cn(
                "w-10 h-10 flex items-center justify-center transition-colors duration-200",
                solidBg ? "text-neutral-500 hover:text-[#0c0c0c]" : "text-white/50 hover:text-white"
              )}
            >
              <Search size={17} strokeWidth={1.5} />
            </Link>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className={cn(
                "relative w-10 h-10 items-center justify-center transition-colors duration-200 hidden sm:flex",
                solidBg ? "text-neutral-500 hover:text-[#0c0c0c]" : "text-white/50 hover:text-white"
              )}
            >
              <Heart size={17} strokeWidth={1.5} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute top-2 right-2 w-[14px] h-[14px] rounded-full bg-[#ecb881] text-[#0c0c0c] text-[9px] flex items-center justify-center font-sans font-semibold leading-none">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={openCart}
              aria-label={`Shopping bag — ${mounted ? itemCount : 0} items`}
              className={cn(
                "relative w-10 h-10 flex items-center justify-center transition-colors duration-200",
                solidBg ? "text-neutral-500 hover:text-[#0c0c0c]" : "text-white/50 hover:text-white"
              )}
            >
              <ShoppingBag size={17} strokeWidth={1.5} />
              {mounted && itemCount > 0 && (
                <span className="absolute top-2 right-2 w-[14px] h-[14px] rounded-full bg-[#dc320c] text-white text-[9px] flex items-center justify-center font-sans font-semibold leading-none">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={cn(
                "lg:hidden w-10 h-10 flex items-center justify-center transition-colors duration-200 ml-1",
                solidBg ? "text-[#0c0c0c] hover:text-[#0c0c0c]" : "text-white/50 hover:text-white"
              )}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Mega nav dropdown */}
        <MegaNav activeSlug={activeNav} onClose={() => setActiveNav(null)} solidBg={solidBg} />
      </header>

      {/* Mobile nav */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
