import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PageProps {
  searchParams: Promise<{ order?: string; ref?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { order } = await searchParams;

  return (
    <div className="min-h-screen bg-ivory pt-28 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-white border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={36} className="text-[#D4AF37]" />
        </div>

        <p className="text-[#D4AF37] text-[0.65rem] tracking-[0.3em] uppercase font-sans mb-3">
          Order Dispatched
        </p>
        <h1 className="font-serif text-4xl text-ink-50 font-light mb-4">
          Thank you.
        </h1>
        <p className="text-ink-600 font-sans text-sm leading-relaxed mb-8">
          Your order has been compiled and dispatched to our sales agent on WhatsApp. We will confirm piece availability, final shipping setup, and custom pricing options.
        </p>

        {/* Order details */}
        {order && (
          <div className="bg-ink-50 border border-ink-200 p-5 mb-8 text-left">
            <div className="flex justify-between items-center">
              <span className="text-[0.6rem] tracking-widest uppercase font-sans text-ink-400">
                Order Number
              </span>
              <span className="font-sans text-sm font-medium text-ink-950">
                {order}
              </span>
            </div>
          </div>
        )}

        <p className="text-ink-400 text-xs font-sans mb-8">
          Questions or custom requirements? Message us on WhatsApp or visit
          our showroom at 108 Akpakpava Road, Benin City.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop">
            <Button variant="solid" size="lg">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
