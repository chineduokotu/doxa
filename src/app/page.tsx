import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStory } from "@/components/home/BrandStory";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";

export const metadata: Metadata = {
  title: "Doxa Home — Premium Furniture, Benin City",
  description:
    "Shop premium luxury furniture in Nigeria. Sofas, dining sets, royal collections and more — Doxa Home, 108 Akpakpava Road, Benin City.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </>
  );
}
