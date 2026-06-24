import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "Living Room", href: "/shop/living-room" },
    { label: "Dining Room", href: "/shop/dining-room" },
    { label: "Royal Sets",  href: "/shop/royal-sets"  },
    { label: "Bedroom",     href: "/shop/bedroom"     },
    { label: "All Products",href: "/shop"             },
  ],
  Company: [
    { label: "Our Story",      href: "/about"              },
    { label: "Contact",        href: "/contact"            },
    { label: "Showroom Visit", href: "/contact#showroom"   },
  ],
  Support: [
    { label: "Delivery Info",  href: "/contact#delivery"   },
    { label: "Returns Policy", href: "/contact#returns"    },
    { label: "Care Guide",     href: "/contact#care"       },
  ],
};

const paymentMethods = ["Paystack", "Bank Transfer", "Visa", "Mastercard"];

export function Footer() {
  return (
    <footer className="bg-[#f9f9f9] text-[#0c0c0c] border-t border-[#e5e5e5] overflow-hidden">

      {/* ── Main footer body ─────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-[#e5e5e5]">

          {/* Brand column */}
          <div className="min-w-0">
            <Link href="/" className="font-serif text-[1.6rem] text-[#0c0c0c] tracking-[0.18em] font-light">
              DOXA<span className="text-[#dc320c]">.</span>HOME
            </Link>

            <p className="mt-5 font-sans text-[13px] text-[#555555] leading-[1.8] max-w-[280px]">
              Curating premium furniture for discerning homes across Nigeria.
              Every piece is chosen for its craft, longevity, and beauty.
            </p>

            {/* Contact */}
            <div className="mt-7 space-y-3">
              {[
                { Icon: MapPin, text: "Airport Road, Benin City, Edo State, Nigeria" },
                { Icon: Phone, text: "+234 000 000 0000", href: "tel:+2340000000000"         },
                { Icon: Mail,  text: "hello@doxahome.ng", href: "mailto:hello@doxahome.ng"   },
              ].map(({ Icon, text, href }) => (
                <div key={text} className="flex items-start gap-2.5 text-[#555555]">
                  <Icon size={12} className="mt-[3px] shrink-0 text-[#dc320c]" />
                  {href ? (
                    <a href={href} className="font-sans text-[12px] hover:text-[#0c0c0c] transition-colors">
                      {text}
                    </a>
                  ) : (
                    <span className="font-sans text-[12px] leading-snug">{text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-7 flex items-center gap-4">
              {[
                { label: "Instagram", href: "https://instagram.com", icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="5"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                )},
                { label: "Facebook", href: "https://facebook.com", icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                )},
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#888888] hover:text-[#dc320c] transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="min-w-0">
              <p className="font-sans text-[9.5px] text-[#888888] tracking-[0.2em] uppercase mb-6">
                {section}
              </p>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-[13px] text-[#555555] hover:text-[#0c0c0c] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Newsletter strip ───────────────────────────── */}
        <div className="py-9 border-b border-[#e5e5e5]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 max-w-2xl">
            <div className="flex-1 min-w-0">
              <p className="font-serif text-[1.15rem] text-[#0c0c0c] font-light">
                Join the Doxa Circle
              </p>
              <p className="font-sans text-[12px] text-[#555555] mt-1 leading-relaxed">
                New arrivals & exclusive previews — direct to your inbox.
              </p>
            </div>

            <form className="flex overflow-hidden border border-[#e5e5e5] focus-within:border-[#dc320c] transition-colors duration-200 w-full sm:w-auto bg-white">
              <input
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 sm:w-56 bg-transparent text-[#0c0c0c] text-sm font-sans px-4 py-3 placeholder:text-[#888888] focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-[#dc320c] hover:bg-[#a81e0a] text-white px-4 py-3 text-[9.5px] font-sans font-semibold tracking-[0.16em] uppercase transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom row ─────────────────────────────────── */}
        <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-sans text-[11px] text-[#888888]">
            © {new Date().getFullYear()} Doxa Home. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-[9.5px] text-[#888888] tracking-[0.16em] uppercase mr-1">
              We Accept
            </span>
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="font-sans text-[9.5px] text-[#555555] border border-[#e5e5e5] px-2 py-0.5 rounded-sm"
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
