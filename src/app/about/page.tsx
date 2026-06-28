import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story of Doxa Home — premium furniture curated for Nigerian homes from our showroom at 108 Akpakpava Road, Benin City.",
};

const values = [
  {
    title: "Craft First",
    desc: "Every piece in our collection is selected for superior construction — joints, upholstery, and finishes that last decades, not seasons.",
  },
  {
    title: "Design Integrity",
    desc: "We curate rather than compromise. If it doesn't meet our standard for design and material quality, it doesn't make the showroom floor.",
  },
  {
    title: "Honest Luxury",
    desc: "Premium doesn't have to mean inaccessible. We believe in transparent pricing and genuine value for every naira spent.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory pt-28 lg:pt-32">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <Image
          src="/images/dox7.jpeg"
          alt="Doxa Home showroom"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[#D4AF37] text-[0.65rem] tracking-[0.3em] uppercase font-sans mb-4">
              Est. in Benin City
            </p>
            <h1 className="font-serif text-5xl lg:text-7xl text-white font-light">
              Our Story
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <p className="text-[#D4AF37] text-[0.65rem] tracking-[0.25em] uppercase font-sans mb-4">
              The Beginning
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink-50 font-light leading-tight mb-8">
              Built on a belief
              <br />
              <em className="not-italic text-ink-500">in beautiful living.</em>
            </h2>
            <div className="space-y-5 text-ink-600 font-sans text-sm leading-relaxed">
              <p>
                Doxa Home began with a simple observation: Nigerian homeowners
                with refined taste had to look abroad for furniture that matched
                their vision. The local market was saturated with mass-produced
                pieces that sacrificed craft for cost.
              </p>
              <p>
                We changed that. Based at 108 Akpakpava Road, Benin City, we started
                curating premium furniture — from walnut dining tables to marble-
                and-gold coffee table centrepieces — and brought them directly
                to discerning homes across Nigeria.
              </p>
              <p>
                Today, Doxa Home is a trusted name for homeowners, interior
                designers and architects across Edo, Lagos, Abuja and beyond,
                seeking furniture that tells a story of quality, taste and
                permanence.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/images/dox4.jpeg"
                alt="Marble dining set"
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
            <div className="relative aspect-square overflow-hidden mt-8">
              <Image
                src="/images/dox9.jpeg"
                alt="Gold coffee table"
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
            <div className="relative aspect-square overflow-hidden -mt-4">
              <Image
                src="/images/dox10.jpeg"
                alt="Ivory sofa"
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/images/dox6.jpeg"
                alt="Royal dining set"
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="py-16 border-t border-ink-200">
          <p className="text-[#D4AF37] text-[0.65rem] tracking-[0.25em] uppercase font-sans mb-3 text-center">
            What We Stand For
          </p>
          <h2 className="font-serif text-4xl text-ink-50 font-light text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-8 h-0.5 bg-[#D4AF37] mx-auto mb-5" />
                <h3 className="font-serif text-xl text-ink-950 font-light mb-3">
                  {v.title}
                </h3>
                <p className="text-ink-500 font-sans text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-16 border-t border-ink-200">
          <h2 className="font-serif text-3xl text-ink-50 font-light mb-4">
            Visit Our Showroom
          </h2>
          <p className="text-ink-500 font-sans text-sm mb-8 max-w-md mx-auto">
            Experience the collection in person at our showroom at 108 Akpakpava Road,
            Benin City, beside Keystone Bank. Our team is on hand to help you find the perfect piece.
          </p>
          <Link href="/contact">
            <Button variant="solid" size="lg">
              Get Directions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
