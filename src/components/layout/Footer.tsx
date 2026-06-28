"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

/* â”€â”€ Navigation link groups â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const footerLinks = {
  Shop: [
    { label: "Living Room", href: "/shop/living-room" },
    { label: "Dining Room", href: "/shop/dining-room" },
    { label: "Royal Sets", href: "/shop/royal-sets" },
    { label: "Bedroom", href: "/shop/bedroom" },
    { label: "Outdoor", href: "/shop/outdoor" },
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
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

/* â”€â”€ Social SVG icons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function SocialInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 17, height: 17 }}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
function SocialFacebook() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 17, height: 17 }}
    >
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}
function SocialX() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ width: 16, height: 16 }}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L2.25 2.25h6.987l4.258 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function SocialYouTube() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ width: 17, height: 17 }}
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29.1 29.1 0 0 0 1 12a29.1 29.1 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29.1 29.1 0 0 0 23 12a29.1 29.1 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

/* â”€â”€ WhatsApp icon â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function IconWhatsApp() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ width: 12, height: 12 }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M11.99 2C6.477 2 2 6.477 2 11.99c0 1.872.518 3.624 1.416 5.125L2 22l5.042-1.396A9.94 9.94 0 0 0 11.99 22C17.523 22 22 17.523 22 11.99 22 6.477 17.523 2 11.99 2zm0 18.18a8.14 8.14 0 0 1-4.152-1.138l-.298-.177-3.073.85.867-3.003-.194-.31A8.18 8.18 0 0 1 3.82 11.99c0-4.507 3.663-8.17 8.17-8.17s8.17 3.663 8.17 8.17-3.663 8.17-8.17 8.17z" />
    </svg>
  );
}

/* â”€â”€ Footer component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0d0c0a",
        color: "#c0bbb0",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* â”€â”€ Top accent line â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(to right, transparent, #D4AF37 30%, #D4AF37 70%, transparent)",
        }}
      />

      {/* â”€â”€ Main body â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem 0" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0,1.8fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)",
            gap: "3rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* â”€â”€ Brand column â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div>
            {/* Logo */}
            <Link
              href="/"
              style={{
                display: "inline-block",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.6rem",
                fontWeight: 300,
                letterSpacing: "0.18em",
                color: "#ffffff",
                textDecoration: "none",
                lineHeight: 1,
              }}
            >
              DOXA<span style={{ color: "#D4AF37" }}>.</span>HOMES
            </Link>

            {/* Tagline */}
            <p
              style={{
                marginTop: "1.25rem",
                fontSize: 13,
                color: "#8a8578",
                lineHeight: 1.8,
                maxWidth: 280,
              }}
            >
              Curating premium furniture for discerning homes across Nigeria.
              Every piece chosen for its craft, longevity, and beauty.
            </p>

            {/* Gold rule */}
            <div
              style={{
                width: 40,
                height: 1,
                background: "#D4AF37",
                margin: "1.5rem 0",
              }}
            />

            {/* Contact details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {(
                [
                  {
                    icon: <MapPin size={11} />,
                    text: " 22 opposite Zenith bank, airport road , Benin city, Edo State.",
                  },
                  {
                    icon: <Phone size={11} />,
                    text: "Customer Care: 09060753966",
                    href: "tel:+2349060753966",
                  },
                  {
                    icon: <IconWhatsApp />,
                    text: "WhatsApp: 09030181800",
                    href: "https://wa.me/2349030181800",
                  },
                  {
                    icon: <Mail size={11} />,
                    text: "hello@doxahome.ng",
                    href: "mailto:hello@doxahome.ng",
                  },
                ] as { icon: React.ReactNode; text: string; href?: string }[]
              ).map(({ icon, text, href }) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.6rem",
                  }}
                >
                  <span
                    style={{ color: "#D4AF37", marginTop: 2, flexShrink: 0 }}
                  >
                    {icon}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 12,
                        color: "#8a8578",
                        textDecoration: "none",
                        lineHeight: 1.5,
                        transition: "color 150ms",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#D4AF37")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#8a8578")
                      }
                    >
                      {text}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontSize: 12,
                        color: "#8a8578",
                        lineHeight: 1.5,
                      }}
                    >
                      {text}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div
              style={{ display: "flex", gap: "0.85rem", marginTop: "1.5rem" }}
            >
              {[
                {
                  label: "Instagram",
                  href: "https://instagram.com",
                  icon: <SocialInstagram />,
                },
                {
                  label: "Facebook",
                  href: "https://facebook.com",
                  icon: <SocialFacebook />,
                },
                { label: "X", href: "https://x.com", icon: <SocialX /> },
                {
                  label: "YouTube",
                  href: "https://youtube.com",
                  icon: <SocialYouTube />,
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 34,
                    height: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "50%",
                    color: "#8a8578",
                    textDecoration: "none",
                    transition:
                      "color 150ms, border-color 150ms, background 150ms",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#D4AF37";
                    e.currentTarget.style.borderColor = "#D4AF37";
                    e.currentTarget.style.background = "rgba(212,175,55,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#8a8578";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* â”€â”€ Navigation columns â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  marginBottom: "1.5rem",
                }}
              >
                {section}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                }}
              >
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: 13,
                        color: "#8a8578",
                        textDecoration: "none",
                        transition: "color 150ms",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#D4AF37")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#8a8578")
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* â”€â”€ Newsletter strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div
          style={{
            padding: "2.5rem 0",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
          className="newsletter-row"
        >
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.2rem",
                fontWeight: 300,
                color: "#ffffff",
                marginBottom: "0.3rem",
              }}
            >
              Join the Doxa Circle
            </p>
            <p style={{ fontSize: 12, color: "#8a8578", lineHeight: 1.6 }}>
              New arrivals & exclusive previews â€” direct to your inbox.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: "flex",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.12)",
              flexShrink: 0,
            }}
            className="newsletter-form"
          >
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email address for newsletter"
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#ffffff",
                fontSize: 13,
                padding: "0.75rem 1.25rem",
                width: 220,
                fontFamily: "'Inter', sans-serif",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#D4AF37",
                border: "none",
                color: "#0d0c0a",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0.75rem 1.25rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "background 150ms",
                fontFamily: "'Inter', sans-serif",
                flexShrink: 0,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#c19e30")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#D4AF37")
              }
            >
              Subscribe <ArrowRight size={12} />
            </button>
          </form>
        </div>

        {/* â”€â”€ Bottom bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div
          style={{
            padding: "1.5rem 0 2rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
          className="footer-bottom"
        >
          <p style={{ fontSize: 11, color: "#555045" }}>
            Â© {year} Doxa Homes. All Rights Reserved.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms & Conditions", href: "/terms" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: 11,
                  color: "#555045",
                  textDecoration: "none",
                  transition: "color 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555045")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* â”€â”€ Responsive styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <style>{`
        .footer-grid {
          grid-template-columns: minmax(0,1.8fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 580px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .newsletter-form {
            width: 100%;
          }
          .newsletter-form input {
            flex: 1;
            width: auto !important;
          }
        }
      `}</style>
    </footer>
  );
}
