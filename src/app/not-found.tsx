import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-6 text-center">
      <div>
        <p className="font-serif text-8xl lg:text-9xl text-stone-200 font-light mb-4">
          404
        </p>
        <p className="text-gold-500 text-[0.65rem] tracking-[0.3em] uppercase font-sans mb-4">
          Page Not Found
        </p>
        <h1 className="font-serif text-3xl lg:text-4xl text-stone-900 font-light mb-4">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-stone-400 font-sans text-sm mb-8 max-w-md mx-auto">
          Perhaps you were looking for a product or collection. Let us help you
          find what you&apos;re looking for.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/">
            <Button variant="solid" size="lg">
              Go Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" size="lg">
              Browse Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
