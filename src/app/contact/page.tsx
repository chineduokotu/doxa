"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Truck,
  ShieldCheck,
  Palette,
  Headphones,
  ExternalLink,
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(20, "Please provide a bit more detail"),
});

type ContactForm = z.infer<typeof contactSchema>;

/* â”€â”€ WhatsApp SVG icon â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 15, height: 15 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M11.99 2C6.477 2 2 6.477 2 11.99c0 1.872.518 3.624 1.416 5.125L2 22l5.042-1.396A9.94 9.94 0 0 0 11.99 22C17.523 22 22 17.523 22 11.99 22 6.477 17.523 2 11.99 2zm0 18.18a8.14 8.14 0 0 1-4.152-1.138l-.298-.177-3.073.85.867-3.003-.194-.31A8.18 8.18 0 0 1 3.82 11.99c0-4.507 3.663-8.17 8.17-8.17s8.17 3.663 8.17 8.17-3.663 8.17-8.17 8.17z" />
    </svg>
  );
}

/* â”€â”€ Social SVG icons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 17, height: 17 }}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L2.25 2.25h6.987l4.258 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29.1 29.1 0 0 0 1 12a29.1 29.1 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29.1 29.1 0 0 0 23 12a29.1 29.1 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

/* â”€â”€ Circular icon wrapper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ContactIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 38,
        height: 38,
        borderRadius: "50%",
        border: "1.5px solid #e5e0d8",
        background: "#fafaf5",
        flexShrink: 0,
        color: "#D4AF37",
      }}
    >
      {children}
    </span>
  );
}

/* â”€â”€ Page component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#f5f5f0", minHeight: "100vh" }}>

      {/* â”€â”€ Hero banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        style={{
          position: "relative",
          height: 220,
          overflow: "hidden",
          background: "#ede9e1",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80&auto=format&fit=crop"
          alt="Doxa Homes showroom interior"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 60%",
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(245,245,240,0.97) 38%, rgba(245,245,240,0.05) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 2rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.2rem, 5vw, 3.25rem)",
              fontWeight: 300,
              color: "#0d0c0a",
              lineHeight: 1.1,
              marginBottom: "0.6rem",
            }}
          >
            Contact Us
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
              color: "#555045",
              maxWidth: 360,
              lineHeight: 1.65,
            }}
          >
            We&apos;re here to help. Reach out to us for enquiries,
            <br />custom designs or any assistance.
          </p>
        </div>
      </div>

      {/* â”€â”€ Two-column body â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        className="contact-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "2.5rem 2rem 0",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.7fr)",
          gap: "1.5rem",
          alignItems: "start",
        }}
      >

        {/* â”€â”€ Left card: Get in Touch â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e0d8",
            borderRadius: 4,
            padding: "2rem 1.75rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.5rem",
              fontWeight: 400,
              color: "#0d0c0a",
              marginBottom: "0.5rem",
            }}
          >
            Get in Touch
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8125rem",
              color: "#555045",
              lineHeight: 1.65,
              marginBottom: "1.75rem",
            }}
          >
            Have questions about custom designs, dimensions, or shipping?
            Reach out to our design consultants.
          </p>

          {/* Contact items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1.75rem" }}>
            {(
              [
                { icon: <Phone size={15} />, label: "Customer Care", value: "09060753966", href: "tel:+2349060753966" },
                { icon: <IconWhatsApp />, label: "WhatsApp", value: "09030181800", href: "https://wa.me/2349030181800" },
                { icon: <Mail size={15} />, label: "Email", value: "hello@doxahome.ng", href: "mailto:hello@doxahome.ng" },
                { icon: <Clock size={15} />, label: "Showroom Hours", value: "Monday â€“ Saturday: 9am â€“ 6pm\nSunday: 12pm â€“ 5pm" },
              ] as { icon: React.ReactNode; label: string; value: string; href?: string }[]
            ).map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                <ContactIcon>{item.icon}</ContactIcon>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#0d0c0a", marginBottom: "0.15rem" }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#555045", textDecoration: "none", transition: "color 150ms" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#555045")}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#555045", whiteSpace: "pre-line", lineHeight: 1.6 }}>
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Visit Our Showroom */}
          <div style={{ marginBottom: "1.75rem" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#0d0c0a", marginBottom: "0.5rem" }}>
              Visit Our Showroom
            </p>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
              <MapPin size={14} style={{ color: "#D4AF37", marginTop: 2, flexShrink: 0 }} />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#555045", lineHeight: 1.65 }}>
                108 Akpakpava Road<br />
                beside Keystone Bank, Benin City<br />
                Edo State
              </p>
            </div>
          </div>

          {/* Follow Us */}
          <div style={{ borderTop: "1px solid #e5e0d8", paddingTop: "1.25rem" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8a8578", marginBottom: "0.85rem" }}>
              Follow Us
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              {[
                { href: "https://instagram.com", icon: <IconInstagram />, label: "Instagram" },
                { href: "https://facebook.com", icon: <IconFacebook />, label: "Facebook" },
                { href: "https://x.com", icon: <IconX />, label: "X (Twitter)" },
                { href: "https://youtube.com", icon: <IconYouTube />, label: "YouTube" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ color: "#8a8578", transition: "color 150ms", display: "flex", alignItems: "center", justifyContent: "center" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8578")}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* â”€â”€ Right card: Send Us a Message â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e0d8",
            borderRadius: 4,
            padding: "2rem 2.25rem",
          }}
        >
          {submitted ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 340, textAlign: "center", gap: "1rem" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", border: "1.5px solid #D4AF37", display: "flex", alignItems: "center", justifyContent: "center", color: "#D4AF37" }}>
                <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24 }}>
                  <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.75rem", fontWeight: 300, color: "#0d0c0a" }}>
                Message received.
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#555045" }}>
                We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.6rem",
                  fontWeight: 400,
                  color: "#0d0c0a",
                  marginBottom: "1.5rem",
                }}
              >
                Send Us a Message
              </h2>

              {/* Name + Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label className="form-label" htmlFor="contact-name">Your Name</label>
                  <input id="contact-name" {...register("name")} className="form-control" placeholder="Your name" style={{ background: "#fff" }} />
                  {errors.name && <p className="field-error">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="form-label" htmlFor="contact-phone">Phone (Optional)</label>
                  <input id="contact-phone" {...register("phone")} type="tel" className="form-control" placeholder="080..." style={{ background: "#fff" }} />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: "1rem" }}>
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input id="contact-email" {...register("email")} type="email" className="form-control" placeholder="you@example.com" style={{ background: "#fff" }} />
                {errors.email && <p className="field-error">{errors.email.message}</p>}
              </div>

              {/* Subject */}
              <div style={{ marginBottom: "1rem" }}>
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <input id="contact-subject" {...register("subject")} className="form-control" placeholder="Product enquiry, custom order..." style={{ background: "#fff" }} />
                {errors.subject && <p className="field-error">{errors.subject.message}</p>}
              </div>

              {/* Message */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea id="contact-message" {...register("message")} rows={5} className="form-control" placeholder="Tell us what you're looking for..." style={{ background: "#fff" }} />
                {errors.message && <p className="field-error">{errors.message.message}</p>}
              </div>

              {/* Submit */}
              <button
                id="contact-submit"
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  minHeight: 50,
                  background: loading ? "#555045" : "#0d0c0a",
                  color: "#ffffff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  border: "none",
                  borderRadius: 2,
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingInline: "1.5rem",
                  transition: "background 200ms",
                }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#D4AF37"; }}
                onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#0d0c0a"; }}
              >
                <span>{loading ? "Sending..." : "SEND MESSAGE"}</span>
                {loading ? (
                  <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "contact-spin 0.6s linear infinite" }} />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* â”€â”€ Map section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div style={{ maxWidth: 1200, margin: "1.5rem auto 0", padding: "0 2rem", position: "relative" }}>
        <div style={{ border: "1px solid #e5e0d8", borderRadius: 4, overflow: "hidden", height: 280, position: "relative" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.340058296767!2d5.603387875888252!3d6.349694325492161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1040d3a5e8cb500b%3A0xc3f8e6587c69992f!2sAirport%20Rd%2C%20Benin%20City!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href="https://maps.google.com/?q=108+Akpakpava+Road,+Benin+City"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "#ffffff",
              border: "1px solid #e5e0d8",
              borderRadius: 3,
              padding: "0.45rem 0.85rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#0d0c0a",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "background 150ms",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
          >
            Open in Maps <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* â”€â”€ Feature badges â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 2rem 3.5rem" }}>
        <div
          className="feature-badges"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}
        >
          {(
            [
              { Icon: Truck, title: "Free Delivery", desc: "On orders over â‚¦500,000" },
              { Icon: ShieldCheck, title: "Quality Guarantee", desc: "Premium furniture, built to last" },
              { Icon: Palette, title: "Custom Designs", desc: "Tailored to your taste" },
              { Icon: Headphones, title: "24/7 Support", desc: "We're always here to help" },
            ] as { Icon: React.ElementType; title: string; desc: string }[]
          ).map(({ Icon, title, desc }) => (
            <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
              <Icon size={22} style={{ color: "#D4AF37", flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#0d0c0a", marginBottom: "0.2rem" }}>
                  {title}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#8a8578", lineHeight: 1.5 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* â”€â”€ Responsive styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <style>{`
        @keyframes contact-spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .feature-badges { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .feature-badges { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
