"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, Search, Menu } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { MegaNav } from "./MegaNav";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Living Room", slug: "living-room" },
  { label: "Dining Room", slug: "dining-room" },
  { label: "Royal Sets", slug: "royal-sets" },
  { label: "Bedroom", slug: "bedroom" },
  { label: "Outdoor", slug: "outdoor" },
  { label: "Décor", slug: "decor" },
];

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const itemCount = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled || !isHome
            ? "bg-stone-950/98 backdrop-blur-sm shadow-lg shadow-black/10"
            : "bg-transparent"
        )}
        onMouseLeave={() => setActiveNav(null)}
      >
        {/* Top strip */}
        <div
          className={cn(
            "hidden lg:block border-b transition-all duration-500 py-1.5",
            scrolled || !isHome
              ? "border-stone-800 bg-stone-950"
              : "border-white/10 bg-black/20"
          )}
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <p className="text-[0.6rem] text-stone-400 tracking-widest uppercase font-sans">
              Premium Furniture — Benin Airport Road, Benin City
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/about"
                className="text-[0.6rem] text-stone-400 tracking-widest uppercase hover:text-gold-400 transition-colors font-sans"
              >
                Our Story
              </Link>
              <Link
                href="/contact"
                className="text-[0.6rem] text-stone-400 tracking-widest uppercase hover:text-gold-400 transition-colors font-sans"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Main nav bar */}
        <div className="max-w-7xl mx-auto px-6 py-4 lg:py-5 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl lg:text-3xl font-light tracking-[0.12em] text-white hover:text-gold-400 transition-colors duration-300"
          >
            DOXA<span className="text-gold-500">.</span>HOME
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.slug}
                className={cn(
                  "nav-link text-white/80 hover:text-white transition-colors",
                  activeNav === link.slug && "text-white"
                )}
                onMouseEnter={() => setActiveNav(link.slug)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            <Link
              href="/search"
              aria-label="Search products"
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              <Search size={18} />
            </Link>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative p-2 text-white/70 hover:text-white transition-colors hidden sm:flex"
            >
              <Heart size={18} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-gold-500 text-white text-[0.55rem] w-4 h-4 rounded-full flex items-center justify-center font-sans font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              aria-label={`Shopping bag, ${mounted ? itemCount : 0} items`}
              className="relative p-2 text-white/70 hover:text-white transition-colors"
            >
              <ShoppingBag size={18} />
              {mounted && itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-gold-500 text-white text-[0.55rem] w-4 h-4 rounded-full flex items-center justify-center font-sans font-medium">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mega nav dropdown */}
        <MegaNav activeSlug={activeNav} onClose={() => setActiveNav(null)} />
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
