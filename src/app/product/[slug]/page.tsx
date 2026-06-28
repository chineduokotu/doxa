import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Check } from "lucide-react";
import {
  getAllProducts,
  getRemoteProducts,
  getRemoteProductByIdOrSlug,
  getRemoteRelatedProducts,
} from "@/lib/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ProductCard } from "@/components/product/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const products = await getRemoteProducts();
    const paths = [];
    for (const p of products) {
      paths.push({ slug: p.slug });
      paths.push({ slug: p.id }); // Allow lookup by MongoDB ID directly
    }
    return paths;
  } catch (e) {
    console.error("Static params generation failed, falling back to local:", e);
    const products = getAllProducts();
    return products.map((p) => ({ slug: p.slug }));
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getRemoteProductByIdOrSlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.substring(0, 160),
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getRemoteProductByIdOrSlug(slug);
  if (!product) notFound();

  const related = await getRemoteRelatedProducts(product.category, product.id, 4);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-ivory pt-24 lg:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[0.65rem] font-sans text-ink-400 tracking-widest uppercase mb-10">
            <Link href="/" className="hover:text-ink-700 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/shop" className="hover:text-ink-700 transition-colors">Shop</Link>
            <ChevronRight size={10} />
            <Link
              href={`/shop/${product.category}`}
              className="hover:text-ink-700 transition-colors"
            >
              {product.category.replace("-", " ")}
            </Link>
            <ChevronRight size={10} />
            <span className="text-ink-700">{product.shortName}</span>
          </nav>

          {/* Product layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
            {/* Gallery */}
            <div className="lg:sticky lg:top-28">
              <ProductGallery
                images={product.images}
                productName={product.name}
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              {/* Badge */}
              {product.badge && (
                <Badge
                  variant={
                    product.badge === "Sale"
                      ? "sale"
                      : product.badge === "Royal Collection"
                      ? "gold"
                      : "dark"
                  }
                >
                  {product.badge}
                </Badge>
              )}

              {/* Category */}
              <p className="text-[#D4AF37] text-[0.65rem] tracking-[0.25em] uppercase font-sans">
                {product.category.replace("-", " ")}
              </p>

              {/* Name */}
              <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl text-ink-950 font-light leading-tight">
                {product.name}
              </h1>

              {/* Description */}
              <p className="font-sans text-ink-600 text-sm leading-relaxed border-t border-ink-200 pt-6">
                {product.description}
              </p>

              {/* Details */}
              <ul className="space-y-2">
                {product.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-2.5 text-sm font-sans text-ink-600"
                  >
                    <Check
                      size={14}
                      className="text-[#D4AF37] mt-0.5 shrink-0"
                    />
                    {detail}
                  </li>
                ))}
              </ul>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 py-5 border-t border-b border-ink-200">
                <div>
                  <p className="text-[0.6rem] tracking-widest uppercase font-sans text-ink-400 mb-1">
                    Material
                  </p>
                  <p className="text-sm font-sans text-ink-700">
                    {product.material}
                  </p>
                </div>
                <div>
                  <p className="text-[0.6rem] tracking-widest uppercase font-sans text-ink-400 mb-1">
                    Finish
                  </p>
                  <p className="text-sm font-sans text-ink-700">
                    {product.finish}
                  </p>
                </div>
                {product.dimensions && (
                  <div>
                    <p className="text-[0.6rem] tracking-widest uppercase font-sans text-ink-400 mb-1">
                      Dimensions
                    </p>
                    <p className="text-sm font-sans text-ink-700">
                      {product.dimensions}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-[0.6rem] tracking-widest uppercase font-sans text-ink-400 mb-1">
                    Availability
                  </p>
                  <p
                    className={`text-sm font-sans ${
                      product.inStock
                        ? "text-green-700"
                        : "text-red-600"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>

              {/* Add to cart */}
              <AddToCartButton product={product} />

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-ink-400 text-[0.65rem] font-sans tracking-wide">
                <span>✓ Free delivery within Benin City</span>
                <span>✓ Secure Paystack checkout</span>
                <span>✓ Quality guaranteed</span>
              </div>

              {/* Contact */}
              <p className="text-ink-400 text-xs font-sans border-t border-ink-200 pt-4">
                Questions?{" "}
                <Link
                  href="/contact"
                  className="text-[#D4AF37] hover:text-[#AA7700] transition-colors underline underline-offset-2"
                >
                  Contact our team
                </Link>{" "}
                or visit our showroom at 108 Akpakpava Road, Benin City.
              </p>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-24">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <p className="text-[#D4AF37] text-[0.65rem] tracking-[0.25em] uppercase font-sans mb-2">
                    You May Also Like
                  </p>
                  <h2 className="font-serif text-3xl text-ink-50 font-light">
                    Related Pieces
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
