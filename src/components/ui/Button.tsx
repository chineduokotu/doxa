"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   "solid" | "outline" | "ghost" | "gold";
  size?:      "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "solid", size = "md", fullWidth = false, children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base
          "inline-flex min-w-0 items-center justify-center gap-2 text-center font-sans tracking-[0.16em] uppercase font-semibold leading-snug",
          "transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-45 select-none",
          // Sizes
          size === "sm" && "min-h-9  px-4  py-2   text-[9px]",
          size === "md" && "min-h-11 px-6  py-3   text-[9.5px]",
          size === "lg" && "min-h-12 px-8  py-3.5 text-[9.5px]",
          // Variants
          variant === "solid"   && "bg-black text-white hover:bg-[#1a1a1a] focus-visible:ring-black",
          variant === "outline" && "border border-white text-white hover:bg-white hover:text-black focus-visible:ring-white",
          variant === "ghost"   && "border border-white/35 text-white hover:bg-white hover:text-black focus-visible:ring-white",
          variant === "gold"    && "bg-[#D4AF37] text-black hover:bg-[#AA7700] focus-visible:ring-[#D4AF37]",
          // Width
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
