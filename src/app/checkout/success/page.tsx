import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PageProps {
  searchParams: Promise<{ order?: string; ref?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { order, ref } = await searchParams;

  return (
    <div className="min-h-screen bg-ivory pt-28 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={36} className="text-gold-500" />
        </div>

        <p className="text-gold-500 text-[0.65rem] tracking-[0.3em] uppercase font-sans mb-3">
          Order Confirmed
        </p>
        <h1 className="font-serif text-4xl text-stone-900 font-light mb-4">
          Thank you.
        </h1>
        <p className="text-stone-600 font-sans text-sm leading-relaxed mb-8">
          Your order has been received and is being processed. Our team will be
          in touch shortly to arrange delivery.
        </p>

        {/* Order details */}
        {order && (
          <div className="bg-stone-50 border border-stone-200 p-5 mb-8 text-left">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[0.6rem] tracking-widest uppercase font-sans text-stone-400">
                Order Number
              </span>
              <span className="font-sans text-sm font-medium text-stone-900">
                {order}
              </span>
            </div>
            {ref && ref !== "DEMO" && (
              <div className="flex justify-between items-center">
                <span className="text-[0.6rem] tracking-widest uppercase font-sans text-stone-400">
                  Payment Reference
                </span>
                <span className="font-sans text-xs text-stone-500">
                  {ref}
                </span>
              </div>
            )}
          </div>
        )}

        <p className="text-stone-400 text-xs font-sans mb-8">
          A confirmation will be sent to your email. Questions? Call us or visit
          our showroom at Airport Road, Benin City.
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
