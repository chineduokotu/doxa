import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getRemoteProducts } from "@/lib/data/products";
import { getCategoryBySlug, categories } from "@/lib/data/categories";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `${cat.label} Furniture`,
    description: `Shop premium ${cat.label.toLowerCase()} furniture at Doxa Home. ${cat.description}`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const allProducts = await getRemoteProducts();
  const products = allProducts.filter((p) => p.category === category);

  const hasProducts = products.length > 0;

  return (
    <div className="min-h-screen bg-ivory pt-28 lg:pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[0.65rem] font-sans text-ink-400 tracking-widest uppercase mb-8">
          <Link href="/" className="hover:text-ink-700 transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/shop" className="hover:text-ink-700 transition-colors">Shop</Link>
          <ChevronRight size={10} />
          <span className="text-ink-700">{cat.label}</span>
        </nav>

        {/* Page header */}
        <div className="mb-12">
          <p className="text-[#D4AF37] text-[0.65rem] tracking-[0.25em] uppercase font-sans mb-2">
            Collection
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-ink-50 font-light mb-3">
            {cat.label}
          </h1>
          <p className="text-ink-500 font-sans text-sm max-w-lg">
            {cat.description}
          </p>
        </div>

        {/* Products */}
        {!hasProducts ? (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl text-ink-400 font-light mb-3">
              Coming Soon
            </p>
            <p className="text-ink-400 font-sans text-sm mb-8 max-w-md mx-auto">
              We&apos;re curating exceptional {cat.label.toLowerCase()} pieces for
              our collection. Be the first to know when they arrive.
            </p>
            <Link
              href="/shop"
              className="text-[0.65rem] tracking-widest uppercase font-sans text-[#D4AF37] hover:text-[#AA7700] transition-colors"
            >
              Browse All Collections →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={i < 4}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
