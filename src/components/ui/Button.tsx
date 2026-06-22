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
          variant === "solid"   && "bg-[#0c0c0c] text-white hover:bg-[#222222] focus-visible:ring-[#0c0c0c]",
          variant === "outline" && "border border-[#0c0c0c] text-[#0c0c0c] hover:bg-[#0c0c0c] hover:text-white focus-visible:ring-[#0c0c0c]",
          variant === "ghost"   && "border border-white/35 text-white hover:bg-white hover:text-[#0c0c0c] focus-visible:ring-white",
          variant === "gold"    && "bg-[#ecb881] text-[#0c0c0c] hover:bg-[#dfa162] focus-visible:ring-[#ecb881]",
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
