"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Globe, Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(20, "Please provide a bit more detail"),
});

type ContactForm = z.infer<typeof contactSchema>;

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
    <div className="min-h-screen bg-ivory pt-28 lg:pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[#dc320c] text-[0.65rem] tracking-[0.25em] uppercase font-sans mb-3">
            Get in Touch
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl text-ink-950 font-light">
            Contact Us
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div>
            <div className="space-y-8 mb-10">
              <div id="showroom" className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ink-950 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-[#ff4c4c]" />
                </div>
                <div>
                  <p className="font-serif text-lg text-ink-950 font-light mb-1">
                    Showroom
                  </p>
                  <p className="text-ink-500 font-sans text-sm leading-relaxed">
                    Airport Road
                    <br />
                    Benin City, Edo State
                    <br />
                    Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ink-950 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-[#ff4c4c]" />
                </div>
                <div>
                  <p className="font-serif text-lg text-ink-950 font-light mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+2340000000000"
                    className="text-ink-500 font-sans text-sm hover:text-[#dc320c] transition-colors"
                  >
                    +234 000 000 0000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ink-950 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-[#ff4c4c]" />
                </div>
                <div>
                  <p className="font-serif text-lg text-ink-950 font-light mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:hello@doxahome.ng"
                    className="text-ink-500 font-sans text-sm hover:text-[#dc320c] transition-colors"
                  >
                    hello@doxahome.ng
                  </a>
                </div>
              </div>

              <div id="delivery" className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ink-950 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-[#ff4c4c]" />
                </div>
                <div>
                  <p className="font-serif text-lg text-ink-950 font-light mb-1">
                    Showroom Hours
                  </p>
                  <p className="text-ink-500 font-sans text-sm leading-relaxed">
                    Monday – Saturday: 9am – 6pm
                    <br />
                    Sunday: 12pm – 5pm
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 pt-6 border-t border-ink-200">
              <p className="text-[0.65rem] tracking-widest uppercase font-sans text-ink-400">
                Follow Us
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-400 hover:text-[#dc320c] transition-colors"
              >
                <Globe size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-400 hover:text-[#dc320c] transition-colors"
              >
                <Share2 size={18} />
              </a>
            </div>

            {/* Map placeholder -> Google Maps embed */}
            <div className="mt-8 bg-ink-50 border border-ink-200 h-64 overflow-hidden relative shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.340058296767!2d5.603387875888252!3d6.349694325492161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1040d3a5e8cb500b%3A0xc3f8e6587c69992f!2sAirport%20Rd%2C%20Benin%20City!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          {/* Contact form */}
          <div>
            {submitted ? (
              <div className="bg-white border border-ink-200/80 p-8 shadow-sm text-center py-16">
                <div className="w-16 h-16 bg-white border border-[#dc320c]/20 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-7 h-7 text-[#dc320c]"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12l4 4 10-10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl text-ink-950 font-light mb-3">
                  Message received.
                </h2>
                <p className="text-ink-400 font-sans text-sm">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-ink-200/80 p-6 lg:p-10 shadow-sm space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-ink-950 font-light">
                    Send a Message
                  </h2>
                  <p className="text-ink-400 text-xs font-sans mt-1">
                    Have questions about custom designs, dimensions, or shipping? Reach out to our design consultants.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label">
                      Name
                    </label>
                    <input
                      {...register("name")}
                      className="form-control"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="field-error">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">
                      Phone (optional)
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="form-control"
                      placeholder="080..."
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="field-error">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="form-label">
                    Subject
                  </label>
                  <input
                    {...register("subject")}
                    className="form-control"
                    placeholder="Product enquiry, custom order..."
                  />
                  {errors.subject && (
                    <p className="field-error">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="form-label">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className="form-control"
                    placeholder="Tell us what you're looking for..."
                  />
                  {errors.message && (
                    <p className="field-error">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="solid"
                  size="lg"
                  disabled={loading}
                  className="w-full sm:w-auto px-8"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin animate-duration-500" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
