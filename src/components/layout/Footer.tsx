import Link from "next/link";
import { Globe, Share2, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "Living Room", href: "/shop/living-room" },
    { label: "Dining Room", href: "/shop/dining-room" },
    { label: "Royal Sets", href: "/shop/royal-sets" },
    { label: "Bedroom", href: "/shop/bedroom" },
    { label: "All Products", href: "/shop" },
  ],
  Company: [
    { label: "Our Story", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Showroom Visit", href: "/contact#showroom" },
  ],
  Support: [
    { label: "Delivery Info", href: "/contact#delivery" },
    { label: "Returns Policy", href: "/contact#returns" },
    { label: "Care Guide", href: "/contact#care" },
  ],
};

const paymentMethods = ["Paystack", "Bank Transfer", "Visa", "Mastercard"];

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand */}
          <div className="lg:col-span-2 min-w-0">
            <Link
              href="/"
              className="font-serif text-3xl text-white tracking-widest"
            >
              DOXA<span className="text-gold-500">.</span>HOME
            </Link>
            <p className="mt-4 text-sm font-sans text-stone-400 leading-relaxed max-w-xs">
              Curating premium furniture for discerning homes across Nigeria.
              Every piece is chosen for its craft, longevity and beauty.
            </p>
            {/* Contact info */}
            <div className="mt-6 space-y-2 max-w-sm">
              <div className="flex items-start gap-2 text-stone-400 text-xs font-sans">
                <MapPin size={13} className="mt-0.5 shrink-0 text-gold-500" />
                <span>Airport Road, Benin City, Edo State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2 text-stone-400 text-xs font-sans">
                <Phone size={13} className="shrink-0 text-gold-500" />
                <a
                  href="tel:+2340000000000"
                  className="hover:text-white transition-colors"
                >
                  +234 000 000 0000
                </a>
              </div>
              <div className="flex items-center gap-2 text-stone-400 text-xs font-sans">
                <Mail size={13} className="shrink-0 text-gold-500" />
                <a
                  href="mailto:hello@doxahome.ng"
                  className="hover:text-white transition-colors"
                >
                  hello@doxahome.ng
                </a>
              </div>
            </div>
            {/* Social */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-stone-400 hover:text-gold-400 transition-colors"
              >
                <Globe size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-stone-400 hover:text-gold-400 transition-colors"
              >
                <Share2 size={18} />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="min-w-0">
              <p className="text-[0.65rem] tracking-widest uppercase font-sans text-gold-500 mb-5">
                {section}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-sans text-stone-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="py-10 border-b border-stone-800">
          <div className="max-w-md min-w-0">
            <p className="font-serif text-xl text-white font-light mb-2">
              Join the Doxa Circle
            </p>
            <p className="text-stone-500 text-xs font-sans mb-5">
              New arrivals, exclusive previews and styling inspiration — direct
              to your inbox.
            </p>
            <form className="flex w-full overflow-hidden border border-stone-700 bg-stone-900 focus-within:border-gold-500">
              <input
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-stone-900 text-stone-200 text-sm font-sans px-4 py-3 placeholder:text-stone-600 focus:outline-none"
              />
              <button
                type="submit"
                className="min-h-11 shrink-0 bg-gold-500 hover:bg-gold-600 text-white text-[0.65rem] font-semibold tracking-widest uppercase font-sans px-4 sm:px-5 py-3 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-stone-600 text-xs font-sans">
            © {new Date().getFullYear()} Doxa Home. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-stone-600 text-[0.6rem] font-sans tracking-widest uppercase mr-2">
              We Accept
            </span>
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="text-[0.6rem] font-sans text-stone-500 border border-stone-700 px-2 py-0.5"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
