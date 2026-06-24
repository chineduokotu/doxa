"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice, generateOrderNumber, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ChevronRight, ShieldCheck, MapPin, Truck, CreditCard } from "lucide-react";

const addressSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(11, "Enter a valid Nigerian phone number"),
  address: z.string().min(5, "Enter your full address"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
});

type AddressForm = z.infer<typeof addressSchema>;

type Step = "address" | "delivery" | "payment";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const deliveryOptions = [
  {
    id: "standard",
    label: "Standard Delivery",
    description: "3–5 business days",
    price: 15000,
  },
  {
    id: "express",
    label: "Express Delivery",
    description: "1–2 business days",
    price: 35000,
  },
  {
    id: "pickup",
    label: "Showroom Pickup",
    description: "Airport Road, Benin City",
    price: 0,
  },
];

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("address");
  const [delivery, setDelivery] = useState("standard");
  const [paying, setPaying] = useState(false);
  const { items, subtotal, clearCart } = useCartStore();
  const router = useRouter();

  const deliveryPrice =
    deliveryOptions.find((d) => d.id === delivery)?.price ?? 0;
  const total = subtotal() + deliveryPrice;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
  });

  const onAddressSubmit = () => setStep("delivery");
  const onDeliveryNext = () => setStep("payment");

  const handlePaystackPayment = async () => {
    setPaying(true);
    // Paystack integration — swap in NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in .env.local
    const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder";

    try {
      // Dynamic import of Paystack inline script
      const { default: PaystackPop } = await import("@paystack/inline-js");
      const popup = new PaystackPop();
      popup.newTransaction({
        key: paystackKey,
        email: getValues("email"),
        amount: total * 100, // Paystack expects kobo
        currency: "NGN",
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: `${getValues("firstName")} ${getValues("lastName")}`,
            },
          ],
        },
        onSuccess: (transaction: { reference: string }) => {
          const orderNumber = generateOrderNumber();
          clearCart();
          router.push(`/checkout/success?order=${orderNumber}&ref=${transaction.reference}`);
        },
        onCancel: () => {
          setPaying(false);
        },
      });
    } catch {
      // Fallback if Paystack not available — simulate for demo
      await new Promise((r) => setTimeout(r, 1500));
      const orderNumber = generateOrderNumber();
      clearCart();
      router.push(`/checkout/success?order=${orderNumber}&ref=DEMO`);
    }
  };

  const isHydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (isHydrated && items.length === 0 && step !== "payment") {
      router.push("/shop");
    }
  }, [isHydrated, items.length, step, router]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-ivory pt-28 lg:pt-36 pb-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-ink-300 border-t-ink-950 rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0 && step !== "payment") {
    return null;
  }

  return (
    <div className="min-h-screen bg-ivory pt-32 lg:pt-40 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-ink-200/50 pb-8">
          <div>
            <p className="text-[#dc320c] text-[0.65rem] tracking-[0.2em] uppercase font-sans mb-2 font-medium">
              Secure Checkout
            </p>
            <h1 className="font-serif text-3xl lg:text-4xl text-ink-950 font-light tracking-wide">
              Complete Your Order
            </h1>
          </div>
          
          {/* Step indicator */}
          <div className="w-full md:w-96">
            <div className="relative flex items-center justify-between">
              {/* Background Line */}
              <div className="absolute left-6 right-6 top-[18px] h-[1px] bg-ink-200 -translate-y-1/2 z-0" />
              {/* Active Line Progress */}
              <div 
                className="absolute left-6 top-[18px] h-[1px] bg-[#dc320c] -translate-y-1/2 z-0 transition-all duration-500" 
                style={{
                  width: step === "address" ? "0%" : step === "delivery" ? "50%" : "100%"
                }}
              />

              {(["address", "delivery", "payment"] as Step[]).map((s, i) => {
                const isCompleted = 
                  (step === "delivery" && i === 0) || 
                  (step === "payment" && (i === 0 || i === 1));
                const isActive = step === s;
                
                const stepIcons = {
                  address: MapPin,
                  delivery: Truck,
                  payment: CreditCard,
                };
                const Icon = stepIcons[s];

                return (
                  <div key={s} className="relative z-10 flex flex-col items-center gap-2">
                    <div 
                      className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-500",
                        isActive 
                          ? "bg-ink-950 border-ink-950 text-[#dc320c] shadow-md shadow-ink-950/10 scale-110"
                          : isCompleted
                          ? "bg-[#dc320c] border-[#dc320c] text-white"
                          : "bg-white border-ink-200 text-ink-400"
                      )}
                    >
                      <Icon size={14} />
                    </div>
                    <span 
                      className={cn(
                        "text-[0.55rem] tracking-widest uppercase font-sans font-medium transition-colors duration-500",
                        isActive ? "text-ink-950 font-semibold" : "text-ink-400"
                      )}
                    >
                      {s}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form area */}
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {step === "address" && (
              <form onSubmit={handleSubmit(onAddressSubmit)} className="bg-white border border-ink-200/80 p-6 lg:p-10 shadow-sm space-y-6">
                <div className="border-b border-ink-100 pb-4 mb-6">
                  <h2 className="font-serif text-2xl text-ink-950 font-light">
                    Shipping Details
                  </h2>
                  <p className="text-ink-400 text-xs font-sans mt-1">
                    Please provide your delivery information. We ship nationwide via white-glove partners.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label">
                      First Name
                    </label>
                    <input
                      {...register("firstName")}
                      className="form-control"
                      placeholder="Chukwuemeka"
                    />
                    {errors.firstName && (
                      <p className="field-error">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">
                      Last Name
                    </label>
                    <input
                      {...register("lastName")}
                      className="form-control"
                      placeholder="Okafor"
                    />
                    {errors.lastName && (
                      <p className="field-error">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="form-control"
                      placeholder="08012345678"
                    />
                    {errors.phone && (
                      <p className="field-error">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="form-label">
                    Delivery Address
                  </label>
                  <input
                    {...register("address")}
                    className="form-control"
                    placeholder="15 Uselu-Lagos Rd"
                  />
                  {errors.address && (
                    <p className="field-error">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label">
                      City
                    </label>
                    <input
                      {...register("city")}
                      className="form-control"
                      placeholder="Benin City"
                    />
                    {errors.city && (
                      <p className="field-error">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">
                      State
                    </label>
                    <input
                      {...register("state")}
                      className="form-control"
                      placeholder="Edo"
                    />
                    {errors.state && (
                      <p className="field-error">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button type="submit" variant="solid" size="lg" className="w-full sm:w-auto mt-4 px-10 py-4">
                  Continue to Delivery <ChevronRight size={14} />
                </Button>
              </form>
            )}

            {/* Step 2: Delivery */}
            {step === "delivery" && (
              <div className="bg-white border border-ink-200/80 p-6 lg:p-10 shadow-sm space-y-6">
                <div className="border-b border-ink-100 pb-4 mb-6">
                  <h2 className="font-serif text-2xl text-ink-950 font-light">
                    Delivery Method
                  </h2>
                  <p className="text-ink-400 text-xs font-sans mt-1">
                    Select your preferred shipping option. Standard delivery is handled by our white-glove courier partners.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {deliveryOptions.map((option) => {
                    const isSelected = delivery === option.id;
                    return (
                      <label
                        key={option.id}
                        className={cn(
                          "flex items-center gap-4 p-5 border cursor-pointer transition-all duration-300 hover:border-ink-400 select-none",
                          isSelected
                            ? "border-[#dc320c] bg-[#dc320c]/5 ring-1 ring-[#dc320c]"
                            : "border-ink-200 bg-white"
                        )}
                      >
                        <div className="relative flex items-center justify-center">
                          <input
                            type="radio"
                            name="delivery"
                            value={option.id}
                            checked={isSelected}
                            onChange={() => setDelivery(option.id)}
                            className="sr-only"
                          />
                          <div 
                            className={cn(
                              "w-4 h-4 rounded-full border flex items-center justify-center transition-colors duration-200",
                              isSelected ? "border-[#dc320c] text-[#dc320c]" : "border-ink-300"
                            )}
                          >
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-[#dc320c]" />
                            )}
                          </div>
                        </div>

                        <div className="flex-1 pl-2">
                          <p className="font-sans text-sm font-semibold text-ink-950">
                            {option.label}
                          </p>
                          <p className="font-sans text-xs text-ink-400 mt-1">
                            {option.description}
                          </p>
                        </div>

                        <span className="font-serif text-base font-light text-ink-950 pl-4 border-l border-ink-100">
                          {option.price === 0 ? "Free" : formatPrice(option.price)}
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-ink-100 sm:flex-row sm:gap-4">
                  <Button
                    onClick={() => setStep("address")}
                    variant="outline"
                    size="lg"
                  >
                    Back
                  </Button>
                  <Button onClick={onDeliveryNext} variant="solid" size="lg" className="w-full px-8 sm:w-auto">
                    Continue to Payment <ChevronRight size={14} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === "payment" && (
              <div className="bg-white border border-ink-200/80 p-6 lg:p-10 shadow-sm space-y-6">
                <div className="border-b border-ink-100 pb-4 mb-6">
                  <h2 className="font-serif text-2xl text-ink-950 font-light">
                    Secure Payment
                  </h2>
                  <p className="text-ink-400 text-xs font-sans mt-1">
                    Select your payment method below. Your transaction is encrypted and secured.
                  </p>
                </div>

                <div className="p-6 border border-[#dc320c]/20 bg-[#dc320c]/5 rounded-sm mb-6 flex gap-4 items-start">
                  <ShieldCheck className="text-[#dc320c] shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-sans text-ink-700 leading-relaxed">
                      You will be securely redirected to <span className="font-semibold text-ink-950">Paystack</span> to complete your payment of{" "}
                      <span className="font-semibold text-[#dc320c]">{formatPrice(total)}</span>. We accept all major Nigerian cards, bank transfers, USSD, and bank apps.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:gap-4">
                  <Button
                    onClick={() => setStep("delivery")}
                    variant="outline"
                    size="lg"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePaystackPayment}
                    variant="gold"
                    size="lg"
                    disabled={paying}
                    className="w-full px-10 py-4 sm:w-auto"
                  >
                    {paying ? (
                      <>
                        <span className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                        Processing Securely...
                      </>
                    ) : (
                      <>Pay {formatPrice(total)}</>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-ink-200/80 p-6 shadow-sm sticky top-32 space-y-6">
              <h3 className="font-serif text-xl text-ink-950 font-light pb-4 border-b border-ink-100">
                Order Summary
              </h3>
              
              {/* Product items list with images */}
              <div className="divide-y divide-ink-100 max-h-96 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 bg-ink-50 border border-ink-100 overflow-hidden shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm text-ink-950 truncate leading-snug">
                        {item.product.shortName}
                      </h4>
                      <p className="text-[0.65rem] tracking-wider uppercase font-sans text-ink-400 mt-1">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-sans text-xs text-ink-950 font-medium mt-1">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-ink-100 pt-5 space-y-3 text-sm font-sans">
                <div className="flex justify-between text-ink-500">
                  <span>Subtotal</span>
                  <span className="text-ink-950">{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between text-ink-500">
                  <span>Delivery Fee</span>
                  <span className="text-ink-950">
                    {deliveryPrice === 0 ? "Free" : formatPrice(deliveryPrice)}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-ink-950 pt-4 border-t border-ink-100 items-baseline">
                  <span>Total Amount</span>
                  <span className="font-serif text-xl text-[#dc320c] font-semibold">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Secure checkout info */}
              <div className="border-t border-ink-100 pt-4 flex gap-2 items-center text-[0.65rem] tracking-wider uppercase font-sans text-ink-400">
                <ShieldCheck size={14} className="text-ink-400" />
                <span>100% Secure Transaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
